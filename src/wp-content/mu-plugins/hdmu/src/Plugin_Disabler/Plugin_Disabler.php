<?php

namespace MU\Plugin_Disabler;

final class Plugin_Disabler {
	public ?string $plugin_file;
	public array $disabled_plugins = [];

	// ------------------------------------------------------

	public function __construct( $plugin_file ) {
		$this->plugin_file = $plugin_file;

		$is_mu_plugin = defined( 'WPMU_PLUGIN_DIR' ) && realpath( WPMU_PLUGIN_DIR ) === realpath( dirname( $plugin_file, 2 ) );

		if ( ! $is_mu_plugin ) {

			// prevent activation as a regular plugin
			register_activation_hook( $plugin_file, [ $this, 'preventPluginActivation' ] );

			// print notice and deactivate as the plugin is already activated (for whatever reason)
			add_action( 'admin_notices', [ $this, 'printNoticeAndDeactivate' ] );
		}

		// disable the specified plugins after all other must-use plugins are loaded
		add_action( 'muplugins_loaded', [ $this, 'disablePlugins' ] );
	}

	// ------------------------------------------------------

	/**
	 * Prevent plugin to be activated as a regular plugin.
	 * Used as the activation hook.
	 *
	 * @return void
	 */
	public function preventPluginActivation(): void {
		wp_die(
			__( 'Plugin Disabler only works as a must-use plugin in a bedrock site.', MU_TEXT_DOMAIN ),
			__( 'Plugin Disabler', MU_TEXT_DOMAIN ),
			[ 'back_link' => true ]
		);
	}
}
