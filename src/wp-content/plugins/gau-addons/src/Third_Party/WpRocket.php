<?php

namespace Addons\Third_Party;

use Addons\Base\Singleton;

\defined( 'ABSPATH' ) || die;

/*
 * https://github.com/wp-media/wp-rocket-helpers/tree/master/htaccess/wp-rocket-htaccess-remove-all/
 *
 * WpRocket Plugins
 */
final class WpRocket {

	use Singleton;

	// --------------------------------------------------

	private function init(): void {

		/** Server does not support using .htaccess */
		if ( ! htaccess() ) {

			// Remove rewrite rules block of WP Rocket from .htaccess.
			add_filter( 'rocket_htaccess_charset', '__return_false' );
			add_filter( 'rocket_htaccess_etag', '__return_false' );
			add_filter( 'rocket_htaccess_web_fonts_access', '__return_false' );
			add_filter( 'rocket_htaccess_files_match', '__return_false' );
			add_filter( 'rocket_htaccess_mod_expires', '__return_false' );
			add_filter( 'rocket_htaccess_mod_deflate', '__return_false' );
			add_filter( 'rocket_htaccess_mod_rewrite', '__return_false' );
		}
	}
}
