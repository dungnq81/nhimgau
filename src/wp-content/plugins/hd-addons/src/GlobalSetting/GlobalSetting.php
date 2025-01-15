<?php

namespace Addons\GlobalSetting;

use Addons\Helper;

\defined( 'ABSPATH' ) || exit;

final class GlobalSetting {

	// --------------------------------------------------

	public function __construct() {
		add_action( 'admin_menu', [ $this, 'admin_menu' ] );
		add_filter( 'menu_order', [ $this, 'options_reorder_submenu' ] );
		add_filter( 'custom_menu_order', '__return_true' );

		add_action( 'admin_init', [ $this, 'add_addon_capability_to_roles' ] );
		add_action( 'wp_ajax_submit_settings', [ $this, 'ajax_submit_settings' ] );
	}

	// --------------------------------------------------

	/**
	 * @return void
	 */
	public function admin_menu(): void {
		// Addons menu
		add_menu_page(
			__( 'Addons Settings', ADDONS_TEXT_DOMAIN ),
			__( 'Addons', ADDONS_TEXT_DOMAIN ),
			'addon_manage_options',
			'addon-settings',
			[ $this, '_addon_menu_callback' ],
			'dashicons-admin-settings',
			80
		);

		// Advanced submenu
		add_submenu_page(
			'addon-settings',
			__( 'Advanced', ADDONS_TEXT_DOMAIN ),
			__( 'Advanced', ADDONS_TEXT_DOMAIN ),
			'addon_manage_options',
			'customize.php'
		);

		// Server Info submenu
		add_submenu_page(
			'addon-settings',
			__( 'Server Info', ADDONS_TEXT_DOMAIN ),
			__( 'Server Info', ADDONS_TEXT_DOMAIN ),
			'addon_manage_options',
			'server-info',
			[ $this, '_addon_server_info_callback' ]
		);
	}

	// --------------------------------------------------

	/**
	 * @param array $menu_order
	 *
	 * @return array
	 */
	public function options_reorder_submenu( array $menu_order ): array {
		global $submenu;

		if ( empty( $submenu['addon-settings'] ) ) {
			return $menu_order;
		}

		// Change menu title
		$submenu['addon-settings'][0][0] = __( 'Settings', ADDONS_TEXT_DOMAIN );

		return $menu_order;
	}

	// --------------------------------------------------

	public function add_addon_capability_to_roles(): void {
		foreach ( [ 'administrator', 'editor' ] as $role_name ) {
			$role = get_role( $role_name );
			$role?->add_cap( 'addon_manage_options' );
		}
	}

	// --------------------------------------------------

	public function ajax_submit_settings() {
		if ( ! wp_doing_ajax() ) {
			return false;
		}

		check_ajax_referer( '_wpnonce_settings_form_' . get_current_user_id() );
		$data = $_POST['_data'] ?? [];

		/** ---------------------------------------- */

		/** Global Setting */
		$menu_options           = Helper::loadYaml( ADDONS_PATH . 'config.yaml' );
		$global_setting_options = [];
		foreach ( $menu_options as $slug => $value ) {
			if ( ! empty( $data[ $slug ] ) ) {
				$global_setting_options[ $slug ] = 1;
			}
		}

		if ( $global_setting_options ) {
			Helper::updateOption( 'global_setting__options', $global_setting_options );
		} else {
			Helper::removeOption( 'global_setting__options' );
		}

		/** ---------------------------------------- */

		/** Aspect Ratio */
		$aspect_ratio_options  = [];
		$aspect_ratio_settings = Helper::filterSettingOptions( 'aspect_ratio', [] );

		foreach ( $aspect_ratio_settings['post_type_term'] ?? [] as $ar ) {
			if ( isset( $data[ $ar . '-width' ], $data[ $ar . '-height' ] ) ) {
				$aspect_ratio_options[ 'ar-' . $ar . '-width' ]  = sanitize_text_field( $data[ $ar . '-width' ] );
				$aspect_ratio_options[ 'ar-' . $ar . '-height' ] = sanitize_text_field( $data[ $ar . '-height' ] );
			}
		}

		if ( $aspect_ratio_options ) {
			Helper::updateOption( 'aspect_ratio__options', $aspect_ratio_options );
		} else {
			Helper::removeOption( 'aspect_ratio__options' );
		}

		/** ---------------------------------------- */

		/** Editor */
		$editor_options = [];
		$arrs           = [
			'use_widgets_block_editor_off',
			'gutenberg_use_widgets_block_editor_off',
			'use_block_editor_for_post_type_off',
			'block_style_off'
		];

		foreach ( $arrs as $value ) {
			if ( isset( $data[ $value ] ) ) {
				$editor_options[ $value ] = sanitize_text_field( $data[ $value ] );
			}
		}

		if ( $editor_options ) {
			Helper::updateOption( 'editor__options', $editor_options );
		} else {
			Helper::removeOption( 'editor__options' );
		}

		/** ---------------------------------------- */

		/** WooCommerce */
		if ( Helper::checkPluginActive( 'woocommerce/woocommerce.php' ) ) {
			$arrs = [
				'woocommerce_jsonld',
				'woocommerce_default_css'
			];

			$woocommerce_options = [];
			foreach ( $arrs as $value ) {
				if ( isset( $data[ $value ] ) ) {
					$woocommerce_options[ $value ] = sanitize_text_field( $data[ $value ] );
				}
			}

			if ( $woocommerce_options ) {
				Helper::updateOption( 'woocommerce__options', $woocommerce_options );
			} else {
				Helper::removeOption( 'woocommerce__options' );
			}
		}

		/** ---------------------------------------- */

		/** Custom JS */
		$html_header      = $data['html_header'] ?? '';
		$html_footer      = $data['html_footer'] ?? '';
		$html_body_top    = $data['html_body_top'] ?? '';
		$html_body_bottom = $data['html_body_bottom'] ?? '';

		Helper::updateCustomPostOption( $html_header, 'html_header', 'text/html', true );
		Helper::updateCustomPostOption( $html_footer, 'html_footer', 'text/html', true );
		Helper::updateCustomPostOption( $html_body_top, 'html_body_top', 'text/html', true );
		Helper::updateCustomPostOption( $html_body_bottom, 'html_body_bottom', 'text/html', true );

		/** ---------------------------------------- */

		/** Custom CSS */
		$html_custom_css = $data['html_custom_css'] ?? '';
		Helper::updateCustomPostOption( $html_custom_css, 'addon_css', 'text/css' );

		/** ---------------------------------------- */

		Helper::clearAllCache();
		Helper::messageSuccess( __( 'Your settings have been saved.', ADDONS_TEXT_DOMAIN ), true );

		exit();
	}

	// --------------------------------------------------

	public function _addon_menu_callback(): void {
		?>
        <div class="wrap" id="_container">
            <form id="_settings_form" method="post" enctype="multipart/form-data">

				<?php wp_nonce_field( '_wpnonce_settings_form_' . get_current_user_id() ); ?>

                <div id="main" class="filter-tabs clearfix">

					<?php include __DIR__ . '/options_menu.php'; ?>
					<?php include __DIR__ . '/options_content.php'; ?>

                </div>
            </form>
        </div>
		<?php
	}

	// --------------------------------------------------

	public function _addon_server_info_callback(): void {
		global $wpdb;

		?>
        <div class="wrap">
            <div id="main">
                <h2 class="hide-text"></h2>
                <div class="server-info-body">
                    <h2><?php echo __( 'Server info', ADDONS_TEXT_DOMAIN ) ?></h2>
                    <p class="desc"><?php echo __( 'System configuration information', ADDONS_TEXT_DOMAIN ) ?></p>
                    <div class="server-info-inner code">
                        <ul>
                            <li><?php echo sprintf( '<span>Platform:</span> %s', php_uname() ); ?></li>
                            <li><?php echo sprintf( '<span>Server:</span> %s', $_SERVER['SERVER_SOFTWARE'] ); ?></li>
                            <li><?php echo sprintf( '<span>Server IP:</span> %s', Helper::serverIpAddress() ); ?></li>
							<?php

							$cpu_info = file_get_contents( '/proc/cpuinfo' );
							preg_match( '/^model name\s*:\s*(.+)$/m', $cpu_info, $matches );
							$cpu_model = isset( $matches[1] ) ? trim( $matches[1] ) : 'Unknown';

							?>
                            <li><?php echo sprintf( '<span>CPU Info:</span> %s', $cpu_model ); ?></li>

                            <li><?php echo sprintf( '<span>Memory Limit:</span> %s', ini_get( 'memory_limit' ) ); ?></li>
                            <li><?php echo sprintf( '<span>PHP version:</span> %s', PHP_VERSION ); ?></li>
                            <li><?php echo sprintf( '<span>PHP Max Upload Size:</span> %s', ini_get( 'upload_max_filesize' ) ); ?></li>
                            <li><?php echo sprintf( '<span>MySql version:</span> %s', $wpdb->db_version() ); ?></li>

                            <li><?php echo sprintf( '<span>WordPress version:</span> %s', get_bloginfo( 'version' ) ); ?></li>
                            <li><?php echo sprintf( '<span>WordPress multisite:</span> %s', ( is_multisite() ? 'Yes' : 'No' ) ); ?></li>
							<?php

							$openssl_status = __( 'Available', ADDONS_TEXT_DOMAIN );
							$openssl_text   = '';
							if ( ! defined( 'OPENSSL_ALGO_SHA1' ) && ! extension_loaded( 'openssl' ) ) {
								$openssl_status = __( 'Not available', ADDONS_TEXT_DOMAIN );
								$openssl_text   = __( ' (openssl extension is required in order to use any kind of encryption like TLS or SSL)', ADDONS_TEXT_DOMAIN );
							}
							?>
                            <li><?php echo sprintf( '<span>openssl:</span> %s%s', $openssl_status, $openssl_text ); ?></li>
                            <li><?php echo sprintf( '<span>allow_url_fopen:</span> %s', ( ini_get( 'allow_url_fopen' ) ? __( 'Enabled', ADDONS_TEXT_DOMAIN ) : __( 'Disabled', ADDONS_TEXT_DOMAIN ) ) ); ?></li>
							<?php

							$stream_socket_client_status = __( 'Not Available', ADDONS_TEXT_DOMAIN );
							$fsockopen_status            = __( 'Not Available', ADDONS_TEXT_DOMAIN );
							$socket_enabled              = false;

							if ( function_exists( 'stream_socket_client' ) ) {
								$stream_socket_client_status = __( 'Available', ADDONS_TEXT_DOMAIN );
								$socket_enabled              = true;
							}
							if ( function_exists( 'fsockopen' ) ) {
								$fsockopen_status = __( 'Available', ADDONS_TEXT_DOMAIN );
								$socket_enabled   = true;
							}

							$socket_text = '';
							if ( ! $socket_enabled ) {
								$socket_text = __( ' (In order to make a SMTP connection your server needs to have either stream_socket_client or fsockopen)', ADDONS_TEXT_DOMAIN );
							}

							?>
                            <li><?php echo sprintf( '<span>stream_socket_client:</span> %s', $stream_socket_client_status ); ?></li>
                            <li><?php echo sprintf( '<span>fsockopen:</span> %s%s', $fsockopen_status, $socket_text ); ?></li>
							<?php

							if ( $agent = $_SERVER['HTTP_USER_AGENT'] ?? null ) : ?>
                                <li><?php echo sprintf( '<span>User agent:</span> %s', $agent ); ?></li>
							<?php endif;

							?>
                            <li><?php echo sprintf( '<span>IP:</span> %s', Helper::ipAddress() ); ?></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
		<?php
	}

	// --------------------------------------------------
}
