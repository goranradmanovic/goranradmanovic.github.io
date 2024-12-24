export default customElements.define('navigation-links', class extends HTMLElement {
    constructor() {
      super()
      this.render()
    }

    // Render the navigation element and its links
    render() {
      this.innerHTML = `<nav role="navigation" class="header__nav"></nav>`
      this.nav = this.querySelector('.header__nav')
      this.createNavLinks(['about', 'skills', 'experience', 'portfolio', 'contact'])
    }

    // Utility to create links and append to nav
    createNavLinks(links) {
      this.nav.append(
        ...links.map((item) => this.createLink(item))
      )
    }

    // Utility to create a single link element
    createLink(item) {
      const link = document.createElement('a')
      link.className = 'header__nav__link'
      link.href = `#${item}`
      link.textContent = item
      return link
    }
  }
)