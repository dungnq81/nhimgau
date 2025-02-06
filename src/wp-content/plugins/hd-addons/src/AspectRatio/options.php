<?php

\defined( 'ABSPATH' ) || exit;

$aspect_ratio_settings = \Addons\Helper::filterSettingOptions( 'aspect_ratio', [] );
$no_data_message       = __( 'No data available or configuration for this feature has not been set.', ADDONS_TEXT_DOMAIN );

?>
<div class="container flex flex-x flex-gap sm-up-1 md-up-2">
    <input type="hidden" name="aspect-ratio-hidden" value="1">
	<?php
    if ( empty( $aspect_ratio_settings['post_type_term'] ) ) {
        echo '<h3 class="cell">' . $no_data_message . '</h3>';
        echo '</div>';
        return;
    }

	foreach ( $aspect_ratio_settings['post_type_term'] as $ar ) :
		$title = mb_ucfirst( $ar );

		if ( ! $title ) {
			break;
		}

		$aspect_ratio_options = \Addons\Helper::getOption( 'aspect_ratio__options' );
		$width                = $aspect_ratio_options[ 'ar-' . $ar . '-width' ] ?? '';
		$height               = $aspect_ratio_options[ 'ar-' . $ar . '-height' ] ?? '';
	?>
    <div class="section section-text cell">
        <span class="heading"><?php _e( $title, ADDONS_TEXT_DOMAIN ); ?></span>
        <div class="desc"><?php echo $title ?> images will be viewed at a custom aspect ratio.</div>
        <div class="option inline-option">
            <div class="controls">
                <div class="inline-group">
                    <label>
                        Width:
                        <input class="input" name="<?= $ar ?>-width" type="number" pattern="\d*" size="3" min="0" value="<?php echo esc_attr( $width ); ?>">
                    </label>
                    <span>x</span>
                    <label>
                        Height:
                        <input class="input" name="<?= $ar ?>-height" type="number" pattern="\d*" size="3" min="0" value="<?php echo esc_attr( $height ); ?>">
                    </label>
                </div>
            </div>
        </div>
    </div>
	<?php endforeach; ?>
</div>
