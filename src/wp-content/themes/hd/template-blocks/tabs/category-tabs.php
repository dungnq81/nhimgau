<?php

\defined( 'ABSPATH' ) || die;

$atts = ( object ) [
	'container' => $args['container'] ?? false, // container
	'title'     => $args['title'] ?? '',
	'title_tag' => $args['title_tag'] ?? 'p',
	'term_ids'  => $args['term_ids'] ?? [], // term ids
	'max'       => $args['max'] ?? 6,
	'is_slide'  => $args['slide'] ?? false, // list or slide
	'all'       => $args['all'] ?? true, // tab View All
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
    <div id="<?= 'filter-tabs-' . $id ?>" class="filter-tabs">
        <div class="tabs-nav">
            <ul>
				<?php if ( $atts->all ) : ?>
                <li><a href="#all-<?= $id ?>" class="current" title="<?= esc_attr__( 'All', TEXT_DOMAIN ) ?>"><?= __( 'All', TEXT_DOMAIN ) ?></a></li>
                <?php
                endif;

				if ( $atts->term_ids ) :
					foreach ( $atts->term_ids as $i => $term_id ) :
						$term  = \HD_Helper::getTerm( $term_id, $atts->taxonomy );
						$class = ! $atts->all && $i === 0 ? ' class="current"' : '';
						$i ++;
                ?>
                <li><a<?= $class ?> href="#<?= $term_id . '-' . $id ?>" title="<?= \HD_Helper::escAttr( $term->name ) ?>"><?= $term->name ?></a></li>
                <?php endforeach; endif; ?>
            </ul>
        </div>
        <div class="tabs-content">
	        <?php if ( $atts->all ) : ?>
            <div id="all-<?= $id ?>" class="tabs-panel">
                <div class="posts-list archive-list items-list">
                    <?php
                    $query = \HD_Helper::queryByLatestPosts( $atts->post_type, $atts->max );
                    try {
                        _category_tabs_content( $query, $atts->max, $atts->is_slide );
                    } catch ( \JsonException $e ) {}
                    ?>
                </div>
            </div>
            <?php endif;

	        if ( $atts->term_ids ) :
                foreach ( $atts->term_ids as $i => $term_id ) :

            ?>
            <div id="<?= $term_id . '-' . $id ?>" class="tabs-panel">
                <div class="posts-list archive-list items-list">
                    <?php
                    $query = \HD_Helper::queryByTerms( [ $term_id ], $atts->post_type, $atts->taxonomy, false, $atts->max );
                    try {
	                    _category_tabs_content( $query, $atts->max, $atts->is_slide );
                    } catch ( \JsonException $e ) {}
                    ?>
                </div>
            </div>
            <?php endforeach; endif; ?>
        </div>
    </div>
	<?php echo $atts->container ? '</div>' : ''; ?>
</div>

<?php

/**
 * @param mixed $query
 * @param int $max
 * @param bool $is_slide
 * @param int $slide_rows
 *
 * @return void
 * @throws JsonException
 */
function _category_tabs_content( mixed $query, int $max, bool $is_slide, int $slide_rows = 1 ): void {
	$slide_rows = max( $slide_rows, 1 );
	$max        = max( $max, - 1 );
	if ( $is_slide ) {
		$_data = [
			'loop'       => true,
			'navigation' => true,
			'pagination' => 'bullets',
			'autoplay'   => true,
			'grid'       => [ 'rows' => $slide_rows ],
			'_gap'       => true,
		];

		$swiper_data = json_encode( $_data, JSON_THROW_ON_ERROR | JSON_FORCE_OBJECT | JSON_UNESCAPED_UNICODE );
		\HD_Helper::blockTemplate( 'template-blocks/blocks/_slide_posts', [
				'title_tag'  => 'p',
				'query'      => $query,
				'slide_data' => $swiper_data,
				'max'        => $max,
			]
		);
	} else {
		\HD_Helper::blockTemplate( 'template-blocks/blocks/_posts', [
				'title_tag' => 'p',
				'query'     => $query,
				'max'       => $max,
			]
		);
	}
}
