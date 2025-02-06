<?php

namespace Addons\ContactLink;

use Addons\Helper;

\defined( 'ABSPATH' ) || exit;

final class ContactLink {
	// ------------------------------------------------------

	public function __construct() {
		/**
		 * @var array $shortcodes
		 */
		$shortcodes = [
			'contact_link' => [ $this, 'contact_link' ],
		];

		foreach ( $shortcodes as $shortcode => $function ) {
			add_shortcode( $shortcode, $function );
		}
	}

	// ------------------------------------------------------

	/**
	 * @param array $atts
	 *
	 * @return string
	 */
	public function contact_link( array $atts = [] ): string {
		$atts = shortcode_atts(
			[
				'class' => 'contact-link',
				'id'    => Helper::escAttr( uniqid( 'menu-', false ) ),
			],
			$atts,
			'contact_link'
		);

		$class = $atts['class'] ? ' ' . Helper::escAttr( $atts['class'] ) : ' contact-link';

		ob_start();

		//...

		return '<div class="' . $class . '">' . ob_get_clean() . '</div>';
	}
}
