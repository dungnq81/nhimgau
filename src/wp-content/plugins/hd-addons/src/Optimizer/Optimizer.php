<?php

namespace Addons\Optimizer;

\defined( 'ABSPATH' ) || exit;

final class Optimizer {
	public mixed $optimizer_options = [];

	// ------------------------------------------------------

	public function __construct() {
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
		$minify_html = $this->optimizer_options['minify_html'] ?? 0;

		if ( ! empty( $minify_html ) ) {
			$options = [
				'cssMinifier' => function ($css) {
					return \Addons\Helper::CSSMinify( $css, false );
				},
				'jsMinifier' => function ($js) {
					return \Addons\Helper::JSMinify( $js, false );
				},
				'jsCleanComments' => true,
			];

			$html = Minify_Html::minify( $html, $options );
		}

		return $html;
	}

	// ------------------------------------------------------
}
