document.addEventListener('DOMContentLoaded', () => {
    // === CURRENT YEAR FOR FOOTER ===
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // === SIDE NAV TOGGLE ===
    const menuBtn = document.getElementById('menuBtn');
    const sideNav = document.getElementById('sideNav');
    const sideNavOverlay = document.getElementById('sideNavOverlay');

    if (menuBtn && sideNav && sideNavOverlay) {
        menuBtn.addEventListener('click', () => {
            sideNav.classList.toggle('open');
            sideNavOverlay.classList.toggle('open');
            menuBtn.classList.toggle('open');
        });

        sideNavOverlay.addEventListener('click', () => {
            sideNav.classList.remove('open');
            sideNavOverlay.classList.remove('open');
            menuBtn.classList.remove('open');
        });

        sideNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                sideNav.classList.remove('open');
                sideNavOverlay.classList.remove('open');
                menuBtn.classList.remove('open');
            });
        });
    }
});