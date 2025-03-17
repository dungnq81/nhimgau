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
\HD\Helper::BlockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_archive_title()
	]
);

?>
<section class="section section-page archive">
	<div class="container">

	</div>
</section>
<?php

// footer
get_footer( 'archive' );
