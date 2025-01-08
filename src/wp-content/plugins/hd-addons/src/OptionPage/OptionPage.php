<?php

namespace Addons\OptionPage;

\defined( 'ABSPATH' ) || exit;

final class OptionPage {

	// --------------------------------------------------

	public function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_filter( 'menu_order', [ $this, 'options_reorder_submenu' ] );
		add_filter( 'custom_menu_order', '__return_true' );

		add_action( 'admin_init', [ $this, 'add_addon_capability_to_roles' ] );

		// ajax for settings
		add_action( 'wp_ajax_submit_settings', [ $this, 'ajax_submit_settings' ] );
	}

	// --------------------------------------------------


}
