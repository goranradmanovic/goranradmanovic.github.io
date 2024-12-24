export default customElements.define('skills-list', class extends HTMLElement {
    constructor() {
      super()
      this.render()
      this.hiddenListItems = null
      this.addSkills()
    }

    // Render initial structure
    render() {
      this.innerHTML = `<ul class="skills__list"></ul>`
      this.list = this.querySelector('.skills__list')
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

    // Show more hidden skills
    showMoreSkills() {
      // Show next 2 hidden skills items
      for (let i = 0; i < 2 && this.hiddenListItems.length; i++) {
        this.hiddenListItems[0].classList.remove('hide')
      }

      if (!this.hiddenListItems.length) {
        this.button.classList.add('hide')
      }
    }

    // Add skills and "View more" button
    addSkills() {
      const skills = [
        'HTML',
        'CSS',
        'JavaScript',
        'Vue',
        'Nuxt',
        'Sass',
        'PHP',
        'MySQL',
        'Laravel',
        'NodeJS',
        'Git',
        'PWA',
        'Primevue',
        'Vuetify',
        'Bootstrap',
      ]

      const fragment = document.createDocumentFragment()

      // Create list items for skills
      skills.forEach((skill, index) => {
        fragment.appendChild(this.createSkillItem(skill, index > 3))
      })

      this.list.appendChild(fragment)
      //this.hiddenListItems = this.querySelectorAll('.skills__list__item.hide')

      this.createViewMoreButton()
    }

    // Create a single skill item
    createSkillItem(skill, isHidden) {
      const li = document.createElement('li')
      li.className = `skills__list__item ${isHidden ? 'hide' : ''}`

      const img = document.createElement('img')
      img.className = 'skills__list__item__icon'
      img.src = `./assets/images/icons/skills/${skill.toLowerCase()}.svg`
      img.alt = `${skill} icon`

      const span = document.createElement('span')
      span.className = 'skills__list__item__txt'
      span.textContent = skill

      li.append(img, span)
      // Update hidden items reference
      this.hiddenListItems = this.getElementsByClassName('skills__list__item hide')
      return li
    }

    // Create "View more" button
    createViewMoreButton() {
      this.button = document.createElement('button')
      this.button.className = 'skills__btn'
      this.button.textContent = 'View more'
      this.button.addEventListener('click', this)

      this.list.insertAdjacentElement('afterend', this.button)
    }
  }
)