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

	// -------------------------------------------------------------

	/**
	 * @param $name
	 * @param mixed $default
	 *
	 * @return array|mixed
	 */
	public static function filterSettingOptions( $name, mixed $default = [] ): mixed {
		$filters = apply_filters( 'hd_theme_settings_filter', [] );

		if ( isset( $filters[ $name ] ) ) {
			return $filters[ $name ] ?: $default;
		}

		return [];
	}

	// --------------------------------------------------

	/**
	 * @param string|null $string
	 * @param bool $remove_js
	 * @param bool $flatten
	 * @param $allowed_tags
	 *
	 * @return string
	 */
	public static function stripAllTags( ?string $string, bool $remove_js = true, bool $flatten = true, $allowed_tags = null ): string {
		if ( ! is_scalar( $string ) ) {
			return '';
		}

		if ( $remove_js ) {
			$string = preg_replace( '@<(script|style)[^>]*?>.*?</\\1>@si', ' ', $string );
		}

		$string = strip_tags( $string, $allowed_tags );

		if ( $flatten ) {
			$string = preg_replace( '/[\r\n\t ]+/', ' ', $string );
		}

		return trim( $string );
	}

	// --------------------------------------------------

	/**
	 * @param string|null $string
	 *
	 * @return string|null
	 */
	public static function escAttr( ?string $string ): ?string {
		return esc_attr( self::stripAllTags( $string ) );
	}

	// -------------------------------------------------------------

	/**
	 * @param $message
	 * @param bool $auto_hide
	 *
	 * @return void
	 */
	public static function messageSuccess( $message, bool $auto_hide = false ): void {
		$message = $message ?: 'Values saved';
		$message = __( $message, ADDONS_TEXT_DOMAIN );

		$class = 'notice notice-success is-dismissible';
		if ( $auto_hide ) {
			$class .= ' dismissible-auto';
		}

		printf( '<div class="%1$s"><p><strong>%2$s</strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', self::escAttr( $class ), $message );
	}

	// -------------------------------------------------------------

	/**
	 * @param $message
	 * @param bool $auto_hide
	 *
	 * @return void
	 */
	public static function messageError( $message, bool $auto_hide = false ): void {
		$message = $message ?: 'Values error';
		$message = __( $message, ADDONS_TEXT_DOMAIN );

		$class = 'notice notice-error is-dismissible';
		if ( $auto_hide ) {
			$class .= ' dismissible-auto';
		}

		printf( '<div class="%1$s"><p><strong>%2$s</strong></p><button type="button" class="notice-dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button></div>', self::escAttr( $class ), $message );
	}

	// --------------------------------------------------

	/**
	 * @return void
	 */
	public static function clearAllCache(): void {
		global $wpdb;

		// Clear object cache (e.g., Redis or Memcached)
		if ( function_exists( 'wp_cache_flush' ) ) {
			wp_cache_flush();
		}

		// LiteSpeed cache
		if ( class_exists( \LiteSpeed\Purge::class ) ) {
			\LiteSpeed\Purge::purge_all();
		}

		// WP-Rocket cache
		if ( \defined( 'WP_ROCKET_PATH' ) && \function_exists( 'rocket_clean_domain' ) ) {
			\rocket_clean_domain();
		}

		// Clearly minified CSS and JavaScript files (WP-Rocket)
		if ( function_exists( 'rocket_clean_minify' ) ) {
			\rocket_clean_minify();
		}

		// Jetpack transient cache
		if ( self::checkPluginActive( 'jetpack/jetpack.php' ) ) {
			$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_jetpack_%'" );
			$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_jetpack_%'" );

			// Clear Jetpack Photon cache locally
			if ( class_exists( \Jetpack_Photon::class ) ) {
				\Jetpack_Photon::instance()->purge_cache();
			}
		}

		// Clear all WordPress transients
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%'" );
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_%'" );
	}

	// --------------------------------------------------

	/**
	 * @param string $option
	 *
	 * @return bool
	 */
	public static function removeOption( string $option ): bool {
		$option = strtolower( trim( $option ) );
		if ( empty( $option ) ) {
			return false;
		}

		$site_id   = is_multisite() ? get_current_blog_id() : null;
		$cache_key = $site_id ? "site_option_{$site_id}_{$option}" : "option_{$option}";

		// Remove the option from the appropriate context (multisite or not)
		$removed = is_multisite()
			? delete_site_option( $option )
			: delete_option( $option );

		if ( $removed ) {
			wp_cache_delete( $cache_key, 'options' );
		}

		return $removed;
	}

	// --------------------------------------------------

	/**
	 * @param string $option
	 * @param mixed $new_value
	 * @param int $expire_cache
	 * @param bool|null $autoload
	 *
	 * @return bool
	 */
	public static function updateOption( string $option, mixed $new_value, int $expire_cache = 21600, ?bool $autoload = null ): bool {
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
	public static function getOption( string $option, mixed $default = false, int $expire_cache = 21600 ): mixed {
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
