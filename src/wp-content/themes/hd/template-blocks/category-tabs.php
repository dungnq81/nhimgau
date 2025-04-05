<?php

\defined( 'ABSPATH' ) || die;

$title     = $args['title'] ?? '';
$title_tag = $args['title_tag'] ?? 'p';
$term_ids  = $args['term_ids'] ?? [];
$max       = $args['max'] ?? 6;
$post_type = $args['post_type'] ?? 'post';
$taxonomy  = $args['taxonomy'] ?? 'category';