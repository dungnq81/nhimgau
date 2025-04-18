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
$title_tag = $args['title_tag'] ?? 'p';
$ratio     = $args['ratio'] ?? \HD\Helper::aspectRatioClass( get_post_type( $post->ID ) );
$thumbnail = $args['thumbnail'] ?? \HD\Helper::postImageHTML( $post->ID, 'medium', [ 'alt' => \HD\Helper::escAttr( $title ) ] );

$title = ! empty( $title ) ? $title : __( '(no title)', TEXT_DOMAIN );

?>
<div class="item">
    <div class="cover">
        <span class="scale res <?= $ratio ?>">
            <?php echo $thumbnail; ?>
            <a class="link-cover" href="<?= get_permalink( $post->ID ) ?>" aria-label="<?= \HD\Helper::escAttr( $title ) ?>"></a>
        </span>
    </div>
    <div class="content">
        <div class="meta">
	        <?php echo \HD\Helper::getPrimaryTerm( $post ); ?>
            <span class="date"><?= \HD\Helper::humanizeTime( $post->ID ) ?></span>
        </div>
        <?php echo '<' . $title_tag . ' class="title"><a href="' . get_permalink( $post->ID ) . '" title="' . \HD\Helper::escAttr( $title ) . '">' . $title . '</a></' . $title_tag . '>'; ?>
	    <?php echo \HD\Helper::loopExcerpt( $post ); ?>
    </div>
</div>
