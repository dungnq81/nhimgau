<?php

namespace Addons;

use Symfony\Component\Yaml\Yaml;

\defined( 'ABSPATH' ) || exit;

/**
 * Addon Helper Class
 *
 * @author Gaudev
 */
final class Helper {

	// --------------------------------------------------

	/**
	 * @param $configFile
	 * @param $textDomain
	 *
	 * @return array
	 */
	public static function loadYaml( $configFile, $textDomain ): array {
		try {
			$configData = \Symfony\Component\Yaml\Yaml::parseFile( $configFile );


		} catch ( \Symfony\Component\Yaml\Exception\ParseException $e ) {
			error_log( 'YAML Parse error: ' . $e->getMessage() );

			return [];
		}
	}

// --------------------------------------------------

	/**
	 * @return string
	 */
	public
	static function serverIpAddress(): string {
		// Check for SERVER_ADDR first
		if ( ! empty( $_SERVER['SERVER_ADDR'] ) ) {
			return $_SERVER['SERVER_ADDR'];
		}

		$hostname = gethostname();
		$ipv4     = gethostbyname( $hostname );

		// Validate and return the IPv4 address
		if ( filter_var( $ipv4, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 ) ) {
			return $ipv4;
		}

		// Get the IPv6 address using dns_get_record
		$dnsRecords = dns_get_record( $hostname, DNS_AAAA );
		if ( ! empty( $dnsRecords ) ) {
			foreach ( $dnsRecords as $record ) {
				if ( isset( $record['ipv6'] ) && filter_var( $record['ipv6'], FILTER_VALIDATE_IP, FILTER_FLAG_IPV6 ) ) {
					return $record['ipv6'];
				}
			}
		}

		// Return a default IP address if none found
		return '127.0.0.1';
	}

// --------------------------------------------------

	/**
	 * @return string
	 */
	public
	static function ipAddress(): string {
		if ( class_exists( '\Vectorface\Whip\Whip' ) ) {

			// Use a Whip library to get the valid IP address
			$clientAddress = ( new \Vectorface\Whip\Whip( \Vectorface\Whip\Whip::ALL_METHODS ) )->getValidIpAddress();
			if ( false !== $clientAddress ) {
				return $clientAddress;
				//return preg_replace( '/^::1$/', '127.0.0.1', $clientAddress );
			}
		} else {


			// Check for CloudFlare's connecting IP
			if ( isset( $_SERVER['HTTP_CF_CONNECTING_IP'] ) ) {
				return $_SERVER['HTTP_CF_CONNECTING_IP'];
			}

			// Check for forwarded IP (proxy) and get the first valid IP
			if ( isset( $_SERVER['HTTP_X_FORWARDED_FOR'] ) ) {
				foreach ( explode( ',', $_SERVER['HTTP_X_FORWARDED_FOR'] ) as $ip ) {
					$ip = trim( $ip );
					if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
						return $ip;
					}
				}
			}

			// Check for client IP
			if ( isset( $_SERVER['HTTP_CLIENT_IP'] ) && filter_var( $_SERVER['HTTP_CLIENT_IP'], FILTER_VALIDATE_IP ) ) {
				return $_SERVER['HTTP_CLIENT_IP'];
			}

			// Fallback to remote address
			if ( isset( $_SERVER['REMOTE_ADDR'] ) && filter_var( $_SERVER['REMOTE_ADDR'], FILTER_VALIDATE_IP ) ) {
				return $_SERVER['REMOTE_ADDR'];
			}
		}

		// Fallback to localhost IP
		return '127.0.0.1';
	}

// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public
	static function htAccess(): bool {
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
	public
	static function checkPluginActive(
		string $plugin_slug
	): bool {
		return self::checkPluginInstalled( $plugin_slug ) && is_plugin_active( $plugin_slug );
	}

// -------------------------------------------------------------

	/**
	 * @param string $plugin_slug
	 *
	 * @return bool
	 */
	public
	static function checkPluginInstalled(
		string $plugin_slug
	): bool {

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
	public
	static function isAcfActive(): bool {
		return self::checkPluginActive( 'secure-custom-fields/secure-custom-fields.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields/acf.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public
	static function isAcfProActive(): bool {
		return self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

// -------------------------------------------------------------

	/**
	 * @return bool
	 */
	public
	static function isRankMathActive(): bool {
		return self::checkPluginActive( 'seo-by-rank-math/rank-math.php' ) ||
		       self::checkPluginActive( 'seo-by-rank-math-pro/rank-math-pro.php' );
	}

// -------------------------------------------------------------
}
