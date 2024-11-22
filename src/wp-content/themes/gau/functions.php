<?php
/**
 * Theme functions and definitions
 *
 * @package Gaudev
 */

$theme_version = ( wp_get_theme()->get( 'Version' ) ) ?: false;
$theme_author  = ( wp_get_theme()->get( 'Author' ) ) ?: 'Gaudev';
$theme_uri     = ( wp_get_theme()->get( 'ThemeURI' ) ) ?: 'https://gaudev.xyz';
$text_domain   = ( wp_get_theme()->get( 'TextDomain' ) ) ?: 'gau';

define( 'TEXT_DOMAIN', $text_domain );
define( 'THEME_VERSION', $theme_version );
define( 'THEME_URI', $theme_uri );
define( 'AUTHOR', $theme_author );

define( 'THEME_PATH', untrailingslashit( get_template_directory() ) . DIRECTORY_SEPARATOR ); // **/wp-content/themes/**/
define( 'THEME_URL', untrailingslashit( esc_url( get_template_directory_uri() ) ) . '/' ); // https://**/wp-content/themes/**/

const INC_PATH   = THEME_PATH . 'inc' . DIRECTORY_SEPARATOR;
const ASSETS_URL = THEME_URL . 'assets/';

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	error_log( 'Autoloader not found: ' . __DIR__ . '/vendor/autoload.php' );
	wp_die( __( 'Error locating autoloader. Please run <code>composer install</code>.', TEXT_DOMAIN ) );
}

require_once __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/themes.php';
require_once __DIR__ . '/inc/css.php';
require_once __DIR__ . '/inc/js.php';

// Initialize theme settings.
( \Themes\Theme::get_instance() );
