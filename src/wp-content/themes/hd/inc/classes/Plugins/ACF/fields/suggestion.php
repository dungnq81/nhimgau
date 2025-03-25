<?php

\defined( 'ABSPATH' ) || die;

add_action( 'acf/include_fields', static function () {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	acf_add_local_field_group( [
		'key'                   => 'group_67e118863f563',
		'title'                 => 'Suggestion',
		'fields'                => [
			[
				'key'                  => 'field_67e118864e813',
				'label'                => 'Suggestion',
				'name'                 => 'suggestion',
				'aria-label'           => '',
				'type'                 => 'post_object',
				'instructions'         => '',
				'required'             => 0,
				'conditional_logic'    => 0,
				'wrapper'              => [
					'width' => '',
					'class' => '',
					'id'    => '',
				],
				'post_type'            => [
					0 => 'post',
				],
				'post_status'          => [
					0 => 'publish',
				],
				'taxonomy'             => '',
				'return_format'        => 'id',
				'multiple'             => 1,
				'allow_null'           => 0,
				'allow_in_bindings'    => 0,
				'bidirectional'        => 0,
				'ui'                   => 1,
				'bidirectional_target' => [],
			],
		],
		'location'              => [
			[
				[
					'param'    => 'post_type',
					'operator' => '==',
					'value'    => 'post',
				],
			],
		],
		'menu_order'            => 0,
		'position'              => 'normal',
		'style'                 => 'default',
		'label_placement'       => 'top',
		'instruction_placement' => 'label',
		'hide_on_screen'        => '',
		'active'                => true,
		'description'           => '',
		'show_in_rest'          => 0,
	] );
} );

