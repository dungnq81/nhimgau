<?php

namespace HD\Rest;

use HD\Utilities\Traits\Singleton;

final class Rest extends Abstract_Rest {
	use Singleton;

	private array $rest_apis = [];

	/** ---------------------------------------- */

	private function init(): void {
		add_action( 'init', [ $this, 'init_rest' ] );
		add_action( 'init', [ $this, 'handle_cors' ] );

		add_action( 'rest_api_init', [ $this, 'register_rest_routes' ] );
		add_filter( 'rest_authentication_errors', [ $this, 'rest_authentication_errors' ] );
		add_filter( 'rest_endpoints', [ $this, 'rest_endpoints' ] );

		$this->_init_rest_classes();
	}

	/** ---------------------------------------- */

	/**
	 * Automatically initialize classes in the HD/Rest/Actions directory.
	 *
	 * @return void
	 */
	private function _init_rest_classes(): void {
		$directory = __DIR__ . '/Actions/*.php';
		foreach ( glob( $directory, GLOB_NOSORT ) as $file ) {
			$class_name = '\\HD\\Rest\\Actions\\' . basename( $file, '.php' );

			if ( class_exists( $class_name ) ) {
				$this->rest_apis[] = new $class_name();
			}
		}
	}

	/** ---------------------------------------- */

	/**
	 * @return void
	 */
	public function init_rest(): void {
		add_filter( 'hd_rest_api_url_filter', [ $this, 'rest_api_url_callback' ], 10, 3 );
	}

	/** ---------------------------------------- */

	/**
	 * @param $url
	 * @param $route
	 * @param bool $default
	 *
	 * @return string
	 */
	public function rest_api_url_callback( $url, $route, bool $default = true ): string {
		return $this->rest_api_url( $route );
	}

	/** ---------------------------------------- */

	/**
	 * Handle CORS settings.
	 *
	 * @return void
	 */
	public function handle_cors(): void {
		header( "Access-Control-Allow-Origin: *" );
		header( "Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE" );
		header( "Access-Control-Allow-Credentials: true" );
		header( "Access-Control-Allow-Headers: Origin, X-Requested-With, X-WP-Nonce, Content-Type, Accept, Authorization" );

		if ( 'OPTIONS' === $_SERVER['REQUEST_METHOD'] ) {
			status_header( 200 );
			exit();
		}
	}

	/** ---------------------------------------- */

	/**
	 * @param $endpoints
	 *
	 * @return mixed
	 */
	public function rest_endpoints( $endpoints ): mixed {
		$unset_endpoints = [
			'/',
			'/wp/v2',
			'/' . self::REST_NAMESPACE,
		];

		foreach ( $unset_endpoints as $ue ) {
			if ( isset( $endpoints[$ue] ) ) {
				unset( $endpoints[$ue] );
			}
		}

		return $endpoints;
	}

	/** ---------------------------------------- */

	/**
	 * Handle REST authentication errors.
	 *
	 * @param $result
	 *
	 * @return null|\WP_Error|true
	 */
	public function rest_authentication_errors( $result ): true|\WP_Error|null {
		if ( ! empty( $result ) ) {
			return $result;
		}

		$url_rest_request = ltrim( $this->rest_api_uri_by_url(), '/' );
		$request_uri      = $_SERVER['REDIRECT_URL'] ?? $_SERVER['REQUEST_URI'];

		// Check if the request is a REST API request
		if ( str_contains( $request_uri, $url_rest_request ) ) {
			$reqMethod      = $_SERVER["REQUEST_METHOD"];
			$method         = strtolower( $reqMethod );
			$allowed_routes = $this->_allowed_routes();

			// Check if the requested URI is allowed and matches the HTTP method
			if ( isset( $allowed_routes[ $request_uri ] ) && empty( $allowed_routes[ $request_uri ][ $method ] ) ) {
				return new \WP_Error( 'rest_forbidden', 'Access denied for this route.', [ 'status' => 403 ] );
			}
		}

		return self::BYPASS_NONCE ? true : null;
	}

	/** ---------------------------------------- */

	/**
	 * Get allowed routes.
	 *
	 * @return array
	 */
	private function _allowed_routes(): array {
		$allowed_routes = [];

		// Populate allowed routes via filter
		return apply_filters( 'hd_rest_allowed_routes_filter', $allowed_routes );
	}

	/** ---------------------------------------- */

	/**
	 * Register rest routes.
	 *
	 * @return void
	 */
	public function register_rest_routes(): void {
		foreach ( $this->rest_apis as $api ) {
			if ( method_exists( $api, 'register_rest_routes' ) ) {
				$api->register_rest_routes();
			}
		}
	}

	/** ---------------------------------------- */
}
