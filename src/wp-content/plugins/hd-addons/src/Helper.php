<?php

namespace Addons;

use Detection\Exception\MobileDetectException;
use Detection\MobileDetect;
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
	 * @param string $message
	 * @param int $message_type
	 * @param string|null $destination
	 * @param string|null $additional_headers
	 *
	 * @return void
	 */
	public static function errorLog( string $message, int $message_type = 0, ?string $destination = null, ?string $additional_headers = null ): void {
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			error_log( $message, $message_type, $destination, $additional_headers );
		}
	}

	// --------------------------------------------------

	/**
	 * @param string $tag
	 * @param array $atts
	 * @param string|null $content
	 *
	 * @return mixed
	 */
	public static function doShortcode( string $tag, array $atts = [], ?string $content = null ): mixed {
		global $shortcode_tags;

		// Check if the shortcode exists
		if ( ! isset( $shortcode_tags[ $tag ] ) ) {
			return false;
		}

		// Call the shortcode function and return its output
		return call_user_func( $shortcode_tags[ $tag ], $atts, $content, $tag );
	}

	// --------------------------------------------------

	/**
	 * @param mixed $delimiters
	 * @param string|null $string
	 * @param bool $remove_empty
	 *
	 * @return null[]|string[]
	 */
	public static function explodeMulti( mixed $delimiters, ?string $string, bool $remove_empty = true ): array {
		if ( is_string( $delimiters ) ) {
			return explode( $delimiters, $string );
		}

		if ( is_array( $delimiters ) ) {
			$ready  = str_replace( $delimiters, $delimiters[0], $string );
			$launch = explode( $delimiters[0], $ready );

			if ( $remove_empty ) {
				$launch = array_filter( $launch );
			}

			return array_values( $launch );
		}

		return [ $string ];
	}

	// --------------------------------------------------

	/**
	 * @param $content
	 *
	 * @return false|int
	 */
	public static function isXml( $content ): false|int {
		// Get the first 200 chars of the file to make the preg_match check faster.
		$xml_part = substr( $content, 0, 20 );

		return preg_match( '/<\?xml version="/', $xml_part );
	}

	// --------------------------------------------------

	/**
	 * @param $html
	 *
	 * @return false|int
	 */
	public static function isAmpEnabled( $html ): false|int {
		// Get the first 200 chars of the file to make the preg_match check faster.
		$is_amp = substr( $html, 0, 200 );

		// Checks if the document contains the amp tag.
		return preg_match( '/<html[^>]+(amp|⚡)[^>]*>/u', $is_amp );
	}

	// --------------------------------------------------

	public static function redirect( string $uri = '', int $status = 301 ) {
		if ( ! headers_sent() ) {
			wp_redirect( $uri, $status );
			exit;
		}

		echo '<script>window.location.href="' . $uri . '";</script>';
		echo '<noscript><meta http-equiv="refresh" content="0;url=' . $uri . '" /></noscript>';

		return true;
	}

	// --------------------------------------------------

	/**
	 * Get the current url.
	 *
	 * @return string The current url.
	 */
	public static function getCurrentUrl(): string {
		// Return an empty string if it is not an HTTP request.
		if ( ! isset( $_SERVER['HTTP_HOST'] ) ) {
			return '';
		}

		$protocol = isset( $_SERVER['HTTPS'] ) ? 'https' : 'http';

		// Build the current url.
		return $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
	}

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
			'T' => 1024 * 1024,     // Terabyte
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

		// Ensure the URL has a valid scheme (http or https)
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

	public static function lightHouse(): bool {
		if ( empty( $_SERVER['HTTP_USER_AGENT'] ) ) {
			return false;
		}

		$userAgent = strtolower( trim( $_SERVER['HTTP_USER_AGENT'] ) );

		return str_contains( $userAgent, 'lighthouse' );
	}

	// --------------------------------------------------

	/**
	 * @param string $content
	 *
	 * @return string
	 */
	public static function extractJS( string $content ): string {
		$script_pattern = '/<script\b[^>]*>(.*?)<\/script>/is';
		preg_match_all( $script_pattern, $content, $matches, PREG_SET_ORDER );

		$valid_scripts = [];

		// Patterns for detecting potentially malicious code
		$malicious_patterns = [
			'/eval\(/i',
			'/document\.write\(/i',
			//'/<script.*?src=[\'"]?data:/i',
			'/base64,/i',
		];

		foreach ( $matches as $match ) {
			$scriptTag     = $match[0]; // Full <script> tag
			$scriptContent = trim( $match[1] ?? '' ); // Script content inside <script>...</script>
			$hasSrc        = preg_match( '/\bsrc=["\'][^"\']+["\']/i', $scriptTag );

			$isMalicious = false;
			if ( ! $hasSrc && $scriptContent !== '' ) {
				foreach ( $malicious_patterns as $pattern ) {
					if ( preg_match( $pattern, $scriptContent ) ) {
						$isMalicious = true;
						break;
					}
				}
			}

			// Retain scripts that have valid src or are clean inline scripts
			if ( ! $isMalicious || $hasSrc ) {
				$valid_scripts[] = $scriptTag;
			}
		}

		// Reconstruct content with valid <script> tags
		return preg_replace_callback( $script_pattern, static function () use ( &$valid_scripts ) {
			return array_shift( $valid_scripts ) ?? '';
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

		// Convert encoding to UTF-8 if needed
		if ( mb_detect_encoding( $css, 'UTF-8', true ) !== 'UTF-8' ) {
			$css = mb_convert_encoding( $css, 'UTF-8', 'auto' );
		}

		// Log if dangerous content is detected
		if ( preg_match( '/<script\b[^>]*>/i', $css ) ) {
			self::errorLog( 'Warning: Detected `<script>` tag in CSS.' );
		}

		//$css = (string) $css;
		$css = preg_replace( [
			'/<script\b[^>]*>.*?(?:<\/script>|$)/is', // Remove <script> tags entirely
			'/<style\b[^>]*>(.*?)<\/style>/is', // Remove <style> tags but keep the CSS content inside
			'/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', // // Remove unwanted control characters but keep line breaks and tabs
			'/\bexpression\s*\([^)]*\)/i',
			'/url\s*\(\s*[\'"]?\s*javascript:[^)]*\)/i',
			'/[^\S\r\n\t]+/', // Normalize whitespace
		], [ '', '$1', '', '', '', ' ' ], $css );

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
		$cache_key = $site_id ? "hd_site_option_{$site_id}_{$option}" : "hd_option_{$option}";

		// Remove the option from the appropriate context (multisite or not)
		$removed = is_multisite() ? delete_site_option( $option ) : delete_option( $option );
		if ( $removed ) {
			delete_transient( $cache_key );
		}

		return $removed;
	}

	// --------------------------------------------------

	/**
	 * @param string $option
	 * @param mixed $new_value
	 * @param int $cache_in_hours
	 * @param bool|null $autoload
	 *
	 * @return bool
	 */
	public static function updateOption( string $option, mixed $new_value, int $cache_in_hours = 12, ?bool $autoload = null ): bool {
		$option = strtolower( trim( $option ) );
		if ( empty( $option ) ) {
			return false;
		}

		$cache_time = $cache_in_hours * HOUR_IN_SECONDS;

		$site_id   = is_multisite() ? get_current_blog_id() : null;
		$cache_key = $site_id ? "hd_site_option_{$site_id}_{$option}" : "hd_option_{$option}";

		// Update the option in the appropriate context (multisite or not)
		$updated = is_multisite() ? update_site_option( $option, $new_value ) : update_option( $option, $new_value, $autoload );

		if ( $updated ) {
			set_transient( $cache_key, $new_value, $cache_time );
		}

		return $updated;
	}

	// --------------------------------------------------

	/**
	 * @param string $option
	 * @param mixed $default
	 * @param int $cache_in_hours
	 *
	 * @return mixed
	 */
	public static function getOption( string $option, mixed $default = false, int $cache_in_hours = 12 ): mixed {
		$option = strtolower( trim( $option ) );
		if ( empty( $option ) ) {
			return $default;
		}

		$cache_time = $cache_in_hours * HOUR_IN_SECONDS;

		$site_id   = is_multisite() ? get_current_blog_id() : null;
		$cache_key = $site_id ? "hd_site_option_{$site_id}_{$option}" : "hd_option_{$option}";

		$cached_value = get_transient( $cache_key );
		if ( $cached_value !== false && defined( 'WP_DEBUG' ) && ! WP_DEBUG ) {
			return $cached_value;
		}

		$option_value = is_multisite() ? get_site_option( $option, $default ) : get_option( $option, $default );
		set_transient( $cache_key, $option_value, $cache_time );

		// Retrieve the option value
		return $option_value;
	}

	// --------------------------------------------------

	/**
	 * @param string $mod_name
	 * @param mixed $value
	 * @param int $cache_in_hours
	 *
	 * @return bool
	 */
	public static function setThemeMod( string $mod_name, mixed $value, int $cache_in_hours = 12 ): bool {
		if ( empty( $mod_name ) ) {
			return false;
		}

		$cache_time     = $cache_in_hours * HOUR_IN_SECONDS;
		$mod_name_lower = strtolower( $mod_name );
		$cache_key      = "hd_theme_mod_{$mod_name_lower}";

		set_theme_mod( $mod_name, $value );
		set_transient( $cache_key, $value, $cache_time );

		return true;
	}

	// --------------------------------------------------

	/**
	 * @param string|null $mod_name
	 * @param mixed $default
	 * @param int $cache_in_hours
	 *
	 * @return mixed
	 */
	public static function getThemeMod( ?string $mod_name, mixed $default = false, int $cache_in_hours = 12 ): mixed {
		if ( empty( $mod_name ) ) {
			return $default;
		}

		$cache_time     = $cache_in_hours * HOUR_IN_SECONDS;
		$mod_name_lower = strtolower( $mod_name );
		$cache_key      = "hd_theme_mod_{$mod_name_lower}";

		$cached_value = get_transient( $cache_key );
		if ( $cached_value !== false && defined( 'WP_DEBUG' ) && ! WP_DEBUG ) {
			return $cached_value;
		}

		$_mod      = get_theme_mod( $mod_name, $default );
		$mod_value = is_ssl() ? str_replace( 'http://', 'https://', $_mod ) : $_mod;

		set_transient( $cache_key, $mod_value, $cache_time );

		return $mod_value;
	}

	// -------------------------------------------------------------

	/**
	 * @param string $post_type
	 * @param int $cache_in_hours
	 *
	 * @return array|null
	 */
	public static function getCustomPostOption( string $post_type, int $cache_in_hours = 12 ): ?array {
		if ( empty( $post_type ) ) {
			return null;
		}

		$cache_time  = $cache_in_hours * HOUR_IN_SECONDS;
		$cache_key   = "hd_custom_post_{$post_type}";
		$cached_data = get_transient( $cache_key );

		if ( $cached_data !== false && defined( 'WP_DEBUG' ) && ! WP_DEBUG ) {
			return $cached_data;
		}

		$post    = null;
		$post_id = self::getThemeMod( $post_type . '_option_id' );

		if ( (int) $post_id > 0 ) {
			$post = get_post( $post_id );
		}

		// `-1` indicates no post exists; no query necessary.
		if ( ! $post && $post_id !== - 1 ) {
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

			$post = ( new \WP_Query( $custom_query_vars ) )?->post;
			self::setThemeMod( $post_type . '_option_id', $post?->ID ?? - 1 );
		}

		if ( $post ) {
			$cached_data = [
				'ID'           => $post->ID,
				'post_title'   => $post->post_title,
				'post_content' => $post->post_content,
				'post_excerpt' => $post->post_excerpt,
			];
			set_transient( $cache_key, $cached_data, $cache_time );
		}

		return $cached_data ?? null;
	}

	// -------------------------------------------------------------

	/**
	 * @param string $mixed
	 * @param string $post_type
	 * @param string $code_type
	 * @param bool $encode
	 * @param int $cache_in_hours
	 *
	 * @return array|false|\WP_Error
	 */
	public static function updateCustomPostOption(
		string $mixed,
		string $post_type,
		string $code_type,
		bool $encode = false,
		int $cache_in_hours = 12
	): \WP_Error|false|array {

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
			'post_content' => $mixed,
		];

		// Update `post` if it already exists, otherwise create a new one.
		$post = self::getCustomPostOption( $post_type );
		if ( $post ) {
			$post_data['ID'] = $post['ID'];
			$r               = wp_update_post( wp_slash( $post_data ), true );
		} else {
			$post_data['post_title'] = $post_type . '_post_title';
			$post_data['post_name']  = wp_generate_uuid4();
			$r                       = wp_insert_post( wp_slash( $post_data ), true );

			if ( ! is_wp_error( $r ) ) {
				self::setThemeMod( $post_type . '_option_id', $r );
			}
		}

		if ( is_wp_error( $r ) ) {
			return $r;
		}

		$updated_post = get_post( $r );
		$cache_key    = "hd_custom_post_{$post_type}";
		$cache_time   = $cache_in_hours * HOUR_IN_SECONDS;

		$cached_data = [
			'ID'           => $updated_post->ID,
			'post_title'   => $updated_post->post_title,
			'post_content' => $updated_post->post_content,
			'post_excerpt' => $updated_post->post_excerpt,
		];
		set_transient( $cache_key, $cached_data, $cache_time );

		return $cached_data;
	}

	// -------------------------------------------------------------

	/**
	 * @param string|null $post_type
	 * @param bool $encode
	 *
	 * @return array|string
	 */
	public static function getCustomPostContent( ?string $post_type, bool $encode = false ): array|string {
		if ( empty( $post_type ) ) {
			return '';
		}

		$post = self::getCustomPostOption( $post_type );
		if ( isset( $post->post_content ) ) {
			return $encode ? wp_unslash( base64_decode( $post->post_content ) ) : wp_unslash( $post->post_content );
		}

		return '';
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

	/**
	 * @return void
	 */
	public static function clearAllCache(): void {
		global $wpdb;

		// Clear all WordPress transients
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_%'" );
		$wpdb->query( "DELETE FROM {$wpdb->options} WHERE option_name LIKE '_transient_timeout_%'" );

		// Clear object cache (e.g., Redis or Memcached)
		if ( function_exists( 'wp_cache_flush' ) ) {
			wp_cache_flush();
		}

		// WP-Rocket cache
		if ( self::checkPluginActive( 'wp-rocket/wp-rocket.php' ) ) {
			$actions = [
				'save_post',            // Save a post
				'deleted_post',         // Delete a post
				'trashed_post',         // Empty Trashed post
				'edit_post',            // Edit a post - includes leaving comments
				'delete_attachment',    // Delete an attachment - includes re-uploading
				'switch_theme',         // Change theme
			];

			// Add the action for each event
			foreach ( $actions as $event ) {
				add_action( $event, static function () {
					\function_exists( 'rocket_clean_domain' ) && \rocket_clean_domain();
				} );
			}
		}

		// Clear FlyingPress cache
		if ( self::checkPluginActive( 'flying-press/flying-press.php' ) ) {
			class_exists( \FlyingPress\Purge::class ) && \FlyingPress\Purge::purge_everything();
		}

		// LiteSpeed cache
		if ( self::checkPluginActive( 'litespeed-cache/litespeed-cache.php' ) ) {
			class_exists( \LiteSpeed\Purge::class ) && \LiteSpeed\Purge::purge_all();
		}
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
			self::errorLog( 'Symfony Yaml class does not exist' );

			return [];
		}

		try {
			// Return the translated configuration array
			return Yaml::parseFile( $configFile );
		} catch ( ParseException $e ) {
			self::errorLog( 'YAML Parse error in file ' . $configFile . ': ' . $e->getMessage() );

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

			// Fallback to a remote address
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
	 * @throws MobileDetectException
	 */
	public static function isMobile(): bool {
		if ( class_exists( MobileDetect::class ) ) {
			return ( new MobileDetect() )->isMobile();
		}

		// Fallback to WordPress function
		return wp_is_mobile();
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

	/**
	 * @return bool
	 */
	public static function isCf7Active(): bool {
		return self::checkPluginActive( 'contact-form-7/wp-contact-form-7.php' );
	}

	// -------------------------------------------------------------
}
