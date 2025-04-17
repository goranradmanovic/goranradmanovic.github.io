export default customElements.define('portfolio-list', class extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = '<div class="portfolio__gallery"></div>'
    this.gallery = this.querySelector('.portfolio__gallery')
    this.createPortfolioGalleryItem()
  }

  createEl(tag, attrs = {}, text) {
    const el = document.createElement(tag)
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    if (text) el.textContent = text
    return el
  }

  async fetchData() {
    try {
      const res = await fetch('./assets/data/projects-list.json')
      if (!res.ok) throw new Error(res.status)
      return await res.json()
    } catch (err) {
      console.error('Fetch error:', err)
    }
  }

  showMoreProjects() {
    for (let i = 0; i < 3 && this.hiddenItems.length; i++) {
      this.hiddenItems[0].classList.remove('hide')
    }
    if (!this.hiddenItems.length) {
      this.loadMoreBtn?.classList.add('hide')
    }
  }

  createPortfolioGalleryItem = async () => {
    const data = await this.fetchData()
    if (!data) return

    const dialog = this.createEl('dialog', { class: 'portfolio__gallery__dialog' })
    const wrapper = this.createEl('div', { class: 'portfolio__gallery__dialog__wrapper' })
    const img = this.createEl('img', {
      class: 'portfolio__gallery__dialog__wrapper__img',
      alt: 'Project info image',
      src: './assets/images/icons/addition/photo-placeholder.svg',
    })

    const content = this.createEl('div', { class: 'portfolio__gallery__dialog__wrapper__content' })
    const title = this.createEl('h2', { class: 'portfolio__gallery__dialog__wrapper__content__title' })
    const desc = this.createEl('ul', { class: 'portfolio__gallery__dialog__wrapper__content__desc-list' })
    const tech = this.createEl('ul', { class: 'portfolio__gallery__dialog__wrapper__content__tech-list' })
    const sub = this.createEl('h4', { class: 'portfolio__gallery__dialog__wrapper__content__subtitle' }, 'Technologies used in this project')
    const link = this.createEl('a', {
      class: 'portfolio__gallery__dialog__wrapper__content__link',
      target: '_blank',
      href: '#'
    })
    const closeBtn = this.createEl('button', { class: 'portfolio__gallery__dialog__wrapper__content__btn' })

    closeBtn.addEventListener('click', () => {
      dialog.close()
      desc.innerHTML = ''
      tech.innerHTML = ''
      img.src = './assets/images/icons/addition/photo-placeholder.svg'
    })

    content.append(closeBtn, title, desc, sub, tech, link)
    wrapper.append(img, content)
    dialog.append(wrapper)

    this.gallery.insertAdjacentElement('afterend', dialog)
    this.loadMoreBtn = this.createEl('button', { class: 'portfolio__gallery__btn' }, 'View more')
    this.loadMoreBtn.addEventListener('click', () => this.showMoreProjects())
    this.gallery.insertAdjacentElement('afterend', this.loadMoreBtn)

    data.forEach((item, i) => {
      const itemDiv = this.createEl('div', {
        class: `portfolio__gallery__item ${i > 5 ? ' hide' : ''}`
      })

      const itemImg = this.createEl('img', {
        class: 'portfolio__gallery__item__img',
        alt: 'Portfolio gallery image',
        src: `./assets/images/projects/${item.name.toLowerCase().replaceAll(' ', '')}.avif`,
        loading: 'lazy'
      })

      const itemTitle = this.createEl('span', { class: 'portfolio__gallery__item__title' }, item.name)
      const btn = this.createEl('button', { class: 'portfolio__gallery__item__btn' }, 'See details')

      btn.addEventListener('click', () => {
        img.src = item.img
        img.loading = 'lazy'
        link.href = item.url
        link.textContent = 'See Project'
        title.textContent = item.name
        desc.innerHTML = tech.innerHTML = ''
        item.text.forEach(t => desc.append(this.createEl('li', {
          class: 'portfolio__gallery__dialog__wrapper__content__desc-list__item'
        }, t)))
        item.tech.forEach(t => tech.append(this.createEl('li', {
          class: 'portfolio__gallery__dialog__wrapper__content__tech-list__item'
        }, t)))
        dialog.showModal()
      })

      itemDiv.append(itemImg, itemTitle, btn)
      this.gallery.append(itemDiv)
    })

    this.hiddenItems = this.getElementsByClassName('portfolio__gallery__item hide')
  }
})
