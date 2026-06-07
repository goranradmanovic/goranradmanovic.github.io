import { createElement } from '../utils/create-element.mjs'

class PWAToast extends HTMLElement {
    #waitingWorker
    #toast
    #initialized

    constructor() {
        super()
        this.#waitingWorker = null
        this.#toast = null
        this.#initialized = false // Prevent duplicate initialization
        // Bind event handling to preserve context
        this.handleUpdateEvent = this.handleUpdateEvent.bind(this)
    }

    connectedCallback() {
        if (this.#initialized) return

        this.#initialized = true
        // Render only when inserted into DOM to save resources
        this.render()
        
        // Listen for the custom PWA update event
        window.addEventListener('pwa-update-available', this.handleUpdateEvent)
    }

    disconnectedCallback() {
        // Clean up event listener to prevent memory leaks
        window.removeEventListener('pwa-update-available', this.handleUpdateEvent)
    }

    // Isolated event handler method
    handleUpdateEvent(event) {
        this.#waitingWorker = event.detail;
        if (this.#toast) {
            this.#toast.classList.add('pwa-toast--visible')
        }
    }

    render() {
        const div = createElement('div', { class: 'pwa-toast' })
        this.replaceChildren(div)
        this.#toast = this.querySelector('.pwa-toast')
        this.createToastElement()
    }

    createToastElement() {
        const fragment = document.createDocumentFragment()
        const div_icon = createElement('div', { class: 'pwa-toast__icon' }, '!')
        const div_content = createElement('div', { class: 'pwa-toast__content' })
        const h4 = createElement('h4', { class: 'pwa-toast__title' }, 'Update available')
        const p = createElement('p', { class: 'pwa-toast__txt' }, 'Refresh the page to load the latest version.')
        
        const button = createElement('button', { 
            class: 'pwa-toast__btn',
            type: 'button', // Explicitly set type to prevent accidental form submits
            'aria-label': 'Refresh application version' // Accessibility
        });
        
        const img = createElement('img', { 
            class: 'pwa-toast__btn-icon',
            src: './assets/images/icons/addition/refresh.svg',
            alt: 'Refresh icon',
            width: '24', // Set explicit dimensions to prevent Layout Shifts (CLS)
            height: '24' 
        })
        
        button.appendChild(img)
        
        // Handle clicking the update action
        button.addEventListener('click', (event) => {
            event.preventDefault()
            if (this.#waitingWorker) {
                this.#waitingWorker.postMessage({ type: 'SKIP_WAITING' })
                this.#toast.classList.remove('pwa-toast--visible')
            }
        })

        div_content.appendChild(h4);
        div_content.appendChild(p);
        fragment.appendChild(div_icon);
        fragment.appendChild(div_content)
        fragment.appendChild(button);
        this.#toast.appendChild(fragment)
    }
}

customElements.define('pwa-toast', PWAToast)

export default PWAToast