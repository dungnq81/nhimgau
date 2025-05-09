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

add_action( 'wp_footer', 'wp_footer_action', 98 );

function wp_footer_action(): void {
	if ( apply_filters( 'back_to_top_filter', true ) ) {
		echo apply_filters(
			'back_to_top_output_filter',
			sprintf(
				'<a title="%1$s" aria-label="%1$s" rel="nofollow" href="#" class="back-to-top toTop" data-scroll-speed="%2$s" data-scroll-start="%3$s">%4$s</a>',
				esc_attr__( 'Scroll back to top', TEXT_DOMAIN ),
				absint( apply_filters( 'back_to_top_scroll_speed_filter', 400 ) ),
				absint( apply_filters( 'back_to_top_scroll_start_filter', 300 ) ),
				'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M8.47 4.22a.75.75 0 0 0 0 1.06L15.19 12l-6.72 6.72a.75.75 0 1 0 1.06 1.06l7.25-7.25a.75.75 0 0 0 0-1.06L9.53 4.22a.75.75 0 0 0-1.06 0z" fill="currentColor"></path></g></svg>'
			)
		);
	}
}

// -----------------------------------------------
// hd_footer_after_action
// -----------------------------------------------

// -----------------------------------------------
// hd_footer_action
// -----------------------------------------------

add_action( 'hd_footer_action', 'construct_footer_action', 10 );

function construct_footer_action(): void {

	/**
	 * @see _construct_footer_columns - 11
	 * @see _construct_footer_credit - 12
	 * @see _construct_footer_custom - 98
	 */
	do_action( 'construct_footer' );
}

// -----------------------------------------------

//add_action( 'construct_footer', '_construct_footer_columns', 11 );

function _construct_footer_columns(): void {
	?>
    <div id="footer-columns" class="footer-columns">
        <div class="container"></div>
    </div>
	<?php
}

// -----------------------------------------------

//add_action( 'construct_footer', '_construct_footer_credit', 12 );

function _construct_footer_credit(): void {
	?>
    <div id="footer-credit" class="footer-credit">
        <div class="container">
		<?php
		$footer_credit = \HD_Helper::getThemeMod( 'footer_credit_setting' );
		$footer_credit = ! empty( $footer_credit ) ? esc_html( $footer_credit ) : '&copy; ' . date( 'Y' ) . ' ' . get_bloginfo( 'name' ) . '. ' . esc_html__( 'All rights reserved.', TEXT_DOMAIN );

		echo '<p class="copyright">' . apply_filters( 'footer_credit_filter', $footer_credit ) . '</p>';
		?>
        </div>
    </div>
	<?php
}

// -----------------------------------------------

add_action( 'construct_footer', '_construct_footer_custom', 98 );

function _construct_footer_custom(): void {
	//...
}

// -----------------------------------------------
// hd_footer_before_action
// -----------------------------------------------

// -----------------------------------------------
// hd_site_content_after_action
// -----------------------------------------------
