<?php
/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password, we will
 * return early without loading the comments.
*/

\defined( 'ABSPATH' ) || die;

if ( post_password_required() ) {
	return;
}

$fb_appid = \Cores\Helper::getThemeMod( 'social_fb_setting' );
if ( ! $fb_appid ) {
	return;
}

?>
<div class="facebook-comments-area comments-area">
    <span class="comments-title"><?php echo __( 'Facebook comments', TEXT_DOMAIN ) ?></span>
    <div class="fb-comments" data-href="<?php echo get_the_permalink(); ?>" data-numposts="10" data-colorscheme="light" data-order-by="social" data-mobile="true"></div>
</div>
