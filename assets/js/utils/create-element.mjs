function createElement(tag, attrs = {}, text) {
  const element = document.createElement(tag)

  Object.entries(attrs).forEach(([key, value]) => {
    if (value === false || value == null) return

    if (value === true) {
      element.setAttribute(key, '')
      return
    }

    element.setAttribute(key, value)
  })

  if (text) {
    element.textContent = text
  }

  return element
}

function createViewMoreButton(btnClass, label, hiddenListItems = [], text, handler) {
  const button = createElement('button', { 
    class: btnClass,
    'aria-label': label,
    'aria-expanded': !hiddenListItems.length
  }, text)

  button.addEventListener('click', handler)
  return button
}

function createHighlightedText(tag, className, items) {
  const element = createElement(tag, { class: className })

  items.forEach(item => {
    element.append(
      item.highlight
        ? createElement(
            'span',
            {
              class: `${className}__highlight`
            },
            item.text
          )
        : document.createTextNode(item.text)
    )
  })

  return element
}

export { createElement, createViewMoreButton, createHighlightedText }