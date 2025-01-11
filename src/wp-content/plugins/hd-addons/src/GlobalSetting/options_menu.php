<?php

use Addons\Helper;

\defined( 'ABSPATH' ) || exit;

?>
<div id="_nav" class="tabs-nav">
    <div class="logo-title">
        <h3>
			<?php _e( 'Addons Settings', ADDONS_TEXT_DOMAIN ); ?>
            <span>Version: <?php echo ADDONS_VERSION; ?></span>
        </h3>
    </div>

    <div class="save-bar">
        <button type="submit" name="_submit_settings" class="button button-primary"><?php _e( 'Save Changes', ADDONS_TEXT_DOMAIN ); ?></button>
    </div>

    <ul class="ul-menu-list">
		<?php

		$menu_options = Helper::loadYaml( ADDONS_PATH . 'config.yml' );
        $menu_options_loaded =
		$i = 0;

		foreach ( $menu_options as $slug => $value ) {
			$current = ( $i === 0 ) ? ' class="current"' : '';

			// WooCommerce
			if ( (string) $slug === 'woocommerce' && ! Helper::checkPluginActive( 'woocommerce/woocommerce.php' ) ) {
				continue;
			}

            ?>
            <li class="<?= $slug ?>-settings">
                <a<?= $current ?> title="<?= esc_attr( $value ) ?>" href="#<?= $slug ?>_settings"><?= $value ?></a>
            </li>
			<?php $i ++;
		} ?>
    </ul>
</div>
