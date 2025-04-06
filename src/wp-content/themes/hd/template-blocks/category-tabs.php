<?php

\defined( 'ABSPATH' ) || die;

$atts = ( object ) [
	'container' => $args['container'] ?? false,
	'title'     => $args['title'] ?? '',
	'title_tag' => $args['title_tag'] ?? 'p',
	'term_ids'  => $args['term_ids'] ?? [],
	'max'       => $args['max'] ?? 6,
	'is_slide'  => $args['slide'] ?? false,
	'post_type' => $args['post_type'] ?? 'post',
	'taxonomy'  => $args['taxonomy'] ?? 'category',
];

?>
<div class=""></div>
