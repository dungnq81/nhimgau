import { hdConfig } from './config.js';

(async function detectLighthouse() {
    let lighthouseDetected = false;
    if (navigator.userAgent.includes('Lighthouse') || navigator.webdriver) {
        lighthouseDetected = true;
    }

    if (!lighthouseDetected && typeof hdConfig !== 'undefined') {
        try {
            let response = await fetch(hdConfig._ajaxUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    action: 'check_lighthouse',
                    _wpnonce: hdConfig._csrfToken
                }),
            });

            let data = await response.json();
            if (data.success && data.data.detected) {
                lighthouseDetected = true;
            }
        } catch (error) {}
    }

    if (lighthouseDetected) {
        document.documentElement.classList.add('is-lighthouse');
    }
})();
