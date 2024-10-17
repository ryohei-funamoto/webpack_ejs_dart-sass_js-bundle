export function hamburger() {
    const hamburger = document.getElementById('js-hamburger');
    const drawer = document.getElementById('js-drawer');
    const overlay = document.getElementById('js-overlay');

    function menuToggle() {
        const isExpanded = hamburger.getAttribute('aria-expanded') !== 'false';
        const isHidden = drawer.getAttribute('aria-hidden') !== 'false';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        drawer.setAttribute('aria-hidden', !isHidden);
        overlay.classList.toggle('is-show');
    };

    hamburger.addEventListener('click', menuToggle);
    overlay.addEventListener('click', () => hamburger.click());
}