<?php

/**
 * Plugin Name: HD MU
 * Plugin URI: https://webhd.vn
 * Description: mu plugins for HD theme
 * Version: 0.25.01
 * Requires PHP: 8.2
 * Author: Gaudev
 * Author URI: https://webhd.vn
 * Text Domain: hd-mu
 * License: MIT License
 */

$headers = [
    'Name'       => 'Plugin Name',
    'Version'    => 'Version',
    'TextDomain' => 'Text Domain',
];

$plugin_data = get_file_data(__FILE__, $headers, 'plugin');

define('MU_PATH', untrailingslashit(plugin_dir_path(__FILE__)) . DIRECTORY_SEPARATOR); // **/wp-content/mu-plugins/
define('MU_URL', untrailingslashit(plugin_dir_url(__FILE__)) . '/'); // https://**/wp-content/mu-plugins/

if (! file_exists(__DIR__ . '/hd-mu/vendor/autoload.php')) {
    error_log('Autoloader not found: ' . __DIR__ . '/hd-mu/vendor/autoload.php');
    wp_die(__('Error locating autoloader. Please run <code>composer install</code>.', ADDONS_TEXT_DOMAIN));
}

require_once __DIR__ . '/hd-mu/vendor/autoload.php';

function plugins_loaded(): void
{
    require_once MU_PATH . 'hd-mu' . DIRECTORY_SEPARATOR . 'MU.php';
    (new \MU\MU());
}

\plugins_loaded();
