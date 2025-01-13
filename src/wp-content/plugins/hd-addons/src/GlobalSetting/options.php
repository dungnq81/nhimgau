<?php

\defined( 'ABSPATH' ) || exit;

$menu_options           = \Addons\Helper::loadYaml( ADDONS_PATH . 'config.yaml' );
$global_setting_options = \Addons\Helper::getOption( 'global_setting_options' );

?>
<div class="container flex flex-x flex-gap sm-up-1 md-up-2 lg-up-3">
	<?php
	foreach ( $menu_options as $slug => $value ) :
		$title       = ! empty( $value['title'] ) ? __( $value['title'], ADDONS_TEXT_DOMAIN ) : '';
		$description = ! empty( $value['description'] ) ? __( $value['description'], ADDONS_TEXT_DOMAIN ) : '';

		if ( $slug === ( $current_slug ?? 'global_setting' ) ) {
			continue;
		}
    ?>
    <div class="section section-checkbox cell" id="section_<?= $slug ?>">
        <label class="heading inline-heading" for="<?= $slug ?>"><?php echo $title; ?></label>
        <div class="option">
            <div class="controls">
                <input type="checkbox" class="checkbox" name="<?= $slug ?>" id="<?= $slug ?>" <?php echo checked( $global_setting_options[$slug] ?? false, 1 ); ?> value="1">
            </div>
            <div class="explain"><?php _e( 'Check to activate', ADDONS_TEXT_DOMAIN ); ?></div>
        </div>
        <div class="desc !mt-15"><?php echo $description; ?></div>
    </div>
	<?php endforeach; ?>
</div>
