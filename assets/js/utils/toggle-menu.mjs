const toggleMenu = () => {
    const toggle = document.querySelector('.header__menu__toggle')

    if (toggle && !toggle.dataset.listenerAdded) { // Ensure the listener is added only once
        toggle.addEventListener('click', () => {
            const isOpen = toggle.getAttribute('data-open') === 'true'
            toggle.setAttribute('data-open', isOpen ? 'false' : 'true')
        })
        toggle.dataset.listenerAdded = true // Mark listener as added
    }
}

export default toggleMenu