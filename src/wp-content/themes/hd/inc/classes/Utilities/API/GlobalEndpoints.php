<?php

namespace HD\Utilities\API;

use HD\Utilities\Abstract_API;

\defined( 'ABSPATH' ) || die;

/**
 * Class GlobalEndpoints
 *
 * Registers and handles all REST API endpoints for global utilities,
 * such as lighthouse checks, site configuration, and notification hooks, v.v...
 *
 * @package HD\Utilities\API
 */
class GlobalEndpoints extends Abstract_API {
	/** ---------------------------------------- */

	public function registerRestRoutes(): void {
		register_rest_route(
			self::REST_NAMESPACE,
			'/global/lighthouse',
			[
				'methods'             => \WP_REST_Server::CREATABLE,
				'callback'            => [ $this, 'lightHouseCallback' ],
				'permission_callback' => '__return_true',
			]
		);
	}

	/** ---------------------------------------- */

	/**
	 * @param $request
	 *
	 * @return \WP_Error|\WP_REST_Response
	 */
	public function lightHouseCallback( $request ): \WP_Error|\WP_REST_Response {
		if ( ! self::BYPASS_NONCE ) {
			$nonce = $request->get_header( 'X-WP-Nonce' );
			if ( ! $nonce || ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
				$result = [
					'success' => false,
					'message' => 'Invalid CSRF token.'
				];

				return self::sendResponse( $result, 403 );
			}
		}

		$result = [
			'success'  => true,
			'detected' => \HD\Helper::lightHouse(),
		];

		return self::sendResponse( $result, 200 );
	}
}
