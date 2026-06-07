// Head data
import headData from '../data/min/head.json' with { type: 'json' }

// Utils Page Loader
import { initPageLoader } from './utils/page-loader.mjs'
import updateHead from './utils/update-head.mjs'
import toggleMenu from './utils/toggle-menu.mjs'
import injectRichSchema from './utils/rich-schema.mjs'
import registerServiceWorker from './utils/register-sw.mjs'

// Components
import './components/pwa-toast.mjs'
import './components/navigation.mjs'
import './components/intro.mjs'
import './components/about.mjs'
import './components/socials.mjs'
import './components/skills.mjs'
import './components/experience.mjs'
import './components/projects.mjs'
import './components/contact.mjs'
import './components/footer.mjs'

async function initApp() {
	await initPageLoader()
	updateHead(headData.head)
	injectRichSchema()
	toggleMenu()
	registerServiceWorker()
}

// Minified bundle uses defer/async — may run after DOMContentLoaded already fired
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initApp, { once: true })
} else {
	initApp()
}