import { SocialShare } from '@loltgt/ensemble-social-share';

function initSocialShare() {
    const elements = document.querySelectorAll('[data-social-share]');
    elements.forEach((element) => {
        new SocialShare(element, {
            displays: [
                'facebook',
                'x',
                'whatsapp',
                'messenger',
                'telegram',
                'linkedin',
                'send-email',
                'copy-link',
                'web-share',
            ],
        });
    });
}

export { initSocialShare, SocialShare };
