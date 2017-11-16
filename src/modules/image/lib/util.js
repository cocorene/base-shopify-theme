export const lazy = (el) => {
  if (isMobile()) {
    let img = select('.js-mobile', el) || false
    if (!img.classList.contains('is-loaded')) get(img, 'data-mobile-src')
  } else {
    let img = select('.js-desktop', el) || false
    if (!img.classList.contains('is-loaded')) get(img, 'data-src')
  }
}

export const get = (img, src) => {
  let temp = new Image()
  temp.src = img.getAttribute(src)
  temp.onload = () => {
    img.setAttribute('src', src)
    set(img, 'is-loaded')
  }
}
