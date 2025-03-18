<?php

\defined( 'ABSPATH' ) || die;

global $post;

$post_id         = $args['post_id'] ?? $post->ID;
$suggestion_list = \HD\Helper::getField( 'suggestion', $post_id );
if ( ! $suggestion_list ) {
	return;
}

?>
<ul class="suggestion-list">
	<?php
	foreach ( $suggestion_list as $id ) :
		$post_title = get_the_title( $id );
		$title = ! empty( $post_title ) ? $post_title : __( '(no title)', TEXT_DOMAIN );
    ?>
    <li>
        <a title="<?= \HD\Helper::escAttr( $title ) ?>" class="post-title" href="<?php the_permalink( $id ); ?>"><?php echo $title; ?></a>
        <span class="post-date"><?php echo \HD\Helper::humanizeTime( $id ); ?></span>
    </li>
	<?php endforeach; ?>
</ul>
