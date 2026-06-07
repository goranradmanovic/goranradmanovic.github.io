import intro from '../../data/min/intro.json' with { type: 'json' }
import { createElement, createHighlightedText } from '../utils/create-element.mjs'

class PortfolioIntro extends HTMLElement {
  #initialized

  connectedCallback() {
    if (this.#initialized) return

    this.#initialized = true
    this.render()
  }

  render() {
    const content = createElement('div', { class: 'intro__content' })

    content.append(
      createElement('h1', { class: 'intro__title' }, intro.title),
      createHighlightedText('p', 'intro__headline', intro.headline),
      createHighlightedText('p', 'intro__subheadline', intro.subheadline),
      createElement('a', { class: 'intro__link', href: intro.link.url, 'aria-label': intro.link.text }, intro.link.text)
    )

    this.replaceChildren(content)
  }
}

customElements.define('portfolio-intro', PortfolioIntro)

export default PortfolioIntro