const toggleMenu = () => {
    const toggleBtn = document.querySelector('.header__menu__toggle'),
        navLink = document.querySelectorAll('.header__nav__link')

    if (toggleBtn && !toggleBtn.dataset.listenerAdded) { // Ensure the listener is added only once
        toggleBtn.addEventListener('click', () => {
            const isOpen = toggleBtn.getAttribute('data-open') === 'true'
            toggleBtn.setAttribute('data-open', isOpen ? 'false' : 'true')
        })
        toggleBtn.dataset.listenerAdded = true // Mark listener as added

        navLink.forEach(link => {
            link.addEventListener('click', () => {
                const isOpen = toggleBtn.getAttribute('data-open') === 'true'
                toggleBtn.setAttribute('data-open', isOpen ? 'false' : 'true')
            })
            toggleBtn.dataset.listenerAdded = true // Mark listener as added
        })
    }
}

export default toggleMenu