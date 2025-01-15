<?php

namespace HD\Themes;

use HD\Helper;
use HD\Utilities\Traits\Singleton;

\defined( 'ABSPATH' ) || die;

/**
 * Optimizer Class
 *
 * @author Gaudev
 */
final class Optimizer {
	use Singleton;

	// ------------------------------------------------------

	private function init(): void {
		$this->_cleanup();
		$this->_optimizer();
	}

	// ------------------------------------------------------

	/**
	 * Launching operation cleanup
	 *
	 * @return void
	 */
	private function _cleanup(): void {
		// wp_head
		remove_action( 'wp_head', 'rsd_link' );
		remove_action( 'wp_head', 'wlwmanifest_link' );
		remove_action( 'wp_head', 'wp_shortlink_wp_head' );
		remove_action( 'wp_head', 'wp_generator' );
		remove_action( 'wp_head', 'feed_links', 2 );
		remove_action( 'wp_head', 'feed_links_extra', 3 );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );

		// All actions related to emojis
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );

		// Staticize emoji
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

		/**
		 * Remove wp-json header from WordPress
		 * Note that the REST API functionality will still be working as it used to;
		 * this only removes the header code that is being inserted.
		 */
		remove_action( 'wp_head', 'rest_output_link_wp_head' );
		remove_action( 'wp_head', 'wp_oembed_add_discovery_links' );
		remove_action( 'template_redirect', 'rest_output_link_header', 11 );

		// Remove id li navigation
		add_filter( 'nav_menu_item_id', '__return_null', 10, 3 );
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	private function _optimizer(): void {

        // https://html.spec.whatwg.org/multipage/rendering.html#img-contain-size
        add_filter( 'wp_img_tag_add_auto_sizes', '__return_false' );

		// Filters the script, style tag
		add_filter( 'script_loader_tag', [ $this, 'script_loader_tag' ], 12, 3 );
		add_filter( 'style_loader_tag', [ $this, 'style_loader_tag' ], 12, 2 );

		// Adding Shortcode in WordPress Using Custom HTML Widget
		add_filter( 'widget_text', 'do_shortcode' );
		add_filter( 'widget_text', 'shortcode_unautop' );

		// Search by title
		add_filter( 'posts_search', [ $this, 'post_search_by_title' ], 500, 2 );

		// Front-end only, excluding the login page
		if ( ! is_admin() && ! Helper::isLogin() ) {
			add_action( 'wp_print_footer_scripts', [ $this, 'print_footer_scripts' ], 999 );
		}

		// Restrict mode
		add_filter( 'user_has_cap', [ $this, 'restrict_admin_plugin_install' ], 10, 3 );
		add_filter( 'user_has_cap', [ $this, 'prevent_deletion_admin_accounts' ], 10, 3 );
		add_action( 'delete_user', [ $this, 'prevent_deletion_user' ], 10 );

		// lost password
		add_action( 'lostpassword_form', [ $this, 'add_csrf_token_to_lostpassword_form' ] );
		add_action( 'lostpassword_post', [ $this, 'verify_csrf_token_on_lostpassword_post' ] );

		// login form
		add_action( 'login_form', [ $this, 'add_csrf_token_to_login_form' ] );
		add_filter( 'authenticate', [ $this, 'verify_csrf_token_on_login' ], 30, 3 );
		add_filter( 'login_message', [ $this, 'show_csrf_error_message' ] );
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	public function add_csrf_token_to_lostpassword_form(): void {
		$nonce = wp_create_nonce( 'lostpassword_csrf_token' );
		echo '<input type="hidden" name="lostpassword_csrf_token" value="' . esc_attr( $nonce ) . '">';
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	public function verify_csrf_token_on_lostpassword_post(): void {
		if ( isset( $_POST['lostpassword_csrf_token'] ) ) {
			$nonce = $_POST['lostpassword_csrf_token'];

			if ( ! wp_verify_nonce( $nonce, 'lostpassword_csrf_token' ) ) {
				Helper::wpDie(
					__( 'Invalid CSRF token. Please try again.', TEXT_DOMAIN ),
					__( 'Error', TEXT_DOMAIN ),
					[ 'response' => 403 ]
				);
			}
		}
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	public function add_csrf_token_to_login_form(): void {
		$csrf_token = wp_create_nonce( 'login_csrf_token' );
		echo '<input type="hidden" name="login_csrf_token" value="' . esc_attr( $csrf_token ) . '">';
	}

	// ------------------------------------------------------

	/**
	 * @param $user
	 * @param $username
	 * @param $password
	 *
	 * @return mixed|\WP_Error
	 */
	public function verify_csrf_token_on_login( $user, $username, $password ): mixed {
		if ( empty( $_POST['login_csrf_token'] ) || ! wp_verify_nonce( $_POST['login_csrf_token'], 'login_csrf_token' ) ) {
			return new \WP_Error( 'csrf_error', __( 'Invalid CSRF token. Please try again.' ) );
		}

		return $user;
	}

	// ------------------------------------------------------

	/**
	 * @param $message
	 *
	 * @return mixed|string
	 */
	public function show_csrf_error_message( $message ): mixed {
		if ( isset( $_GET['login'] ) && $_GET['login'] === 'csrf_error' ) {
			$message .= '<div id="login_error">' . __( 'Invalid CSRF token. Please try again.' ) . '</div>';
		}

		return $message;
	}

	// --------------------------------------------------

	/**
	 * @param $allcaps
	 * @param $caps
	 * @param $args
	 *
	 * @return mixed
	 */
	public function restrict_admin_plugin_install( $allcaps, $caps, $args ): mixed {
		$allowed_users_ids_install_plugins = Helper::filterSettingOptions( 'allowed_users_ids_install_plugins', [] );

		// Get the current user ID
		$user_id = get_current_user_id();

		// Check if the current user is in the allowed users list
		if ( $user_id && in_array( $user_id, $allowed_users_ids_install_plugins, false ) ) {
			return $allcaps;
		}

		// If a user is not allowed, remove the ability to install plugins
		if ( isset( $allcaps['activate_plugins'] ) ) {
			unset( $allcaps['install_plugins'], $allcaps['delete_plugins'] );
		}

		if ( isset( $allcaps['install_themes'] ) ) {
			unset( $allcaps['install_themes'] );
		}

		return $allcaps;
	}

	// --------------------------------------------------

	/**
	 * @param $allcaps
	 * @param $cap
	 * @param $args
	 *
	 * @return mixed
	 */
	public function prevent_deletion_admin_accounts( $allcaps, $cap, $args ): mixed {
		$disallowed_users_ids_delete_account = Helper::filterSettingOptions( 'disallowed_users_ids_delete_account', [] );
		if ( isset( $cap[0] ) && $cap[0] === 'delete_users' ) {
			$user_id_to_delete = $args[2] ?? 0;

			if ( $user_id_to_delete && in_array( $user_id_to_delete, $disallowed_users_ids_delete_account, true ) ) {
				unset( $allcaps['delete_users'] );
			}
		}

		return $allcaps;
	}

	// --------------------------------------------------

	/**
	 * @param $user_id
	 *
	 * @return void
	 */
	public function prevent_deletion_user( $user_id ): void {
		$disallowed_users_ids_delete_account = Helper::filterSettingOptions( 'disallowed_users_ids_delete_account', [] );
		if ( in_array( $user_id, $disallowed_users_ids_delete_account, false ) ) {
			Helper::wpDie(
				__( 'You cannot delete this admin account.', TEXT_DOMAIN ),
				__( 'Error', TEXT_DOMAIN ),
				[ 'response' => 403 ]
			);
		}
	}

	// ------------------------------------------------------

	/**
	 * @param string $tag
	 * @param string $handle
	 * @param string $src
	 *
	 * @return string
	 */
	public function script_loader_tag( string $tag, string $handle, string $src ): string {
		$attributes = wp_scripts()->registered[ $handle ]->extra ?? [];

		// Add `type="module"` attributes if the script is marked as a module
		if ( ! empty( $attributes['module'] ) ) {
			$tag = preg_replace( '#(?=></script>)#', ' type="module"', $tag, 1 );
		}

		// Handle `async` and `defer` attributes
		foreach ( [ 'async', 'defer' ] as $attr ) {
            if ( 'defer' === $attr ) {
                $attr = 'defer data-wp-strategy="defer"';
            }

			if ( ! empty( $attributes[ $attr ] ) && ! preg_match( "#\s$attr(=|>|\s)#", $tag ) ) {
				$tag = preg_replace( '#(?=></script>)#', " $attr", $tag, 1 );
			}
		}

		// Process combined attributes (e.g., `module defer`) from `extra`
		if ( ! empty( $attributes['extra'] ) ) {
			// Convert space-separated string to array if necessary
			$extra_attrs = is_array( $attributes['extra'] )
				? $attributes['extra']
				: explode( ' ', $attributes['extra'] );

			foreach ( $extra_attrs as $attr ) {
				if ( 'defer' === $attr ) {
					$attr = 'defer data-wp-strategy="defer"';
				}

				if ( $attr === 'module' ) {
					if ( ! preg_match( '#\stype=(["\'])module\1#', $tag ) ) {
						$tag = preg_replace( '#(?=></script>)#', ' type="module"', $tag, 1 );
					}
				} elseif ( ! preg_match( "#\s$attr(=|>|\s)#", $tag ) ) {
					$tag = preg_replace( '#(?=></script>)#', " $attr", $tag, 1 );
				}
			}
		}

		// Fontawesome kit
		if ( ( 'fontawesome-kit' === $handle ) && ! preg_match( '#\scrossorigin([=>\s])#', $tag ) ) {
			$tag = preg_replace( '#(?=></script>)#', " crossorigin='anonymous'", $tag, 1 );
		}

		// Add script handles to the array
		$str_parsed = Helper::filterSettingOptions( 'defer_script', [] );

		return Helper::lazyScriptTag( $str_parsed, $tag, $handle );
	}

	// ------------------------------------------------------

	/**
	 * Add style handles to the array below
	 *
	 * @param string $html
	 * @param string $handle
	 *
	 * @return string
	 */
	public function style_loader_tag( string $html, string $handle ): string {
		$styles = Helper::filterSettingOptions( 'defer_style', [] );

		return Helper::lazyStyleTag( $styles, $html, $handle );
	}

	// ------------------------------------------------------

	/**
	 * Search only in post-title or excerpt
	 *
	 * @param $search
	 * @param $wp_query
	 *
	 * @return mixed|string
	 */
	public function post_search_by_title( $search, $wp_query ): mixed {
		global $wpdb;

		if ( empty( $search ) ) {
			return $search;
		}

		$q = $wp_query->query_vars;
		$n = ! empty( $q['exact'] ) ? '' : '%';

		$search = $search_and = '';

		foreach ( (array) $q['search_terms'] as $term ) {
			$term = mb_strtolower( esc_sql( $wpdb->esc_like( $term ) ) );

			$like       = "LIKE CONCAT('{$n}', CONVERT('{$term}', BINARY), '{$n}')";
			$search     .= "{$search_and}(LOWER($wpdb->posts.post_title) {$like} OR LOWER($wpdb->posts.post_excerpt) {$like})";
			$search_and = ' AND ';
		}

		if ( ! empty( $search ) ) {
			$search = " AND ({$search}) ";
			if ( ! is_user_logged_in() ) {
				$search .= " AND ($wpdb->posts.post_password = '') ";
			}
		}

		return $search;
	}

	// ------------------------------------------------------

	/**
	 * @return void
	 */
	public function print_footer_scripts(): void { ?>
        <script>document.documentElement.classList.remove('no-js');</script>
		<?php

		if ( is_file( THEME_PATH . 'assets/js/skip-link-focus.js' ) ) {
			echo '<script>';
			include THEME_PATH . 'assets/js/skip-link-focus.js';
			echo '</script>';
		}
	}
}
