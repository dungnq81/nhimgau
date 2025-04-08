<?php

\defined( 'ABSPATH' ) || die;

$title     = $args['title'] ?? '';
$title_tag = $args['title_tag'] ?? 'p';
$post_id   = $args['id'] ?? 0;
$taxonomy  = $args['taxonomy'] ?? 'category';
$max       = $args['max'] ?? 6;
$rows      = $args['rows'] ?? 1;

$query = \HD\Helper::queryByRelated( $post_id, $taxonomy, $max );
if ( ! $post_id && ! $query ) {
	return;
}

?>
<section class="section section-related section-related-post archive">
    <div class="container">
		<?php echo $title ? '<' . $title_tag . ' class="related-title">' . $title . '</' . $title_tag . '>' : ''; ?>
        <div class="posts-list archive-list items-list">
			<?php
			$_data = [
				'loop'       => true,
				'navigation' => true,
				'pagination' => 'bullets',
				'autoplay'   => true,
				'_gap'       => true,
			];

			if ( $rows > 1 ) {
				$_data['grid'] = [ 'rows' => $rows ];
			}

			try {
				$swiper_data = json_encode( $_data, JSON_THROW_ON_ERROR | JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE );
				\HD\Helper::blockTemplate( 'template-blocks/blocks/_slide_posts', [
						'query'      => $query,
						'slide_data' => $swiper_data,
					]
				);
			} catch ( \JsonException $e ) {}
			?>
        </div>
    </div>
</section>
