import navigation from '../../data/min/navigation.json' with { type: 'json' }
import { createElement } from '../utils/create-element.mjs'

class MainNavigation extends HTMLElement {
  #initialized
  #nav
  #sections
  #navLinks
  #observer

  constructor() {
    super()
    this.#initialized = false
    this.#nav = null
    this.#observer = null
    this.#sections = []
    this.#navLinks = []
  }

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
    this.initObserver()
    this.setActiveLink(location.hash.slice(1))
  }

  disconnectedCallback() {
    this.#observer?.disconnect()
  }

  // Render the navigation element and its links
  render() {
    const nav = createElement('nav', { class: 'header__nav', id: 'main-navigation' })
    this.replaceChildren(nav)
    this.#nav = nav
    this.#navLinks = navigation.items || ['About', 'Skills', 'Experience', 'Projects', 'Contact']
    this.#sections = this.#navLinks.map(link => document.getElementById(link.name.toLowerCase())).filter(Boolean)
    this.createNavLinks(this.#navLinks)
  }

  // Handle events
  handleEvent(event) {
    this[`on${event.type}`]?.(event)
  }

  // on click event
  onclick(event) {
    const id = event.target.closest('a')?.hash?.slice(1)
    if (id) this.setActiveLink(id)
  }

  // on hash change event
  /*onHashChange(event) {
    this.setActiveLink(event.traget.innerText.toLowerCase())
  }*/

  initObserver() {
    this.#observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          const sectionId = entry.target.id
          this.setActiveLink(sectionId)
          history.replaceState(null, '', `#${sectionId}`)
        })
      },
      {
        threshold: 0.5
      }
    )

    this.#sections.forEach(section => {
      this.#observer.observe(section)
    })
  }

  // Utility to create links and append to nav
  createNavLinks(links) {
    this.#nav.append(
      ...links.map((item) => this.createLink(item))
    )
  }

  // Utility to create a single link element
  createLink(item) {
    const link = createElement('a', { class: 'header__link', href: `${item?.href}` }, item?.name)
    link.addEventListener('click', this)
    return link
  }

  setActiveLink(sectionId) {
    this.#nav.querySelectorAll('.header__link').forEach(link => {
      const isActive = link.getAttribute('href') === `#${sectionId}`

      link.classList.toggle('header__link--active', isActive)

      if (isActive) {
        link.setAttribute('aria-current', 'page')
      } else {
        link.removeAttribute('aria-current')
      }
    })
  }
}

customElements.define('main-navigation', MainNavigation)

export default MainNavigation