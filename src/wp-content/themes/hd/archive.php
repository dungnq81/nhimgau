<?php
/**
 * The template for displaying archive.
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'archive' );

$object = get_queried_object();

?>
<section class="section section-page archive">
	<div class="container">

	</div>
</section>
<?php

// footer
get_footer( 'archive' );
