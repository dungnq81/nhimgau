<?php

namespace Addons;

use Symfony\Component\Yaml\Exception\ParseException;
use Symfony\Component\Yaml\Yaml;
use Vectorface\Whip\Whip;
use MatthiasMullie\Minify;

\defined( 'ABSPATH' ) || exit;

/**
 * Addon Helper Class
 *
 * @author Gaudev
 */
final class Helper {

	// --------------------------------------------------

	/**
	 * @param array $checked_arr
	 * @param $current
	 * @param bool $display
	 * @param string $type
	 *
	 * @return string|void
	 */
	public static function inArrayChecked( array $checked_arr, $current, bool $display = true, string $type = 'checked' ) {
		$type   = preg_match( '/^[a-zA-Z0-9\-]+$/', $type ) ? $type : 'checked';
		$result = in_array( $current, $checked_arr, false ) ? " $type='$type'" : '';

		// Echo or return the result
		if ( $display ) {
			echo $result;
		} else {
			return $result;
		}
	}

	// --------------------------------------------------

	/**
	 * @param string $size
	 *
	 * @return int
	 */
	public static function convertToMB( string $size ): int {
		// Define the multipliers for each unit
		$unitMultipliers = [
			'M' => 1,              // Megabyte
			'G' => 1024,           // Gigabyte
			'T' => 1024 * 1024     // Terabyte
		];

		// Extract the numeric part and the unit from the input string
		$size = strtoupper( trim( $size ) );
		if ( preg_match( '/^(\d+)(M|MB|G|GB|T|TB)?$/', $size, $matches ) ) {
			$value = (int) $matches[1];
			$unit  = rtrim( $matches[2] ?? 'M', 'B' ); // Remove 'B' if it exists

			// Calculate the size in MB
			return $value * ( $unitMultipliers[ $unit ] ?? 1 );
		}

		// Return 0 if the input is not valid
		return 0;
	}

	// --------------------------------------------------

	/**
	 * @param string|null $url
	 *
	 * @return bool
	 */
	public static function isUrl( ?string $url ): bool {
		// Basic URL validation using filter_var
		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) ) {
			return false;
		}

		// Ensure URL has a valid scheme (http or https)
		$valid_schemes = [ 'http', 'https' ];
		$scheme        = parse_url( $url, PHP_URL_SCHEME );
		if ( ! in_array( $scheme, $valid_schemes, true ) ) {
			return false;
		}

		// Ensure URL has a valid host
		$host = parse_url( $url, PHP_URL_HOST );

		return filter_var( $host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME ) !== false;
	}

	// --------------------------------------------------

	public static function Lighthouse(): bool {
		if ( ! isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
			return false;
		}

		$header = $_SERVER['HTTP_USER_AGENT'];

		return stripos( $header, 'Lighthouse' ) !== false;
	}

	// --------------------------------------------------

	/**
	 * @param string $content
	 *
	 * @return string
	 */
	public static function extractJS( string $content ): string {
		$script_pattern = '/<script\b[^>]*>(.*?)<\/script>/is';
		preg_match_all( $script_pattern, $content, $matches );

		$valid_scripts = [];

		// Define patterns for detecting potentially malicious code or encoding
		$malicious_patterns = [
			'/eval\(/i',            // Use of eval()
			'/document\.write\(/i', // Use of document.write()
			'/<script.*?src=[\'"]?data:/i', // Inline scripts with data URIs
			'/base64,/i',           // Base64 encoding
		];

		foreach ( $matches[0] as $index => $scriptTag ) {
			$scriptContent = trim( $matches[1][ $index ] );
			$hasSrc        = preg_match( '/\bsrc=["\'].*?["\']/', $scriptTag );

			$isMalicious = false;
			foreach ( $malicious_patterns as $pattern ) {
				if ( preg_match( $pattern, $scriptContent ) ) {
					$isMalicious = true;

					break;
				}
			}

			if ( ! $isMalicious && ( $scriptContent !== '' || $hasSrc ) ) {
				$valid_scripts[] = $scriptTag;
			}
		}

		// Replace original <script> tags in the content with the valid ones
		return preg_replace_callback( $script_pattern, static function ( $match ) use ( $valid_scripts ) {
			static $i = 0;

			return isset( $valid_scripts[ $i ] ) ? $valid_scripts[ $i ++ ] : '';
		}, $content );
	}

	// --------------------------------------------------

	/**
	 * @param string $css
	 *
	 * @return string
	 */
	public static function extractCss( string $css ): string {
		if ( empty( $css ) ) {
			return '';
		}

		$css = preg_replace( '/<script\b[^>]*>(.*?)<\/script>/is', '', $css );
		$css = strip_tags( $css );
		$css = preg_replace( '/[^a-zA-Z0-9\s\.\#\:\;\,\-\_\(\)\{\}\/\*]/', '', $css );
		$css = preg_replace( '/\/\*.*?\*\//s', '', $css );

		return trim( $css );
	}

	// -------------------------------------------------------------

	/**
	 * @param string|null $js
	 * @param bool $debug_check
	 *
	 * @return string|null
	 */
	public static function JSMinify( ?string $js, bool $debug_check = true ): ?string {
		if ( empty( $js ) ) {
			return null;
		}

		if ( $debug_check && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			return $js;
		}

		if ( class_exists( Minify\JS::class ) ) {
			return ( new Minify\JS() )->add( $js )->minify();
		}

		return $js;
	}

	// -------------------------------------------------------------

	/**
	 * @param string|null $css
	 * @param bool $debug_check
	 *
	 * @return string|null
	 */
	public static function CSSMinify( ?string $css, bool $debug_check = true ): ?string {
		if ( empty( $css ) ) {
			return null;
		}

		if ( $debug_check && defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			return $css;
		}

		if ( class_exists( Minify\CSS::class ) ) {
			return ( new Minify\CSS() )->add( $css )->minify();
		}

		return $css;
	}

	// -------------------------------------------------------------

	/**
	 * @param string $mixed
	 * @param string $post_type
	 * @param string $code_type
	 * @param bool $encode
	 *
	 * @return \WP_Error|int|array|\WP_Post|null
	 */
	public static function updateCustomPostOption( string $mixed, string $post_type, string $code_type, bool $encode = false ): \WP_Error|int|array|\WP_Post|null {
		// $post_type = $post_type ?: 'addon_css';
		// $code_type = $code_type ?: 'text/css';

		if ( empty( $post_type ) || empty( $code_type ) ) {
			return false;
		}

		if ( in_array( $code_type, [ 'css', 'text/css' ] ) ) {
			$mixed = self::extractCss( $mixed );
		}

		if ( in_array( $code_type, [ 'mixed', 'javascript', 'text/javascript', 'text/html' ] ) ) {
			$mixed = self::extractJS( $mixed );
		}

		if ( $encode ) {
			$mixed = base64_encode( $mixed );
		}

		$post_data = [
			'post_type'    => $post_type,
			'post_status'  => 'publish',
			'post_content' => $mixed
		];

		// Update `post` if it already exists, otherwise create a new one.
		$post = self::getCustomPostOption( $post_type );
		if ( $post ) {
			$post_data['ID'] = $post->ID;
			$r               = wp_update_post( wp_slash( $post_data ), true );
		} else {
			$post_data['post_title'] = $post_type . '_post_title';
			$post_data['post_name']  = wp_generate_uuid4();
			$r                       = wp_insert_post( wp_slash( $post_data ), true );

			if ( ! is_wp_error( $r ) ) {
				self::setThemeMod( $post_type . '_option_id', $r );

				// Trigger creation of a revision. This should be removed once #30854 is resolved.
				$revisions = wp_get_latest_revision_id_and_total_count( $r );
				if ( ! is_wp_error( $revisions ) && 0 === $revisions['count'] ) {
					wp_save_post_revision( $r );
				}
			}
		}

		if ( is_wp_error( $r ) ) {
			return $r;
		}

		return get_post( $r );
	}

	// -------------------------------------------------------------

	/**
	 * @param string $post_type
	 * @param bool $encode
	 *
	 * @return array|string
	 */
	public static function getCustomPostContent( string $post_type, bool $encode = false ): array|string {
		if ( empty( $post_type ) ) {
			return '';
		}

		$post = self::getCustomPostOption( $post_type );
		if ( isset( $post->post_content ) ) {
			$post_content = wp_unslash( $post->post_content );
			if ( $encode ) {
				$post_content = wp_unslash( base64_decode( $post->post_content ) );
			}

			return $post_content;
		}

		return '';
	}

	// -------------------------------------------------------------

	/**
	 * @param string $post_type
	 *
	 * @return array|\WP_Post|null
	 */
	public static function getCustomPostOption( string $post_type ): array|\WP_Post|null {
		if ( empty( $post_type ) ) {
			return null;
		}

		$post    = null;
		$post_id = self::getThemeMod( $post_type . '_option_id' );

		if ( $post_id > 0 && get_post( $post_id ) ) {
			$post = get_post( $post_id );
		}

		// `-1` indicates no post exists; no query necessary.
		if ( ! $post && - 1 !== $post_id ) {

			$custom_query_vars = [
				'post_type'              => $post_type,
				'post_status'            => get_post_stati(),
				'posts_per_page'         => 1,
				'no_found_rows'          => true,
				'cache_results'          => true,
				'update_post_meta_cache' => false,
				'update_post_term_cache' => false,
				'lazy_load_term_meta'    => false,
			];

			$post = ( new \WP_Query( $custom_query_vars ) )->post;
			self::setThemeMod( $post_type . '_option_id', $post->ID ?? - 1 );
		}

		return $post;
	}

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
	 * @param string $mod_name
	 * @param mixed $value
	 * @param int $expire_cache
	 *
	 * @return bool
	 */
	public static function setThemeMod( string $mod_name, mixed $value, int $expire_cache = 21600 ): bool {
		if ( empty( $mod_name ) ) {
			return false;
		}

		$mod_name_lower = strtolower( $mod_name );

		set_theme_mod( $mod_name, $value );
		$cache_key = "theme_mod_{$mod_name_lower}";
		wp_cache_set( $cache_key, $value, 'theme_mods', $expire_cache );

		return true;
	}

	// --------------------------------------------------

	/**
	 * @param string|null $mod_name
	 * @param mixed $default
	 * @param int $expire_cache
	 *
	 * @return mixed
	 */
	public static function getThemeMod( ?string $mod_name, mixed $default = false, int $expire_cache = 21600 ): mixed {
		if ( empty( $mod_name ) ) {
			return $default;
		}

		$mod_name_lower = strtolower( $mod_name );

		$cache_key    = "theme_mod_{$mod_name_lower}";
		$cached_value = wp_cache_get( $cache_key, 'theme_mods' );
		if ( $cached_value !== false ) {
			return $cached_value;
		}

		$_mod      = get_theme_mod( $mod_name, $default );
		$mod_value = is_ssl() ? str_replace( 'http://', 'https://', $_mod ) : $_mod;

		wp_cache_set( $cache_key, $mod_value, 'theme_mods', $expire_cache );

		return $mod_value;
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

	public static function isAcfActive(): bool {
		return self::checkPluginActive( 'secure-custom-fields/secure-custom-fields.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields/acf.php' ) ||
		       self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

	// -------------------------------------------------------------

	public static function isAcfProActive(): bool {
		return self::checkPluginActive( 'advanced-custom-fields-pro/acf.php' );
	}

	// -------------------------------------------------------------
}
