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

if ( ! function_exists( '_toggle_container' ) ) {
	/**
	 * @param bool $check
	 * @param string $css1
	 * @param string $css2
	 *
	 * @return void
	 */
	function _toggle_container( bool $check, string $css1 = 'container', string $css2 = '' ): void {
		$values = '';

		if ( $check && ! empty( $css1 ) ) {
			$values = '<div class="' . $css1 . '">';
		} else if ( ! $check && ! empty( $css2 ) ) {
			$values = '<div class="' . $css2 . '">';
		}

		echo $values;
	}
}

// --------------------------------------------------
