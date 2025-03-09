<?php

namespace Addons;

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
		$modules = \Addons\Helper::loadYaml( ADDONS_PATH . 'config.yaml' );
		if ( ! empty( $modules ) ) {
			foreach ( $modules as $module_slug => $value ) {
				$className = \Addons\Helper::capitalizedSlug( $module_slug, true );
				$classFQN     = "\\Addons\\{$className}\\{$className}";

				// WooCommerce
				if ( (string) $module_slug === 'woocommerce' && ! \Addons\Helper::checkPluginActive( 'woocommerce/woocommerce.php' ) ) {
					continue;
				}

				class_exists( $classFQN ) && ( new $classFQN() );
			}
		}

		// ThirdParty
		class_exists( \Addons\ThirdParty\Faker::class ) && ( new \Addons\ThirdParty\Faker() );
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

		// Add `type="module"` attributes if the script is marked as a module
		if ( ! empty( $attributes['module'] ) ) {
			$tag = preg_replace( '#(?=></script>)#', ' type="module"', $tag, 1 );
		}

		// Handle `async` and `defer` attributes
		foreach ( [ 'async', 'defer' ] as $attr ) {
			if ( 'defer' === $attr ) {
				$attr = 'defer data-wp-strategy="defer"';
			}

			if ( ! empty( $attributes[ $attr ] ) && ! preg_match( "#\s$attr(=|>|\s)#", $tag ) ) {
				$tag = preg_replace( '#(?=></script>)#', " $attr", $tag, 1 );
			}
		}

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

		// Fontawesome kit
		if ( ( 'fontawesome-kit' === $handle ) && ! preg_match( '#\scrossorigin([=>\s])#', $tag ) ) {
			$tag = preg_replace( '#(?=></script>)#', " crossorigin='anonymous'", $tag, 1 );
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

		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );

		wp_enqueue_style( 'admin-addons-style', ADDONS_URL . 'assets/css/admin_addons.css', [], $version );
		wp_enqueue_script(
			'admin-addons',
			ADDONS_URL . 'assets/js/admin_addons2.js',
			[ 'jquery', 'wp-color-picker' ],
			$version,
			true
		);
		wp_script_add_data( 'admin-addons', 'addon', [ 'module', 'defer' ] );

		// options_enqueue_assets
		$allowed_pages = 'toplevel_page_addon-settings';
		if ( $allowed_pages === $hook ) {
			if ( ! wp_style_is( 'select2-style' ) ) {
				wp_enqueue_style( 'select2-style', ADDONS_URL . 'assets/css/select2.min.css', [], $version );
			}

			if ( ! wp_script_is( 'select2', 'registered' ) ) {
				wp_register_script( 'select2', ADDONS_URL . 'assets/js/select2.full.min.js', [ 'jquery' ], $version, true );
			}

			wp_enqueue_script( 'select2-addons', ADDONS_URL . 'assets/js/select2.js', [ 'select2' ], $version, true );
			wp_script_add_data( 'select2-addons', 'addon', [ 'module', 'defer' ] );

			$codemirror_settings = [
				'codemirror_css'  => wp_enqueue_code_editor( [ 'type' => 'text/css' ] ),
				'codemirror_html' => wp_enqueue_code_editor( [ 'type' => 'text/html' ] ),
			];

			wp_enqueue_style( 'wp-codemirror' );
			wp_localize_script( 'admin-addons', 'codemirror_settings', $codemirror_settings );
		}
	}
}
