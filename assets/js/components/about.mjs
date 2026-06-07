import about from '../../data/min/about.json' with { type: 'json' }
import { createElement } from '../utils/create-element.mjs'

class PortfolioAbout extends HTMLElement {
  #initialized

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
  }

  render() {
    const content = createElement('div', { class: 'about__content' })
    const h2 = createElement('h2', { class: 'about__title' }, about.title)

    about.paragraphs.forEach(item => {
        const p = createElement('p', { class: 'about__text' })
      
        if (item.highlight) {
          p.append(
            createElement(
              'span',
              { class: 'about__highlight' },
              item.highlight
            ),
            document.createTextNode(` ${item.text}`)
          )
        } else {
          p.textContent = item.text
        }
      
        content.append(p)
    })

    this.replaceChildren(h2, content)
  }
}

customElements.define('portfolio-about', PortfolioAbout)

export default PortfolioAbout