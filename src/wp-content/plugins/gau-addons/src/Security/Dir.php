<?php

namespace Addons\Security;

use Addons\Base\Abstract_Htaccess;

\defined( 'ABSPATH' ) || die;

final class Dir extends Abstract_Htaccess {

	/**
	 * The path to the htaccess template.
	 *
	 * @var string
	 */
	public string $template = 'directory-hardening.tpl';

	/**
	 * Array with files to the allowlisted.
	 *
	 * @var array
	 */
	public array $whitelist = [];

	/**
	 * Array with files to the allowlisted.
	 *
	 * @var array
	 */
	public array $types = [
		'content'  => [
			'whitelist' => [],
		],
		'includes' => [
			'whitelist' => [
				'wp-tinymce.php',
				'ms-files.php',
			],
		],
		'uploads'  => [
			'whitelist' => [],
		],
	];

	/**
	 * @var string
	 */
	public string $type = '';

	/**
	 * Regular expressions to check if the rules are enabled.
	 *
	 * @var array Regular expressions to check if the rules are enabled.
	 */
	public array $rules = [
		'enabled'     => '/\#\s+Directory\s+Hardening/si',
		'disabled'    => '/\#\s+Directory\s+Hardening(.+?)\#\s+Directory\s+Hardening\s+END(\n)?/ims',
		'disable_all' => '/\#\s+Directory\s+Hardening(.+?)\#\s+Directory\s+Hardening\s+END(\n)?/ims',
	];

	// --------------------------------------------------

	/**
	 * Get the filepath to the htaccess.
	 *
	 * @return string Path to the htaccess.
	 */
	public function get_filepath(): string {
		switch ( $this->type ) {
			case 'includes':
				return $this->wp_filesystem->abspath() . WPINC . '/.htaccess';
				break;

			case 'uploads':
				$upload_dir = wp_upload_dir();

				return $upload_dir['basedir'] . '/.htaccess';
				break;

			case 'content':
				return $this->wp_filesystem->wp_content_dir() . '.htaccess';
				break;
		}

		return '';
	}

	// --------------------------------------------------

	/**
	 * Add allowlist rule for specific or user files.
	 *
	 * @param string $content The generated custom rule for a directory.
	 *
	 * @return string $content The modified rule, containing the allowlist.
	 */
	public function do_replacement( string $content ): string {
		// Add custom allowlist.
		$this->types[ $this->type ]['whitelist'] = apply_filters( 'hd_whitelist_wp_' . $this->type, $this->types[ $this->type ]['whitelist'] );

		// Bail: there is nothing to allowlist.
		if ( empty( $this->types[ $this->type ]['whitelist'] ) ) {
			return str_replace( '{REPLACEMENT}', '', $content );
		}

		$whitelisted_files = '';

		// Get the allowlist template.
		$whitelist_template = $this->wp_filesystem->get_contents( ADDONS_PATH . 'tpl/whitelist-file.tpl' );

		// Loop through the files and create allowlist rules.
		foreach ( $this->types[ $this->type ]['whitelist'] as $file ) {
			$whitelisted_files .= str_replace( '{FILENAME}', $file, $whitelist_template ) . PHP_EOL;
		}

		// Add the allowlisted files.
		return str_replace( '{REPLACEMENT}', $whitelisted_files, $content );
	}

	// --------------------------------------------------

	/**
	 * Enable all hardening rules.
	 *
	 * @param boolean|int $rule Whether to enable or disable the rules.
	 */
	public function toggle_rules( bool|int $rule = 1 ): void {
		foreach ( $this->types as $type => $data ) {
			$this->type = $type;
			$this->set_filepath();

			// Enable the rules.
			if ( 1 === (int) $rule ) {
				$this->enable();
				continue;
			}

			// Disable and remove htaccess files otherwise.
			$this->disable();
			$this->maybe_remove_htaccess();
		}
	}

	// --------------------------------------------------

	/**
	 * Check if we need to remove the htaccess files after disable if they are empty.
	 *
	 * @return bool True/False if we deleted the files.
	 *
	 */
	public function maybe_remove_htaccess(): bool {
		// Get the filepath of the file.
		$path = $this->get_filepath();

		// Bail if it isn't writable.
		if ( ! $this->wp_filesystem->is_writable( $path ) ) {
			return false;
		}

		// Bail if the file is not empty.
		if ( ! empty( trim( $this->wp_filesystem->get_contents( $path ) ) ) ) {
			return false;
		}

		return $this->wp_filesystem->delete( $path );
	}
}
