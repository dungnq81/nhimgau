import { nanoid } from 'nanoid';
import { toString } from 'ramda';
import Swiper from 'swiper/bundle';

// Initialize Swiper instances
const initializeSwiper = (el, swiper_class, options) => {
    if (!(el instanceof Element)) {
        console.error('Error: The provided element is not a DOM element.');
        return;
    }

    const swiper = new Swiper(swiper_class, options);

    el.addEventListener('mouseover', () => swiper.autoplay?.stop());
    el.addEventListener('mouseout', () => options.autoplay && swiper.autoplay?.start());

    return swiper;
};

// Generate unique class names
const generateClasses = () => {
    const rand = nanoid(10);
    return {
        rand: rand,
        swiperClass: `swiper-${rand}`,
        nextClass: `next-${rand}`,
        prevClass: `prev-${rand}`,
        paginationClass: `pagination-${rand}`,
        scrollbarClass: `scrollbar-${rand}`,
    };
};

// Default Swiper options
const getDefaultOptions = () => ({
    grabCursor: !0,
    allowTouchMove: !0,
    threshold: 5,
    autoHeight: !1,
    loop: !1,
    hashNavigation: !1,
    direction: 'horizontal',
    freeMode: !1,
    cssMode: !1,
    centeredSlides: !1,
    slidesPerView: 'auto',
});

const initializeSwipers = () => {
    const swiperElements = document.querySelectorAll('.w-swiper');
    swiperElements.forEach((el) => {
        const classes = generateClasses();
        el.classList.add(classes.swiperClass);

        const container = el.closest('.swiper-container');

        let controls = container?.querySelector('.swiper-controls');
        if (!controls) {
            controls = document.createElement('div');
            controls.classList.add('swiper-controls');
            el.after(controls);
        }

        let options = {};
        try {
            options = JSON.parse(el.dataset.options) || {};
        } catch (e) {
            console.error('Invalid JSON in data-options', e);
        }

        let swiperOptions = { ...getDefaultOptions() };

        if (options.wrapperClass) swiperOptions.wrapperClass = options.wrapperClass; // swiper-wrapper
        if (options.slideClass) swiperOptions.slideClass = options.slideClass; // swiper-slide
        if (options.slideActiveClass) swiperOptions.slideActiveClass = options.slideActiveClass; // swiper-slide-active

        if (options.autoHeight) swiperOptions.autoHeight = !0;
        if (options.loop) swiperOptions.loop = !0;
        if (options.direction) swiperOptions.direction = toString(options.direction);
        if (options.freeMode) swiperOptions.freeMode = !0;
        if (options.cssMode) swiperOptions.cssMode = !0;
        if (options.mousewheel) swiperOptions.mousewheel = !0;
        if (options.parallax) swiperOptions.parallax = !0;
        if (options.slidesPerView) swiperOptions.slidesPerView = options.slidesPerView;
        if (options.spaceBetween) swiperOptions.spaceBetween = parseInt(options.spaceBetween);

        swiperOptions.speed = parseInt(options.speed) || 300;

        // grid
        if (options.grid) {
            swiperOptions.grid = {
                rows: Math.max(parseInt(options.grid?.rows) || 1, 1),
                fill: options.grid?.fill || 'row',
            };

            if (options.loop) {
                swiperOptions.loopAddBlankSlides = !0;
            }
        }

        // autoplay
        if (options.autoplay) {
            swiperOptions.autoplay = {
                delay: parseInt(options.autoplay?.delay) || 3000,
                disableOnInteraction: options.autoplay?.disableOnInteraction || !0,
                reverseDirection: options.autoplay?.reverseDirection || !1,
            };
        }

        // navigation
        if (options.navigation) {
            let btnPrev = container?.querySelector('.swiper-button-prev');
            let btnNext = container?.querySelector('.swiper-button-next');

            if (btnPrev && btnNext) {
                btnPrev.classList.add(classes.prevClass);
                btnNext.classList.add(classes.nextClass);
            } else {
                btnPrev = document.createElement('div');
                btnNext = document.createElement('div');
                btnPrev.classList.add('swiper-button', 'swiper-button-prev', classes.prevClass);
                btnNext.classList.add('swiper-button', 'swiper-button-next', classes.nextClass);
                controls.append(btnPrev, btnNext);

                btnPrev.setAttribute('data-fa', '');
                btnNext.setAttribute('data-fa', '');
            }

            swiperOptions.navigation = {
                nextEl: `.${classes.nextClass}`,
                prevEl: `.${classes.prevClass}`,
            };
        }

        // pagination
        if (options.pagination) {
            let pagination = container?.querySelector('.swiper-pagination');
            if (pagination) {
                pagination.classList.add(classes.paginationClass);
            } else {
                pagination = document.createElement('div');
                pagination.classList.add('swiper-pagination', classes.paginationClass);
                controls.appendChild(pagination);
            }

            const paginationType = toString(options.pagination);
            swiperOptions.pagination = {
                el: `.${classes.paginationClass}`,
                clickable: true,
                ...(paginationType === 'bullets' && { dynamicBullets: !0, type: 'bullets' }),
                ...(paginationType === 'fraction' && { type: 'fraction' }),
                ...(paginationType === 'progressbar' && { type: 'progressbar' }),
                ...(paginationType === 'custom' && {
                    renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
                }),
            };
        }

        // scrollbar
        if (options.scrollbar) {
            let scrollbar = container?.querySelector('.swiper-scrollbar');
            if (scrollbar) {
                scrollbar.classList.add(classes.scrollbarClass);
            } else {
                scrollbar = document.createElement('div');
                scrollbar.classList.add('swiper-scrollbar', classes.scrollbarClass);
                controls.appendChild(scrollbar);
            }

            swiperOptions.scrollbar = {
                el: `.${classes.scrollbarClass}`,
                hide: !0,
                draggable: !0,
            };
        }

        // observer
        if (options._observer) {
            swiperOptions.observer = !0;
            swiperOptions.observeParents = !0;
            swiperOptions.observeSlideChildren = !0;
        }

        // centeredSlides
        if (options._centered) {
            swiperOptions.centeredSlides = !0;
            swiperOptions.centeredSlidesBounds = !0;
        }

        // marquee
        if (options._marquee) {
            swiperOptions.centeredSlides = !1;
            swiperOptions.autoplay = {
                delay: 1,
                disableOnInteraction: !0,
            };
            swiperOptions.loop = !0;
            swiperOptions.speed = 6000;
            swiperOptions.allowTouchMove = !0;
        }

        // spaceBetween breakpoints
        if (options._gap) {
            swiperOptions.spaceBetween = 20;
            swiperOptions.breakpoints = {
                768: { spaceBetween: 28 },
            };
        }

        // breakpoints
        if (options.breakpoints) {
            swiperOptions.breakpoints = {
                0: options?._mobile || {},
                768: options?._tablet || {},
                1024: options?._desktop || {},
            };
        }

        initializeSwiper(el, `.${classes.swiperClass}`, swiperOptions);
    });
};

document.addEventListener('DOMContentLoaded', initializeSwipers);
