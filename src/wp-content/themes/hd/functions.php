<?php
/**
 * Theme functions and definitions
 *
 * @author Gaudev
 */

$current_theme = wp_get_theme();
$parent_theme  = $current_theme->parent() ?: $current_theme;

$theme_version = $parent_theme->get( 'Version' ) ?: false;
$theme_author  = $parent_theme->get( 'Author' ) ?: 'Gaudev';
$theme_uri     = $parent_theme->get( 'ThemeURI' ) ?: 'https://webhd.vn';
$text_domain   = $parent_theme->get( 'TextDomain' ) ?: 'hd';

define( 'TEXT_DOMAIN', $text_domain );
define( 'THEME_VERSION', $theme_version );
define( 'THEME_URI', $theme_uri );
define( 'AUTHOR', $theme_author );

define( 'THEME_PATH', untrailingslashit( get_template_directory() ) . DIRECTORY_SEPARATOR ); // **/wp-content/themes/**/
define( 'THEME_URL', untrailingslashit( esc_url( get_template_directory_uri() ) ) . '/' );  // http(s)://**/wp-content/themes/**/

const INC_PATH   = THEME_PATH . 'inc' . DIRECTORY_SEPARATOR;
const ASSETS_URL = THEME_URL . 'assets/';

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/inc/settings.php';
require_once __DIR__ . '/inc/helpers.php';
require_once __DIR__ . '/inc/css.php';
require_once __DIR__ . '/inc/js.php';

// Initialize theme.
( \HD\Theme::get_instance() );
