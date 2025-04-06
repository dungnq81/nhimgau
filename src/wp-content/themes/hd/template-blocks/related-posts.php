<?php

\defined( 'ABSPATH' ) || die;

$title     = $args['title'] ?? '';
$title_tag = $args['title_tag'] ?? 'p';
$post_id   = $args['id'] ?? 0;
$taxonomy  = $args['taxonomy'] ?? 'category';
$max       = $args['max'] ?? 6;
$rows      = $args['rows'] ?? 1;

$posts = \HD\Helper::getRelatedPosts( $post_id, $taxonomy, $max );
if ( ! $post_id || ! $posts ) {
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

            $swiper_data = json_encode( $_data, JSON_THROW_ON_ERROR | JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE );
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
	                            'title'     => $post_title,
                                'title_tag' => 'p',
                                'ratio'     => \HD\Helper::aspectRatioClass( get_post_type( $post->ID ) ),
                                'thumbnail' => \HD\Helper::postImageHTML( $post->ID, 'medium', [ 'alt' => \HD\Helper::escAttr( $post_title ) ] ),
                            ];
                        ?>
                        <div class="swiper-slide">
                            <?php get_template_part( 'template-parts/post/loop', null, $_args ); ?>
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
</section>
