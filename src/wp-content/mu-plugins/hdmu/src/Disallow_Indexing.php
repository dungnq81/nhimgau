<?php

namespace MU;

/**
 * Disallow Indexing
 *
 * @author roots
 */
final class Disallow_Indexing {
	public function __construct() {
		if ( ! defined( 'DISALLOW_INDEXING' ) || \DISALLOW_INDEXING !== true ) {
			return;
		}

		add_action( 'pre_option_blog_public', '__return_zero' );
		add_action( 'admin_init', static function () {
			if ( ! apply_filters( 'hd/disallow_indexing_admin_notice', true ) ) {
				return;
			}

			add_action( 'admin_notices', static function () {
				$message = sprintf(
					__( '%1$s Search engine indexing has been discouraged.', MU_TEXT_DOMAIN ),
					'<strong>HD:</strong>',
				);
				echo "<div class='notice notice-warning'><p>{$message}</p></div>";
			} );
		} );
	}
}