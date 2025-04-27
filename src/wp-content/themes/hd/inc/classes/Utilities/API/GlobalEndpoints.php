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


}
