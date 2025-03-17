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
\HD\Helper::BlockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_title( $post->ID )
	]
);

?>
<section class="section section-page singular">
	<div class="container">

	</div>
</section>
<?php

// footer
get_footer( 'page' );
