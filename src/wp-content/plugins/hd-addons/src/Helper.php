<?php

namespace Addons;

use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;
use Vectorface\Whip\Whip;

\defined( 'ABSPATH' ) || exit;

/**
 * Addon Helper Class
 *
 * @author Gaudev
 */
final class Helper {

	// --------------------------------------------------

	/**
	 * @param string $option
	 * @param mixed $new_value
	 * @param int $expire_cache
	 * @param bool|null $autoload
	 *
	 * @return bool
	 */
	public static function updateOption( string $option, mixed $new_value, int $expire_cache = 43200, ?bool $autoload = null ): bool {
		$option = strtolower( trim( $option ) );
		if ( empty( $option ) ) {
			return false;
		}

		$site_id   = is_multisite() ? get_current_blog_id() : null;
		$cache_key = $site_id ? "site_option_{$site_id}_{$option}" : "option_{$option}";

		// Update the option in the appropriate context (multisite or not)
		$updated = is_multisite()
			? update_site_option( $option, $new_value )
			: update_option( $option, $new_value, $autoload );

		if ( $updated ) {
			wp_cache_delete( $cache_key, 'options' );
			wp_cache_set( $cache_key, $new_value, 'options', $expire_cache );
		}

		return $updated;
	}

	// --------------------------------------------------

	/**
	 * @param string $option
	 * @param mixed $default
	 * @param int $expire_cache
	 *
	 * @return mixed
	 */
	public static function getOption( string $option, mixed $default = false, int $expire_cache = 43200 ): mixed {
		// Validate the option key
		$option = strtolower( trim( $option ) );
		if ( empty( $option ) ) {
			return $default;
		}

		$site_id      = is_multisite() ? get_current_blog_id() : null;
		$cache_key    = $site_id ? "site_option_{$site_id}_{$option}" : "option_{$option}";
		$cached_value = wp_cache_get( $cache_key, 'options' );
		if ( $cached_value !== false ) {
			return $cached_value;
		}

		$option_value = is_multisite() ? get_site_option( $option, $default ) : get_option( $option, $default );
		wp_cache_set( $cache_key, $option_value, 'options', $expire_cache );

		// Retrieve the option value
		return $option_value;
	}

	// --------------------------------------------------

	/**
	 * @param $slug
	 * @param bool $remove_symbols
	 *
	 * @return string
	 */
	public static function capitalizedSlug( $slug, bool $remove_symbols = true ): string {
		$words            = preg_split( '/[_-]/', $slug );
		$capitalizedWords = array_map( 'ucfirst', $words );

		if ( $remove_symbols ) {
			return implode( '', $capitalizedWords );
		}

		if ( str_contains( $slug, '_' ) ) {
			return implode( '_', $capitalizedWords );
		}

		return implode( '-', $capitalizedWords );
	}

	// --------------------------------------------------

	/**
	 * @param $configFile
	 *
	 * @return array
	 */
	public static function loadYaml( $configFile ): array {
		// Check if the YAML class exists
		if ( ! class_exists( Yaml::class ) ) {
			error_log( 'Symfony Yaml class does not exist' );

			return [];
		}

		try {
			// Return the translated configuration array
			return Yaml::parseFile( $configFile );
		} catch ( ParseException $e ) {
			error_log( 'YAML Parse error in file ' . $configFile . ': ' . $e->getMessage() );

			return [];
		}
	}

	// --------------------------------------------------

	/**
	 * @return string
	 */
	public static function serverIpAddress(): string {
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
	public static function ipAddress(): string {
		if ( class_exists( Whip::class ) ) {

			// Use a Whip library to get the valid IP address
			$clientAddress = ( new Whip( Whip::ALL_METHODS ) )->getValidIpAddress();
			if ( false !== $clientAddress ) {
				return $clientAddress;
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
}
