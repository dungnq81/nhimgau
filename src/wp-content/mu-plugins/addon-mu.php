<?php
/*!
Plugin Name: addon-mu
Plugin URI: https://webhd.vn
Description: mu-plugin for HD Theme
Version: 0.25.01
Requires PHP: 8.2
Author: Gaudev
Author URI: https://webhd.vn
Text Domain: addon-mu
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

$headers = [
	'Name'       => 'Plugin Name',
	'Version'    => 'Version',
	'TextDomain' => 'Text Domain',
];

$plugin_data = get_file_data(__FILE__, $headers, 'plugin');

define('ADDON_MU_PLUGIN_VERSION', $plugin_data['Version']);
define('ADDON_MU_PLUGIN_TEXT_DOMAIN', $plugin_data['TextDomain']);

if (file_exists(__DIR__ . '/addon-mu/vendor/autoload.php')) {
	require_once __DIR__ . '/addon-mu/vendor/autoload.php';
}
