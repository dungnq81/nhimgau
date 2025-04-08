<?php

\defined( 'ABSPATH' ) || die;

$query      = $args['query'] ?? null;
$title_tag  = $args['title_tag'] ?? 'p';
$max        = $args['max'] ?? false;
$slide_data = $args['slide_data'] ?? '[]';

if ( ! $query ) {
	return;
}

?>
<div class="swiper-container">
    <div class="w-swiper swiper" data-options='<?= $slide_data ?>'>
        <div class="swiper-wrapper">
		    <?php
		    $i = 0;

		    while ( $query?->have_posts() ) : $query->the_post();
			    $post = get_post();

			    $i ++;
			    if ( $max && $i > $max ) {
				    break;
			    }

			    $post_type  = get_post_type( $post->ID ) ?: 'post';
            ?>
            <div class="swiper-slide">
                <?php \HD\Helper::blockTemplate( 'template-parts/' . $post_type . '/loop', [ 'title_tag' => $title_tag ] ); ?>
            </div>
		    <?php endwhile;
		    wp_reset_postdata();
		    ?>
        </div>
    </div>
</div>
