export default customElements.define('portfolio-list', class extends HTMLElement {
    constructor() {
      super()

      // Initialize component structure
      this.render()
      this.hiddenGalleryItems = null

      this.createPortfolioGalleryItem()
    }

    // Initialize the base structure
    render() {
      this.innerHTML = '<div class="portfolio__gallery"></div>'
      this.gallery = this.querySelector('.portfolio__gallery')
    }

    // Utility method to create elements with attributes
    createElementWithAttributes(tag, attributes = {}) {
      const element = document.createElement(tag)
      Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
      return element
    }

    handleEvent(event) {
      this[`on${event.type}`]?.(event)
    }

    onclick(event) {
      event.preventDefault()

      this.showMoreProjects()
    }

    // Show more hidden projects
    showMoreProjects() {
      // Show next 3 hidden gallery items
      for (let i = 0; i < 3 && this.hiddenGalleryItems.length; i++) {
        this.hiddenGalleryItems[0].classList.remove('hide')
      }

      if (!this.hiddenGalleryItems.length) {
        this.querySelector('.portfolio__gallery__btn')?.classList.add('hide')
      }
    }

    async fetchData() {
      try {
        const response = await fetch('./assets/data/projects-list.json')
        if (!response.ok) throw new Error(`Response status: ${response.status}`)
        return await response.json()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    createCloseButtonListener(dialog, img, desc, tech) {
      return () => {
        dialog.close()
        desc.innerHTML = ''
        tech.innerHTML = ''
        img.setAttribute('src', './assets/images/icons/addition/photo-placeholder.svg')
      }
    }

    async createPortfolioGalleryItem() {
      const experienceData = await this.fetchData()
      if (!experienceData) return

      // Create dialog and button outside the loop
      const dialog = this.createElementWithAttributes('dialog', {
        class: 'portfolio__gallery__dialog',
      })

      const dialogWrapper = this.createElementWithAttributes('div', {
        class: 'portfolio__gallery__dialog__wrapper',
      })

      const dialogContent = this.createElementWithAttributes('div', {
        class: 'portfolio__gallery__dialog__wrapper__content',
      })

      const dialogImg = this.createElementWithAttributes('img', {
        class: 'portfolio__gallery__dialog__wrapper__img',
        alt: 'Project info image',
        src: './assets/images/icons/addition/photo-placeholder.svg',
      })

      const dialogTitle = this.createElementWithAttributes('h2', {
        class: 'portfolio__gallery__dialog__wrapper__content__title',
      })

      const dialogSubTitle = this.createElementWithAttributes('h4', {
        class: 'portfolio__gallery__dialog__wrapper__content__subtitle',
      })

      const dialogDescription = this.createElementWithAttributes('ul', {
        class: 'portfolio__gallery__dialog__wrapper__content__desc-list',
      })

      const dialogTech = this.createElementWithAttributes('ul', {
        class: 'portfolio__gallery__dialog__wrapper__content__tech-list',
      })

      const dialogLink = this.createElementWithAttributes('a', {
        class: 'portfolio__gallery__dialog__wrapper__content__link',
        target: '_blank',
        href: '#'
      })

      const dialogCloseBtn = this.createElementWithAttributes('button', {
        class: 'portfolio__gallery__dialog__wrapper__content__btn',
      })

      dialogSubTitle.textContent = 'Technologies used in this project'

      // Assemble dialog
      dialogContent.append(
        dialogCloseBtn,
        dialogTitle,
        dialogDescription,
        dialogSubTitle,
        dialogTech,
        dialogLink
      )

      dialogWrapper.append(dialogImg, dialogContent)
      dialog.appendChild(dialogWrapper)

      // Close button event
      dialogCloseBtn.addEventListener(
        'click',
        this.createCloseButtonListener(dialog, dialogImg, dialogDescription, dialogTech)
      );

      // Button to load more items
      const loadMoreButton = this.createElementWithAttributes('button', {
        class: 'portfolio__gallery__btn',
      })

      loadMoreButton.textContent = 'View more'
      loadMoreButton.addEventListener('click', this)

      // Populate gallery items
      experienceData.forEach((item, index) => {
        const div = this.createElementWithAttributes('div', {
          class: index > 5 ? 'portfolio__gallery__item hide' : 'portfolio__gallery__item',
        })

        const img = this.createElementWithAttributes('img', {
          class: 'portfolio__gallery__item__img',
          alt: 'Portfolio gallery image',
          src: `./assets/images/projects/${item.name.toLowerCase().replaceAll(' ', '')}.webp`,
        })

        const span = this.createElementWithAttributes('span', {
          class: 'portfolio__gallery__item__title',
        })

        const btn = this.createElementWithAttributes('button', {
          class: 'portfolio__gallery__item__btn',
        })

        span.textContent = item.name
        btn.textContent = 'See details'

        // Dialog logic on button click
        btn.addEventListener('click', () => {
          dialogImg.setAttribute('src', item.img)
          dialogLink.setAttribute('href', item.url)
          dialogTitle.textContent = item.name
          dialogLink.textContent = 'See Project'

          // Populate description and tech lists
          dialogDescription.innerHTML = ''
          dialogTech.innerHTML = ''

          item.text.forEach(txt => {
            const li = this.createElementWithAttributes('li', {
              class: 'portfolio__gallery__dialog__wrapper__content__desc-list__item',
            })

            li.textContent = txt
            dialogDescription.appendChild(li)
          })

          item.tech.forEach(tech => {
            const li = this.createElementWithAttributes('li', {
              class: 'portfolio__gallery__dialog__wrapper__content__tech-list__item',
            })

            li.textContent = tech
            dialogTech.appendChild(li)
          })

          dialog.showModal()
        })

        // Assemble gallery item
        div.append(img, span, btn)
        this.gallery.appendChild(div)
      })

      // Append dialog and button to DOM
      this.gallery.insertAdjacentElement('afterend', loadMoreButton)
      this.gallery.insertAdjacentElement('afterend', dialog)

      // Update hidden items reference
      this.hiddenGalleryItems = this.getElementsByClassName('portfolio__gallery__item hide')
    }
  }
)