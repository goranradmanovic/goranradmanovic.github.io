/**
 * Registers the PWA Service Worker and monitors for version updates.
 * Dispatches a 'pwa-update-available' event when a new version is waiting.
 */
const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            // Register the service worker -> Add /serviceworker.min.js
            const registration = await navigator.serviceWorker.register('/serviceworker.js', { scope: '/' }) 

            // Helper function to dispatch the custom update event
            const dispatchUpdate = (waitingWorker) => {
                const event = new CustomEvent('pwa-update-available', { detail: waitingWorker })
                window.dispatchEvent(event)
            }

            // 1. Check if there's already a worker waiting from a previous session/tab close
            if (registration.waiting) {
                console.log('Service worker installed & waiting')
                dispatchUpdate(registration.waiting)
            }

            // 2. Listen for future updates while the user is actively on the page
            registration.addEventListener('updatefound', () => {
                const newWorker = registration.installing
                console.log('Service worker installing a new version...')

                newWorker.addEventListener('statechange', () => {
                    // The new worker has finished installing and is now waiting to take over
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        console.log('New service worker version is ready and waiting.')
                        dispatchUpdate(newWorker)
                    }
                })
            })

            if (registration.active && !registration.waiting) {
                console.log('Service worker active and up to date')
            }

        } catch (error) {
            console.error(`Registration failed with ${error}`)
        }

        // 3. Listen for the controller change to force a page refresh
        // This fires immediately after your toast calls `SKIP_WAITING` and the new SW activates
        let refreshing = false
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            if (!refreshing) {
                refreshing = true
                window.location.reload()
            }
        })
    }
}

export default registerServiceWorker;