<?php
/*!
Plugin Name: gau-mu
Plugin URI: https://gaudev.xyz
Description: mu-plugin for Gau Theme
Version: 0.24.12
Requires PHP: 8.2
Author: Gaudev
Author URI: https://gaudev.xyz
Text Domain: gau-mu
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

$headers = [
	'Name'       => 'Plugin Name',
	'Version'    => 'Version',
	'TextDomain' => 'Text Domain',
];

$plugin_data = get_file_data( __FILE__, $headers, 'plugin' );

define( 'MU_ADDON_PLUGIN_VERSION', $plugin_data['Version'] );
define( 'MU_ADDON_PLUGIN_TEXT_DOMAIN', $plugin_data['TextDomain'] );

if ( file_exists( __DIR__ . '/gau-mu/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/gau-mu/vendor/autoload.php';
}
