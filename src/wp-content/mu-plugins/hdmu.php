<?php

/**
 * Plugin Name: HDMU
 * Plugin URI: https://webhd.vn
 * Description: mu-plugins for HD theme
 * Version: 0.25.02
 * Requires PHP: 8.2
 * Author: Gaudev
 * Author URI: https://webhd.vn
 * Text Domain: hdmu
 * License: MIT License
 */

$headers = [
	'Name'       => 'Plugin Name',
	'Version'    => 'Version',
	'TextDomain' => 'Text Domain',
];

$plugin_data = get_file_data( __FILE__, $headers, 'plugin' );

define( 'MU_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR ); // **/wp-content/mu-plugins/
define( 'MU_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) . '/' ); // https://**/wp-content/mu-plugins/
define( 'MU_BASENAME', plugin_basename( __FILE__ ) ); // **/**.php
define( 'MU_TEXT_DOMAIN', $plugin_data['TextDomain'] );

if ( file_exists( __DIR__ . '/hdmu/vendor/autoload.php' ) ) {
	require_once __DIR__ . '/hdmu/vendor/autoload.php';

	function plugins_loaded(): void {
		require_once MU_PATH . 'hdmu' . DIRECTORY_SEPARATOR . 'MU.php';
		( new \MU() );
	}

	\plugins_loaded();
}
