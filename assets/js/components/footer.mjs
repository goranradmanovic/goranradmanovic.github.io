import footerData from '../../data/min/footer.json' with { type: 'json' }
import { createElement } from '../utils/create-element.mjs'

class PortfolioFooter extends HTMLElement {
  #initialized = false

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
  }

  createFooterLink(item) {
    const isDownload = Boolean(item.text)

    const link = createElement(
      'a',
      {
        href: item.href,
        class: isDownload ? 'footer__download' : 'footer__link',
        'aria-label': item.label,
        ...(isDownload && { download: '' }),
        rel: 'noopener noreferrer'
      },
      item.text
    )

    const icon = createElement('img', {
      class: 'footer__icon',
      src: item.img.src,
      alt: item.img.alt,
      loading: item.img.loading || 'lazy',
      width: item.img.width,
      height: item.img.height
    })

    link.append(icon)

    return link
  }

  render() {
    const date = Temporal.Now.plainDateTimeISO()
    const year = date.year
    const content = createElement('div', { class: 'footer__content' })
    const links = createElement('div', { class: 'footer__links' })

    links.append(
      ...footerData.links.map(item => this.createFooterLink(item))
    )

    const copy = createElement('p', { class: 'footer__copy' }, footerData.paragraph)
    const time = createElement('time', { class: 'footer__year', datetime: date.toString() }, year)

    copy.append(time)
    content.append(links, copy)

    this.replaceChildren(content)
  }
}

customElements.define('portfolio-footer', PortfolioFooter)

export default PortfolioFooter