<?php

use Addons\Helper;

\defined( 'ABSPATH' ) || exit;

?>
<div id="_content" class="tabs-content">
	<h2 class="hidden-text"></h2>
    <?php

    $menu_options = Helper::loadYaml( ADDONS_PATH . 'config.yml' );
    $i = 0;
    foreach ( $menu_options as $slug => $value ) {
	    $show_class = ( $i === 0 ) ? ' show' : '';

	    // WooCommerce
	    if ( (string) $slug === 'woocommerce' && ! Helper::checkPluginActive( 'woocommerce/woocommerce.php' ) ) {
		    continue;
	    }

	    ?>
        <div id="<?= $slug ?>_settings" class="group tabs-panel<?= $show_class ?>">
		    <?php

		    $option_file = ADDONS_SRC_PATH . Helper::capitalizedSlug( $slug, true ) . DIRECTORY_SEPARATOR . 'options.php';
		    file_exists( $option_file ) && include $option_file;

		    ?>
        </div>
	    <?php $i ++;
    } ?>
	<div class="save-bar">
		<button type="submit" name="_submit_settings" class="button button-primary"><?php _e( 'Save Changes', ADDONS_TEXT_DOMAIN ); ?></button>
	</div>
</div>
