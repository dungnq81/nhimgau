<?php
/**
 * The home page template file.
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'home' );

$object = get_queried_object();

// breadcrumbs
\HD\Helper::BlockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_title( $object->ID )
	]
);

/**
 * HOOK: hd_home_before_action
 */
do_action( 'hd_home_before_action' );

?>
<section class="section section-page section-home archive">
	<div class="container">

	</div>
</section>
<?php

/**
 * HOOK: hd_home_after_action
 */
do_action( 'hd_home_after_action' );

// footer
get_footer( 'home' );
