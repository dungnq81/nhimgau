<?php

/**
 * The template for displaying the header.
 * This is the template that displays all the <head> section, opens the <body> tag and adds the site's header.
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <?php

    /**
     * @see wp_head_action - 1
     * @see other_head_action - 10
     * @see module_preload_action - 11
     * @see critical_css_action - 12
     * @see external_fonts_action - 99
     */
    wp_head();

    ?>
</head>
<body <?php body_class(); ?> <?php echo \HD\Helper::microdata( 'body' ); ?>>
    <?php

    /**
     * //@see Custom_Script::body_scripts_top_action - 99
     */
    do_action( 'wp_body_open' );

    /**
     * @see skip_to_content_link_action - 2
     */
    do_action( 'hd_before_header_action' );

    ?>
    <header id="header" class="site-header" <?php echo \HD\Helper::microdata( 'header' ); ?>>
		<?php

		/**
		 * @see construct_header_action - 10
		 */
		do_action( 'hd_header_action' );

		?>
    </header><!-- #header -->
    <?php

    do_action( 'hd_after_header_action' );

    ?>
    <div class="main site-content" id="site-content">
        <?php

        do_action( 'hd_before_site_content_action' );
