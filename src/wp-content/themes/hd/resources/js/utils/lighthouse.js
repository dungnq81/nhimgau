// lighthouse.js

(async function detectLighthouse() {
    const DETECTION_CLASS = 'is-lighthouse';

    const indicators = {
        ua: false,
        perf: false,
        dom: false,
        backend: false
    };

    // UA
    indicators.ua = (
        navigator.userAgent.includes('Lighthouse') ||
        navigator.userAgent.includes('HeadlessChrome') ||
        navigator.webdriver === true
    );

    // Performance
    const t0 = performance.now();
    for (let i = 0; i < 500_000; i++) Math.sqrt(i);
    const t1 = performance.now();
    indicators.perf = (t1 - t0) < 50;

    // DOM
    if (typeof window.hdConfig !== 'undefined') {
        try {
            const res = await fetch(window.hdConfig._restApiUrl + 'global/lighthouse', {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'X-WP-Nonce': window.hdConfig._restToken
                }
            });
            const json = await res.json();
            indicators.backend = json.success && json.detected;
        } catch (err) {}
    }

    // Apply detection
    const applyDetection = () => {
        const anyDetected = Object.values(indicators).some(Boolean);
        if (anyDetected) {
            document.documentElement.classList.add(DETECTION_CLASS);
        }
    };

    // Wait for a page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const iframes = document.querySelectorAll('iframe');
            const matches = Array.from(iframes).filter(f =>
                f.title === 'Accessibility audit' || f.src === 'about:blank'
            );
            indicators.dom = matches.length > 0;

            applyDetection();
        }, 1000);
    });

    // Apply detection
    applyDetection();
})();
