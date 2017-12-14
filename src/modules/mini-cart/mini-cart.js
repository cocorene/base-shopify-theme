import select from 'select-dom'
import nano from 'nanoajax'
import on from 'dom-event'

const nav = select('#nav')
const btn = select('.js-cart-btn', nav)

const getMiniCart = (cart) => {
  let table = select('.js-table', cart)
  return new Promise((resolve, reject) => {
    nano.ajax(
      {url: `/cart?view=mini`},
      (code, res) => {
        cart.classList.add('is-loaded')
        table.innerHTML = res.trim()
      }
    )
  })
}

export default (el) => {
  let cart = el
  on(btn, 'mouseenter', () => {
    cart.classList.add('is-active')
    getMiniCart(cart)
  })
  on(cart, 'mouseleave', () => {
    cart.classList.remove('is-active')
  })
}
