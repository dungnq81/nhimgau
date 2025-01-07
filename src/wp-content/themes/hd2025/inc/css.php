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

add_action( 'wp_enqueue_scripts', '__custom_css', 99 );

/**
 * @return void
 */
function __custom_css(): void {
	//$css = \HD\Utilities\CSS::get_instance();

	//...

	//	$css_output = $css->css_output();
	//	if ( $css_output ) {
	//		wp_add_inline_style( 'app-style', $css_output );
	//	}

	//ob_start();

	//...

	//$inline_css = ob_get_clean();
	//$inline_css = \HD\Helper::CSSMinify( $inline_css, true );
	//wp_add_inline_style( 'app-style', $inline_css );
}
