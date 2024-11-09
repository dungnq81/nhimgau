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
