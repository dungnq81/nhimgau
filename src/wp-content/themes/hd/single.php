<?php
/**
 * The Template for displaying all single posts.
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'single' );

if ( have_posts() ) {
	the_post();
}

if ( post_password_required() ) {
	echo get_the_password_form();
	get_footer( 'single' );

	return;
}

// breadcrumbs
\HD\Helper::blockTemplate( 'template-blocks/breadcrumbs', [
		'title' => \HD\Helper::primaryTerm( $post )?->name
	]
);

/**
 * HOOK: hd_single_before_action
 */
do_action( 'hd_single_before_action' );

$alternative_title = \HD\Helper::getField( 'alternative_title', $post->ID );

?>
<section class="section section-page section-single singular">
    <div class="container flex flex-x">
        <?php \HD\Helper::blockTemplate( 'template-blocks/social-share' ); ?>
        <div class="content">
            <h1 class="heading-title" <?= \HD\Helper::microdata( 'headline' ) ?>><?= $alternative_title ?: get_the_title() ?></h1>
            <?php echo \HD\Helper::postExcerpt( $post, 'excerpt', false ); ?>
            <article <?= \HD\Helper::microdata( 'article' ) ?>>
                <?php
                the_content();

                \HD\Helper::hashTags();
                \HD\Helper::blockTemplate( 'template-blocks/suggestion-posts' );

                // If comments are open, or we have at least one comment, load up the comment template.
                comments_template();
                ?>
            </article>
        </div>
        <?php if ( is_active_sidebar( 'news-sidebar' ) ) : ?>
        <aside class="sidebar" <?= \HD\Helper::microdata( 'sidebar' ) ?>>
            <?php dynamic_sidebar( 'news-sidebar' ); ?>
        </aside>
        <?php endif;

        /**
         * HOOK: hd_singular_sidebar_action
         */
        do_action( 'hd_singular_sidebar_action' );
        ?>
    </div>
</section>
<?php

\HD\Helper::blockTemplate( 'template-blocks/related-posts', [
		'title'   => __( 'Recommended Articles', TEXT_DOMAIN ),
		'taxonomy'    => 'category',
		'post_id' => $post->ID,
		'max'     => 12
	]
);

/**
 * HOOK: hd_single_after_action
 */
do_action( 'hd_single_after_action' );

// footer
get_footer( 'single' );
