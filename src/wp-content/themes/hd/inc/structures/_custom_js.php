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
function custom_js_action(): void {
	ob_start();

	//-------------------------------------------------
	// Single page
	//-------------------------------------------------

	if ( is_single() && $ID = get_the_ID() ) :
		?>
		<script>
            document.addEventListener('DOMContentLoaded', async function() {
                let postID = <?= $ID ?>;
                let dateElement = document.querySelector('section.singular .meta > .date');
                let viewsElement = document.querySelector('section.singular .meta > .views');

                if (typeof window.hdConfig !== 'undefined') {
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
                        if (data.success) {
                            if (dateElement) dateElement.textContent = data.data.date;
                            if (viewsElement) viewsElement.textContent = data.data.views;
                        }
                    } catch (error) {}
                }
            });
		</script>
	<?php endif;

	$content = ob_get_clean();
	if ( $content ) {
		echo \HD\Helper::JSMinify( $content, true );
	}
}
