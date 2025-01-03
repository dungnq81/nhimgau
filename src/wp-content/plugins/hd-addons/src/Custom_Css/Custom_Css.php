<?php

namespace Addons\Custom_Css;

use Addons\Base\Singleton;

\defined( 'ABSPATH' ) || exit;

final class Custom_Css {
	use Singleton;

	// ------------------------------------------------------

	private function init(): void {
		add_action( 'wp_enqueue_scripts', [ $this, 'header_inline_custom_css' ], 99 );
	}

	// ------------------------------------------------------

	public function header_inline_custom_css(): void {
		$css = \get_custom_post_option_content( 'addon_css', false );
		if ( $css ) {
			$css = \css_minify( $css, true );
			wp_add_inline_style( 'app-style', $css );
		}
	}
}
