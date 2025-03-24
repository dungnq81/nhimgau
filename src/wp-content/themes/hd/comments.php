<?php
/**
 * The template for displaying comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 */

\defined( 'ABSPATH' ) || die;

if ( post_password_required() ) {
	return;
}

$comment_count = get_comments_number();

?>
<div id="comments" class="comments-area wp-comments-area"></div>
