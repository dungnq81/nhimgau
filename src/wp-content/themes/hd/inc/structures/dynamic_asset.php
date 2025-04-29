<?php
/**
 * ASSETS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// `template-blocks` folder
// --------------------------------------------------

add_action( 'enqueue_assets_extra', static function () {
	//...
} );

// --------------------------------------------------
// `template-page-home.php` file
// --------------------------------------------------

add_action( 'enqueue_assets_template_page_home', static function () {
	$version = \HD_Helper::version();

	wp_enqueue_style( 'home-css', ASSETS_URL . 'css/home-css.css', [], $version );
	wp_enqueue_script( 'home-js', ASSETS_URL . 'js/home.js', [ 'jquery-core' ], $version, true );
	wp_script_add_data( 'home-js', 'extra', [ 'module', 'defer' ] );
} );
