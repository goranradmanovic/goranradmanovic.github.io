const toggleMenu = () => {
    // Query elements inside the function so they exist when DOMContentLoaded fires
    const toggleBtn = document.querySelector('#menu-toggle');
    const mainNav = document.querySelector('#main-navigation');

    // Early exit if the elements don't exist on the current page
    if (!toggleBtn || !mainNav) return;

    // Prevent adding multiple duplicate listeners if toggleMenu() is ever called twice
    if (toggleBtn.dataset.listenerAdded) return;

    const updateMenuState = (isOpen) => {
        toggleBtn.setAttribute('aria-expanded', isOpen);
        mainNav.setAttribute('aria-hidden', !isOpen);
    };

    const openMenu = () => updateMenuState(true);

    const closeMenu = () => {
        updateMenuState(false);
        toggleBtn.focus(); // Returns keyboard focus to the burger button
    };

    const toggleMenuState = () => {
        const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
        isExpanded ? closeMenu() : openMenu();
    };

    // 1. Toggle Button Event
    toggleBtn.addEventListener('click', toggleMenuState);

    // 2. Link Click Event (Uses efficient event delegation)
    mainNav.addEventListener('click', (e) => {
        if (e.target.closest('.header__link')) {
            closeMenu();
        }
    });

    // 3. Escape Key Support
    document.addEventListener('keydown', (e) => {
        const isOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
        if (isOpen && e.key === 'Escape') {
            closeMenu();
        }
    });

    // Mark as initialized
    toggleBtn.dataset.listenerAdded = 'true';
};
  
export default toggleMenu;