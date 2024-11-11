<?php

namespace Addons\Activator;

\defined( 'ABSPATH' ) || die;

final class Activator {

	private function init(): void {
		// Custom initialization logic
	}

	/**
	 * The code that runs during plugin activation.
	 *
	 * @return void
	 */
	public static function activation(): void {}

	/**
	 * The code that runs during plugin deactivation.
	 *
	 * @return void
	 */
	public static function deactivation(): void {}

	/**
	 * The code that will be executed when the plugin is uninstalled.
	 *
	 * @return void
	 */
	public static function uninstall(): void {}
}
