export default customElements.define('social-list', class extends HTMLElement {
    constructor() {
      super()
      this.settings = {
        classList: this.getAttribute('class-list') || '',
      }
      this.render()
    }

    // Render the component structure
    render() {
      this.innerHTML = `<div class="social__links ${this.settings.classList}"></div>`
      this.list = this.querySelector('.social__links')
      this.createLinkItems()
    }

    // Create and append social link items
    createLinkItems() {
      const links = [
        { label: 'Linkedin', url: 'https://www.linkedin.com/in/goran-radmanovic-70814a9b/' },
        { label: 'X', url: 'https://x.com/GoranRadmanovic' },
        { label: 'GitHub', url: 'https://github.com/goranradmanovic/' },
        { label: 'Gmail', url: 'mailto:goranradmanovic@gmail.com' }
      ]

      const fragment = document.createDocumentFragment()

      links.forEach(({ label, url }) => {
        const anchor = this.createLinkElement(label, url)
        fragment.appendChild(anchor)
      })

      this.list.appendChild(fragment)
    }

    // Create a single social link element
    createLinkElement(label, url) {
      const a = document.createElement('a')
      a.className = 'social__link'
      a.href = url
      a.rel = 'noreferrer'
      a.target = '_blank'
      a.ariaLabel = label

      const icon = document.createElement('i')
      icon.className = `social__link__icon ${label.toLowerCase()}`

      a.appendChild(icon)
      return a
    }
  }
)