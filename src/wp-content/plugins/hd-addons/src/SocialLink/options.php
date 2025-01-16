<?php

\defined( 'ABSPATH' ) || exit;

$social_options       = \Addons\Helper::getOption( 'social_link__options' );
$social_follows_links = \Addons\Helper::filterSettingOptions( 'social_follows_links', [] );

?>
<div class="container flex flex-x flex-gap sm-up-1 lg-up-2">
	<?php
	if ( ! empty( $social_follows_links ) ) {
		foreach ( $social_follows_links as $key => $social ) {
			if ( empty( $social['name'] ) || empty( $social['icon'] ) ) {
				continue;
			}

			$name  = $social['name'];
			$icon  = $social['icon'];
			$color = $social_options[ $key ]['color'] ?? $social['color'];
			$url   = $social_options[ $key ]['url'] ?? $social['url'];
    ?>
    <div class="cell section section-text">
        <span class="heading !block"><?php _e( $name, ADDONS_TEXT_DOMAIN ); ?></span>
        <div class="option">
            <div class="controls control-img">
                <label for="<?= esc_attr( $key ) ?>">
	                <?php
	                if ( filter_var( $icon, FILTER_VALIDATE_URL ) || str_starts_with( $icon, 'data:' ) ) {
		                echo '<img src="' . $icon . '" alt="' . esc_attr( $name ) . '">';
	                } elseif ( str_starts_with( $icon, '<svg' ) ) {
		                echo $icon;
	                } elseif ( is_string( $icon ) ) {
		                echo '<i class="' . $icon . '"></i>';
	                }
	                ?>
                </label>
                <input type="color" class="input-color" name="<?= esc_attr( $key ) ?>-color" value="<?= esc_attr( $color ) ?>" title="Color">
                <input class="input" type="url" id="<?= esc_attr( $key ) ?>" name="<?= esc_attr( $key ) ?>-url" value="<?= esc_attr( $url ) ?>" title="URL">
            </div>
        </div>
    </div>
		<?php }
	} ?>
</div>