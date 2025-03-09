<?php

/**
 * The template for displaying the footer.
 * Contains the body & HTML closing tags.
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

do_action( 'hd_after_site_content_action' );

?>
</div><!-- #site-content -->
<?php

do_action( 'hd_before_footer_action' );

?>
<footer id="footer" class="site-footer" <?php echo \HD\Helper::microdata( 'footer' ); ?>>
	<?php

	/**
	 * @see construct_footer_action - 10
	 */
	do_action( 'hd_footer_action' );

	?>
</footer><!-- #footer -->
<?php

do_action( 'hd_after_footer_action' );

/**
 * @see wp_footer_action - 98
 */
wp_footer();

?>
</body>
</html>
