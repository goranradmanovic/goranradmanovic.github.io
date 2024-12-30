export default customElements.define('navigation-links', class extends HTMLElement {
    constructor() {
      super()
      this.render()
      window.addEventListener('hashchange', this.onHashChange.bind(this))
      window.addEventListener('scroll', this.onScroll.bind(this))
    }

    // Render the navigation element and its links
    render() {
      this.innerHTML = `<nav role="navigation" class="header__nav"></nav>`
      this.nav = this.querySelector('.header__nav')
      this.navLinks = ['about', 'skills', 'experience', 'portfolio', 'contact']
      this.sections = [...document.querySelectorAll('section')]
      this.createNavLinks(this.navLinks)
    }

    // Handle events
    handleEvent(event) {
      this[`on${event.type}`]?.(event)
    }

    // on click event
    onclick(event) {
      this.setActiveLink(event)
    }

    // on hash change event
    onHashChange() {
      this.setActiveLink()
    }

    // on scroll event
    onScroll() {
      const scrollY = window.scrollY
      let currentSectionIndex = 0

      for (let i = 0; i < this.sections.length; i++) {
        const section = this.sections[i],
            sectionTop = section.offsetTop,
            sectionBottom = sectionTop + section.clientHeight

        if (scrollY >= sectionTop && scrollY < sectionBottom) {
          currentSectionIndex = i
          break
        }
      }

      const currentHash = `#${this.navLinks[currentSectionIndex]}`
      
      if (window.location.hash !== currentHash) {
        history.pushState(null, null, currentHash)
      }

      this.setActiveLink()
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
      link.addEventListener('click', this)
      return link
    }

    setActiveLink(event = null) {
      const currentLink = event ? event.target : this.nav.querySelector(`a[href="${window.location.hash}"]`)
      
      if (currentLink) {
        this.nav.querySelectorAll('.active__link').forEach(link => {
          link.classList.remove('active__link')
          link.setAttribute('aria-current', 'false')
        })

        currentLink.classList.add('active__link')
        currentLink.setAttribute('aria-current', 'true')
      }
    }
  }
)