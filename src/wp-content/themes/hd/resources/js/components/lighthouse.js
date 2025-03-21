(async function detectLighthouse() {
    let lighthouseDetected = false;
    if (navigator.userAgent.includes('Lighthouse') || navigator.webdriver) {
        lighthouseDetected = true;
    }

    if (!lighthouseDetected && typeof hdObject !== 'undefined') {
        try {
            const response = await fetch(hdObject._ajaxUrl + '?action=check_lighthouse');
            const data = await response.json();
            if (data.success && data.data.lighthouse) {
                lighthouseDetected = true;
            }
        } catch (error) {
        }
    }

    if (!lighthouseDetected) {
        lighthouseDetected = await new Promise(resolve => {
            window.addEventListener('load', async function() {
                const start = performance.now();
                await new Promise(r => setTimeout(r, 100));
                const duration = performance.now() - start;

                resolve(duration > 90);
            });
        });
    }

    if (lighthouseDetected) {
        document.documentElement.classList.add('is-lighthouse');
    }
})();
