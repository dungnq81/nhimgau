<?php
/**
 * ASSETS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// `template-page-home.php` Template
// --------------------------------------------------

add_action( 'enqueue_assets_template_page_home', static function () {
	$version = defined( 'WP_DEBUG' ) && WP_DEBUG ? date( 'YmdHis', current_time( 'U', 0 ) ) : THEME_VERSION;

	wp_enqueue_style( 'home-css', ASSETS_URL . 'css/home-css.css', [], $version );
	wp_enqueue_script( 'home-js', ASSETS_URL . 'js/home.js', [ 'jquery-core' ], $version, true );
	wp_script_add_data( 'home-js', 'extra', [ 'module', 'defer' ] );
} );
