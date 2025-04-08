<?php

\defined( 'ABSPATH' ) || die;

$atts = ( object ) [
	'container' => $args['container'] ?? false, // container
	'title'     => $args['title'] ?? '',
	'title_tag' => $args['title_tag'] ?? 'p',
	'term_ids'  => $args['term_ids'] ?? [], // term ids
	'max'       => $args['max'] ?? 6,
	'is_slide'  => $args['slide'] ?? false, // list or slide
	'all'       => $args['all'] ?? false, // tab View All
	'post_type' => $args['post_type'] ?? 'post',
	'taxonomy'  => $args['taxonomy'] ?? 'category',
];

$id = substr( md5( $atts->post_type . '-' . serialize( $atts ) ), 0, 10 );

?>
<div class="category-tabs">
    <?php
    echo $atts->container ? '<div class="container">' : '';
    echo $atts->title ? '<' . $atts->title_tag . ' class="related-title">' . $atts->title . '</' . $atts->title_tag . '>' : '';
    ?>
    <div id="<?= 'tab-' . $id ?>" class="filter-tabs">
        <div class="tabs-nav">
            <ul>
                <li></li>
            </ul>
        </div>
        <div class="tabs-content">
            <div id="" class="tabs-panel"></div>
        </div>
    </div>
    <?php echo $atts->container ? '</div>' : ''; ?>
</div>
