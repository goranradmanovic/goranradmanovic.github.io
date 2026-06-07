const LOADER_MAX_MS = 4000

function hidePageLoader() {
    const root = document.documentElement
    const loader = document.querySelector('.page-loader')

    if (!root.classList.contains('is-loading')) return

    root.classList.remove('is-loading')
    root.removeAttribute('aria-busy')

    // Remove from DOM after fade-out
    loader?.addEventListener('transitionend', () => loader.remove(), { once: true })
    setTimeout(() => loader?.remove(), 500) // fallback if transitionend doesn't fire
}

export async function initPageLoader() {
    document.documentElement.setAttribute('aria-busy', 'true')

    const safety = setTimeout(hidePageLoader, LOADER_MAX_MS)

    try {
        // Wait for web fonts (matches your Lora / Montserrat setup)
        if (document.fonts?.ready) {
            await document.fonts.ready
        }

        // One frame so custom elements can paint after connectedCallback
        await new Promise(requestAnimationFrame)
        await new Promise(requestAnimationFrame)
    } catch {
        // still hide loader
    } finally {
        clearTimeout(safety)
        hidePageLoader()
    }
}