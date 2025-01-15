<?php

namespace Addons\CustomCSS;

\defined( 'ABSPATH' ) || exit;

final class CustomCSS {

	// ------------------------------------------------------

	public function __construct() {
		add_action( 'wp_enqueue_scripts', [ $this, 'header_inline_custom_css' ], 99 );
	}

	// ------------------------------------------------------

	public function header_inline_custom_css(): void {
		$css = \Addons\Helper::getCustomPostContent( 'addon_css', false );
		if ( $css ) {
			$css = \Addons\Helper::CSSMinify( $css, true );
			wp_add_inline_style( 'app-style', $css );
		}
	}
}
