<?php

namespace HD\Utilities;

use HD\Utilities\Traits\Singleton;

final class API extends Abstract_API {
	use Singleton;

	private array $endpointClasses = [];

	/** ---------------------------------------- */

	private function init(): void {
		add_action( 'init', [ $this, 'initRestClasses' ] );
		add_action( 'init', [ $this, 'handleCors' ] );

		add_action( 'rest_api_init', [ $this, 'registerRestRoutes' ] );
		add_filter( 'rest_pre_dispatch', [ $this, 'restPreDispatch' ], 10, 3 );
		add_filter( 'rest_endpoints', [ $this, 'restEndpoints' ] );
	}

	/** ---------------------------------------- */

	public function registerRestRoutes(): void {
		foreach ( $this->endpointClasses as $api ) {
			if ( method_exists( $api, 'registerRestRoutes' ) ) {
				$api->registerRestRoutes();
			}
		}
	}

	/** ---------------------------------------- */

	/**
	 * Automatically initialize classes in the Utilities/API directory.
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
	 * @param $pre
	 * @param \WP_REST_Server $server
	 * @param \WP_REST_Request $request
	 *
	 * @return \WP_Error|null
	 */
	public function restPreDispatch( $pre, \WP_REST_Server $server, \WP_REST_Request $request ): ?\WP_Error {
		$route  = $request->get_route();
		$routes = $server->get_routes();

		$allowed = [
			self::REST_NAMESPACE . '/single/track_views',
		];

		if ( ! in_array( trim( $route, '/' ), $allowed, true ) ) {
			return $pre;
		}

		foreach ( (array) $routes[ $route ] as $args ) {
			foreach ( (array) $args['methods'] as $method => $enabled ) {
				if ( $enabled && strtoupper( $method ) === strtoupper( $request->get_method() ) ) {
					return $pre;
				}
			}
		}

		return new \WP_Error(
			'rest_forbidden',
			'Access denied for this route.',
			[ 'status' => 403 ]
		);
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
