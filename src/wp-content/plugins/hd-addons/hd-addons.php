<?php
/**
 * Plugin Name: HD Addons
 * Plugin URI: https://webhd.vn
 * Version: 0.25.3
 * Requires PHP: 8.2
 * Author: Gaudev
 * Author URI: https://webhd.vn
 * Text Domain: hd-addons
 * Description: Addons plugin for HD Theme
 * License: MIT
 *
 * ###Requires ### Plugins: advanced-custom-fields-pro
 */

\defined( 'ABSPATH' ) || exit;

$default_headers = [
	'Name'       => 'Plugin Name',
	'Version'    => 'Version',
	'TextDomain' => 'Text Domain',
	'Author'     => 'Author',
];

$plugin_data = get_file_data( __FILE__, $default_headers, 'plugin' );

define( 'ADDONS_PATH', untrailingslashit( plugin_dir_path( __FILE__ ) ) . DIRECTORY_SEPARATOR ); // **/wp-content/plugins/**/
define( 'ADDONS_URL', untrailingslashit( plugin_dir_url( __FILE__ ) ) . '/' );                   // http(s)://**/wp-content/plugins/**/
define( 'ADDONS_BASENAME', plugin_basename( __FILE__ ) );                                        // **/**.php

define( 'ADDONS_VERSION', $plugin_data['Version'] );
define( 'ADDONS_TEXT_DOMAIN', $plugin_data['TextDomain'] );
define( 'ADDONS_AUTHOR', $plugin_data['Author'] );

const ADDONS_SRC_PATH = ADDONS_PATH . 'src' . DIRECTORY_SEPARATOR;
const ADDONS_SRC_URL  = ADDONS_URL . 'src/';

if ( ! file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	wp_die( __( 'Error locating autoloader. Please run <code>composer install</code>.', ADDONS_TEXT_DOMAIN ) );
}

require_once __DIR__ . '/vendor/autoload.php';

register_activation_hook( __FILE__, [ \Addons\Activator::class, 'activation' ] );
register_deactivation_hook( __FILE__, [ \Addons\Activator::class, 'deactivation' ] );
register_uninstall_hook( __FILE__, [ \Addons\Activator::class, 'uninstall' ] );

add_action( 'admin_notices', 'acf_requirement_notice' );

function acf_requirement_notice(): void {
	if ( ! \Addons\Helper::isAcfActive() ) {
		printf(
			'<div class="notice notice-error"><p>%1$s <a target="_blank" href="%2$s"><strong>%3$s</strong></a> or <a target="_blank" href="%4$s"><strong>%5$s</strong></a></p></div>',
			wp_kses( __( '<strong>Addons</strong> plugin requires', ADDONS_TEXT_DOMAIN ), [ 'strong' => [] ] ),
			'https://www.advancedcustomfields.com/pro/',
			esc_html__( 'Advanced Custom Fields PRO', ADDONS_TEXT_DOMAIN ),
			'https://wordpress.org/plugins/secure-custom-fields/',
			esc_html__( 'Secure Custom Fields', ADDONS_TEXT_DOMAIN )
		);
	}
}

// Global function holder.
function plugins_loaded_addons(): void {
	( new \Addons\Addons() );
}

\plugins_loaded_addons();
