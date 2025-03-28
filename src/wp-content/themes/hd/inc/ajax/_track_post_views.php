<?php

add_action( 'wp_ajax_track_post_views', 'ajax_track_post_views' );
add_action( 'wp_ajax_nopriv_track_post_views', 'ajax_track_post_views' );

function ajax_track_post_views(): void {
	if ( ! wp_doing_ajax() ) {
		return;
	}

	check_ajax_referer( 'wp_csrf_token' );

	$post_id = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
	if ( ! $post_id ) {
		return;
	}

	$last_view_time = get_post_meta( $post_id, '_last_view_time', true );
	$current_time   = current_time( 'U', 0 );
	$views          = get_post_meta( $post_id, '_post_views', true );

	if ( ! $last_view_time || ( $current_time - (int) $last_view_time ) > 300 ) { // 300 s
		$views = $views ? (int) $views + 1 : 1;

		update_post_meta( $post_id, '_post_views', $views );
		update_post_meta( $post_id, '_last_view_time', $current_time );

		wp_send_json_success( [ 'time' => $current_time, 'views' => $views, 'date' => \HD\Helper::humanizeTime( $post_id ) ] );
	}

	wp_send_json_success( [ 'time' => $last_view_time, 'views' => (int) $views, 'date' => \HD\Helper::humanizeTime( $post_id ) ] );
	die();
}
