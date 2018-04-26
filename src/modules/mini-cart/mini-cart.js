import select from 'select-dom'
import nano from 'nanoajax'
import on from 'dom-event'

const nav = select('#nav')
const btn = select('.js-cart-btn', nav)

const getMiniCart = (cart, wrapper) => {
  return new Promise((resolve, reject) => {
    nano.ajax(
      {url: `/cart?view=mini`},
      (code, res) => {
        cart.classList.add('is-loaded')
        wrapper.innerHTML = res.trim()
      }
    )
  })
}

export default (el) => {
  let cart = el
  let table = select('.js-table', cart)
  on(btn, 'mouseenter', () => {
    cart.classList.add('is-active')
    getMiniCart(cart, table)
  })
  on(cart, 'mouseleave', () => {
    cart.classList.remove('is-active')
  })
}
