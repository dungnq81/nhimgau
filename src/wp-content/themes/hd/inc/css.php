<?php

/**
 * CSS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom CSS
// --------------------------------------------------

add_action( 'wp_enqueue_scripts', 'custom_css_action', 99 );

/**
 * @return void
 */
function custom_css_action(): void {
	//$css = \HD\Utilities\CSS::get_instance();

	//...

	//	$css_output = $css->css_output();
	//	if ( $css_output ) {
	//		wp_add_inline_style( 'index-css', $css_output );
	//	}

	//ob_start();

	//...

	//$inline_css = ob_get_clean();
	//$inline_css = \HD\Helper::CSSMinify( $inline_css, true );
	//wp_add_inline_style( 'index-css', $inline_css );
}
