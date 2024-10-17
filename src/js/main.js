import 'sanitize.css';

import '../sass/style.scss';

import { fontawesome } from './fontawesome/_fontawesome';

import { smoothscrollPolyfill } from './smoothscrollPolyfill/_smoothscrollPolyfill';

// import { swiperTest } from './swiper/_swiperTest';

// import { loading } from './scripts/_loading';
// loading();

// import { hamburger } from './scripts/_hamburger';
// hamburger();

// import { toTop } from './scripts/_toTop';
// toTop();

// import { smoothscroll } from './scripts/_smoothscroll';
// smoothscroll();

// import { accordion } from './scripts/_accordion';
// accordion();

// import { modal } from './scripts/_modal';
// modal();

// import { tabMenu } from './scripts/_tabMenu';
// tabMenu();

import { test } from './sub';
jQuery(function ($) {
    test($);
});