<?php
/**
 * helpers functions
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom functions
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

if ( ! function_exists( '_toggle_container_open' ) ) {
	/**
	 * @param bool $check
	 * @param string $css1
	 * @param string $css2
	 * @param bool $echo
	 *
	 * @return string|void
	 */
	function _toggle_container_open( bool $check, string $css1 = 'container', string $css2 = '', bool $echo = false ) {
		$values = '';

		if ( $check && ! empty( $css1 ) ) {
			$values = '<div class="' . $css1 . '">';
		} else if ( ! $check && ! empty( $css2 ) ) {
			$values = '<div class="' . $css2 . '">';
		}

		if ( true === $echo ) {
			echo $values;
		} else {
			return $values;
		}
	}
}

// --------------------------------------------------

if ( ! function_exists( '_toggle_container_close' ) ) {
	/**
	 * @param bool $check
	 * @param bool $echo
	 *
	 * @return string|void
	 */
	function _toggle_container_close( bool $check, bool $echo = false ) {
		$values = '';
		if ( $check ) {
			$values = '</div>';
		}

		if ( true === $echo ) {
			echo $values;
		} else {
			return $values;
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
