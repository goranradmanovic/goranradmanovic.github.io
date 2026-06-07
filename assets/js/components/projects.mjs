import projects from '../../data/min/projects.json' with { type: 'json' }
import { createElement, createViewMoreButton } from '../utils/create-element.mjs'

class PortfolioProjects extends HTMLElement {
  static VISIBLE_ITEMS = 6
  static LOAD_STEP = 3
  static PLACEHOLDER = './assets/images/icons/addition/photo-placeholder.svg'

  #initialized
  #gallery
  #dialog
  #button
  #hiddenItems
  #showMoreHandler
  #modalTitle
  #modalImage
  #modalDesc
  #modalTech
  #modalLink

  constructor() {
    super()
    this.#initialized = false
    this.#gallery = null
    this.#dialog = null
    this.#button = null
    this.#hiddenItems = []
    this.#showMoreHandler = () => this.showMoreProjects()
    this.#modalTitle = null
    this.#modalImage = null
    this.#modalDesc = null
    this.#modalTech = null
    this.#modalLink = null
  }

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
    this.renderProjects()
    this.viewMoreButton()
    this.createModal()
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this.#showMoreHandler)
    this.#gallery?.removeEventListener('click', this)
  }

  // Render initial structure
  render() {
    const h2 = createElement('h2', { class: 'projects__title' }, projects.title)
    this.#gallery = createElement('div', { class: 'projects__gallery' })
    this.replaceChildren(h2, this.#gallery)
    this.#gallery.addEventListener('click', this)
  }

  // Event handling
  handleEvent(event) {
    this[`on${event.type}`]?.(event)
  }

  // On btn click
  onclick(event) {
    event.preventDefault()
    
    this.openDialogModal(event)
  }

  openDialogModal(event) {
    const button = event.target.closest('[data-action="open-project"]')

    if (!button) return

    const index = button.dataset.index

    this.openProject(projects.items[index])
  }

  viewMoreButton() {
    if (projects.length <= PortfolioProjects.VISIBLE_ITEMS) return
    this.#button = createViewMoreButton('projects__button-vp', 'View more projects', this.#hiddenItems, 'View more', this.#showMoreHandler)
    this.#gallery.insertAdjacentElement('afterend', this.#button)
  }

  renderProjects() {
    const fragment = document.createDocumentFragment()
    this.#gallery.innerHTML = ''

    projects.items.forEach((p, i) => {
      const item = createElement('article', { class: 'projects__item' })
      const image = createElement('img', {
        class: 'projects__image',
        src: p.thumb || PortfolioProjects.PLACEHOLDER,
        alt: p.name,
        loading: 'lazy',
        width: "256",
        height: "256",
      })

      if (i >= PortfolioProjects.VISIBLE_ITEMS) {
        item.classList.add('projects__item--hidden')
        image.setAttribute("decoding", "async")
      }

      item.append(
        image,

        createElement('span', { class: 'projects__title' }, p.name),

        createElement('button', {
          class: 'projects__button',
          'data-action': 'open-project',
          'data-index': i
        }, 'See details')
      )

      fragment.append(item)
    })

    this.#gallery.append(fragment)
    // Update hidden list items reference
    this.#hiddenItems = this.getElementsByClassName('projects__item--hidden')
  }

  openProject(project) {
    const { img, name, text, tech, url } = project

    const modal = this.#dialog
    const isDisabled = url ? false : true
    this.#modalTitle.textContent = name
    this.#modalImage.src = img || PortfolioProjects.PLACEHOLDER
    this.#modalImage.alt = `${name} image`
    this.#modalDesc.innerHTML = ''
    this.#modalTech.innerHTML = ''
    this.#modalLink.href = url || '#'
    this.#modalLink.tabIndex = isDisabled ? -1 : 0
    this.#modalLink.classList.toggle('modal__link--disabled', isDisabled)

    text.forEach(t =>
      this.#modalDesc.append(createElement('li', { class: 'modal__item' }, t))
    )

    tech.forEach(t =>
      this.#modalTech.append(createElement('li', { class: 'modal__item'}, t))
    )

    modal.showModal()
  }

  createModal() {
    this.#dialog = createElement('dialog', { class: 'modal', 'aria-labelledby': 'Dialog' })

    const fragment = document.createDocumentFragment()
    const div = createElement('div', { class: 'modal__wrapper' })
    const content = createElement('div', { class: 'modal__content' })
    const button = createElement('button', { class: 'modal__button', 'aria-label': 'Close dialog', type: 'button' })
    const img = createElement('img', { class: 'modal__image', loading: 'lazy', width: "644", height: "444" })
    const h2 = createElement('h2', { class: 'modal__title' })
    const h4 = createElement('h4', { class: 'modal__subtitle' }, 'Technologies used in this project')
    const uld = createElement('ul', { class: 'modal__desc' })
    const ult = createElement('ul', { class: 'modal__tech' })
    const a = createElement('a', { class: 'modal__link', target: '_blank', rel:"noopener noreferrer", href: '#' }, 'See Project')

    this.#modalTitle = h2
    this.#modalImage = img
    this.#modalDesc = uld
    this.#modalTech = ult
    this.#modalLink = a

    fragment.append(button, h2, uld, h4, ult, a)
    content.appendChild(fragment)

    div.append(img, content)

    this.#dialog.appendChild(div)

    button.addEventListener('click', () => this.#dialog.close())
    document.body.appendChild(this.#dialog)
  }

  showMoreProjects() {
    for (let i = 0; i < PortfolioProjects.LOAD_STEP && this.#hiddenItems.length; i++) {
      this.#hiddenItems[0].classList.remove('projects__item--hidden')
    }

    if (!this.#hiddenItems.length) {
      this.#button?.classList.add('projects__button-vp--hidden')
    }
  }
}

customElements.define('portfolio-projects', PortfolioProjects)

export default PortfolioProjects