export default customElements.define('head-list', class extends HTMLElement {
    constructor() {
      super()
      this.head = document.head // Direct reference to <head>
    }

    connectedCallback() {
      this.fetchAndCreateHeadItems()
    }

    // Utility function to create elements with attributes
    createElement(tag, attributes = {}, text = '') {
      const element = document.createElement(tag)
      Object.entries(attributes).forEach(([key, value]) =>
        element.setAttribute(key, value)
      )
      if (text) element.textContent = text
      return element
    }

    // Fetch data from JSON file
    async fetchData() {
      try {
        const response = await fetch('./assets/data/head.json')
        if (!response.ok)
          throw new Error(`Failed to fetch: ${response.statusText}`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching head data:', error.message)
        return { head: { title: '', meta: [], link: [] } } // Default empty structure
      }
    }

    async fetchAndCreateHeadItems() {
      const data = await this.fetchData()
      if (!data?.head) {
        console.warn('No valid head data found.')
        return
      }
      this.createHeadItems(data.head)
    }

    // Dynamically create and append elements to <head>
    createHeadItems({ title, meta = [], link = [] }) {
      const fragment = document.createDocumentFragment()

      // Create <title> element
      if (title) {
        const titleElement = this.createElement('title', {}, title)
        fragment.appendChild(titleElement)
      }

      // Create <meta> elements
      meta.forEach(item => {
        const metaElement = this.createElement('meta', item)
        fragment.appendChild(metaElement)
      })

      // Create <link> elements
      link.forEach(item => {
        const linkElement = this.createElement('link', item)
        fragment.appendChild(linkElement)
      })

      // Append all elements to the <head> at once
      this.head.appendChild(fragment)
    }
  }
)