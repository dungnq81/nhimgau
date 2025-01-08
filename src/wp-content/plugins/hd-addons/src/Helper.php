<?php

namespace Addons;

\defined( 'ABSPATH' ) || exit;

/**
 * Addon Helper Class
 *
 * @author Gaudev
 */
final class Helper {

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function htAccess(): bool {
		global $is_apache;

		if ( $is_apache ) {
			return true;
		}

		if ( isset( $_SERVER['HTACCESS'] ) && $_SERVER['HTACCESS'] === 'on' ) {
			return true;
		}

		return false;
	}

	// -------------------------------------------------------------

	/**
	 * @param string $plugin_slug
	 *
	 * @return bool
	 */
	public static function checkPluginActive( string $plugin_slug ): bool {
		return self::checkPluginInstalled( $plugin_slug ) && is_plugin_active( $plugin_slug );
	}

	// -------------------------------------------------------------

	/**
	 * @param string $plugin_slug
	 *
	 * @return bool
	 */
	public static function checkPluginInstalled( string $plugin_slug ): bool {

		// Ensure required functions are available
		if ( ! function_exists( 'get_plugins' ) || ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		// Get the list of installed plugins
		$installed_plugins = get_plugins();

		// Check if the plugin slug exists in the installed plugins array
		return array_key_exists( $plugin_slug, $installed_plugins );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isAcfActive(): bool {
		return self::checkPluginActive( 'secure-custom-fields/secure-custom-fields.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields/acf.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isAcfProActive(): bool {
		return self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isRankMathActive(): bool {
		return self::checkPluginActive( 'seo-by-rank-math/rank-math.php' ) ||
		       self::checkPluginActive( 'seo-by-rank-math-pro/rank-math-pro.php' );
	}

	// -------------------------------------------------------------
}
