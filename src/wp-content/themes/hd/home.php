<?php
/**
 * The home page template file.
 * http://codex.wordpress.org/Template_Hierarchy
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// header
get_header( 'blog' );

$object = get_queried_object();

// breadcrumbs
\HD\Helper::blockTemplate( 'template-blocks/breadcrumbs', [
		'title' => get_the_title( $object->ID )
	]
);

/**
 * HOOK: hd_blog_before_action
 */
do_action( 'hd_blog_before_action' );

?>
<section class="section section-page section-blog archive">
    <div class="container flex flex-x">
        <div class="content">
            <h1 class="heading-title" <?= \HD\Helper::microdata( 'headline' ) ?>><?= get_the_title( $object->ID ) ?></h1>
            <?= \HD\Helper::postExcerpt( $object, 'excerpt', null, null ) ?>
            <?php if ( have_posts() ) : ?>
            <div class="posts-list archive-list items-list flex flex-x">
	            <?php

	            // Start the Loop.
	            while ( have_posts() ) : the_post();

		            echo "<div class=\"cell\">";
		            get_template_part( 'template-parts/posts/loop', null, [ 'title_tag' => 'h2' ] );
		            echo "</div>";

		            // End the loop.
	            endwhile;
	            ?>
            </div>
            <?php
	            // Previous/next page navigation.
	            \HD\Helper::paginateLinks();
            else :
	            \HD\Helper::blockTemplate( 'template-blocks/no-results' );
            endif;
            ?>
        </div>
	    <?php if ( is_active_sidebar( 'archive-sidebar' ) ) : ?>
        <aside class="sidebar" <?= \HD\Helper::microdata( 'sidebar' ) ?>>
            <?php dynamic_sidebar( 'archive-sidebar' ); ?>
        </aside>
	    <?php endif;

	    /**
	     * HOOK: hd_archive_sidebar_action
	     */
	    do_action( 'hd_archive_sidebar_action' );
	    ?>
	</div>
</section>
<?php

/**
 * HOOK: hd_blog_after_action
 */
do_action( 'hd_blog_after_action' );

// footer
get_footer( 'blog' );
