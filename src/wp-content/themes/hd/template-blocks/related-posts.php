<?php

\defined( 'ABSPATH' ) || die;

$post_id = $args['post_id'] ?? 0;
$term    = $args['term'] ?? 'category';
$title   = $args['title'] ?? '';
$max     = $args['max'] ?? '12';

$posts = \HD\Helper::getRelatedPosts( $post_id, $term, $max );
if ( ! $posts ) {
	return;
}

?>
<section class="section section-related archive section-related-post">
    <div class="container">
        <div class="items">
			<?php echo $title ? '<p class="related-title">' . $title . '</p>' : ''; ?>
        </div>
    </div>
</section>
