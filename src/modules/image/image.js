import select from 'select-dom'
import on from 'dom-event'

var LOADED = false

const load = (el) => {
  if (isMobile()) {
    let img = select('.js-mobile', el) || false
    if (!img.classList.contains('is-loaded')) lazy(img, 'data-mobile-src')
  } else {
    let img = select('.js-desktop', el) || false
    if (!img.classList.contains('is-loaded')) lazy(img, 'data-src')
  }
}

const lazy = (img, src) => {
  let temp = new Image()
  temp.src = img.getAttribute(src)
  temp.onload = () => {
    img.setAttribute('src', src)
    set(img, 'is-loaded')
  }
}

export default (el) => {
  load(el)
  on(window, 'resize', () => {
    load(el)
  })
}
