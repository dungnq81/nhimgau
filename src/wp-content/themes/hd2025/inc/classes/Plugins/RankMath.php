<?php

namespace HD\Plugins;

use HD\Utilities\Traits\Singleton;

\defined( 'ABSPATH' ) || exit;

/**
 * RankMath SEO
 *
 * @author Gaudev
 */
final class RankMath {
	use Singleton;

	// --------------------------------------------------

	private function init(): void {
		add_filter( 'rank_math/frontend/breadcrumb/args', [ $this, 'breadcrumb_args' ] );
		add_filter( 'rank_math/frontend/show_keywords', '__return_true' );
		add_filter( 'rank_math/sitemap/enable_caching', '__return_false' );

		/**
		 * Filter to add plugins to the RMS TOC.
		 */

		/** Tocer */
		if ( \HD\Helper::checkPluginActive( 'tocer/tocer.php' ) ) {
			add_filter( 'rank_math/researches/toc_plugins', static function ( $toc_plugins ) {
				$toc_plugins['tocer/tocer.php'] = 'Tocer';

				return $toc_plugins;
			} );
		}

		/** Easy Table of Contents */
		if ( \HD\Helper::checkPluginActive( 'easy-table-of-contents/easy-table-of-contents.php' ) ) {
			add_filter( 'rank_math/researches/toc_plugins', static function ( $toc_plugins ) {
				$toc_plugins['easy-table-of-contents/easy-table-of-contents.php'] = 'Easy Table of Contents';

				return $toc_plugins;
			} );
		}
	}

	// --------------------------------------------------

	/**
	 * @param $args
	 *
	 * @return array
	 */
	public function breadcrumb_args( $args ): array {
		return [
			'delimiter'   => '',
			'wrap_before' => '<ul id="breadcrumbs" class="breadcrumbs" aria-label="Breadcrumbs">',
			'wrap_after'  => '</ul>',
			'before'      => '<li><span property="itemListElement" typeof="ListItem">',
			'after'       => '</span></li>',
		];
	}
}
