<?php

namespace Addons\Optimizer;

\defined( 'ABSPATH' ) || exit;

final class Optimizer {
	public mixed $optimizer_options = [];

	// ------------------------------------------------------

	public function __construct() {
		( new \Addons\Optimizer\LazyLoad\LazyLoad() );

		$this->optimizer_options = \Addons\Helper::getOption( 'optimizer__options' );
		$this->_output_parser();
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	private function _output_parser(): void {
		if ( defined( 'WP_CLI' ) || is_admin() ) {
			return;
		}

		$minify_html   = $this->optimizer_options['minify_html'] ?? 0;
		$font_optimize = $this->optimizer_options['font_optimize'] ?? 0;
		$font_preload  = isset( $this->optimizer_options['font_preload'] ) ? implode( PHP_EOL, $this->optimizer_options['font_preload'] ) : '';
		$dns_prefetch  = isset( $this->optimizer_options['dns_prefetch'] ) ? implode( PHP_EOL, $this->optimizer_options['dns_prefetch'] ) : '';

		if ( ! empty( $minify_html ) ||
		     ! empty( $font_optimize ) ||
		     ! empty( $font_preload ) ||
		     ! empty( $dns_prefetch )
		) {
			add_action( 'wp_loaded', [ $this, 'start_bufffer' ] );
			add_action( 'shutdown', [ $this, 'end_buffer' ] );
		}
	}

	// ------------------------------------------------------

	public function start_bufffer(): void {
		ob_start( [ $this, 'run' ] );
	}

	// ------------------------------------------------------

	public function end_buffer(): void {
		if ( ob_get_length() ) {
			ob_end_flush();
		}
	}

	// ------------------------------------------------------

	/**
	 * @param string $html
	 *
	 * @return string
	 */
	public function run( string $html ): string {
		if ( ! preg_match( '/<\/html>/i', $html ) ) {
			return $html;
		}

		// Do not run optimization if amp is active, the page is XML or feed.
		if ( \Addons\Helper::isAmpEnabled( $html ) ||
		     \Addons\Helper::isXml( $html ) ||
		     is_feed()
		) {
			return $html;
		}

		return $this->_optimize_for_visitors( $html );
	}

	// ------------------------------------------------------'

	/**
	 * @param $html
	 *
	 * @return string
	 */
	private function _optimize_for_visitors( $html ): string {
		$html = ( new Font() )->run( $html );
		$html = $this->_dns_prefetch( $html );

		$minify_html = $this->optimizer_options['minify_html'] ?? 0;
		if ( ! empty( $minify_html ) ) {
			$_options = [
				'cssMinifier'     => function ( $css ) {
					return \Addons\Helper::CSSMinify( $css, false );
				},
				'jsMinifier'      => function ( $js ) {
					return \Addons\Helper::JSMinify( $js, false );
				},
				'jsCleanComments' => true,
			];

			$html = Minify_Html::minify( $html, $_options );
		}

		return $html;
	}

	// ------------------------------------------------------

	/**
	 * @param $html
	 *
	 * @return mixed
	 */
	private function _dns_prefetch( $html ): mixed {
		$urls = $this->optimizer_options['dns_prefetch'] ?? [];

		// Return if no url's are set by the user.
		if ( empty( $urls ) ) {
			return $html;
		}

		$new_html = '';
		foreach ( $urls as $url ) {
			// Replace the protocol with //.
			$url_without_protocol = preg_replace( '~(?:(?:https?:)?(?:\/\/)(?:www\.|(?!www)))?((?:.*?)\.(?:.*))~', '//$1', $url );
			$new_html             .= '<link rel="dns-prefetch" href="' . $url_without_protocol . '" />';
		}

		return str_replace( '</head>', $new_html . '</head>', $html );
		//return preg_replace( '~<\/title>~', '</title>' . $new_html, $html );
	}

	// ------------------------------------------------------
}
