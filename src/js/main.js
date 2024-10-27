import "sanitize.css";

import "../sass/style.scss";

import "iconify-icon";

import smoothscroll from "smoothscroll-polyfill";
smoothscroll.polyfill();

// import { swiper } from "./swiper/_swiper";

// import { loading } from "./scripts/_loading";
// loading();

// import { hamburger } from "./scripts/_hamburger";
// hamburger();

// import { toTop } from "./scripts/_toTop";
// toTop();

// import { smoothscroll } from "./scripts/_smoothscroll";
// smoothscroll();

// import { accordion } from "./scripts/_accordion";
// accordion();

// import { modal } from "./scripts/_modal";
// modal();

// import { tabMenu } from "./scripts/_tabMenu";
// tabMenu();

import { test } from "./sub";
jQuery(function ($) {
    test($);
});