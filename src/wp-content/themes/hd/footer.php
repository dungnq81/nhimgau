<?php

/**
 * The template for displaying the footer.
 * Contains the body & HTML closing tags.
 *
 * @package HD
 */

\defined('ABSPATH') || die;

    do_action('after_site_content_action');
    ?>
    </div><!-- #site-content -->
    <?php

    do_action('before_footer_action');
    ?>
    <footer id="footer" class="site-footer" <?php echo \Cores\Helper::microdata('footer'); ?>>
        <?php

        /**
         * @see __construct_footer - 10
         */
        do_action('footer_action');
        ?>
    </footer><!-- #footer -->
    <?php

    do_action('after_footer_action');

    /**
     * @see __wp_footer - 98
     */
    wp_footer();
    ?>
</body>

</html>