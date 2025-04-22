<?php

namespace HD\Utilities;

use HD\Utilities\Traits\Singleton;

final class API extends Abstract_API {
	use Singleton;

	private array $endpointClasses = [];

	/** ---------------------------------------- */

	/**
	 * @return void
	 */
	public function registerRestRoutes(): void {
		foreach ( $this->endpointClasses as $api ) {
			if ( method_exists( $api, 'registerRestRoutes' ) ) {
				$api->registerRestRoutes();
			}
		}
	}

	/** ---------------------------------------- */

	/**
	 * @return void
	 */
	private function init(): void {
		add_action( 'init', [ $this, 'initRestUrl' ] );
		add_action( 'init', [ $this, 'initRestClasses' ] );
		add_action( 'init', [ $this, 'handleCors' ] );

		add_action( 'rest_api_init', [ $this, 'registerRestRoutes' ] );
		add_filter( 'rest_authentication_errors', [ $this, 'restAuthenticationErrors' ] );
		add_filter( 'rest_endpoints', [ $this, 'restEndpoints' ] );
	}

	/** ---------------------------------------- */

	/**
	 * Automatically initialize classes in the Career/Rest/Actions directory.
	 *
	 * @return void
	 */
	public function initRestClasses(): void {
		$directory = __DIR__ . '/API/*.php';
		foreach ( glob( $directory, GLOB_NOSORT ) as $file ) {
			$class_name = '\\HD\\Utilities\\API\\' . basename( $file, '.php' );

			if ( class_exists( $class_name ) ) {
				$this->endpointClasses[] = new $class_name();
			}
		}
	}

	/** ---------------------------------------- */

	/**
	 * @return void
	 */
	public function initRestUrl(): void {
		add_filter( 'hd_rest_api_url', [ $this, 'restApiUrl' ], 10, 3 );
	}

	/** ---------------------------------------- */

	/**
	 * Handle CORS settings.
	 *
	 * @return void
	 */
	public function handleCors(): void {
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
	 * Handle REST authentication errors.
	 *
	 * @param $result
	 *
	 * @return null|\WP_Error|true
	 */
	public function restAuthenticationErrors( $result ): true|\WP_Error|null {
		if ( ! empty( $result ) ) {
			return $result;
		}

		$url_rest_request = ltrim( wp_make_link_relative( $this->restApiUrl() ), '/' );
		$request_uri      = $_SERVER['REDIRECT_URL'] ?? $_SERVER['REQUEST_URI'];

		// Check if the request is a REST API request
		if ( str_contains( $request_uri, $url_rest_request ) ) {
			$reqMethod      = $_SERVER["REQUEST_METHOD"];
			$method         = strtolower( $reqMethod );
			$allowed_routes = $this->_allowedRoutes();

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
	private function _allowedRoutes(): array {
		$allowed_routes = [];

		// Populate allowed routes via filter
		return apply_filters( 'hd_rest_allowed_routes', $allowed_routes );
	}

	/** ---------------------------------------- */

	/**
	 * @param $endpoints
	 *
	 * @return mixed
	 */
	public function restEndpoints( $endpoints ): mixed {
		if ( isset( $endpoints['/'] ) ) {
			unset( $endpoints['/'] );
		}

		return $endpoints;
	}
}
