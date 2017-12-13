export const isMobile = () => window.innerWidth < 768

export const isTouch = () => 'ontouchstart' in document.documentElement

export const isIE = () => {
  return navigator.userAgent.toLowerCase().indexOf('msie') > 0
}

export const isFirefox = () => {
  return navigator.userAgent.toLowerCase().indexOf('firefox') > -1
}

export const write = (el, value) => {
  el.innerHTML = value
}

export const set = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.add(selector)
    }
  } else {
    item.classList.add(selector)
  }
}

export const unset = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.remove(selector)
    }
  } else {
    item.classList.remove(selector)
  }
}

export const toggle = (item, selector) => {
  if (item instanceof Array) {
    for (let i of item) {
      i.classList.toggle(selector)
    }
  } else {
    item.classList.toggle(selector)
  }
}
