<?php
/**
 * The Template for displaying all pages.
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'page' );

if ( have_posts() ) {
	the_post();
}

if ( post_password_required() ) {
	echo get_the_password_form();
	get_footer( 'page' );

	return;
}

// breadcrumbs
\HD\Helper::blockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_title( $post->ID )
	]
);

/**
 * HOOK: hd_page_before_action
 */
do_action( 'hd_page_before_action' );

?>
<section class="section section-page singular">
	<div class="container">

	</div>
</section>
<?php

/**
 * HOOK: hd_single_after_action
 */
do_action( 'hd_single_after_action' );

// footer
get_footer( 'page' );
