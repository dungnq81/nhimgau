<?php

namespace HD;

use HD\Utilities\Traits\Wp;
use MatthiasMullie\Minify;

\defined( 'ABSPATH' ) || die;

/**
 * Helper Class
 *
 * @author Gaudev
 */
final class Helper {
	use Wp;

	// -------------------------------------------------------------

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

	// -------------------------------------------------------------

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
		$css = preg_replace( '/[^a-zA-Z0-9\s\.\#\:\;\,\-\_\(\)\{\}\/\*\!\%\@\+\>\~\=\"\'\\\\]/', '', $css );
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

	// -------------------------------------------------------------

	/**
	 * @return mixed|string
	 */
	public static function currentLanguage(): mixed {
		// Polylang
		if ( function_exists( "pll_current_language" ) ) {
			return pll_current_language( "slug" );
		}

		// Weglot
		if ( function_exists( "weglot_get_current_language" ) ) {
			return weglot_get_current_language();
		}

		// WMPL
		$currentLanguage = apply_filters( 'wpml_current_language', null );

		// Try to fall back on the current language
		if ( ! $currentLanguage ) {
			return strtolower( substr( get_bloginfo( 'language' ), 0, 2 ) );
		}

		return $currentLanguage;
	}

	// --------------------------------------------------

	/**
	 * @return bool
	 */
	public static function Lighthouse(): bool {
		// Check if 'HTTP_USER_AGENT' is set in the server variables
		if ( ! isset( $_SERVER['HTTP_USER_AGENT'] ) ) {
			return false;
		}

		$header = $_SERVER['HTTP_USER_AGENT'];

		// Use stripos for case-insensitive search of "Lighthouse"
		return stripos( $header, 'Lighthouse' ) !== false;
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
	 * @param $value
	 * @param $min
	 * @param $max
	 *
	 * @return bool
	 */
	public static function inRange( $value, $min, $max ): bool {
		$inRange = filter_var( $value, FILTER_VALIDATE_INT, [
			'options' => [
				'min_range' => (int) $min,
				'max_range' => (int) $max,
			],
		] );

		return false !== $inRange;
	}

	// -------------------------------------------------------------

	/**
	 * @param array $array_a
	 * @param array $array_b
	 *
	 * @return bool
	 */
	public static function checkValuesNotInRanges( array $array_a, array $array_b ): bool {
		foreach ( $array_a as $range ) {

			// Ensure range is valid
			if ( count( $range ) !== 2 || ! is_numeric( $range[0] ) || ! is_numeric( $range[1] ) ) {
				continue;
			}

			$start = min( $range );
			$end   = max( $range );

			foreach ( $array_b as $value ) {
				if ( $value >= $start && $value < $end ) {
					return false;
				}
			}

			// Additional check for whether array_b contains the entire range of array_a
			if ( min( $array_b ) <= $start && max( $array_b ) >= $end ) {
				return false;
			}
		}

		return true;
	}

	// --------------------------------------------------

	/**
	 * A fallback when no navigation is selected by default.
	 *
	 * @param bool $container
	 *
	 * @return void
	 */
	public static function menuFallback( bool $container = false ): void {
		echo '<div class="menu-fallback">';
		if ( $container ) {
			echo '<div class="container">';
		}

		/* translators: %1$s: link to menus, %2$s: link to customize. */
		printf(
			__( 'Please assign a menu to the primary menu location under %1$s or %2$s the design.', TEXT_DOMAIN ),
			/* translators: %s: menu url */
			sprintf(
				__( '<a class="_blank" href="%s">Menus</a>', TEXT_DOMAIN ),
				get_admin_url( get_current_blog_id(), 'nav-menus.php' )
			),
			/* translators: %s: customize url */
			sprintf(
				__( '<a class="_blank" href="%s">Customize</a>', TEXT_DOMAIN ),
				get_admin_url( get_current_blog_id(), 'customize.php' )
			)
		);

		if ( $container ) {
			echo '</div>';
		}

		echo '</div>';
	}

	// --------------------------------------------------

	/**
	 * @param string $img
	 *
	 * @return string
	 */
	public static function pixelImg( string $img = '' ): string {
		if ( file_exists( $img ) ) {
			return $img;
		}

		return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	}

	// --------------------------------------------------

	/**
	 * @param bool $img_wrap
	 * @param bool $thumb
	 *
	 * @return string
	 */
	public static function placeholderSrc( bool $img_wrap = true, bool $thumb = true ): string {
		$src = THEME_URL . 'storage/img/placeholder.png';
		if ( $thumb ) {
			$src = THEME_URL . 'storage/img/placeholder-320x320.png';
		}
		if ( $img_wrap ) {
			$src = "<img loading=\"lazy\" src=\"{$src}\" alt=\"place-holder\" class=\"wp-placeholder\">";
		}

		return $src;
	}

	// --------------------------------------------------

	/**
	 * @param string $str
	 * @param string $attr
	 * @param string $content_extra
	 * @param bool $unique
	 *
	 * @return string
	 */
	public static function appendToAttribute( string $str, string $attr, string $content_extra, bool $unique = false ): string {
		// Check if the attribute has single or double quotes.
		// @codingStandardsIgnoreLine
		if ( $start = stripos( $str, $attr . '="' ) ) {
			$quote = '"';

			// @codingStandardsIgnoreLine
		} elseif ( $start = stripos( $str, $attr . "='" ) ) {
			$quote = "'";
		} else {
			// Not found
			return $str;
		}

		// Add quote (for filtering purposes).
		$attr .= '=' . $quote;

		$content_extra = trim( $content_extra );

		if ( $unique ) {
			$start += strlen( $attr );
			$end   = strpos( $str, $quote, $start );

			// Get the current content.
			$content = explode( ' ', substr( $str, $start, $end - $start ) );

			// Get our extra content.
			foreach ( explode( ' ', $content_extra ) as $class ) {
				if ( ! empty( $class ) && ! in_array( $class, $content, false ) ) {
					$content[] = $class;
				}
			}

			// Remove duplicates and empty values.
			$content = array_unique( array_filter( $content ) );
			$content = implode( ' ', $content );

			$before_content = substr( $str, 0, $start );
			$after_content  = substr( $str, $end );

			$str = $before_content . $content . $after_content;
		} else {
			$str = preg_replace(
				'/' . preg_quote( $attr, '/' ) . '/',
				$attr . $content_extra . ' ',
				$str,
				1
			);
		}

		return $str;
	}

	// --------------------------------------------------

	/**
	 * @param $url
	 * @param int $resolution_key
	 *
	 * @return string
	 */
	public static function youtubeImage( $url, int $resolution_key = 0 ): string {
		if ( ! $url ) {
			return '';
		}

		$resolution = [
			'sddefault',
			'hqdefault',
			'mqdefault',
			'default',
			'maxresdefault',
		];

		$url_img = self::pixelImg();
		parse_str( wp_parse_url( $url, PHP_URL_QUERY ), $vars );
		if ( isset( $vars['v'] ) ) {
			$id      = $vars['v'];
			$url_img = 'https://img.youtube.com/vi/' . $id . '/' . $resolution[ $resolution_key ] . '.jpg';
		}

		return $url_img;
	}

	// --------------------------------------------------

	/**
	 * @param $url
	 * @param int $autoplay
	 * @param bool $lazyload
	 * @param bool $control
	 *
	 * @return string|null
	 */
	public static function youtubeIframe( $url, int $autoplay = 0, bool $lazyload = true, bool $control = true ): ?string {
		parse_str( wp_parse_url( $url, PHP_URL_QUERY ), $vars );
		$home = esc_url( trailingslashit( network_home_url() ) );

		// Check if the URL contains the 'v' parameter to get the video ID
		if ( isset( $vars['v'] ) ) {
			$videoId         = esc_attr( $vars['v'] );
			$iframeSize      = ' width="800" height="450"';
			$allowAttributes = 'accelerometer; encrypted-media; gyroscope; picture-in-picture';

			// Construct iframe src
			$src = "https://www.youtube.com/embed/{$videoId}?wmode=transparent&origin={$home}";

			// Add autoplay if enabled
			if ( $autoplay ) {
				$allowAttributes .= '; autoplay';
				$src             .= '&autoplay=1';
			}

			// Configure controls based on the $ control parameter
			if ( ! $control ) {
				$src .= '&modestbranding=1&controls=0&rel=0&version=3&loop=1&enablejsapi=1&iv_load_policy=3&playlist=' . $videoId;
			}

			// Ensure HTML5 video is used
			$src .= '&html5=1';

			// Add lazy loading if enabled
			$lazyLoadAttribute = $lazyload ? ' loading="lazy"' : '';

			// Return iframe HTML
			return sprintf(
				'<iframe id="ytb_iframe_%1$s" title="YouTube Video Player"%2$s allow="%3$s"%4$s src="%5$s" style="border:0"></iframe>',
				$videoId,
				$iframeSize,
				$allowAttributes,
				$lazyLoadAttribute,
				esc_url( $src )
			);
		}

		return null;
	}

	// --------------------------------------------------

	/**
	 * @param string $email
	 * @param string $title
	 * @param array|string $attributes
	 *
	 * @return string|null
	 */
	public static function safeMailTo( string $email, string $title = '', array|string $attributes = '' ): ?string {
		if ( ! filter_var( $email, FILTER_VALIDATE_EMAIL ) ) {
			return null;
		}

		$title        = $title ?: $email;
		$encodedEmail = '';

		// Convert email characters to HTML entities to obfuscate
		for ( $i = 0, $len = strlen( $email ); $i < $len; $i ++ ) {
			$encodedEmail .= '&#' . ord( $email[ $i ] ) . ';';
		}

		$encodedTitle = '';
		for ( $i = 0, $len = strlen( $title ); $i < $len; $i ++ ) {
			$encodedTitle .= '&#' . ord( $title[ $i ] ) . ';';
		}

		// Handle attributes
		$attrString = '';
		if ( is_array( $attributes ) ) {
			foreach ( $attributes as $key => $val ) {
				$attrString .= ' ' . htmlspecialchars( $key, ENT_QUOTES | ENT_HTML5 ) . '="' . htmlspecialchars( $val, ENT_QUOTES | ENT_HTML5 ) . '"';
			}
		} elseif ( is_string( $attributes ) ) {
			$attrString = ' ' . $attributes;
		}

		// Return obfuscated email using HTML entities only
		return '<a href="mailto:' . $encodedEmail . '"' . $attrString . '>' . $encodedTitle . '</a>';
	}
}
