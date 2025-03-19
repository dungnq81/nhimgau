<?php

\defined( 'ABSPATH' ) || die;

$post_id  = $args['post_id'] ?? 0;
$taxonomy = $args['taxonomy'] ?? 'category';
$title    = $args['title'] ?? '';
$max      = $args['max'] ?? 12;

$posts = \HD\Helper::getRelatedPosts( $post_id, $taxonomy, $max );
if ( ! $post_id || ! $posts ) {
	return;
}

?>
<section class="section section-related archive section-related-post">
    <div class="container">
        <div class="items">
			<?php echo $title ? '<p class="related-title">' . $title . '</p>' : ''; ?>
            <div class="posts-list archive-list items-list">
	            <?php
	            $_data = [
		            'loop'       => true,
		            'navigation' => true,
		            'pagination' => 'bullets',
		            'autoplay'   => true,
		            '_gap'       => true,
	            ];
	            try {
		            $swiper_data = json_encode( $_data, JSON_THROW_ON_ERROR | JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE );
	            } catch ( \JsonException $e ) {}

	            if ( $swiper_data ) :
	            ?>
                <div class="swiper-container">
                    <div class="w-swiper swiper" data-options='<?= $swiper_data ?>'>
                        <div class="swiper-wrapper">
                            <?php
                            $i = 0;
                            foreach ( $posts as $post ) :

	                            $i++;
	                            if ( $i > $max ) {
		                            break;
	                            }
	                            setup_postdata( $post );

	                            $post_title     = get_the_title( $post->ID );
	                            $post_title     = ! empty( $post_title ) ? $post_title : __( '(no title)', TEXT_DOMAIN );

	                            $_args = [
		                            'title_tag' => 'p',
		                            'title'     => $post_title,
		                            'ratio'     => \HD\Helper::aspectRatioClass( get_post_type( $post->ID ) ),
		                            'thumbnail' => get_the_post_thumbnail( $post->ID, 'medium', [ 'alt' => \HD\Helper::escAttr( $post_title ) ] ),
	                            ];
                            ?>
                            <div class="swiper-slide">
                                <?php get_template_part( 'template-parts/posts/loop', null, $_args ); ?>
                            </div>
                            <?php
                            endforeach;
                            wp_reset_postdata();
                            ?>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</section>
