<?php

/**
 * settings.php
 *
 * @author Gaudev
 */

use HD\Helper;

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Menu location
// --------------------------------------------------

add_action( 'after_setup_theme', 'register_nav_menu_callback', 11 );

function register_nav_menu_callback(): void {
	register_nav_menus(
		[
			'main-nav'   => __( 'Primary Menu', TEXT_DOMAIN ),
			'mobile-nav' => __( 'Handheld Menu', TEXT_DOMAIN ),
			//'policy-nav' => __( 'Term menu', TEXT_DOMAIN ),
		]
	);
}

// --------------------------------------------------
// Hook widgets_init
// --------------------------------------------------

add_action( 'widgets_init', 'register_sidebar_callback' );

function register_sidebar_callback(): void {

	//----------------------------------------------------------
	// Homepage
	//----------------------------------------------------------

	register_sidebar(
		[
			'container'     => false,
			'id'            => 'home-sidebar',
			'name'          => __( 'Homepage', TEXT_DOMAIN ),
			'description'   => __( 'Widgets added here will appear in homepage.', TEXT_DOMAIN ),
			'before_widget' => '<div class="%2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<span>',
			'after_title'   => '</span>',
		]
	);

	//----------------------------------------------------------
	// Other...
	//----------------------------------------------------------

	//...
}

// --------------------------------------------------
// Hook default scripts
// --------------------------------------------------

add_action( 'wp_default_scripts', 'wp_default_scripts_callback', 11, 1 );

function wp_default_scripts_callback( $scripts ): void {
	if ( isset( $scripts->registered['jquery'] ) && ! is_admin() ) {
		$script = $scripts->registered['jquery'];
		if ( $script->deps ) {

			// Check whether the script has any dependencies

			// remove jquery-migrate
			$script->deps = array_diff( $script->deps, [ 'jquery-migrate' ] );
		}
	}
}

// --------------------------------------------------
// Hook body_class
// --------------------------------------------------

add_filter( 'body_class', 'body_class_callback', 11, 1 );

function body_class_callback( array $classes ): array {
	// Check whether we're in the customizer preview.
	if ( is_customize_preview() ) {
		$classes[] = 'customizer-preview';
	}

	foreach ( $classes as $class ) {
		if (
			str_contains( $class, 'wp-custom-logo' ) ||
			str_contains( $class, 'page-template-templates' ) ||
			str_contains( $class, 'page-template-default' ) ||
			str_contains( $class, 'no-customize-support' ) ||
			str_contains( $class, 'page-id-' )
		) {
			$classes = array_diff( $classes, [ $class ] );
		}
	}

	if ( \HD\Helper::isWoocommerceActive() ) {
		$classes[] = 'woocommerce';
	}

	// ...

	return $classes;
}

// --------------------------------------------------
// Hook post_class
// --------------------------------------------------

add_filter( 'post_class', 'post_class_callback', 11, 1 );

function post_class_callback( array $classes ): array {
	// remove_sticky_class
	if ( in_array( 'sticky', $classes, false ) ) {
		$classes   = array_diff( $classes, [ 'sticky' ] );
		$classes[] = 'wp-sticky';
	}

	// remove 'tag-', 'category-' classes
	foreach ( $classes as $class ) {
		if (
			str_contains( $class, 'tag-' ) ||
			str_contains( $class, 'category-' )
		) {
			$classes = array_diff( $classes, [ $class ] );
		}
	}

	return $classes;
}

// --------------------------------------------------
// Filter nav_menu_css_class
// --------------------------------------------------

add_filter( 'nav_menu_css_class', 'nav_menu_css_class_callback', 999, 4 );

function nav_menu_css_class_callback( $classes, $menu_item, $args, $depth ): array {
	if ( ! is_array( $classes ) ) {
		$classes = [];
	}

	// Remove 'menu-item-type-', 'menu-item-object-' classes
	foreach ( $classes as $class ) {
		if (
			str_contains( $class, 'menu-item-type-' ) ||
			str_contains( $class, 'menu-item-object-' ) ||
			str_contains( $class, 'menu-item' ) ||
			str_contains( $class, 'menu-item-' )
		) {
			$classes = array_diff( $classes, [ $class ] );
		}
	}

	if ( 1 === $menu_item->current || $menu_item->current_item_ancestor || $menu_item->current_item_parent ) {
		$classes[] = 'active';
	}

	// li_class
	// li_depth_class

	if ( $depth === 0 ) {
		if ( ! empty( $args->li_class ) ) {
			$classes[] = $args->li_class;
		}

		return $classes;
	}

	if ( ! empty( $args->li_depth_class ) ) {
		$classes[] = $args->li_depth_class;
	}

	return $classes;
}

// --------------------------------------------------
// Filter nav_menu_link_attributes
// --------------------------------------------------

add_filter( 'nav_menu_link_attributes', 'nav_menu_link_attributes_callback', 999, 4 );

function nav_menu_link_attributes_callback( $atts, $menu_item, $args, $depth ): array {
	// link_class
	// link_depth_class

	if ( $depth === 0 ) {
		if ( property_exists( $args, 'link_class' ) ) {
			$atts['class'] = esc_attr( $args->link_class );
		}
	} elseif ( property_exists( $args, 'link_depth_class' ) ) {
		$atts['class'] = esc_attr( $args->link_depth_class );
	}

	// menu_link_class
	if ( ! empty( $menu_item->menu_link_class ) ) {
		//		if ( ! empty( $atts['class'] ) ) {
		//			$atts['class'] .= ' ' . esc_attr( $menu_item->menu_link_class );
		//		} else {
		//			$atts['class'] = esc_attr( $menu_item->menu_link_class );
		//		}

		$atts['class'] = esc_attr( $menu_item->menu_link_class );
	}

	return $atts;
}

// --------------------------------------------------
// Filter nav_menu_item_title
// --------------------------------------------------

add_filter( 'nav_menu_item_title', 'nav_menu_item_title_callback', 999, 4 );

function nav_menu_item_title_callback( $title, $item, $args, $depth ) {
	//	if ($args->theme_location === 'main-nav') {
	//		$title = '<span>' . $title . '</span>';
	//	}

	return $title;
}

// --------------------------------------------------
// query_vars
// --------------------------------------------------

add_filter( 'query_vars', 'query_vars_callback', 99, 1 );

function query_vars_callback( $vars ): array {
	$vars[] = 'page';
	$vars[] = 'paged';

	return $vars;
}

// --------------------------------------------------
// custom filter
// --------------------------------------------------

add_filter( 'hd_theme_settings_filter', 'hd_theme_settings_filter_callback', 99, 1 );

function hd_theme_settings_filter_callback( array $arr ): array {
	static $setting_filter_cache = [];

	// Return a cached value if static caching is enabled and the value is already cached
	if ( ! empty( $setting_filter_cache['theme_setting'] ) ) {
		return $setting_filter_cache['theme_setting'];
	}

	$arr_new = [
		//
		// Customize table column information, table display content, etc.
		//
		'admin_list_table'                    => [
			// Add ID to the admin category page.
			'term_row_actions'                => [
				'category',
				'post_tag',
			],

			// Add ID to the admin post-page.
			'post_row_actions'                => [
				'user',
				'post',
				'page',
			],

			// Terms thumbnail (term_thumb).
			'term_thumb_columns'              => [
				'category',
				'post_tag',
			],

			// Exclude thumb post_type columns.
			'post_type_exclude_thumb_columns' => [],
		],

		//
		// Aspect Ratio.
		//
		'aspect_ratio'                        => [
			'post_type_term' => [
				'post',
			],
			'ratio_default'  => [
				'1-1',
				'2-1',
				'3-2',
				'4-3',
				'16-9',
				'21-9',
			]
		],

		//
		// defer, delay script - default 5s.
		//
		'defer_script'                        => [
			// defer.
			'contact-form-7' => 'defer',

			// delay.
			'comment-reply'  => 'delay',
			'wp-embed'       => 'delay',
		],

		//
		// defer style.
		//
		'defer_style'                         => [
			'dashicons',
			'contact-form-7',
		],

		//
		// Admin menu sidebar
		//
		'admin_menu'                          => [
			// hide admin menu
			'admin_hide_menu'             => [
				//'edit.php',
			],

			// hide admin submenu
			'admin_hide_submenu'          => [
//				'options-general.php' => [
//					'options-discussion.php',
//					'options-privacy.php',
//				]
			],

			// ignore user
			'admin_hide_menu_ignore_user' => [ 1 ],
		],

		//
		// ACF menu
		//
		'acf_menu'                            => [
			// ACF attributes in `menu` locations.
			'acf_menu_items_locations' => [
				'main-nav',
			],

			// ACF attributes `mega-menu` locations.
			'acf_mega_menu_locations'  => [],
		],

		//
		// Custom post-type and taxonomy.
		//
		'post_type_terms'                     => [],

		//
		// Custom Email list (mailto).
		//
		'custom_emails'                       => [],

		//
		// List of admin IDs allowed installing plugins.
		//
		'allowed_users_ids_install_plugins'   => [ 1 ],

		//
		// List of user IDs that are not allowed to be deleted.
		//
		'disallowed_users_ids_delete_account' => [ 1 ],

		//
		// Login security
		//
		'login_security'                      => [
			// Allows customization of the Login URL in the admin options.
			'enable_custom_login'        => false,

			// Allowlist IPs Login Access
			'allowlist_ips_login_access' => [
				'127.0.0.1',
			],

			// Blocked IPs Access
			'blocked_ips_login_access'   => [],
		],

		//
		// Social Links.
		//
		'social_follows_links'                => [
			'facebook'  => [
				'name' => 'Facebook',
				'icon' => 'fa-brands fa-facebook',
				'url'  => '',
			],
			'instagram' => [
				'name' => 'Instagram',
				'icon' => 'fa-brands fa-instagram',
				'url'  => '',
			],
			'youtube'   => [
				'name' => 'Youtube',
				'icon' => 'fa-brands fa-youtube',
				'url'  => '',
			],
			'twitter'   => [
				'name' => 'X (Twitter)',
				'icon' => 'fa-brands fa-x-twitter',
				'url'  => '',
			],
			'tiktok'    => [
				'name' => 'Tiktok',
				'icon' => 'fa-brands fa-tiktok',
				'url'  => '',
			],
			'telegram'  => [
				'name' => 'Telegram',
				'icon' => 'fa-brands fa-telegram',
				'url'  => '',
			],
			'linkedin'  => [
				'name' => 'Linkedin',
				'icon' => 'fa-brands fa-linkedin',
				'url'  => '',
			],
			'zalo'      => [
				'name' => 'Zalo',
				'icon' => THEME_URL . 'assets/img/zlogo.png',
				'url'  => '',
			],
			'hotline'   => [
				'name' => 'Hotline',
				'icon' => 'fa-solid fa-phone',
				'url'  => '',
			],
			'email'     => [
				'name' => 'Email',
				'icon' => 'fa-solid fa-envelope',
				'url'  => '',
			],
		]
	];

	// --------------------------------------------------

//	if ( Helper::isWoocommerceActive() ) {
//		$arr_new['aspect_ratio']['post_type_term'][]                      = 'product';
//		$arr_new['aspect_ratio']['post_type_term'][]                      = 'product_cat';
//		$arr_new['admin_list_table']['term_row_actions'][]                = 'product_cat';
//		$arr_new['admin_list_table']['post_type_exclude_thumb_columns'][] = 'product';
//		$arr_new['post_type_terms'][]                                     = [ 'product' => 'product_cat' ];
//	}
//
//	if ( Helper::isCf7Active() ) {
//		$arr_new['admin_list_table']['post_type_exclude_thumb_columns'][] = 'wpcf7_contact_form';
//	}

	// --------------------------------------------------

	// Merge the new array with the old array, prioritize the value of $arr
	$arr_new = [ ...$arr_new, ...$arr ]; //dump($arr_new);

	// Add to static cache
	$setting_filter_cache['theme_setting'] = $arr_new;

	return $arr_new;
}
