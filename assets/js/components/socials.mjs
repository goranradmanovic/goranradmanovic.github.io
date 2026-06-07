import { createElement } from '../utils/create-element.mjs'

class SocialList extends HTMLElement {
  static SOCIAL_LINKS = [
    { label: 'Linkedin', url: 'https://www.linkedin.com/in/goran-radmanovic-70814a9b/' },
    { label: 'X', url: 'https://x.com/GoranRadmanovic' },
    { label: 'GitHub', url: 'https://github.com/goranradmanovic/' },
    { label: 'Gmail', url: 'mailto:goranradmanovic@gmail.com' }
  ]

  #initialized
  #list

  constructor() {
    super()
    this.#initialized = false
    this.#list = null
  }

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
  }

  get modifyingClass() {
    return this.getAttribute('mod-class') || ''
  }

  // Render the component structure
  render() {
    const nav = createElement('nav', { class: `social__links ${this.modifyingClass}`, 'aria-label': 'Social links' })
    this.replaceChildren(nav)
    this.#list = nav
    this.createLinkItems()
  }

  // Create and append social link items
  createLinkItems() {
    const fragment = document.createDocumentFragment()

    SocialList.SOCIAL_LINKS.forEach(({ label, url }) => {
      const anchor = this.createLinkElement(label, url)
      fragment.appendChild(anchor)
    })

    this.#list.appendChild(fragment)
  }

  // Create a single social link element
  createLinkElement(label, url) {
    const attrs = {
      class: 'social__link',
      href: url,
      'aria-label': label
    }
    
    if (!url.startsWith('mailto:')) {
      attrs.target = '_blank'
      attrs.rel = 'noopener noreferrer'
    }
    const a = createElement('a', attrs)
    const icon = createElement('i', { class: `social__icon social__icon--${label.toLowerCase()}`, 'aria-hidden': 'true'})
    
    a.appendChild(icon)
    return a
  }
}

customElements.define('social-list', SocialList)

export default SocialList