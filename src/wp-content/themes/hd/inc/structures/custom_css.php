<?php
/**
 * CSS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom CSS
// --------------------------------------------------

add_action( 'wp_enqueue_scripts', 'custom_css_action', 99 );
function custom_css_action(): void {
	$css = new \HD_CSS();

	//-------------------------------------------------
	// Breadcrumb
	//-------------------------------------------------

	$object = get_queried_object();

	$breadcrumb_max     = \HD_Helper::getThemeMod( 'breadcrumb_max_height_setting', 0 );
	$breadcrumb_min     = \HD_Helper::getThemeMod( 'breadcrumb_min_height_setting', 0 );
	$breadcrumb_bgcolor = \HD_Helper::getThemeMod( 'breadcrumb_bgcolor_setting' );

	if ( $breadcrumb_max > 0 || $breadcrumb_min > 0 || $breadcrumb_bgcolor ) {
		$css->set_selector( '.section.section-breadcrumb' );
	}

	$breadcrumb_min && $css->add_property( 'min-height', $breadcrumb_min . 'px !important' );
	$breadcrumb_max && $css->add_property( 'max-height', $breadcrumb_max . 'px !important' );
	$breadcrumb_bgcolor && $css->add_property( 'background-color', $breadcrumb_bgcolor . ' !important' );

	$breadcrumb_title_color = \HD_Helper::getField( 'breadcrumb_title_color', $object ) ?: \HD_Helper::getThemeMod( 'breadcrumb_color_setting' );

	if ( $breadcrumb_title_color ) {
		$css->set_selector( '.section.section-breadcrumb .breadcrumb-title' )
		    ->add_property( 'color', $breadcrumb_title_color . ' !important' );
	}

	$css_output = $css->css_output();
	if ( $css_output ) {
		wp_add_inline_style( 'index-css', $css_output );
	}

	//ob_start();

	//...

	//$inline_css = ob_get_clean();
	//if ( $inline_css ) {
	//$inline_css = \HD_Helper::CSSMinify( $inline_css, true );
	//wp_add_inline_style( 'index-css', $inline_css );
	//}
}
