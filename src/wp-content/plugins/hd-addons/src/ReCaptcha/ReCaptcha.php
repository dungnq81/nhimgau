<?php

namespace Addons\ReCaptcha;

\defined( 'ABSPATH' ) || exit;

$recaptcha_options = \Addons\Helper::getOption( 'recaptcha__options' );

define( 'GOOGLE_RECAPTCHA_V2_SITE_KEY', $recaptcha_options['recaptcha_v2_site_key'] ?? '' );
define( 'GOOGLE_RECAPTCHA_V2_SECRET_KEY', $recaptcha_options['recaptcha_v2_secret_key'] ?? '' );
define( 'GOOGLE_RECAPTCHA_V3_SITE_KEY', $recaptcha_options['recaptcha_v3_site_key'] ?? '' );
define( 'GOOGLE_RECAPTCHA_V3_SECRET_KEY', $recaptcha_options['recaptcha_v3_secret_key'] ?? '' );
define( 'GOOGLE_RECAPTCHA_V3_SCORE', $recaptcha_options['recaptcha_v3_score'] ?? '0.5' );
define( 'GOOGLE_RECAPTCHA_GLOBAL', $recaptcha_options['recaptcha_global'] ?? false );

final class ReCaptcha {
	/**
	 * @var array|mixed|null
	 */
	public array $forms = [];

	// ------------------------------------------------------

	public function __construct() {
		$default_forms = [
			//...
		];

		$custom_forms = apply_filters( 'addon_recaptcha_custom_forms_filter', [] );
		$this->forms  = apply_filters( 'addon_recaptcha_forms_filter', array_merge( $default_forms, $custom_forms ) );

		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 99 );
	}

	// ------------------------------------------------------

	/**
	 * @param string $version
	 * @param string|null $render
	 *
	 * @return string|null
	 */
	public function get_api_url( string $version = 'v2', ?string $render = null ): ?string {
		$use_globally = GOOGLE_RECAPTCHA_GLOBAL ? 'recaptcha.net' : 'google.com';

		// For v2 (Invisible or Checkbox), skip the render parameter
		if ( $version === 'v2' ) {
			return 'https://www.' . $use_globally . '/recaptcha/api.js?render=explicit';
		}

		// For v3, include render parameter with the site key
		if ( $version === 'v3' && $render ) {
			return sprintf( 'https://www.' . $use_globally . '/recaptcha/api.js?render=%s', $render );
		}

		return null;
	}

	// ------------------------------------------------------

	public function wp_enqueue_scripts(): void {
		$api_url = $this->get_api_url( 'v2', null );

		// Enqueue the script
		wp_enqueue_script( 'recaptcha', $api_url, [], null, true );
		wp_script_add_data( 'recaptcha', 'extra', [ 'async', 'defer' ] );
	}
}