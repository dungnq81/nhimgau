<?php
/**
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

$object = get_queried_object();

$breadcrumb_class = '';
$breadcrumb_bg    = \HD\Helper::getThemeMod( 'breadcrumb_bg_setting' );
if ( $breadcrumb_bg ) {
	$breadcrumb_class = ' has-background';
	$breadcrumb_bg    = attachment_url_to_postid( $breadcrumb_bg );
}

$image_for_breadcrumb = \HD\Helper::getField( 'image_for_breadcrumb', $object );
if ( $image_for_breadcrumb ) {
	$breadcrumb_class = ' has-background';
	$breadcrumb_bg    = $image_for_breadcrumb;
}

$breadcrumb_max_height_setting = \HD\Helper::getThemeMod( 'breadcrumb_max_height_setting', 0 );
$breadcrumb_min_height_setting = \HD\Helper::getThemeMod( 'breadcrumb_min_height_setting', 0 );
if ( $breadcrumb_max_height_setting > 0 || $breadcrumb_min_height_setting > 0 ) {
	$breadcrumb_class .= ' has-sizes';

	echo $breadcrumb_max_height_setting ? '<style>.section.section-breadcrumb{max-height:' . $breadcrumb_max_height_setting . 'px !important;}</style>' : '';
	echo $breadcrumb_min_height_setting ? '<style>.section.section-breadcrumb{min-height:' . $breadcrumb_min_height_setting . 'px !important;}</style>' : '';
}

$breadcrumb_bgcolor     = \HD\Helper::getThemeMod( 'breadcrumb_bgcolor_setting' );
$breadcrumb_title_color = \HD\Helper::getField( 'breadcrumb_title_color', $object );
$breadcrumb_title_color = $breadcrumb_title_color ?: \HD\Helper::getThemeMod( 'breadcrumb_color_setting' );

echo $breadcrumb_bgcolor ? '<style>.section.section-breadcrumb{background-color:' . $breadcrumb_bgcolor . ' !important;}</style>' : '';
echo $breadcrumb_title_color ? '<style>.section.section-breadcrumb .breadcrumb-title{color:' . $breadcrumb_title_color . ' !important;}</style>' : '';

$title = '';
if ( is_search() ) {
	$title = sprintf( __( 'Search results: &ldquo;%s&rdquo;', TEXT_DOMAIN ), get_search_query() );
	if ( get_query_var( 'paged' ) ) {
		$title .= sprintf( __( '&nbsp;&ndash; page %s', TEXT_DOMAIN ), get_query_var( 'paged' ) );
	}
}

if ( ! empty( $args['title'] ) ) {
	$title = $args['title'];
}

?>
<section class="section section-breadcrumb<?= $breadcrumb_class ?>">
	<?php echo $breadcrumb_bg ? \HD\Helper::pictureHTML( 'breadcrumb-bg', $breadcrumb_bg ) : ''; ?>
    <div class="container">
		<?php echo $title ? '<p class="breadcrumb-title">' . $title . '</p>' : ''; ?>
        <nav>
			<?php \HD\Helper::breadCrumbs(); ?>
        </nav>
    </div>
</section>
