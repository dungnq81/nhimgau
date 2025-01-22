<?php

namespace Addons;

use Addons\AspectRatio\AspectRatio;
use Addons\BaseSlug\BaseSlug;
use Addons\CustomCSS\CustomCSS;
use Addons\CustomScript\CustomScript;
use Addons\CustomSorting\CustomSorting;
use Addons\Editor\Editor;
use Addons\File\File;
use Addons\GlobalSetting\GlobalSetting;
use Addons\LoginSecurity\LoginSecurity;
use Addons\ReCaptcha\ReCaptcha;
use Addons\SocialLink\SocialLink;
use Addons\ThirdParty\Faker;
use Addons\WooCommerce\WooCommerce;

\defined( 'ABSPATH' ) || exit;

/**
 * Addons Class
 *
 * @author Gaudev
 */
final class Addons {

	// -------------------------------------------------------------

	public function __construct() {
		add_action( 'plugins_loaded', [ $this, 'i18n' ], 10 );
		add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ], 11 );

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 39, 1 );
	}

	// -------------------------------------------------------------

	public function i18n(): void {
		load_plugin_textdomain( ADDONS_TEXT_DOMAIN );
		load_plugin_textdomain( ADDONS_TEXT_DOMAIN, false, ADDONS_PATH . 'languages' );
	}

	// -------------------------------------------------------------

	public function plugins_loaded(): void {
		// Classic Editor
		if ( Helper::checkPluginActive( 'classic-editor/classic-editor.php' ) ) {
			remove_action( 'admin_init', [ \Classic_Editor::class, 'register_settings' ] );
		}

		( new GlobalSetting() );
		( new AspectRatio() );
		( new Editor() );
		( new LoginSecurity() );
		( new SocialLink() );
		( new File() );
		( new BaseSlug() );
		( new CustomSorting() );
		( new ReCaptcha() );
		( new WooCommerce() );
		( new CustomScript() );
		( new CustomCSS() );

		( new Faker() );
	}

	// -------------------------------------------------------------

	/**
	 * @param $hook
	 *
	 * @return void
	 */
	public function admin_enqueue_scripts( $hook ): void {
		$version = ADDONS_VERSION;
		if ( WP_DEBUG ) {
			$version = date( 'YmdHis', current_time( 'U', 0 ) );
		}

		wp_enqueue_style( 'admin-addons-style', ADDONS_URL . 'assets/css/admin_addons.css', [], $version );
		wp_enqueue_script( 'admin-addons', ADDONS_URL . 'assets/js/admin_addons2.js', [ 'jquery-core' ], $version, true );
		wp_script_add_data( 'admin-addons', 'extra', [ 'module', 'defer' ] );

		// options_enqueue_assets
		$allowed_pages = 'toplevel_page_addon-settings';
		if ( $allowed_pages === $hook ) {
			if ( ! wp_style_is( 'select2-style' ) ) {
				wp_enqueue_style( 'select2-style', ADDONS_URL . 'assets/css/select2.min.css', [], $version );
			}

			if ( ! wp_script_is( 'select2', 'registered' ) ) {
				wp_register_script( 'select2', ADDONS_URL . 'assets/js/select2.full.min.js', [ 'jquery-core' ], $version, true );
			}

			wp_enqueue_script( 'select2-addons', ADDONS_URL . 'assets/js/select2.js', [ 'select2' ], $version, true );
			wp_script_add_data( 'select2-addons', 'extra', [ 'module', 'defer' ] );

			$codemirror_settings = [
				'codemirror_css'  => wp_enqueue_code_editor( [ 'type' => 'text/css' ] ),
				'codemirror_html' => wp_enqueue_code_editor( [ 'type' => 'text/html' ] ),
			];

			wp_enqueue_style( 'wp-codemirror' );
			wp_localize_script( 'admin-addons', 'codemirror_settings', $codemirror_settings );
		}
	}
}
