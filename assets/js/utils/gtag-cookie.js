window.dataLayer = window.dataLayer || [];

function gtag(){ dataLayer.push(arguments); }

gtag('consent', 'default', {
	ad_storage: 'denied',
	ad_user_data: 'denied',
	ad_personalization: 'denied',
	analytics_storage: 'denied',
	functionality_storage: 'granted',
	personalization_storage: 'denied',
	security_storage: 'granted',
	wait_for_update: 500
});

const GA_ID = 'G-552RBXQP38'

function loadGoogleAnalytics() {
	if (window.__gaLoaded) return
	window.__gaLoaded = true
	const script = document.createElement('script')
	script.async = true
	script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
	script.setAttribute('data-consent-id', 'analytics')
	script.onload = () => {
		gtag('js', new Date())
		gtag('config', GA_ID, {
			anonymize_ip: true,
			send_page_view: true
		})
	}
	document.head.appendChild(script)
}

// WAIT UNTIL SILKTIDE LOADS
window.addEventListener('DOMContentLoaded', () => {
	if (!window.silktideConsentManager) return

	window.silktideConsentManager.init({
		backdrop: {
			show: true
		},
		icon: {
			position: 'bottomLeft'
		},
		prompt: {
			position: 'bottomLeft'
		},
		consentTypes: [
			{
				id: 'essential',
				label: 'Essential',
				description: '<p>These cookies are required for the website to function properly and cannot be disabled.</p>',
				required: true
			},
			{
				id: 'analytics',
				label: 'Analytics',
				description: '<p>Analytics cookies help us understand how visitors interact with the website.</p>',
				defaultValue: false,
				// Silktide will automatically fire gtag update events only when the user submits an actual choice.
				gtag: 'analytics_storage',
				onAccept: loadGoogleAnalytics
			},
		],
		text: {
			prompt: {
				title: 'Cookie Preferences',
				description: '<p>We use cookies to improve your experience and analyze website traffic. Read our <a href="./pages/privacy-policy.html" target="_blank" style="text-decoration: underline;">Privacy Policy</a>.</p>',
				acceptAllButtonText: 'Accept all',
				rejectNonEssentialButtonText: 'Reject non-essential',
				preferencesButtonText: 'Preferences'
			},
			preferences: {
				title: 'Manage cookie preferences',
				description: '<p>You can enable or disable different categories of cookies below. For more information, please read our <a href="./pages/privacy-policy.html" target="_blank" style="text-decoration: underline;">Privacy Policy</a>.</p>',
				saveButtonText: 'Save preferences'
			}
		}
	})

	// Returning visitors who already accepted analytics
	const manager = window.silktideConsentManager.getInstance?.()
	if (manager?.getConsentChoice('analytics') === true) {
		loadGoogleAnalytics()
	}
})
