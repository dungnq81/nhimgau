<?php
/**
 * Themes functions
 *
 * @author Gaudev
 */

use Cores\Helper;

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Menu location
// --------------------------------------------------

add_action( 'after_setup_theme', '__after_setup_theme_action', 11 );

function __after_setup_theme_action(): void {
	register_nav_menus(
		[
			'main-nav'   => __( 'Primary Menu', TEXT_DOMAIN ),
			//'second-nav' => __( 'Secondary Menu', TEXT_DOMAIN ),
			'mobile-nav' => __( 'Handheld Menu', TEXT_DOMAIN ),
			//'social-nav' => __( 'Social menu', TEXT_DOMAIN ),
			//'policy-nav' => __( 'Term menu', TEXT_DOMAIN ),
		]
	);
}

// --------------------------------------------------
// Widget sidebar
// --------------------------------------------------

add_action( 'widgets_init', '__register_sidebars_action', 11 );

function __register_sidebars_action(): void {

	//----------------------------------------------------------
	// Homepage
	//----------------------------------------------------------

	$home_sidebar = register_sidebar(
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
	// Header
	//----------------------------------------------------------

	$top_header_cols    = (int) Helper::getThemeMod( 'top_header_setting' );
	$header_cols        = (int) Helper::getThemeMod( 'header_setting' );
	$bottom_header_cols = (int) Helper::getThemeMod( 'bottom_header_setting' );

	if ( $top_header_cols > 0 ) {
		for ( $i = 1; $i <= $top_header_cols; $i ++ ) {
			$_name              = sprintf( __( 'Top-Header %d', TEXT_DOMAIN ), $i );
			$top_header_sidebar = register_sidebar(
				[
					'container'     => false,
					'id'            => 'top-header-' . $i . '-sidebar',
					'name'          => $_name,
					'description'   => __( 'Widgets added here will appear in top header.', TEXT_DOMAIN ),
					'before_widget' => '<div class="header-widgets %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<span>',
					'after_title'   => '</span>',
				]
			);
		}
	}

	if ( $header_cols > 0 ) {
		for ( $i = 1; $i <= $header_cols; $i ++ ) {
			$_name          = sprintf( __( 'Header %d', TEXT_DOMAIN ), $i );
			$header_sidebar = register_sidebar(
				[
					'container'     => false,
					'id'            => 'header-' . $i . '-sidebar',
					'name'          => $_name,
					'description'   => __( 'Widgets added here will appear in header.', TEXT_DOMAIN ),
					'before_widget' => '<div class="header-widgets %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<span>',
					'after_title'   => '</span>',
				]
			);
		}
	}

	if ( $bottom_header_cols > 0 ) {
		for ( $i = 1; $i <= $bottom_header_cols; $i ++ ) {
			$_name                 = sprintf( __( 'Bottom-Header %d', TEXT_DOMAIN ), $i );
			$bottom_header_sidebar = register_sidebar(
				[
					'container'     => false,
					'id'            => 'bottom-header-' . $i . '-sidebar',
					'name'          => $_name,
					'description'   => __( 'Widgets added here will appear in bottom header.', TEXT_DOMAIN ),
					'before_widget' => '<div class="header-widgets %2$s">',
					'after_widget'  => '</div>',
					'before_title'  => '<span>',
					'after_title'   => '</span>',
				]
			);
		}
	}

	//----------------------------------------------------------
	// Footer
	//----------------------------------------------------------

	$footer_args = [];

	$rows    = (int) Helper::getThemeMod( 'footer_row_setting' );
	$regions = (int) Helper::getThemeMod( 'footer_col_setting' );

	for ( $row = 1; $row <= $rows; $row ++ ) {
		for ( $region = 1; $region <= $regions; $region ++ ) {

			$footer_n = $region + $regions * ( $row - 1 ); // Defines footer sidebar ID.
			$footer   = sprintf( 'footer_%d', $footer_n );

			if ( 1 === $rows ) {
				$footer_region_name        = sprintf( __( 'Footer-Column %1$d', TEXT_DOMAIN ), $region );
				$footer_region_description = sprintf( __( 'Widgets added here will appear in column %1$d of the footer.', TEXT_DOMAIN ), $region );
			} else {
				$footer_region_name        = sprintf( __( 'Footer-Row %1$d - Column %2$d', TEXT_DOMAIN ), $row, $region );
				$footer_region_description = sprintf( __( 'Widgets added here will appear in column %1$d of footer row %2$d.', TEXT_DOMAIN ), $region, $row );
			}

			$footer_args[ $footer ] = [
				'name'        => $footer_region_name,
				'id'          => sprintf( 'footer-%d-sidebar', $footer_n ),
				'description' => $footer_region_description,
			];
		}
	}

	foreach ( $footer_args as $args ) {
		$footer_tags = [
			'container'     => false,
			'before_widget' => '<div class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<p class="widget-title">',
			'after_title'   => '</p>',
		];

		$footer_sidebar = register_sidebar( $args + $footer_tags );
	}

	//----------------------------------------------------------
	// Other ...
	//----------------------------------------------------------

	// Footer Credit
	$footer_credit_sidebar = register_sidebar(
		[
			'container'     => false,
			'id'            => 'footer-credit-sidebar',
			'name'          => __( 'Footer Credit', TEXT_DOMAIN ),
			'description'   => __( 'Widgets added here will appear in footer.', TEXT_DOMAIN ),
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

add_action( 'wp_default_scripts', '__wp_default_scripts' );

function __wp_default_scripts( $scripts ): void {
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

add_filter( 'body_class', '__body_classes_filter', 11, 1 );

function __body_classes_filter( array $classes ): array {

	// Check whether we're in the customizer preview.
	if ( is_customize_preview() ) {
		$classes[] = 'customizer-preview';
	}

	foreach ( $classes as $class ) {
		if ( str_contains( $class, 'wp-custom-logo' ) ||
		     str_contains( $class, 'page-template-templates' ) ||
		     str_contains( $class, 'page-template-default' ) ||
		     str_contains( $class, 'no-customize-support' ) ||
		     str_contains( $class, 'page-id-' )
		) {
			$classes = array_diff( $classes, [ $class ] );
		}
	}

	if ( Helper::isHomeOrFrontPage() && Helper::isWoocommerceActive() ) {
		$classes[] = 'woocommerce';
	}

	// ...
	$classes[] = 'default-mode';

	return $classes;
}

// --------------------------------------------------
// Hook post_class
// --------------------------------------------------

add_filter( 'post_class', '__post_classes_filter', 11, 1 );

function __post_classes_filter( array $classes ): array {

	// remove_sticky_class
	if ( in_array( 'sticky', $classes, false ) ) {
		$classes   = array_diff( $classes, [ "sticky" ] );
		$classes[] = 'wp-sticky';
	}

	// remove 'tag-', 'category-' classes
	foreach ( $classes as $class ) {
		if ( str_contains( $class, 'tag-' ) ||
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

add_filter( 'nav_menu_css_class', '__nav_menu_css_classes_filter', 999, 4 );

function __nav_menu_css_classes_filter( $classes, $menu_item, $args, $depth ): array {
	if ( ! is_array( $classes ) ) {
		$classes = [];
	}

	// Remove 'menu-item-type-', 'menu-item-object-' classes
	foreach ( $classes as $class ) {
		if ( str_contains( $class, 'menu-item-type-' ) ||
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

add_filter( 'nav_menu_link_attributes', '__nav_menu_link_attributes_filter', 999, 4 );

function __nav_menu_link_attributes_filter( $atts, $menu_item, $args, $depth ): array {
	// link_class
	// link_depth_class

	if ( $depth === 0 ) {
		if ( property_exists( $args, 'link_class' ) ) {
			$atts['class'] = esc_attr( $args->link_class );
		}
	} else if ( property_exists( $args, 'link_depth_class' ) ) {
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
// Filter wp_insert_post_data
// --------------------------------------------------

add_filter( 'wp_insert_post_data', '__wp_insert_post_data_filter', 99 );

function __wp_insert_post_data_filter( $data ): mixed {
	if ( $data['post_status'] === 'auto-draft' ) {
		// $data['comment_status'] = 0;
		$data['ping_status'] = 0;
	}

	return $data;
}

// --------------------------------------------------
// Filter widget_tag_cloud_args
// --------------------------------------------------

add_filter( 'widget_tag_cloud_args', '__widget_tag_cloud_args_filter', 99 );

function __widget_tag_cloud_args_filter( $args ): array {
	$args['smallest'] = '10';
	$args['largest']  = '19';
	$args['unit']     = 'px';
	$args['number']   = 12;

	return $args;
}

// --------------------------------------------------
// query_vars
// --------------------------------------------------

add_filter( 'query_vars', '__query_vars', 99 );

function __query_vars( $vars ): array {
	$vars[] = 'page';
	$vars[] = 'paged';

	return $vars;
}

// --------------------------------------------------
// custom filter
// --------------------------------------------------

add_filter( 'addon_menu_options_page_filter', '__menu_options_page', 99 );

function __menu_options_page(): array {
	return [
		'aspect_ratio'      => __( 'Aspect Ratio', TEXT_DOMAIN ),
		'smtp'              => __( 'SMTP', TEXT_DOMAIN ),
		//'contact_info'   => __( 'Contact Info', TEXT_DOMAIN ),
		'contact_button' => __( 'Contact Button', TEXT_DOMAIN ),
		'editor'            => __( 'Editor', TEXT_DOMAIN ),
		'optimizer'         => __( 'Optimizer', TEXT_DOMAIN ),
		'security'          => __( 'Security', TEXT_DOMAIN ),
		'login_security'    => __( 'Login Security', TEXT_DOMAIN ),
		'social'            => __( 'Social', TEXT_DOMAIN ),
		'base_slug'         => __( 'Remove Base Slug', TEXT_DOMAIN ),
		//'custom_email_from' => __( 'Custom Email From', TEXT_DOMAIN ),
		'custom_email'      => __( 'Custom Email To', TEXT_DOMAIN ),
		'custom_sorting'    => __( 'Custom Sorting', TEXT_DOMAIN ),
		'recaptcha'      => __( 'reCAPTCHA', TEXT_DOMAIN ),
		'woocommerce'       => __( 'WooCommerce', TEXT_DOMAIN ),
		'custom_script'     => __( 'Custom Script', TEXT_DOMAIN ),
		'custom_css'        => __( 'Custom CSS', TEXT_DOMAIN ),
	];
}

// --------------------------------------------------

add_filter( 'addon_theme_setting_options_filter', '__theme_setting_options', 99 );

/**
 * @param array $arr
 *
 * @return array
 */
function __theme_setting_options( array $arr ): array {
	$arr_new = [

		// hide admin menu
		'admin_hide_menu'                   => [
			//'edit.php',
		],

		// defer, delay script - default 5s.
		'defer_script'                      => [

			// defer.
			'contact-form-7'       => 'defer',

			// delay.
			'comment-reply'        => 'delay',
			'wp-embed'             => 'delay',
			'back-to-top'          => 'delay',
			'social-share'         => 'delay',
		],

		// defer style.
		'defer_style'                       => [
			'dashicons',
			'contact-form-7',
		],

		// Aspect Ratio - custom post-type and term.
		'aspect_ratio_post_type_term'       => [
			'post',

			//...
		],

		// Aspect Ratio default.
		'aspect_ratio_default'              => [
			'1-1',
			'2-1',
			'3-2',
			'4-3',
			'16-9',
			'21-9',
		],

		// Add ID to admin category page.
		'term_row_actions'                  => [
			'category',
			'post_tag',

			//...
		],

		// Add ID to admin post-page.
		'post_row_actions'                  => [
			'user',
			'post',
			'page',
		],

		// Terms thumbnail (term_thumb).
		'term_thumb_columns'                => [
			'category',
			'post_tag',

			//...
		],

		// Exclude thumb post_type columns.
		'post_type_exclude_thumb_columns'   => [],

		// ACF attributes in menu locations.
		'acf_menu_items_locations'          => [
			'main-nav',
		],

		// ACF attributes 'mega menu' locations.
		'acf_mega_menu_locations'           => [],

		// Custom post_per_page.
		'posts_num_per_page'                => [],

		// Custom post-type & taxonomy.
		'post_type_terms'                   => [

			//...
		],

		// smtp_plugins_support.
		'smtp_plugins_support'              => [
			'wp_mail_smtp'     => 'wp-mail-smtp/wp_mail_smtp.php',
			'wp_mail_smtp_pro' => 'wp-mail-smtp-pro/wp_mail_smtp.php',
			'smtp_mailer'      => 'smtp-mailer/main.php',
			'gmail_smtp'       => 'gmail-smtp/main.php',
			'fluent-smtp'      => 'fluent-smtp/fluent-smtp.php',
		],

		//
		'language_plugins_support'          => [
			'polylang'     => 'polylang/polylang.php',
			'polylang_pro' => 'polylang-pro/polylang.php',
			'wpglobus'     => 'wpglobus/wpglobus.php',
		],

		// Custom Email list (to).
		'custom_emails'                     => [],

		// lazy_load_exclude.
		'lazy_load_exclude_css_class'       => [
			'no-lazy',
			'skip-lazy',
		],

		// The urls where a lazy load is excluded.
		'lazy_load_exclude_urls'            => [
			'no-lazy',
			'skip-lazy',
		],

		// List of admin IDs allowed to install plugins.
		'allowed_users_ids_install_plugins' => [ 1 ],

		// Login security
		'login_security'                    => [

			// Custom admin-login URI.
			'custom_login_uri'            => '',

			// Allows customization of the Login URL in the admin options.
			'enable_custom_login_options' => false,

			// Allowlist IPs Login Access
			'allowlist_ips_login_access'  => [],

			// Blocked IPs Access
			'blocked_ips_login_access'    => [],
		],

		// Links social.
		'social_follows_links'              => [
//			'facebook'  => [
//				'name'  => 'Facebook',
//				'icon'  => 'fa-brands fa-facebook',
//				'color' => '#0866FF',
//				'url'   => '',
//			],
//			'instagram' => [
//				'name'  => 'Instagram',
//				'icon'  => 'fa-brands fa-instagram',
//				'color' => 'rgb(224, 241, 255)',
//				'url'   => '',
//			],
//			'youtube'   => [
//				'name'  => 'Youtube',
//				'icon'  => 'fa-brands fa-youtube',
//				'color' => 'rgb(255, 0, 0)',
//				'url'   => '',
//			],
//			'twitter'   => [
//				'name'  => 'X (Twitter)',
//				'icon'  => 'fa-brands fa-x-twitter',
//				'color' => 'rgb(239, 243, 244)',
//				'url'   => '',
//			],
//			'tiktok'    => [
//				'name'  => 'Tiktok',
//				'icon'  => 'fa-brands fa-tiktok',
//				'color' => 'rgba(255, 255, 255, 0.9)',
//				'url'   => '',
//			],
//			'telegram'  => [
//				'name'  => 'Telegram',
//				'icon'  => 'fa-brands fa-telegram',
//				'color' => '#2BA0E5',
//				'url'   => '',
//			],
			'linkedin' => [
				'name'  => 'Linkedin',
				'icon'  => '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_73_5845)"><mask id="mask0_73_5845" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="32" height="32"><path d="M32 0H0V32H32V0Z" fill="white"></path></mask><g mask="url(#mask0_73_5845)"><g opacity="0.5"><path d="M30.6 0H1.4C0.6 0 0 0.6 0 1.4V30.8C0 31.4 0.6 32 1.4 32H30.8C31.6 32 32.2 31.4 32.2 30.6V1.4C32 0.6 31.4 0 30.6 0ZM9.4 27.2H4.8V12H9.6V27.2H9.4ZM7.2 10C5.6 10 4.4 8.6 4.4 7.2C4.4 5.6 5.6 4.4 7.2 4.4C8.8 4.4 10 5.6 10 7.2C9.8 8.6 8.6 10 7.2 10ZM27.2 27.2H22.4V19.8C22.4 18 22.4 15.8 20 15.8C17.6 15.8 17.2 17.8 17.2 19.8V27.4H12.4V12H17V14C17.6 12.8 19.2 11.6 21.4 11.6C26.2 11.6 27 14.8 27 18.8V27.2H27.2Z" fill="url(#paint0_linear_73_5845)"></path></g></g></g><defs><linearGradient id="paint0_linear_73_5845" x1="0" y1="16" x2="32.2" y2="16" gradientUnits="userSpaceOnUse"><stop stop-color="#DD1940"></stop><stop offset="1" stop-color="#92035F"></stop></linearGradient><clipPath id="clip0_73_5845"><rect width="32" height="32" fill="white"></rect></clipPath></defs></svg>',
				'color' => '#0a66c2',
				'url'   => '',
			],
//			'zalo'      => [
//				'name'  => 'Zalo',
//				'icon'  => THEME_URL . 'storage/img/zlogo.png',
//				'color' => '#0068FF',
//				'url'   => 'https://chat.zalo.me/?phone=xxx',
//			],
//			'skype'     => [
//				'name'  => 'Skype',
//				'icon'  => 'fa-brands fa-skype',
//				'color' => '#0092E0',
//				'url'   => '',
//			],
			'hotline'  => [
				'name'  => 'Hotline',
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.11l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" fill="currentColor"></path></svg>',
				'color' => '',
				'url'   => '',
			],
			'email'    => [
				'name'  => 'Email',
				'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7c22.4 17.4 52.1 39.5 154.1 113.6c21.1 15.4 56.7 47.8 92.2 47.6c35.7.3 72-32.8 92.3-47.6c102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4c132.7-96.3 142.8-104.7 173.4-128.7c5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9c30.6 23.9 40.7 32.4 173.4 128.7c16.8 12.2 50.2 41.8 73.4 41.4z" fill="currentColor"></path></svg>',
				'color' => '',
				'url'   => '',
			],
		],

		//----------------------------------------------------------
		// Custom ...
		//----------------------------------------------------------
	];

	// --------------------------------------------------

	if ( Helper::isWoocommerceActive() ) {
		$arr_new['aspect_ratio_post_type_term'][]     = 'product';
		$arr_new['aspect_ratio_post_type_term'][]     = 'product_cat';
		$arr_new['term_row_actions'][]                = 'product_cat';
		$arr_new['post_type_exclude_thumb_columns'][] = 'product';
		$arr_new['post_type_terms'][]                 = [ 'product' => 'product_cat' ];
	}

	if ( Helper::isCf7Active() ) {
		$arr_new['post_type_exclude_thumb_columns'][] = 'wpcf7_contact_form';
	}

	return array_merge( $arr, $arr_new );
}

//----------------------------------------------------------
// Remove the default admin 'vi' translation ...
//----------------------------------------------------------

add_filter( 'auto_update_translation', '__disable_translate_autoupdate', 10, 2 );

function __disable_translate_autoupdate( $update, $translation_update ): mixed {
	if ( isset( $translation_update['language'] ) && $translation_update['language'] === 'vi' ) {
		return false;
	}

	return $update;
}

// --------------------------------------------------

add_filter( 'pre_set_site_transient_update_plugins', '__disable_translate_update_noti' );
add_filter( 'pre_set_site_transient_update_themes', '__disable_translate_update_noti' );

function __disable_translate_update_noti( $transient ): mixed {
	if ( isset( $transient->translations ) ) {
		foreach ( $transient->translations as $key => $translation ) {
			if ( $translation['language'] === 'vi' ) {
				unset( $transient->translations[ $key ] );
			}
		}
	}

	return $transient;
}

// --------------------------------------------------

add_action( 'admin_init', '__remove_translates' );

function __remove_translates(): void {
	$languages_path = WP_CONTENT_DIR . DIRECTORY_SEPARATOR . 'languages' . DIRECTORY_SEPARATOR;
	$exclude        = [
		$languages_path . 'vi.po',
		$languages_path . 'vi.mo',
		$languages_path . 'vi.l10n.php',

		$languages_path . 'admin-vi.po',
		$languages_path . 'admin-vi.mo',
		$languages_path . 'admin-vi.l10n.php',

		$languages_path . 'admin-network-vi.po',
		$languages_path . 'admin-network-vi.mo',
		$languages_path . 'admin-network-vi.l10n.php',

		$languages_path . 'continents-cities-vi.po',
		$languages_path . 'continents-cities-vi.mo',
		$languages_path . 'continents-cities-vi.l10n.php',
	];

	$directory = new RecursiveDirectoryIterator( $languages_path );
	foreach ( new RecursiveIteratorIterator( $directory ) as $file ) {
		if ( ! in_array( $file->getPathname(), $exclude, true ) ) {
			if ( preg_match( '/-vi\.mo$/', $file->getFilename() ) ) {
				@unlink( $file->getPathname() );
			}
			if ( preg_match( '/-vi\.po$/', $file->getFilename() ) ) {
				@unlink( $file->getPathname() );
			}
			if ( preg_match( '/-vi\.l10n\.php$/', $file->getFilename() ) ) {
				@unlink( $file->getPathname() );
			}
		}
	}
}
