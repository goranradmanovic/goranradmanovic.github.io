function createOrUpdateElement(tag, selector, attributes) {
    let element = document.head.querySelector(selector)

    if (!element) {
        element = document.createElement(tag)
        document.head.appendChild(element)
    }

    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
    })

    return element
}
  
function updateMeta(meta = []) {
    meta.forEach(item => {
        const selector = item.name
            ? `meta[name="${item.name}"]`
            : `meta[http-equiv="${item['http-equiv']}"]`

        createOrUpdateElement('meta', selector, item)
    })
}
  
function updateLinks(links = []) {
    links.forEach(item => {
        let selector

        if (item.rel === 'canonical') {
            selector = 'link[rel="canonical"]'
        } else if (item.sizes) {
            selector = `link[rel="${item.rel}"][sizes="${item.sizes}"]`
        } else if (item.media) {
            selector = `link[rel="${item.rel}"][media="${item.media}"]`
        } else {
            selector = `link[rel="${item.rel}"]`
        }

        createOrUpdateElement('link', selector, item)
    })
}
  
export default function updateHead(head = {}) {
    const { title = '', meta = [], link = [] } = head

    if (title) document.title = title

    updateMeta(meta)
    updateLinks(link)
}