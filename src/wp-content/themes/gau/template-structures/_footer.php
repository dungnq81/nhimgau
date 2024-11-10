<?php
/**
 * Footer hooks
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// -----------------------------------------------
// wp_footer
// -----------------------------------------------

if ( ! function_exists( '__wp_footer' ) ) {
	add_action( 'wp_footer', '__wp_footer', 98 );

	function __wp_footer(): void {
		if ( apply_filters( 'back_to_top_filter', true ) ) {

			echo apply_filters(
				'back_to_top_output_filter',
				sprintf(
					'<a title="%1$s" aria-label="%1$s" rel="nofollow" href="#" class="back-to-top toTop" data-scroll-speed="%2$s" data-start-scroll="%3$s">%4$s</a>',
					esc_attr__( 'Scroll back to top', TEXT_DOMAIN ),
					absint( apply_filters( 'back_to_top_scroll_speed_filter', 400 ) ),
					absint( apply_filters( 'back_to_top_scroll_start_filter', 300 ) ),
					'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0z" fill="currentColor"></path></g></svg>'
				)
			);
		}
	}
}

// -----------------------------------------------
// footer_action
// -----------------------------------------------

if ( ! function_exists( '__construct_footer' ) ) {
	add_action( 'footer_action', '__construct_footer', 10 );

	function __construct_footer(): void {

		/**
		 * @see _footer_container_open - 10
		 * @see _footer_widgets - 11
		 * @see _footer_credit - 12
		 * @see _footer_custom - 98
		 * @see _footer_container_close - 99
		 */
		do_action( 'construct_footer' );
	}
}

// -----------------------------------------------

if ( ! function_exists( '_footer_container_open' ) ) {
	add_action( 'construct_footer', '_footer_container_open', 10 );

	function _footer_container_open(): void {
		echo apply_filters( 'footer_container_open_filter', '' );
	}
}

// -----------------------------------------------

if ( ! function_exists( '_footer_container_close' ) ) {
	add_action( 'construct_footer', '_footer_container_close', 99 );

	function _footer_container_close(): void {
		echo apply_filters( 'footer_container_close_filter', '' );
	}
}

// -----------------------------------------------

if ( ! function_exists( '_footer_widgets' ) ) {
	add_action( 'construct_footer', '_footer_widgets', 10 );

	function _footer_widgets(): void {

	}
}

// -----------------------------------------------

if ( ! function_exists( '_footer_credit' ) ) {
	add_action( 'construct_footer', '_footer_credit', 11 );

	function _footer_credit(): void {

	}
}

// -----------------------------------------------

if ( ! function_exists( '_footer_custom' ) ) {
	add_action( 'construct_footer', '_footer_custom', 98 );

	function _footer_custom(): void {
		echo __return_empty_string();
	}
}

// -----------------------------------------------
