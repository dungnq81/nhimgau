<?php

namespace Addons;

\defined( 'ABSPATH' ) || exit;

final class Activator {
	/**
	 * The code that runs during plugin activation.
	 */
	public static function activation(): void {}

	/**
	 * The code that runs during plugin deactivation.
	 */
	public static function deactivation(): void {}

	/**
	 * The code that will be executed when the plugin is uninstalled.
	 */
	public static function uninstall(): void {}
}
