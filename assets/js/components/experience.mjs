import experience from '../../data/min/experience.json' with { type: 'json' }
import { createElement, createViewMoreButton } from '../utils/create-element.mjs'

class PortfolioExperience extends HTMLElement {
  static BATCH_SIZE = 2

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
  }

  disconnectedCallback() {
    this.#button?.removeEventListener('click', this)
  }

  // Initialize the base structure
  render() {
    const ul = createElement('ul', { class: 'experience__list' })
    const h2 = createElement('h2', { class: 'experience__title' }, experience.title)
    this.replaceChildren(h2, ul)
    this.#list = ul
    this.#button = createViewMoreButton('experience__button', 'View more experience', this.#hiddenListItems, 'View more', this)
    this.#list.insertAdjacentElement('afterend', this.#button)
    this.createListItems(experience.items)
  }

  // Handle events
  handleEvent(event) {
    this[`on${event.type}`]?.(event)
  }

  // on click event
  onclick(event) {
    event.preventDefault()
    this.showMoreItems()
  }

  // Handle "View more" button clicks
  showMoreItems() {
    for (let i = 0; i < PortfolioExperience.BATCH_SIZE && this.#hiddenListItems.length; i++) {
      this.#hiddenListItems[0].classList.remove('experience__item--hidden')
    }

    // Hide the button if no hidden items remain
    if (!this.#hiddenListItems.length) {
      this.#button.classList.add('experience__button--hidden')
    }
  }

  formatDateTimeRange(dateString) {
    const months = {
      'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04', 'may': '05', 'jun': '06',
      'jul': '07', 'aug': '08', 'sep': '09', 'oct': '10', 'nov': '11', 'dec': '12'
    };
  
    // 1. Split "May 2025 - Dec 2025" into ["May 2025", "Dec 2025"]
    const parts = dateString.split('-').map(p => p.trim());
    
    const formattedParts = parts.map(part => {
      if (part.toLowerCase() === 'present') return ''; 
      
      // 2. "May 2025" splits cleanly into ["May", "2025"]
      const [monthStr, year] = part.split(' ');
      const monthNum = months[monthStr.toLowerCase()];
      
      return `${year}-${monthNum}`;
    });
  
    // 3. Joins them back with a slash, e.g., "2025-05/2025-12"
    return formattedParts.join('/');
  }

  // Dynamically create list items
  createListItems(experienceData) {
    experienceData.forEach((item, index) => {
      const li = createElement('li', {
        class: `experience__item ${index > 1 ? 'experience__item--hidden' : ''}`
      })

      const time = createElement(
        'time',
        { class: 'experience__time', datetime: this.formatDateTimeRange(item.date) },
        item.date
      )

      const role = createElement('h3', { class: 'experience__role' }, item.role)
      const company = createElement('span', { class: 'experience__company' }, item.company)
      const description = createElement('p', { class: 'experience__description' }, item.description)

      li.append(time, role, company, description)
      this.#list.appendChild(li)
    })

    // Update hidden list items reference
    this.#hiddenListItems = this.getElementsByClassName('experience__item--hidden')
  }
}

customElements.define('portfolio-experience', PortfolioExperience)

export default PortfolioExperience