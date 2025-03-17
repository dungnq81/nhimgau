<?php
/**
 * The Template for displaying all single posts.
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'single' );

if ( have_posts() ) {
	the_post();
}

if ( post_password_required() ) {
	echo get_the_password_form();
	get_footer( 'single' );

	return;
}

// breadcrumbs
\HD\Helper::BlockTemplate( 'template-blocks/breadcrumbs', [
		'title' => \HD\Helper::primaryTerm( $post )?->name
	]
);

?>
<section class="section section-page section-single singular">
    <div class="container">

    </div>
</section>
<?php

// footer
get_footer( 'single' );