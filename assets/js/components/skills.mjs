import skills from '../../data/min/skills.json' with { type: 'json' }
import { createElement, createViewMoreButton } from '../utils/create-element.mjs'

class PortfolioSkills extends HTMLElement {
  static BATCH_SIZE = 2
  static ICON_PATH = './assets/images/icons/skills/'
  static DEFAULT_ICON = './assets/images/icons/addition/photo-placeholder.svg'

  #hiddenListItems
  #button
  #list
  #initialized

  constructor() {
    super()
    this.#hiddenListItems = []
    this.#button = null
    this.#list = null
    this.#initialized = false // Prevent duplicate initialization
  }

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
    this.addSkills()
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this)
  }

  // Render initial structure
  render() {
    const ul = createElement('ul', { class: 'skills__list' })
    const h2 = createElement('h2', { class: 'skills__title' }, skills.title)

    this.replaceChildren(h2, ul)
    this.#list = ul
  }

  // Event handling
  handleEvent(event) {
    this[`on${event.type}`]?.(event)
  }

  // On btn click
  onclick(event) {
    event.preventDefault()
    this.showMoreSkills()
  }

  get visibleItems() {
    return Number(this.getAttribute('visible-items')) || 4
  }

  getIconPath(skill) {
    return `${PortfolioSkills.ICON_PATH}${skill
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\./g, '')}.svg`
  }

  // Show more hidden skills
  showMoreSkills() {
    // Show next 2 hidden skills items
    for (let i = 0; i < PortfolioSkills.BATCH_SIZE && this.#hiddenListItems.length; i++) {
      this.#hiddenListItems[0].classList.remove('skills__item--hidden')
    }

    if (!this.#hiddenListItems.length) {
      this.#button.classList.add('skills__button--hidden')
    }
  }

  // Add skills and "View more" button
  // Fetch example
  /*async addSkills() {
    try {
      const skills = await fetchData('./assets/data/skills-list.json')
      const fragment = document.createDocumentFragment()

      // Create list items for skills
      skills.forEach((skill, index) => {
        fragment.appendChild(this.createSkillItem(skill, index > this.visibleItems)) // this.visibleItems = 3
      })

      this.#list.appendChild(fragment)
      this.#button = createViewMoreButton('skills__button', 'View more skills', this.#hiddenListItems, 'View more', this)
      this.#list.insertAdjacentElement('afterend', this.#button)
    }
    catch (error) {
      console.error('Error fetching skills data:', error)
      return []
    }
  }*/
  addSkills() {
    const fragment = document.createDocumentFragment()

    // Create list items for skills
    skills.items.forEach((skill, index) => {
      fragment.appendChild(this.createSkillItem(skill, index > this.visibleItems, index)) // this.visibleItems = 3
    })

    this.#list.appendChild(fragment)
    this.#button = createViewMoreButton('skills__button', 'View more skills', this.#hiddenListItems, 'View more', this)
    this.#list.insertAdjacentElement('afterend', this.#button)
  }

  // Create a single skill item
  createSkillItem(skill, isHidden, index) {
    const li = createElement('li', { class: `skills__item ${isHidden ? 'skills__item--hidden' : ''}` })
    const img = createElement('img', { 
      class: 'skills__icon', 
      src: this.getIconPath(skill) || PortfolioSkills.DEFAULT_ICON, 
      alt: `${skill} icon` || 'Default icon',
      width: '64',
      height: '64'
    })
    const span = createElement('span', { class: 'skills__text' }, skill)
    
    li.style.setProperty('--card-index', index);
    li.append(img, span)
    // Update hidden items reference
    this.#hiddenListItems = this.getElementsByClassName('skills__item--hidden')
    return li
  }
}

customElements.define('portfolio-skills', PortfolioSkills)

export default PortfolioSkills