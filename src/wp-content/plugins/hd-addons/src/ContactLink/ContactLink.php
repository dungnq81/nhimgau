<?php

namespace Addons\ContactLink;

use Addons\Helper;

\defined( 'ABSPATH' ) || exit;

final class ContactLink {
	// ------------------------------------------------------

	public function __construct() {
		/**
		 * @var array $shortcodes
		 */
		$shortcodes = [
			'contact_link' => [ $this, 'contact_link' ],
		];

		foreach ( $shortcodes as $shortcode => $function ) {
			add_shortcode( $shortcode, $function );
		}

		add_action( 'hd_after_footer_action', [ $this, 'add_this_contact_link' ], 11 );
		add_filter( 'hd_footer_class_filter', [ $this, 'modify_footer_class' ] );
	}

	// ------------------------------------------------------

	/**
	 * @param $default_class
	 *
	 * @return mixed|string
	 */
    public function modify_footer_class( $default_class ): mixed {
	    if ( Helper::getOption( 'contact_link__options' ) ) {
            return $default_class . ' has-contact-link';
	    }

        return $default_class;
    }

	// ------------------------------------------------------

	/**
	 * @return void
	 */
    public function add_this_contact_link(): void {
        echo Helper::doShortcode( 'contact_link' );
    }

	// ------------------------------------------------------

	/**
	 * @param array $atts
	 *
	 * @return string
	 */
	public function contact_link( array $atts = [] ): string {
		$atts = shortcode_atts(
			[
				'class' => 'contact-link',
			],
			$atts,
			'contact_link'
		);

		$class = $atts['class'] ? ' ' . Helper::escAttr( $atts['class'] ) : ' contact-link';

		ob_start();

		$contact_options = Helper::getOption( 'contact_link__options' );
		$contact_links   = Helper::filterSettingOptions( 'contact_links', [] );

		if ( $contact_options ) {
			foreach ( $contact_options as $key => $contact_option ) {
				$value = $contact_option['value'] ?? '';
				//$color = $contact_option['color'] ?? '';

				$data = [
					'name'        => $contact_links[ $key ]['name'] ?? '',
					'icon'        => $contact_links[ $key ]['icon'] ?? '',
					'target'      => $contact_links[ $key ]['target'] ?? '',
				];

				if ( empty( $value ) ) {
					continue;
				}

				$target = $data['target'] ? ' target="' . $data['target'] . '"' : '';
				$thumb  = '';

				if ( Helper::isUrl( $data['icon'] ) || str_starts_with( $data['icon'], 'data:' ) ) :
					$thumb = '<img src="' . $data['icon'] . '" alt="' . Helper::escAttr( $data['name'] ) . '">';
				elseif ( str_starts_with( $data['icon'], '<svg' ) ) :
					$thumb = $data['icon'];
				elseif ( is_string( $data['icon'] ) ) :
					$thumb = '<i class="' . $data['icon'] . '"></i>';
				endif;

				?>
				<li>
					<a<?= $target ?> class="<?= $key ?>" href="<?= $value ?>" title="<?= Helper::escAttr( $data['name'] ) ?>">
						<?= $thumb ?>
						<span><?= $data['name'] ?></span>
					</a>
				</li>
			<?php
			}
		}

        $content = ob_get_clean();

		return $content ? '<ul class="add-this' . $class . '">' . $content . '</ul>' : '';
	}

	// ------------------------------------------------------
}
