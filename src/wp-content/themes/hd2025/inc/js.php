<?php

/**
 * JS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom JS
// --------------------------------------------------

add_action( 'wp_footer', 'custom_js_action', 999 );

/**
 * @return void
 */
function custom_js_action(): void {
	//ob_start();

	//...

	//$content = ob_get_clean();
	//echo \HD\Helper::JSMinify( $content, true );
}
