import contact from '../../data/min/contact.json' with { type: 'json' }
import { createElement } from '../utils/create-element.mjs'

class PortfolioContact extends HTMLElement {
  connectedCallback() {
    if (this.childElementCount) return

    this.render()
  }

  createContactLink(item) {
    const attrs = {
      href: item.href,
      class: 'contact__link',
      'aria-label': item.label
    }

    if (item.target) attrs.target = item.target
    if (item.rel) attrs.rel = item.rel

    const link = createElement('a', attrs, item.text)

    link.prepend(
      createElement('i', {
        class: `contact__icon ${item.icon}`,
        'aria-hidden': 'true'
      })
    )

    return link
  }

  render() {
    const title = createElement('h2', { class: 'contact__title' }, contact.title)
    const info = createElement('div', { class: 'contact__info' })

    info.append(
      ...contact.links.map(
        item => this.createContactLink(item)
      )
    )

    this.replaceChildren(title, info)
  }
}

customElements.define('portfolio-contact', PortfolioContact)

export default PortfolioContact