<?php

namespace HD\Plugins\TGMPA;

use HD\Utilities\Traits\Singleton;

\defined( 'ABSPATH' ) || die;

require_once __DIR__ . DIRECTORY_SEPARATOR . 'TGM_Plugin_Activation.php';

/**
 * TGM-Plugin-Activation Configuration
 *
 * @author Gaudev
 */
final class TGMPA {
	use Singleton;

	// -------------------------------------------------------------

	private function init(): void {
		add_action( 'tgmpa_register', [ $this, 'register_required_plugins' ] );
	}

	// -------------------------------------------------------------

	/**
	 * @return void
	 */
	public function register_required_plugins(): void {
		/*
		 * Array of plugin arrays. Required keys are name and slug.
		 * If the source is NOT from the .org repo, then source is also required.
		 */
		$plugins = [

			//
			// From the WordPress repository
			//
			//		[
			//			'name'     => 'Contact Form 7',
			//			'slug'     => 'contact-form-7',
			//			'required' => false, // required / recommended
			//		],
			//		[
			//			'name'     => 'Elementor',
			//			'slug'     => 'elementor',
			//			'required' => false,
			//		],
			//		[
			//			'name'     => 'WooCommerce',
			//			'slug'     => 'woocommerce',
			//			'required' => false,
			//		],
			//		[
			//			'name'     => 'Variation Swatches for WooCommerce',
			//			'slug'     => 'woo-variation-swatches',
			//			'required' => false,
			//		],
			[
				'name'     => 'Akismet Anti-Spam',
				'slug'     => 'akismet',
				'required' => false,
			],
			[
				'name'     => 'Rank Math SEO',
				'slug'     => 'seo-by-rank-math',
				'required' => false,
			],
			//		[
			//			'name'     => 'Comments – wpDiscuz',
			//			'slug'     => 'wpdiscuz',
			//			'required' => false,
			//		],
			//		[
			//			'name'     => 'Converter for Media',
			//			'slug'     => 'webp-converter-for-media',
			//			'required' => false,
			//		],
			//		[
			//			'name'     => 'Easy Table of Contents',
			//			'slug'     => 'easy-table-of-contents',
			//			'required' => false,
			//		],

			//
			// Include a plugin bundled with a theme.
			//
			[
				'name'             => 'Advanced Custom Fields PRO',
				'slug'             => 'advanced-custom-fields-pro',
				'source'           => THEME_PATH . 'storage/bundled/advanced-custom-fields-pro.zip',
				'required'         => true,
				'force_activation' => true,
				'external_url'     => 'https://www.advancedcustomfields.com/'
			],
		];

		/*
		 * Array of configuration settings. Amend each line as needed.
		 */
		$config = [
			'id'           => 'hd-tgmpa',
			'default_path' => '',
			'menu'         => 'tgmpa-install-plugins',
			'parent_slug'  => 'themes.php',
			'capability'   => 'edit_theme_options',
			'has_notices'  => true,
			'dismissable'  => false,
			'dismiss_msg'  => '',
			'is_automatic' => false,
			'message'      => '',
		];

		tgmpa( $plugins, $config );
	}
}
