<?php
/**
 * Helper functions
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom functions
// --------------------------------------------------

if ( ! function_exists( '_is_valid_phone' ) ) {
	/**
	 * @param $phone
	 *
	 * @return bool
	 */
	function _is_valid_phone( $phone ): bool {
		if ( ! is_string( $phone ) || trim( $phone ) === '' ) {
			return false;
		}

		$pattern = '/^\(?\+?(0|84?)\)?[\s.-]?(3[2-9]|5[689]|7[06-9]|8[0-689]|9[0-4|6-9])(\d{7}|\d[\s.-]?\d{3}[\s.-]?\d{3})$/';

		return preg_match( $pattern, $phone ) === 1;
	}
}

// --------------------------------------------------

if ( ! function_exists( '_sanitize_image' ) ) {
	/**
	 * @param $file
	 *
	 * @return mixed
	 */
	function _sanitize_image( $file ): mixed {
		$mimes = [
			'jpg|jpeg|jpe' => 'image/jpeg',
			'gif'          => 'image/gif',
			'png'          => 'image/png',
			'bmp'          => 'image/bmp',
			'webp'         => 'image/webp',
			'tif|tiff'     => 'image/tiff',
			'ico'          => 'image/x-icon',
			'svg'          => 'image/svg+xml',
		];

		// check a file type from the file name
		$file_ext = wp_check_filetype( $file, $mimes );

		// if a file has a valid mime type, return it, otherwise return default
		return ( $file_ext['ext'] ? $file : '' );
	}
}

// --------------------------------------------------

if ( ! function_exists( '_remove_cookie' ) ) {
	/**
	 * @param string $name
	 *
	 * @return void
	 */
	function _remove_cookie( string $name ): void {
		setcookie( $name, '', time() - 3600, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), false );
	}
}

// --------------------------------------------------

if ( ! function_exists( '_add_cookie' ) ) {
	/**
	 * @param string $name
	 * @param $value
	 * @param int $minute
	 *
	 * @return void
	 */
	function _add_cookie( string $name, $value, int $minute = 1440 ): void {
		if ( is_scalar( $value ) ) {
			setcookie( $name, $value, time() + $minute * MINUTE_IN_SECONDS, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), false );
		}
	}
}

// --------------------------------------------------

if ( ! function_exists( '_in_array_checked' ) ) {
	/**
	 * Conditionally adds an HTML attribute based on array membership.
	 *
	 * @param array $checked_arr
	 * @param $current
	 * @param bool $display
	 * @param string $type
	 *
	 * @return string|null
	 */
	function _in_array_checked( array $checked_arr, $current, bool $display = true, string $type = 'checked' ): ?string {
		$type   = preg_match( '/^[a-zA-Z0-9\-]+$/', $type ) ? $type : 'checked';
		$result = in_array( $current, $checked_arr, false ) ? " $type='$type'" : '';

		// Echo or return the result
		if ( $display ) {
			echo $result;

			return null;
		}

		return $result;
	}
}

// --------------------------------------------------

if ( ! function_exists( '_in_array_toggle_class' ) ) {
	/**
	 * Conditionally toggles an HTML class based on the presence of a key in an array.
	 *
	 * @param array $arr
	 * @param $key
	 * @param string $html_class
	 * @param true $display
	 *
	 * @return string|null
	 */
	function _in_array_toggle_class( array $arr, $key, string $html_class = '!hidden', true $display = true ): ?string {
		$html_class = trim( $html_class );
		if ( empty( $html_class ) || preg_match( '/[^a-zA-Z0-9\-_ ]/', $html_class ) ) {

			// Invalid HTML class; return or echo an empty string
			if ( $display ) {
				echo '';

				return null;
			}

			return '';
		}

		$class = in_array( $key, $arr, false ) ? ' ' . $html_class : '';
		if ( $display ) {
			echo $class;

			return null;
		}

		return $class;
	}
}
