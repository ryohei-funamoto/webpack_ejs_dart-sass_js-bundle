export function hamburger() {
    const hamburger = document.querySelector(".js-hamburger");
    const drawer = document.querySelector(".js-drawer");
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const openBurger = function () {
        hamburger.classList.add("is-open");
        drawer.classList.add("is-open");
    };

    const closeBurger = function () {
        hamburger.classList.remove("is-open");
        drawer.classList.remove("is-open");
    };

    const toggleBurger = function () {
        if (hamburger.classList.contains("is-open")) {
            closeBurger();
        } else {
            openBurger();
        }
    };

    const handleMediaQuery = function (e) {
        if (e.matches) closeBurger();
    };

    hamburger.addEventListener("click", toggleBurger);
    mediaQuery.addEventListener("change", handleMediaQuery);

    handleMediaQuery(mediaQuery);
}