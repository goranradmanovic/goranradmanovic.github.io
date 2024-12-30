export default customElements.define('experience-list', class extends HTMLElement {
    constructor() {
      super()
      this.render()
      this.hiddenListItems = []
      this.fetchAndCreateListItems()
    }

    // Initialize the base structure
    render() {
      this.innerHTML = '<ul class="experience__list"></ul>'
      this.list = this.querySelector('.experience__list')
    }

    // Utility function to create elements with attributes and optional text
    createElement(tag, attributes = {}, text = '') {
      const element = document.createElement(tag)
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value)
      )
      if (text) element.textContent = text
      return element
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
      for (let i = 0; i < 2 && this.hiddenListItems.length; i++) {
        this.hiddenListItems[0].classList.remove('hide')
      }

      // Hide the button if no hidden items remain
      if (!this.hiddenListItems.length) {
        this.button.classList.add('hide')
      }
    }

    async fetchData() {
      try {
        const response = await fetch('./assets/data/experience-list.json')
        if (!response.ok)
          throw new Error(`Response status: ${response.status}`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching experience data:', error)
        return []
      }
    }

    async fetchAndCreateListItems() {
      const experienceData = await this.fetchData()
      this.createListItems(experienceData)
      this.createViewMoreButton()
    }

    // Dynamically create list items
    createListItems(experienceData) {
      experienceData.forEach((item, index) => {
        const li = this.createElement('li', {
          class: `experience__list__item ${index > 1 ? 'hide' : ''}`,
        })

        const time = this.createElement(
          'time',
          { class: 'experience__list__item__time' },
          item.date
        )

        const role = this.createElement(
          'h3',
          { class: 'experience__list__item__role' },
          item.role
        )

        const company = this.createElement(
          'span',
          { class: 'experience__list__item__company' },
          item.company
        )

        const description = this.createElement(
          'p',
          { class: 'experience__list__item__description' },
          item.description
        )

        li.append(time, role, company, description)
        this.list.appendChild(li)
      })

      // Update hidden list items reference
      this.hiddenListItems = this.getElementsByClassName('experience__list__item hide')
    }

    // Create "View more" button
    createViewMoreButton() {
      this.button = this.createElement(
        'button',
        { class: 'experience__btn' },
        'View more'
      )

      this.button.addEventListener('click', this)
      this.list.insertAdjacentElement('afterend', this.button)
    }
  }
)