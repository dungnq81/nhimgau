<?php

\defined( 'ABSPATH' ) || die;

add_action( 'wp_ajax_check_lighthouse', 'ajax_check_lighthouse' );
add_action( 'wp_ajax_nopriv_check_lighthouse', 'ajax_check_lighthouse' );

function ajax_check_lighthouse() {
	if ( ! wp_doing_ajax() ) {
		return false;
	}

	check_ajax_referer( 'wp_csrf_token' );
	if ( \HD\Helper::lightHouse() ) {
		wp_send_json_success( [ 'lighthouse' => true ] );
	}

	wp_send_json_success( [ 'lighthouse' => false ] );
	die();
}
