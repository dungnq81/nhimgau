<?php

/**
 * Theme Settings
 *
 * @author Gaudev
 */

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
			'policy-nav' => __( 'Term Menu', TEXT_DOMAIN ),
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

//	register_sidebar(
//		[
//			'container'     => false,
//			'id'            => 'home-sidebar',
//			'name'          => __( 'Homepage', TEXT_DOMAIN ),
//			'description'   => __( 'Widgets added here will appear in homepage.', TEXT_DOMAIN ),
//			'before_widget' => '<div class="%2$s">',
//			'after_widget'  => '</div>',
//			'before_title'  => '<span>',
//			'after_title'   => '</span>',
//		]
//	);

	//----------------------------------------------------------
	// Other...
	//----------------------------------------------------------

	// News sidebar
	register_sidebar(
		[
			'container'     => false,
			'id'            => 'news-sidebar',
			'name'          => __( 'News Sidebar', TEXT_DOMAIN ),
			'description'   => __( 'Widgets added here will appear in news sidebar.', TEXT_DOMAIN ),
			'before_widget' => '<div class="%2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<span>',
			'after_title'   => '</span>',
		]
	);

	// Page sidebar
	register_sidebar(
		[
			'container'     => false,
			'id'            => 'page-sidebar',
			'name'          => __( 'Page Sidebar', TEXT_DOMAIN ),
			'description'   => __( 'Widgets added here will appear in page sidebar.', TEXT_DOMAIN ),
			'before_widget' => '<div class="%2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<span>',
			'after_title'   => '</span>',
		]
	);

	// Archive sidebar
	register_sidebar(
		[
			'container'     => false,
			'id'            => 'archive-sidebar',
			'name'          => __( 'Archive Sidebar', TEXT_DOMAIN ),
			'description'   => __( 'Widgets added here will appear in archive sidebar.', TEXT_DOMAIN ),
			'before_widget' => '<div class="%2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<span>',
			'after_title'   => '</span>',
		]
	);
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
			str_contains( $class, 'page-id-' ) ||
			str_contains( $class, 'postid-' ) ||
			str_contains( $class, 'single-format-standard' ) ||
			str_contains( $class, 'no-customize-support' )
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
	if ( ! empty( $setting_filter_cache['hd_theme_setting'] ) ) {
		return $setting_filter_cache['hd_theme_setting'];
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
				//
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
				//'post_tag',
				//
			],

			// Exclude thumb post_type columns.
			'post_type_exclude_thumb_columns' => [
				'page',
				//
			],
		],

		//
		// Custom post-type and taxonomy.
		//
		'post_type_terms'                     => [
			'post' => 'category',
			//
		],

		//
		// Aspect Ratio.
		//
		'aspect_ratio'                        => [
			'post_type_term'       => [
				'post',
				//
			],
			'aspect_ratio_default' => [
				'1-1',
				'2-1',
				'3-2',
				'4-3',
				'16-9',
				'21-9',
			],
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
		// LazyLoad
		//
		'lazyload_exclude'                    => [
			'no-lazy',
			'skip-lazy',
		],

		//
		// Custom Email list (mailto).
		//
		'custom_emails'                       => [
//			'contact'     => __( 'Contacts', TEXT_DOMAIN ),
		],

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
			'enable_custom_login_url'    => false,

			// Allowlist IPs Login Access
			'allowlist_ips_login_access' => [],

			// Blocked IPs Access
			'blocked_ips_login_access'   => [],
		],

		//
		// Social Links.
		//
		'social_follows_links'                => [
			'facebook'  => [
				'name' => __( 'Facebook', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-facebook',
				'url'  => '',
			],
			'instagram' => [
				'name' => __( 'Instagram', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-instagram',
				'url'  => '',
			],
			'youtube'   => [
				'name' => __( 'Youtube', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-youtube',
				'url'  => '',
			],
			'twitter'   => [
				'name' => __( 'X (Twitter)', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-x-twitter',
				'url'  => '',
			],
			'tiktok'    => [
				'name' => __( 'Tiktok', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-tiktok',
				'url'  => '',
			],
			'telegram'  => [
				'name' => __( 'Telegram', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-telegram',
				'url'  => '',
			],
			'linkedin'  => [
				'name' => __( 'Linkedin', TEXT_DOMAIN ),
				'icon' => 'fa-brands fa-linkedin',
				'url'  => '',
			],
			'zalo'      => [
				'name' => __( 'Zalo', TEXT_DOMAIN ),
				'icon' => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1193.88 419.19"><path fill="currentColor" d="M621,388c-37.24,25.71-77.78,35.82-122,28.84-38.83-6.11-71.38-24.35-97.28-53.88a162.36,162.36,0,0,1-10-201.74c26.32-36.67,62.06-59.2,106.78-66.44,44.42-7.2,85.18,2.72,122.08,28.33,1.07-1.22.66-2.38.67-3.43,0-5.22,0-10.45,0-15.67,0-2.31.14-2.43,2.48-2.43q31,0,62,0c2.49,0,2.63.19,2.74,2.61,0,.56,0,1.11,0,1.67V411.54c0,5.29,0,4.44-4.52,4.45-11,0-22-.2-33,.06a29.42,29.42,0,0,1-28.24-19.42A31.47,31.47,0,0,1,621,388Zm-96-36.69c50.26.67,95.78-40.17,95.86-95.47.08-53.59-43-95.69-96-95.85-51.69-.15-95.09,41.81-95.87,94.3C428.18,308.62,473.17,352.15,525,351.34Z"/><path fill="currentColor" d="M1026.3,90.78c91.52-2.15,168.58,72,167.57,166-1,90.73-75.66,164.49-168.67,162.35-88-2-160.57-74-160.39-164.63C865,163,939.37,91.68,1026.3,90.78Zm3.24,260.56a96.29,96.29,0,0,0,96.35-95.44c.52-54.84-43.32-97-96-97.45a96.45,96.45,0,1,0-.36,192.89Z"/><path fill="currentColor" d="M344.32,3.46c.66-1.1-.05-2.34.37-3.46H9.36a10.58,10.58,0,0,0-.53,3.91q0,32.37,0,64.73c0,.77,0,1.55,0,2.32a1.12,1.12,0,0,0,1,1.16c1.44.06,2.88.18,4.32.18l225.66,0c.09.56.18,1.12.26,1.68l0,0a.61.61,0,0,0-.57.68l0,.05a.5.5,0,0,0-.48.69L203.76,119l-57.85,71.48q-26.19,32.39-52.37,64.77-19.8,24.48-39.62,48.95C41.13,320,28.41,335.85,15.51,351.55,5.79,363.38.38,376.76.12,392.12,0,398.67.05,405.23,0,411.78,0,416.46-.11,416,4.08,416H315.73a26.16,26.16,0,0,0,12.49-3c9.38-5,15.08-12.64,15.91-23.39.39-5.19.29-10.43.28-15.65,0-7-.17-14-.22-21,0-4.57.27-4.07-4.17-4.07H106.36c-.88,0-1.77,0-2.66,0-.62,0-1.38.18-1.67-.78.4-1.39,1.52-2.36,2.4-3.47Q127.7,315.5,151,286.34q32.3-40.5,64.59-81,34.69-43.5,69.42-87c11.79-14.75,23.41-29.64,35.44-44.2,3.88-4.7,8.31-9,11.47-14.25.81-.27.91-1,1-1.66l1-1.7c.84-.32.86-1.05.88-1.78h0a.6.6,0,0,0,.44-.82l.7-1.35c.81-.36.83-1.09.85-1.82v0a5.88,5.88,0,0,0,2-4.67v0a3.2,3.2,0,0,0,1.1-2.8l0-.07c.78-.24.72-.7.32-1.25l.57-1.86c.82-2,2.25-3.8,1.52-6.17.07-.4.15-.81.22-1.22a14.33,14.33,0,0,0,1.05-7.32l.15-1.79a1.27,1.27,0,0,0,.73-1c.08-4.22.55-8.44-.19-12.64Z"/><path fill="currentColor" d="M818,0H745.36a11.94,11.94,0,0,0-.52,4.93V390.82c0,.66,0,1.33,0,2a12,12,0,0,0,1.79,6.58c.23.63.46,1.27.68,1.91-.07.08-.19.15-.2.22,0,.27.14.37.4.29l.71,1.41a.57.57,0,0,0,.48.77,25,25,0,0,0,8.64,8.7.57.57,0,0,0,.78.47l1.39.72c2.78,2.07,6,2.6,9.36,2.62,15,.05,30,0,45,0,4,0,4,0,4.06-4.09V5C817.9,3.32,818,1.66,818,0Z"/></svg>',
				'url'  => '',
			],
			'hotline'   => [
				'name' => __( 'Hotline', TEXT_DOMAIN ),
				'icon' => 'fa-solid fa-phone',
				'url'  => '',
			],
			'email'     => [
				'name' => __( 'Email', TEXT_DOMAIN ),
				'icon' => 'fa-solid fa-envelope',
				'url'  => '',
			],
		],

		//
		// Contact Links.
		//
		'contact_links'                       => [
			'tiktok'       => [
				'name'        => __( 'Tiktok', TEXT_DOMAIN ),
				'icon'        => 'fa-brands fa-tiktok',
				'value'       => '',
				'placeholder' => __( 'Link tiktok', TEXT_DOMAIN ),
				'target'      => '_blank',
				'class'       => 'tiktok',
			],
			'messenger'    => [
				'name'        => __( 'Messenger', TEXT_DOMAIN ),
				'icon'        => 'fa-brands fa-facebook-messenger',
				'value'       => '',
				'placeholder' => __( 'Link messenger', TEXT_DOMAIN ),
				'target'      => '_blank',
				'class'       => 'messenger',
			],
			'zalo'         => [
				'name'        => __( 'Zalo', TEXT_DOMAIN ),
				'icon'        => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1193.88 419.19"><path fill="currentColor" d="M621,388c-37.24,25.71-77.78,35.82-122,28.84-38.83-6.11-71.38-24.35-97.28-53.88a162.36,162.36,0,0,1-10-201.74c26.32-36.67,62.06-59.2,106.78-66.44,44.42-7.2,85.18,2.72,122.08,28.33,1.07-1.22.66-2.38.67-3.43,0-5.22,0-10.45,0-15.67,0-2.31.14-2.43,2.48-2.43q31,0,62,0c2.49,0,2.63.19,2.74,2.61,0,.56,0,1.11,0,1.67V411.54c0,5.29,0,4.44-4.52,4.45-11,0-22-.2-33,.06a29.42,29.42,0,0,1-28.24-19.42A31.47,31.47,0,0,1,621,388Zm-96-36.69c50.26.67,95.78-40.17,95.86-95.47.08-53.59-43-95.69-96-95.85-51.69-.15-95.09,41.81-95.87,94.3C428.18,308.62,473.17,352.15,525,351.34Z"/><path fill="currentColor" d="M1026.3,90.78c91.52-2.15,168.58,72,167.57,166-1,90.73-75.66,164.49-168.67,162.35-88-2-160.57-74-160.39-164.63C865,163,939.37,91.68,1026.3,90.78Zm3.24,260.56a96.29,96.29,0,0,0,96.35-95.44c.52-54.84-43.32-97-96-97.45a96.45,96.45,0,1,0-.36,192.89Z"/><path fill="currentColor" d="M344.32,3.46c.66-1.1-.05-2.34.37-3.46H9.36a10.58,10.58,0,0,0-.53,3.91q0,32.37,0,64.73c0,.77,0,1.55,0,2.32a1.12,1.12,0,0,0,1,1.16c1.44.06,2.88.18,4.32.18l225.66,0c.09.56.18,1.12.26,1.68l0,0a.61.61,0,0,0-.57.68l0,.05a.5.5,0,0,0-.48.69L203.76,119l-57.85,71.48q-26.19,32.39-52.37,64.77-19.8,24.48-39.62,48.95C41.13,320,28.41,335.85,15.51,351.55,5.79,363.38.38,376.76.12,392.12,0,398.67.05,405.23,0,411.78,0,416.46-.11,416,4.08,416H315.73a26.16,26.16,0,0,0,12.49-3c9.38-5,15.08-12.64,15.91-23.39.39-5.19.29-10.43.28-15.65,0-7-.17-14-.22-21,0-4.57.27-4.07-4.17-4.07H106.36c-.88,0-1.77,0-2.66,0-.62,0-1.38.18-1.67-.78.4-1.39,1.52-2.36,2.4-3.47Q127.7,315.5,151,286.34q32.3-40.5,64.59-81,34.69-43.5,69.42-87c11.79-14.75,23.41-29.64,35.44-44.2,3.88-4.7,8.31-9,11.47-14.25.81-.27.91-1,1-1.66l1-1.7c.84-.32.86-1.05.88-1.78h0a.6.6,0,0,0,.44-.82l.7-1.35c.81-.36.83-1.09.85-1.82v0a5.88,5.88,0,0,0,2-4.67v0a3.2,3.2,0,0,0,1.1-2.8l0-.07c.78-.24.72-.7.32-1.25l.57-1.86c.82-2,2.25-3.8,1.52-6.17.07-.4.15-.81.22-1.22a14.33,14.33,0,0,0,1.05-7.32l.15-1.79a1.27,1.27,0,0,0,.73-1c.08-4.22.55-8.44-.19-12.64Z"/><path fill="currentColor" d="M818,0H745.36a11.94,11.94,0,0,0-.52,4.93V390.82c0,.66,0,1.33,0,2a12,12,0,0,0,1.79,6.58c.23.63.46,1.27.68,1.91-.07.08-.19.15-.2.22,0,.27.14.37.4.29l.71,1.41a.57.57,0,0,0,.48.77,25,25,0,0,0,8.64,8.7.57.57,0,0,0,.78.47l1.39.72c2.78,2.07,6,2.6,9.36,2.62,15,.05,30,0,45,0,4,0,4,0,4.06-4.09V5C817.9,3.32,818,1.66,818,0Z"/></svg>',
				'value'       => '',
				'placeholder' => '0123 456 789',
				'target'      => '_blank',
				'class'       => 'zalo',
			],
			'hotline'      => [
				'name'        => __( 'Hotline', TEXT_DOMAIN ),
				'icon'        => 'fa-solid fa-phone',
				'value'       => '',
				'placeholder' => '0123 456 789',
				'class'       => 'hotline',
			],
			'contact_map'  => [
				'name'        => __( 'Contact map', TEXT_DOMAIN ),
				'icon'        => 'fa-solid fa-location-dot',
				'value'       => '',
				'placeholder' => __( 'Link google map', TEXT_DOMAIN ),
				'target'      => '_blank',
				'class'       => 'contact-map',
			],
			'contact_link' => [
				'name'        => __( 'Contact link', TEXT_DOMAIN ),
				'icon'        => 'fa-solid fa-address-book',
				'value'       => '#',
				'placeholder' => __( 'Contact link', TEXT_DOMAIN ),
				'target'      => '_blank',
				'class'       => 'contact-link',
			],
		],
	];

	// --------------------------------------------------

	if ( \HD\Helper::isWoocommerceActive() ) {
		$arr_new['aspect_ratio']['post_type_term'][]                      = 'product';
		$arr_new['aspect_ratio']['post_type_term'][]                      = 'product_cat';
		$arr_new['admin_list_table']['term_row_actions'][]                = 'product_cat';
		$arr_new['admin_list_table']['post_type_exclude_thumb_columns'][] = 'product';
		$arr_new['post_type_terms']['product']                            = 'product_cat';
	}

	if ( \HD\Helper::isCf7Active() ) {
		$arr_new['admin_list_table']['post_type_exclude_thumb_columns'][] = 'wpcf7_contact_form';
	}

	// --------------------------------------------------

	// Merge the new array with the old array, prioritize the value of $arr
	$arr_new = array_merge( $arr, $arr_new );

	// Add to static cache
	$setting_filter_cache['hd_theme_setting'] = $arr_new;

	return $arr_new;
}
