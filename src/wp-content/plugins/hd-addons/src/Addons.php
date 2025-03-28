<?php

namespace Addons;

use Addons\ThirdParty\ACF;
use Addons\ThirdParty\CF7;
use Addons\ThirdParty\Faker;
use Addons\ThirdParty\RankMath;

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
		add_action( 'plugins_loaded', [ $this, 'plugins_loaded' ], 999 );

		add_action( 'admin_enqueue_scripts', [ $this, 'admin_enqueue_scripts' ], 39, 1 );

		//---------------------------------------------
		// login page
		//---------------------------------------------

		add_filter( 'login_headertext', [ $this, 'login_headertext' ] ); // Changing the alt text on the logo to show your site name
		add_filter( 'login_headerurl', [ $this, 'login_headerurl' ] );   // Changing the logo link from WordPress.org to your site
		add_action( 'login_enqueue_scripts', [ $this, 'login_enqueue_script' ], 31 );
	}

	// -------------------------------------------------------------

	public function i18n(): void {
		load_plugin_textdomain( ADDONS_TEXT_DOMAIN );
		load_plugin_textdomain( ADDONS_TEXT_DOMAIN, false, ADDONS_PATH . 'languages' );
	}

	// -------------------------------------------------------------

	/**
	 * @return void
	 */
	public function plugins_loaded(): void {
		add_action( 'script_loader_tag', [ $this, 'script_loader_tag' ], 11, 3 );

		// Classic Editor
		if ( Helper::checkPluginActive( 'classic-editor/classic-editor.php' ) ) {
			remove_action( 'admin_init', [ \Classic_Editor::class, 'register_settings' ] );
		}

		// Load modules
		$modules = Helper::loadYaml( ADDONS_PATH . 'config.yaml' );
		if ( ! empty( $modules ) ) {
			foreach ( $modules as $module_slug => $value ) {
				$className = Helper::capitalizedSlug( $module_slug, true );
				$classFQN  = "\\Addons\\{$className}\\{$className}";

				// WooCommerce
				if ( (string) $module_slug === 'woocommerce' && ! Helper::checkPluginActive( 'woocommerce/woocommerce.php' ) ) {
					continue;
				}

				class_exists( $classFQN ) && ( new $classFQN() );
			}
		}

		// ThirdParty
		class_exists( RankMath::class ) && Helper::isRankMathActive() && ( new RankMath() );
		class_exists( ACF::class ) && Helper::isAcfActive() && ( new ACF() );
		class_exists( CF7::class ) && Helper::isCf7Active() && ( new CF7() );
		class_exists( Faker::class ) && ( new Faker() );
	}

	// -------------------------------------------------------------

	/**
	 * @param string $tag
	 * @param string $handle
	 * @param string $src
	 *
	 * @return string
	 */
	public function script_loader_tag( string $tag, string $handle, string $src ): string {
		$attributes = wp_scripts()->registered[ $handle ]->extra ?? [];

		// Process combined attributes (e.g., `module defer`) from `addons`
		if ( ! empty( $attributes['addon'] ) ) {
			// Convert space-separated string to array if necessary
			$extra_attrs = is_array( $attributes['addon'] )
				? $attributes['addon']
				: explode( ' ', $attributes['addon'] );

			foreach ( $extra_attrs as $attr ) {
				if ( 'defer' === $attr ) {
					$attr = 'defer data-wp-strategy="defer"';
				}

				if ( $attr === 'module' ) {
					if ( ! preg_match( '#\stype=(["\'])module\1#', $tag ) ) {
						$tag = preg_replace( '#(?=></script>)#', ' type="module"', $tag, 1 );
					}
				} elseif ( ! preg_match( "#\s$attr(=|>|\s)#", $tag ) ) {
					$tag = preg_replace( '#(?=></script>)#', " $attr", $tag, 1 );
				}
			}
		}

		return $tag;
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

		// addon page settings
		$allowed_pages = 'toplevel_page_addon-settings';
		if ( $allowed_pages === $hook ) {

			wp_enqueue_style( 'wp-color-picker' );
			wp_enqueue_script( 'wp-color-picker' );

			wp_enqueue_style( '_vendor-css', ADDONS_URL . 'assets/css/_vendor.css', [], $version );
			wp_enqueue_style( 'addon-css', ADDONS_URL . 'assets/css/addon-css.css', [ '_vendor-css' ], $version );

			wp_register_script( 'select2-js', ADDONS_URL . 'assets/js/select2.full.min.js', [ 'jquery' ], $version, true );
			wp_enqueue_script( 'addon-js', ADDONS_URL . 'assets/js/addon.js', [ 'select2-js', 'wp-color-picker' ], $version, true );
			wp_script_add_data( 'addon-js', 'addon', [ 'module', 'defer' ] );

			$codemirror_settings = [
				'codemirror_css'  => wp_enqueue_code_editor( [ 'type' => 'text/css' ] ),
				'codemirror_html' => wp_enqueue_code_editor( [ 'type' => 'text/html' ] ),
			];

			wp_enqueue_style( 'wp-codemirror' );
			wp_localize_script( 'addon-js', 'codemirror_settings', $codemirror_settings );
		}
	}

	// -------------------------------------------------------------

	/**
	 * @return void
	 */
	public function login_enqueue_script(): void {
		wp_enqueue_style( 'login-css', ADDONS_URL . 'assets/css/login-css.css', [], ADDONS_VERSION );
		wp_enqueue_script( 'login-js', ADDONS_URL . 'assets/js/login.js', [ 'jquery' ], ADDONS_VERSION, true );
		wp_script_add_data( 'login-js', 'addon', [ 'module', 'async' ] );

		// $default_logo    = '';
		// $default_logo_bg = '';

		$default_logo    = ADDONS_URL . "assets/img/logo.png";
		$default_logo_bg = ADDONS_URL . "assets/img/login-bg.jpg";

		// scripts / styles
		$logo          = Helper::getThemeMod( 'login_page_logo_setting' ) ?: $default_logo;
		$logo_bg       = Helper::getThemeMod( 'login_page_bgimage_setting' ) ?: $default_logo_bg;
		$logo_bg_color = Helper::getThemeMod( 'login_page_bgcolor_setting' );

		$css = new \Addons\CSS();

		if ( $logo_bg ) {
			$css->set_selector( 'body.login' );
			$css->add_property( 'background-image', 'url(' . $logo_bg . ')' );
		}

		if ( $logo_bg_color ) {
			$css->set_selector( 'body.login' );
			$css->add_property( 'background-color', $logo_bg_color );

			$css->set_selector( 'body.login:before' );
			$css->add_property( 'background', 'none' );
			$css->add_property( 'opacity', 1 );
		}

		$css->set_selector( 'body.login #login h1 a' );
		if ( $logo ) {
			$css->add_property( 'background-image', 'url(' . $logo . ')' );
		}

		$css_output = $css->css_output();
		if ( $css_output ) {
			wp_add_inline_style( 'login-css', $css_output );
		}
	}

	// -------------------------------------------------------------

	/**
	 * @return mixed|string|null
	 */
	public function login_headertext(): mixed {
		$headertext = Helper::getThemeMod( 'login_page_headertext_setting' );

		return $headertext ?: get_bloginfo( 'name' );
	}

	// -------------------------------------------------------------

	/**
	 * @return mixed|string|null
	 */
	public function login_headerurl(): mixed {
		$headerurl = Helper::getThemeMod( 'login_page_headerurl_setting' );

		return $headerurl ?: site_url( '/' );
	}
}
