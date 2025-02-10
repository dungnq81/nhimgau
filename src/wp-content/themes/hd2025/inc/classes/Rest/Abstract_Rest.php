<?php

namespace HD\Rest;

abstract class Abstract_Rest {
	public const BYPASS_NONCE   = false; // bypass wpnonce, recaptcha .v.v...
	public const REST_NAMESPACE = 'wp/v2';

	/** ---------------------------------------- */

	abstract public function register_rest_routes();

	/** ---------------------------------------- */

	/**
	 * @param string $route
	 *
	 * @return string
	 */
	public function rest_api_url( string $route = '' ): string {
		return esc_url_raw( rest_url( self::REST_NAMESPACE . '/' . $route ) );
	}

	/** ---------------------------------------- */

	/**
	 * @param string $route
	 *
	 * @return string
	 */
	public function rest_api_uri_by_url( string $route = '' ): string {
		$full_url = $this->rest_api_url( $route );

		return wp_make_link_relative( $full_url );
	}

	/** ---------------------------------------- */

	/**
	 * @param array $result
	 * @param int $status
	 * @param array $data
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public static function send_response( array $result = [], int $status = 1, array $data = [] ): \WP_Error|\WP_REST_Response {
		// Prepare the status code, based on the optimization result.
		$status_code      = ( 1 === $status ) ? 200 : 400;
		$result['status'] = $status_code;

		if ( ! empty( $data ) ) {
			$result['data'] = $data;
		}

		if ( ! isset( $result['success'] ) ) {
			$result['success'] = true;
		}

		if ( ! isset( $result['errorCode'] ) ) {
			$result['errorCode'] = 0;
		}

		$response = rest_ensure_response( $result );
		$response->set_status( $status_code );

		if ( ! headers_sent() ) {
			$response->header( 'Content-Type', 'application/json; charset=' . \HD\Helper::getOption( 'blog_charset' ) );
		}

		return $response;
	}
}