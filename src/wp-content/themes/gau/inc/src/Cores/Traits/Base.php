<?php

namespace Cores\Traits;

use Detection\Exception\MobileDetectException;
use Detection\MobileDetect;

\defined( 'ABSPATH' ) || die;

trait Base {

	// -------------------------------------------------------------

	/**
	 * @param string $message
	 * @param int $message_type
	 * @param string|null $destination
	 * @param string|null $additional_headers
	 *
	 * @return bool|void
	 */
	public static function errorLog( string $message, int $message_type = 0, ?string $destination = null, ?string $additional_headers = null ) {
		if ( WP_DEBUG ) {
			return error_log( $message, $message_type, $destination, $additional_headers );
		}
	}

	// --------------------------------------------------

	/**
	 * @param string $url
	 *
	 * @return bool
	 */
	public static function isUrl( string $url ): bool {

		// Basic URL validation using filter_var
		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		$parsed_url = parse_url( $url );

		// Validate scheme
		$valid_schemes = [ 'http', 'https' ];
		if ( ! isset( $parsed_url['scheme'] ) || ! in_array( $parsed_url['scheme'], $valid_schemes, true ) ) {
			return false;
		}

		// Validate host
		if ( ! isset( $parsed_url['host'] ) || ! filter_var( $parsed_url['host'], FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME ) ) {
			return false;
		}

		// Optional: Validate DNS resolution for the host
//		if ( ! checkdnsrr( $parsed_url['host'], 'A' ) && ! checkdnsrr( $parsed_url['host'], 'AAAA' ) ) {
//			return false;
//		}

		return true;
	}

	// --------------------------------------------------

	/**
	 * Test if the current browser runs on a mobile device (smartphone, tablet, etc.)
	 *
	 * @return boolean
	 * @throws MobileDetectException
	 */
	public static function isMobile(): bool {
		if ( class_exists( MobileDetect::class ) ) {
			try {
				return ( new MobileDetect() )->isMobile();
			} catch ( \Exception $e ) {
				throw new MobileDetectException( 'Error detecting mobile device', 0, $e );
			}
		}

		// Fallback to WordPress function
		return wp_is_mobile();
	}

	// --------------------------------------------------

	/**
	 * @param string $version
	 *
	 * @return  bool
	 */
	public static function isPhp( string $version = '7.4' ): bool {
		static $phpVer = [];

		if ( ! isset( $phpVer[ $version ] ) ) {
			$phpVer[ $version ] = version_compare( PHP_VERSION, $version, '>=' );
		}

		return $phpVer[ $version ];
	}

	// --------------------------------------------------

	/**
	 * @param mixed $input
	 *
	 * @return bool
	 */
	public static function isInteger( mixed $input ): bool {
		return filter_var( $input, FILTER_VALIDATE_INT ) !== false;
	}

	// --------------------------------------------------

	/**
	 * @param mixed $value
	 *
	 * @return bool
	 */
	public static function isEmpty( mixed $value ): bool {
		if ( is_string( $value ) ) {
			return trim( $value ) === '';
		}

		// Check for numeric and boolean values, and use empty() for others
		return ! is_numeric( $value ) && ! is_bool( $value ) && empty( $value );
	}

	// -------------------------------------------------------------

	/**
	 * Determines whether the current request is a WP CLI request.
	 *
	 * This function checks if the WP_CLI constant is defined and true,
	 * indicating that the code is being executed in the context of
	 * the WordPress Command Line Interface.
	 *
	 * @return bool True if the current request is a WP CLI request, false otherwise.
	 */
	public static function isWpCli(): bool {
		return defined( 'WP_CLI' ) && \WP_CLI;
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isAdmin(): bool {
		return is_admin();
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isLogin(): bool {
		return in_array( $GLOBALS['pagenow'], [ 'wp-login.php', 'wp-register.php' ] );
	}

	// -------------------------------------------------------------

	/**
	 * Check if plugin is installed by getting all plugins from the plugins dir
	 *
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
	 * Check if the plugin is installed
	 *
	 * @param string $plugin_slug
	 *
	 * @return bool
	 */
	public static function checkPluginActive( string $plugin_slug ): bool {
		return self::checkPluginInstalled( $plugin_slug ) && is_plugin_active( $plugin_slug );
	}

	// -------------------------------------------------------------

	/**
	 * Check if the Advanced Custom Fields (ACF) plugin is active.
	 *
	 * This function checks for both the free and Pro versions of ACF.
	 *
	 * @return bool True if either the free or Pro version of ACF is active, false otherwise.
	 */
	public static function isAcfActive(): bool {
		return self::checkPluginActive( 'advanced-custom-fields/acf.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isPolylangActive(): bool {
		return self::checkPluginActive( 'polylang/polylang.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isPolylangProActive(): bool {
		return self::checkPluginActive( 'polylang-pro/polylang.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isCf7Active(): bool {
		return self::checkPluginActive( 'contact-form-7/wp-contact-form-7.php' );
	}

	// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public static function isWoocommerceActive(): bool {
		return self::checkPluginActive( 'woocommerce/woocommerce.php' );
	}
}
