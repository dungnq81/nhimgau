<?php

namespace HD;

use HD\Rest\Rest;

use HD\Plugins\ACF\ACF;
use HD\Plugins\PLL;
use HD\Plugins\WooCommerce\WooCommerce;

use HD\Themes\Admin;
use HD\Themes\Customizer;
use HD\Themes\Optimizer;
use HD\Themes\Shortcode;

use HD\Utilities\Traits\Singleton;

\defined( 'ABSPATH' ) || die;

/**
 * Theme Class
 *
 * @author Gaudev
 */
final class Theme {
	use Singleton;

	// --------------------------------------------------

	private function init(): void {
		// plugins_loaded -> after_setup_theme -> init -> rest_api_init -> widgets_init -> wp_loaded -> admin_menu -> admin_init ...

		add_action( 'after_setup_theme', [ $this, 'i18n' ], 10 );
		add_action( 'after_setup_theme', [ $this, 'after_setup_theme' ], 11 );
		add_action( 'after_setup_theme', [ $this, 'setup' ], 12 );
		add_action( 'after_setup_theme', [ $this, 'plugins_setup' ], 13 );

		/** Enqueue Scripts */
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 14 );

		/** Widgets */
		add_action( 'widgets_init', [ $this, 'unregister_widgets' ], 16 );
		add_action( 'widgets_init', [ $this, 'register_widgets' ], 17 );
	}

	// --------------------------------------------------

	/**
	 * Load localization file
	 *
	 * @return void
	 */
	public function i18n(): void {
		/**
		 * Make the theme available for translation.
		 * Translations can be filed at WordPress.org.
		 */
		load_theme_textdomain( TEXT_DOMAIN, trailingslashit( WP_LANG_DIR ) . 'themes/' );
		load_theme_textdomain( TEXT_DOMAIN, get_template_directory() . '/languages' );
		load_theme_textdomain( TEXT_DOMAIN, get_stylesheet_directory() . '/languages' );
	}

	// --------------------------------------------------

	/**
	 * Sets up theme defaults and register support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs before the init hook.
	 * The init hook is too late for some features, such as indicating support for post-thumbnails.
	 */
	public function after_setup_theme(): void {
		/** Add theme support for various features. */
		add_theme_support( 'automatic-feed-links' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'title-tag' );
		add_theme_support( 'html5', [
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'script',
		] );

		add_theme_support( 'align-wide' );
		add_theme_support( 'wp-block-styles' );
		add_theme_support( 'responsive-embeds' );
		add_theme_support( 'editor-styles' );

		/** Enable excerpt to page, page-attributes to post */
		add_post_type_support( 'page', [ 'excerpt' ] );
		add_post_type_support( 'post', [ 'page-attributes' ] );

		/** Set default values for the upload media box */
		update_option( 'image_default_align', 'center' );
		update_option( 'image_default_size', 'large' );

		/**
		 * Add support for the core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		$logo_height = 240;
		$logo_width  = 240;

		add_theme_support(
			'custom-logo',
			[
				'height'               => $logo_height,
				'width'                => $logo_width,
				'flex-height'          => true,
				'flex-width'           => true,
				'header-text'          => '',
				'unlink-homepage-logo' => true,
			]
		);
	}

	// --------------------------------------------------

	/**
	 * @return void
	 */
	public function setup(): void {
		if ( is_admin() ) {
			( Admin::get_instance() );
		}

		( Rest::get_instance() );
		( Customizer::get_instance() );
		( Optimizer::get_instance() );
		( Shortcode::get_instance() );

		// autoload
		$dirs = [
			'template_structures' => THEME_PATH . 'inc/structures',
			'template_ajax'       => THEME_PATH . 'inc/ajax',
		];

		foreach ( $dirs as $dir => $path ) {
			Helper::createDirectory( $path );

			// structures & ajax
			if ( in_array( $dir, [ 'template_structures', 'template_ajax' ], true ) ) {
				Helper::FQNLoad( $path, true );
			}
		}
	}

	// --------------------------------------------------

	/**
	 * @return void
	 */
	public function plugins_setup(): void {
		Helper::isAcfActive() && ACF::get_instance();
		Helper::isPolylangActive() && PLL::get_instance();
		Helper::isWoocommerceActive() && WooCommerce::get_instance();
	}

	// --------------------------------------------------

	/**
	 * Enqueue scripts and styles
	 *
	 * @return void
	 */
	public function wp_enqueue_scripts(): void {
		$version = THEME_VERSION;
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			$version = date( 'YmdHis', current_time( 'U', 0 ) );
		}

		/** Global Stylesheet */
		wp_enqueue_style( 'vendor-css', ASSETS_URL . 'css/_vendor.css', [], $version );
		wp_enqueue_style( 'index-css', ASSETS_URL . 'css/index-css.css', [ 'vendor-css' ], $version );

		/** JS runs early in the loading process. */
		wp_enqueue_script( 'lighthouse-js', ASSETS_URL . 'js/lighthouse.js', [ 'jquery-core' ], $version, false );

		/** Global Scripts */
		wp_enqueue_script( 'modulepreload-js', ASSETS_URL . 'js/modulepreload-polyfill.js', [], $version, true );
		wp_script_add_data( 'modulepreload-js', 'extra', [ 'module', 'async' ] );
		wp_enqueue_script( 'index-js', ASSETS_URL . 'js/index.js', [ 'jquery-core' ], $version, true );
		wp_script_add_data( 'index-js', 'extra', [ 'module', 'defer' ] );

		wp_add_inline_script( 'jquery-core', 'Object.assign(window, { $: jQuery, jQuery });', 'after' );

		/** Homepage */
		if ( Helper::isHomeOrFrontPage() ) {
			wp_enqueue_style( 'home-css', ASSETS_URL . 'css/home-css.css', [], $version );
			wp_enqueue_script( 'home-js', ASSETS_URL . 'js/home.js', [ 'jquery-core' ], $version, true );
			wp_script_add_data( 'home-js', 'extra', [ 'module', 'defer' ] );

			//...
		}

		/** Inline Js */
		$recaptcha_options     = Helper::getOption( 'recaptcha__options' );
		$recaptcha_v2_site_key = $recaptcha_options['recaptcha_v2_site_key'] ?? '';
		$recaptcha_v3_site_key = $recaptcha_options['recaptcha_v3_site_key'] ?? '';

		$l10n = [
			'_ajaxUrl'   => admin_url( 'admin-ajax.php', 'relative' ),
			'_baseUrl'   => Helper::siteURL( '/' ),
			'_themeUrl'  => THEME_URL,
			'_csrfToken' => wp_create_nonce( 'wp_csrf_token' ),
			'_restToken' => wp_create_nonce( 'wp_rest' ),
			'_lang'      => Helper::currentLanguage(),
		];

		$recaptcha_v2_site_key && $l10n['recaptcha_v2_site_key'] = $recaptcha_v2_site_key;
		$recaptcha_v3_site_key && $l10n['recaptcha_v3_site_key'] = $recaptcha_v3_site_key;

		wp_localize_script( 'jquery-core', 'hdConfig', $l10n );

		/** Comments */
		if ( is_singular() && comments_open() && Helper::getOption( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		} else {
			wp_dequeue_script( 'comment-reply' );
		}
	}

	// --------------------------------------------------

	/**
	 * Unregister widgets
	 *
	 * @return void
	 */
	public function unregister_widgets(): void {
		unregister_widget( 'WP_Widget_Search' );
		unregister_widget( 'WP_Widget_Recent_Posts' );

		// Removes the styling added to the header for recent comments
		global $wp_widget_factory;
		remove_action( 'wp_head', [ $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ] );
	}

	// --------------------------------------------------

	/**
	 * Registers widgets
	 *
	 * @return void
	 */
	public function register_widgets(): void {
		$widgets_dir = INC_PATH . 'classes/Widgets';
		$FQN         = '\\HD\\Widgets\\';

		Helper::createDirectory( $widgets_dir );
		Helper::FQNLoad( $widgets_dir, false, true, $FQN, true );
	}

	// --------------------------------------------------
}
