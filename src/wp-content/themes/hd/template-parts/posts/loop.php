<?php
/**
 * The loop.php file in WordPress handles displaying post's summaries in lists,
 * such as archives or blog pages v.v...
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

global $post;

$title     = $args['title'] ?? get_the_title( $post->ID );
$ratio     = $args['ratio'] ?? \HD\Helper::aspectRatioClass( get_post_type( $post->ID ) );
$thumbnail = $args['thumbnail'] ?? get_the_post_thumbnail( $post->ID, 'medium', [ 'alt' => \HD\Helper::escAttr( $title ) ] );
$title_tag = $args['title_tag'] ?? 'p';

?>
<div class="item">
    <span class="cover">
        <span class="scale res <?= $ratio ?>">
            <?= $thumbnail ?>
            <a class="link-cover" href="<?= get_permalink( $post->ID ) ?>" aria-label="<?= \HD\Helper::escAttr( $title ) ?>"></a>
        </span>
    </span>
    <div class="content">
        <div class="meta">
	        <?= \HD\Helper::getPrimaryTerm( $post ) ?>
            <span class="date"><?= \HD\Helper::humanizeTime( $post->ID ) ?></span>
        </div>
        <?= '<' . $title_tag . ' class="title"><a href="' . get_permalink( $post->ID ) . '" title="' . \HD\Helper::escAttr( $title ) . '">' . $title . '</a></' . $title_tag . '>' ?>
	    <?= \HD\Helper::loopExcerpt( $post ) ?>
    </div>
</div>
