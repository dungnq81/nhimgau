<?php

namespace HD\Widgets;

use HD\Utilities\Abstract_Widget;

\defined( 'ABSPATH' ) || die;

class Search_Widget extends Abstract_Widget {
	public function __construct() {
		$this->widget_description = __( 'A search form for your site.', TEXT_DOMAIN );
		$this->widget_name        = __( '* Search', TEXT_DOMAIN );
		$this->settings           = [
			'title'             => [
				'type'  => 'text',
				'std'   => __( 'Search', TEXT_DOMAIN ),
				'label' => __( 'Button title', TEXT_DOMAIN ),
			],
			'placeholder_title' => [
				'type'  => 'text',
				'std'   => __( 'Search ...', TEXT_DOMAIN ),
				'label' => __( 'Placeholder title', TEXT_DOMAIN ),
			],
			'css_class'         => [
				'type'  => 'text',
				'std'   => '',
				'label' => __( 'CSS class', TEXT_DOMAIN ),
			],
		];

		parent::__construct();
	}

	/**
	 * Creating widget Front-End
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ): void {
		if ( $this->get_cached_widget( $args ) ) {
			return;
		}

		$css_class         = ! empty( $instance['css_class'] ) ? \HD\Helper::escAttr( $instance['css_class'] ) : '';
		$title             = $this->get_instance_title( $instance );
		$placeholder_title = ! empty( $instance['placeholder_title'] ) ? \HD\Helper::escAttr( $instance['placeholder_title'] ) : __( 'Search', TEXT_DOMAIN );

		$shortcode_content = \HD\Helper::doShortcode(
			'inline_search',
			[
				'title'       => $title,
				'placeholder' => $placeholder_title,
				'class'       => $css_class,
				'id'          => '',
			]
		);

		echo $this->cache_widget( $args, $shortcode_content );
	}
}
