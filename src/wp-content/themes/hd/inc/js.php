<?php
/**
 * JS Output
 *
 * @author Gaudev
 */

\defined( 'ABSPATH' ) || die;

// --------------------------------------------------
// Custom JS
// --------------------------------------------------

add_action( 'wp_footer', 'custom_js_action', 999 );

/**
 * @return void
 */
function custom_js_action(): void {
	ob_start();

	// single page
	if ( is_single() && $ID = get_the_ID() ) :
    ?>
    <script>
        document.addEventListener('DOMContentLoaded', async function() {
            let postID = <?= $ID ?>;
            if ( typeof window.hdConfig !== 'undefined' ) {
                try {
                    let response = await fetch(window.hdConfig._ajaxUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            action: 'track_post_views',
                            id: postID,
                            _wpnonce: window.hdConfig._csrfToken,
                        }),
                    });
                    let data = await response.json();
                } catch (error) {}
            }
        });
    </script>
	<?php endif;

	$content = ob_get_clean();
	echo \HD\Helper::JSMinify( $content, true );
}
