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
		// wp-config.php -> muplugins_loaded -> plugins_loaded -> after_setup_theme -> init (rest_api_init, widgets_init, v.v...)
		// FE: init -> wp_loaded -> wp -> template_redirect -> template_include -> v.v...
		// BE: init -> wp_loaded -> admin_menu -> admin_init -> v.v...

		add_action( 'after_setup_theme', [ $this, 'setup_theme' ], 10 );
		add_action( 'after_setup_theme', [ $this, 'setup' ], 11 );

		/** Enqueue Scripts */
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 14 );

		/** Widgets */
		add_action( 'widgets_init', [ $this, 'unregister_widgets' ], 16 );
		add_action( 'widgets_init', [ $this, 'register_widgets' ], 17 );

		/** Dynamic Template Hook */
		add_filter( 'template_include', [ $this, 'dynamic_template_include' ], 20 );
	}

	// --------------------------------------------------

	/**
	 * Sets up theme defaults and register support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which runs before the init hook.
	 * The init hook is too late for some features, such as indicating support for post-thumbnails.
	 */
	public function setup_theme(): void {
		/** Load localization file */
		load_theme_textdomain( TEXT_DOMAIN, trailingslashit( WP_LANG_DIR ) . 'themes/' );
		load_theme_textdomain( TEXT_DOMAIN, get_template_directory() . '/languages' );
		load_theme_textdomain( TEXT_DOMAIN, get_stylesheet_directory() . '/languages' );

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

		// Theme
		( Rest::get_instance() );
		( Customizer::get_instance() );
		( Optimizer::get_instance() );
		( Shortcode::get_instance() );

		// autoload file
		$dirs = [
			'template_structures' => THEME_PATH . 'inc/structures',
			'template_ajax'       => THEME_PATH . 'inc/ajax',
		];

		foreach ( $dirs as $dir => $path ) {
			Helper::createDirectory( $path );
			if ( in_array( $dir, [ 'template_structures', 'template_ajax' ], true ) ) {
				Helper::FQNLoad( $path, true );
			}
		}

		// Plugin
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
		$version = defined( 'WP_DEBUG' ) && WP_DEBUG ? date( 'YmdHis', current_time( 'U', 0 ) ) : THEME_VERSION;

		/** Inline Js */
		$recaptcha_options = Helper::getOption( 'recaptcha__options' );
		$l10n              = [
			'_ajaxUrl'      => admin_url( 'admin-ajax.php', 'relative' ),
			'_baseUrl'      => Helper::siteURL( '/' ),
			'_themeUrl'     => THEME_URL,
			'_csrfToken'    => wp_create_nonce( 'wp_csrf_token' ),
			'_restToken'    => wp_create_nonce( 'wp_rest' ),
			'_recaptcha_v2' => $recaptcha_options['recaptcha_v2_site_key'] ?? '',
			'_recaptcha_v3' => $recaptcha_options['recaptcha_v3_site_key'] ?? '',
			'_lang'         => Helper::currentLanguage(),
		];
		wp_localize_script( 'jquery-core', 'hdConfig', $l10n );
		wp_add_inline_script( 'jquery-core', 'Object.assign(window, { $: jQuery, jQuery });', 'after' );

		/** CSS */
		wp_enqueue_style( 'vendor-css', ASSETS_URL . 'css/_vendor.css', [], $version );
		wp_enqueue_style( 'index-css', ASSETS_URL . 'css/index-css.css', [ 'vendor-css' ], $version );

		/** JS */
		wp_enqueue_script( 'preload-js', ASSETS_URL . 'js/preload-polyfills.js', [], $version, false );
		wp_enqueue_script( 'index-js', ASSETS_URL . 'js/index.js', [ 'jquery-core' ], $version, true );

		/** Add data to scripts */
		wp_script_add_data( 'preload-js', 'async', true );
		wp_script_add_data( 'index-js', 'extra', [ 'module', 'defer' ] );

		/** Comments */
		if ( is_singular() && comments_open() && Helper::getOption( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		} else {
			wp_dequeue_script( 'comment-reply' );
		}
	}

	// --------------------------------------------------

	/**
	 * @param $template
	 *
	 * @return mixed
	 */
	public function dynamic_template_include( $template ): mixed {
		$template_slug = basename( $template, '.php' );
		$hook_name     = 'enqueue_assets_' . str_replace( '-', '_', $template_slug );

		// dynamic hook - enqueue style/script
		add_action( 'wp_enqueue_scripts', static function () use ( $hook_name ) {
			do_action( $hook_name );
		}, 20 );

		// dynamic hook extra
		do_action( 'enqueue_assets_extra' );

		return $template;
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
