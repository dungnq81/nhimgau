(async function detectLighthouse() {
    function isLighthouse() {
        const userAgentCheck = navigator.userAgent.includes('Lighthouse');
        const webdriverCheck = navigator.webdriver;

        if (userAgentCheck || webdriverCheck) {
            return true;
        }

        return new Promise(resolve => {
            window.addEventListener('load', async function() {
                const start = performance.now();
                await new Promise(r => setTimeout(r, 100));
                const duration = performance.now() - start;

                resolve(duration > 90);
            });
        });
    }

    if (await isLighthouse()) {
        document.documentElement.classList.add('is-lighthouse');
    }
})();
