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

?>
<section class="section section-page section-home archive">
	<div class="container">

	</div>
</section>
<?php

// footer
get_footer( 'home' );
