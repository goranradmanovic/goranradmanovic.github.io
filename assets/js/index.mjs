// Components
import './components/head.mjs'
import './components/navigation.mjs'
import './components/socials.mjs'
import './components/skills.mjs'
import './components/experience.mjs'
import './components/portfolio.mjs'

// Utils
import currentYear from './utils/current-year.mjs'
import toggleMenu from './utils/toggle-menu.mjs'
import registerServiceWorker from './utils/register-sw.mjs'

//Waiting for the HTML document to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
	currentYear()
	toggleMenu()
	registerServiceWorker()
})