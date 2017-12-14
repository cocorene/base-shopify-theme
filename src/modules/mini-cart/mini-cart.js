import select from 'select-dom'
import on from 'dom-event'

const nav = select('#nav')
const btn = select('.js-cart-btn', nav)

export default (el) => {
  let cart = el
  on(btn, 'mouseenter', () => {
    cart.classList.add('is-active')
  })
  on(cart, 'mouseleave', () => {
    cart.classList.remove('is-active')
  })
}
