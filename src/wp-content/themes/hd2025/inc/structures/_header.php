<?php

/**
 * Header hooks
 *
 * @author Gaudev
 */

use HD\Helper;

\defined( 'ABSPATH' ) || die;

// -----------------------------------------------
// wp_head
// -----------------------------------------------

if ( ! function_exists( 'wp_head_action' ) ) {
	add_action( 'wp_head', 'wp_head_action', 1 );

	function wp_head_action(): void {
        //$meta_viewport = '<meta name="viewport" content="user-scalable=yes, width=device-width, initial-scale=1.0, maximum-scale=2.0, minimum-scale=1.0" />';
		$meta_viewport = '<meta name="viewport" content="width=device-width, initial-scale=1.0" />';
		echo apply_filters( 'meta_viewport_filter', $meta_viewport );

		if ( is_singular() && pings_open() ) {
			printf( '<link rel="pingback" href="%s" />', esc_url( get_bloginfo( 'pingback_url' ) ) );
		}
	}
}

// -----------------------------------------------

if ( ! function_exists( 'other_head_action' ) ) {
	add_action( 'wp_head', 'other_head_action', 10 );

	function other_head_action(): void {
        //...
	}
}

// -----------------------------------------------

if ( ! function_exists( 'module_preload_action' ) ) {
	add_action( 'wp_head', 'module_preload_action', 11 );

	function module_preload_action(): void {
		?>
        <link rel="modulepreload" crossorigin href="<?php echo ASSETS_URL . 'js/_vendor.js'; ?>">
        <link rel="modulepreload" crossorigin href="<?php echo ASSETS_URL . 'js/lazy-loader.js'; ?>">
		<?php
	}
}

// -----------------------------------------------

if ( ! function_exists( 'critical_css_action' ) ) {
	add_action( 'wp_head', 'critical_css_action', 12 );

	function critical_css_action(): void {
		if ( is_front_page() || is_home() ) {

			$critical_css = get_transient( 'index_critical_css' );
			if ( false === $critical_css ) {
				$critical_css_file = THEME_PATH . 'assets/css/critical/index_critical.min.css';

				if ( is_file( $critical_css_file ) ) {
					$critical_css = file_get_contents( $critical_css_file );
					set_transient( 'index_critical_css', $critical_css, 2 * HOUR_IN_SECONDS );
				}
			}

			if ( $critical_css ) {
				echo '<style>' . $critical_css . '</style>';
			}
		}
	}
}

// -----------------------------------------------

if ( ! function_exists( 'external_fonts_action' ) ) {
	add_action( 'wp_head', 'external_fonts_action', 99 );

	function external_fonts_action(): void {
        //...
	}
}

// -----------------------------------------------
// hd_before_header_action
// -----------------------------------------------

if ( ! function_exists( 'skip_to_content_link_action' ) ) {
	add_action( 'hd_before_header_action', 'skip_to_content_link_action', 2 );

	function skip_to_content_link_action(): void {
		printf(
			'<a class="screen-reader-text skip-link" href="#site-content" title="%1$s">%2$s</a>',
			esc_attr__( 'Skip to content', TEXT_DOMAIN ),
			esc_html__( 'Skip to content', TEXT_DOMAIN )
		);
	}
}

// -----------------------------------------------
// hd_header_action
// -----------------------------------------------

if ( ! function_exists( 'construct_header_action' ) ) {
	add_action( 'hd_header_action', 'construct_header_action', 10 );

	function construct_header_action(): void {

		/**
		 * @see _masthead_home_seo_header - 10
		 * @see _masthead_top_header - 12
		 * @see _masthead_header - 13
		 * @see _masthead_bottom_header - 14
		 * @see _masthead_custom - 98
		 */
		do_action( 'masthead' );
	}
}

// -----------------------------------------------

if ( ! function_exists( '_masthead_home_seo_header' ) ) {
	add_action( 'masthead', '_masthead_home_seo_header', 10 );

	function _masthead_home_seo_header(): void {
		$home_heading = Helper::getThemeMod( 'home_heading_setting' );
		$home_heading = ! empty( $home_heading ) ? esc_html( $home_heading ) : get_bloginfo( 'name' );

		echo apply_filters( 'home_seo_header_filter', '<h1 class="sr-only">' . $home_heading . '</h1>' );
	}
}

// -----------------------------------------------

if ( ! function_exists( '_masthead_top_header' ) ) {
	add_action( 'masthead', '_masthead_top_header', 12 );

    function _masthead_top_header(): void {
        //...
    }
}

// -----------------------------------------------

if ( ! function_exists( '_masthead_header' ) ) {
	add_action( 'masthead', '_masthead_header', 13 );

    function _masthead_header(): void {
        //...
    }
}

// -----------------------------------------------

if ( ! function_exists( '_masthead_bottom_header' ) ) {
    add_action( 'masthead', '_masthead_bottom_header', 14 );

    function _masthead_bottom_header(): void {
        //...
    }
}

// -----------------------------------------------

if ( ! function_exists( '_masthead_custom' ) ) {
    add_action( 'masthead', '_masthead_custom', 98 );

    function _masthead_custom(): void {
        //...
    }
}

// -----------------------------------------------
// hd_after_header_action
// -----------------------------------------------

// -----------------------------------------------
// hd_before_site_content_action
// -----------------------------------------------
