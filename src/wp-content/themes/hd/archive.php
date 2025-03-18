<?php
/**
 * The template for displaying archive.
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'archive' );

// breadcrumbs
\HD\Helper::blockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_archive_title()
	]
);

/**
 * HOOK: hd_archive_before_action
 */
do_action( 'hd_archive_before_action' );

?>
<section class="section section-page archive">
	<div class="container">

	</div>
</section>
<?php

/**
 * HOOK: hd_archive_after_action
 */
do_action( 'hd_archive_after_action' );

// footer
get_footer( 'archive' );
