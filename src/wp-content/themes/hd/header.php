<?php

/**
 * The template for displaying the header
 * This is the template that displays all the <head> section, opens the <body> tag and adds the site's header.
 *
 * @package HD
 */

\defined( 'ABSPATH' ) || die;

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <?php

    /**
     * @see __wp_head - 1
     * @see __module_preload - 10
     * @see __critical_css - 11
     * @see __external_fonts - 12
     */
    wp_head();
    ?>
</head>
<body <?php body_class(); ?> <?php echo \Cores\Helper::microdata( 'body' ); ?>>
    <?php

    /**
     * @see Custom_Script::body_scripts_top__hook - 99
     */
    do_action( 'wp_body_open' );

    /**
     * @see __skip_to_content_link - 2
     */
    do_action( 'before_header_action' );
    ?>
    <header id="header" class="site-header" <?php echo \Cores\Helper::microdata( 'header' ); ?>>
		<?php

		/**
		 * @see __construct_header - 10
		 */
		do_action( 'header_action' );
		?>
    </header><!-- #header -->
    <?php

    do_action( 'after_header_action' );
    ?>
    <div class="main site-content" id="site-content">
        <?php

        do_action( 'before_site_content_action' );
