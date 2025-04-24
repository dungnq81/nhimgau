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
        document.addEventListener('DOMContentLoaded', async () => {
            let postID = <?= $ID ?>;
            const dateEl = document.querySelector('section.singular .meta > .date');
            const viewsEl = document.querySelector('section.singular .meta > .views');

            if (typeof window.hdConfig !== 'undefined') {
                const endpointURL = window.hdConfig._restApiUrl + 'single/track_views';
                try {
                    const resp = await fetch(endpointURL, {
                        method: 'POST',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-WP-Nonce': window.hdConfig._restToken,
                        },
                        body: JSON.stringify({id: postID})
                    });
                    const json = await resp.json();
                    if (json.success) {
                        if (dateEl) dateEl.textContent = json.date;
                        if (viewsEl) viewsEl.textContent = json.views;
                    }
                } catch (err) {
                    console.error('Track views error:', err);
                }
            }
        });
    </script>
	<?php endif;

	$content = ob_get_clean();
	if ( $content ) {
		echo \HD\Helper::JSMinify( $content, true );
	}
}
