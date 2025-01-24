<?php

\defined( 'ABSPATH' ) || exit;

$optimizer_options = \Addons\Helper::getOption( 'optimizer__options' );

$minify_html = $optimizer_options['minify_html'] ?? 0;

$dns_prefetch = $optimizer_options['dns_prefetch'] ?? [];
$dns_prefetch = implode( PHP_EOL, $dns_prefetch );

$font_optimize     = $optimizer_options['font_optimize'] ?? 0;
$font_combined_css = $optimizer_options['font_combined_css'] ?? 0;
$font_preload      = $optimizer_options['font_preload'] ?? [];
$font_preload      = implode( PHP_EOL, $font_preload );

?>
<div class="container flex flex-x flex-gap sm-up-1 md-up-2">
    <div class="cell section section-checkbox">
        <label class="heading !block" for="minify_html"><?php _e( 'Minify HTML', ADDONS_TEXT_DOMAIN ); ?></label>
        <div class="desc"><?php _e( 'Remove unnecessary characters from your HTML output to reduce data size and improve your site\'s loading speed.', ADDONS_TEXT_DOMAIN ); ?></div>
        <div class="option">
            <div class="controls">
                <input type="checkbox" class="checkbox" name="minify_html" id="minify_html" <?php checked( $minify_html, 1 ); ?> value="1">
            </div>
            <div class="explain"><?php _e( 'Check to activate', ADDONS_TEXT_DOMAIN ); ?></div>
        </div>
    </div>
    <div class="cell section section-textarea !sm-1">
        <label class="heading" for="dns_prefetch"><?php _e( 'DNS Pre-fetch', ADDONS_TEXT_DOMAIN ) ?></label>
        <div class="desc"><?php _e( 'Enabling DNS pre-fetch for a domain will resolve it before resources are requested from it, resulting in faster loading of those resources.', ADDONS_TEXT_DOMAIN ); ?></div>
        <div class="option">
            <div class="controls">
                <textarea class="textarea" name="dns_prefetch" id="dns_prefetch" rows="4"><?php echo $dns_prefetch; ?></textarea>
            </div>
        </div>
    </div>
    <div class="cell section section-checkbox">
        <label class="heading" for="font_optimize"><?php _e( 'Web Fonts Optimization', ADDONS_TEXT_DOMAIN ) ?></label>
        <div class="desc"><?php _e( 'Optimize the loading of default <b>Google fonts</b>, as well as all <b>other fonts</b> used on your website.', ADDONS_TEXT_DOMAIN ) ?></div>
        <div class="option">
            <div class="controls">
                <input type="checkbox" class="checkbox" name="font_optimize" id="font_optimize" <?php checked( $font_optimize, 1 ); ?> value="1">
            </div>
            <div class="explain"><?php _e( 'Check to activate', ADDONS_TEXT_DOMAIN ); ?></div>
        </div>
    </div>
    <div class="cell section section-checkbox">
        <label class="heading inline-heading" for="font_combined_css"><?php _e( 'Combined CSS', ADDONS_TEXT_DOMAIN ) ?></label>
        <div class="desc"><?php _e( 'Return combined tag instead of using inline CSS.', ADDONS_TEXT_DOMAIN ) ?></div>
        <div class="option">
            <div class="controls">
                <input type="checkbox" class="checkbox" name="font_combined_css" id="font_combined_css" <?php checked( $font_combined_css, 1 ); ?> value="1">
            </div>
            <div class="explain"><?php _e( 'Check to activate', ADDONS_TEXT_DOMAIN ); ?></div>
        </div>
    </div>
    <div class="cell section section-textarea !sm-1">
        <label class="heading inline-heading" for="font_preload"><?php _e( 'Fonts Preloading', ADDONS_TEXT_DOMAIN ) ?></label>
        <div
            class="desc"><?php _e( 'Preload the fonts you\'re using to improve rendering speed and enhance site performance. <b>Use the full URL to the font.</b>', ADDONS_TEXT_DOMAIN ) ?></div>
        <div class="option">
            <div class="controls">
                <textarea class="textarea" name="font_preload" id="font_preload" rows="4"><?php echo $font_preload; ?></textarea>
            </div>
        </div>
    </div>
</div>
