// lighthouse.js

(async function detectLighthouse() {
    let lighthouseDetected = false;
    if (navigator.userAgent.includes('Lighthouse') || navigator.webdriver) {
        lighthouseDetected = true;
    }

    if (!lighthouseDetected && typeof window.hdConfig !== 'undefined') {
        const endpointURL = window.hdConfig._restApiUrl + 'global/lighthouse';
        try {
            let resp = await fetch(endpointURL, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': window.hdConfig._restToken,
                },
                body: JSON.stringify({})
            });
            const json = await resp.json();
            if (json.success && json.detected) {
                lighthouseDetected = true;
            }
        } catch (err) {}
    }

    if (lighthouseDetected) {
        document.documentElement.classList.add('is-lighthouse');
    }
})();
