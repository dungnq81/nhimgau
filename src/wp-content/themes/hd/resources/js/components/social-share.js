import Ensemble from 'ensemble-social-share/dist/js/ensemble-social-share.min';

export const initializeSocialShare = (attributeName = 'data-social-share', customOptions = {}) => {
    const defaultOptions = {
        displays: [
            'facebook',
            'ex',
            'whatsapp',
            'messenger',
            'telegram',
            'linkedin',
            'send-email',
            'copy-link',
            'web-share',
        ],
    };

    const options = { ...defaultOptions, ...customOptions };

    // Search for elements with `attributeName`
    const elements = document.querySelectorAll(`[${attributeName}]`);

    if (elements.length === 0) {
        console.warn(`No elements found with attribute: ${attributeName}`);
        return null;
    }

    // SocialShare
    const instances = [];
    elements.forEach((element) => {
        const instance = new Ensemble.SocialShare(element, options);
        instances.push(instance);
    });

    return instances;
};
