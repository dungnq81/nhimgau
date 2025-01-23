<?php

\defined( 'ABSPATH' ) || exit;

$optimizer_options = \Addons\Helper::getOption( 'optimizer__options' );
$minify_html       = $optimizer_options['minify_html'] ?? 0;

?>
<div class="container flex flex-x flex-gap sm-up-1 md-up-2">
    <div class="cell section section-checkbox">
        <label class="heading !block" for="minify_html"><?php _e( 'Minify HTML', ADDONS_TEXT_DOMAIN ); ?></label>
        <div class="desc"><?php _e( 'Remove unnecessary characters from your HTML output to reduce data size and improve your site\'s loading speed.', ADDONS_TEXT_DOMAIN ); ?></div>
        <div class="option">
            <div class="controls">
                <input type="checkbox" class="checkbox" name="minify_html" id="minify_html" <?php echo checked( $minify_html, 1 ); ?> value="1">
            </div>
            <div class="explain"><?php _e( 'Check to activate', ADDONS_TEXT_DOMAIN ); ?></div>
        </div>
    </div>
</div>
