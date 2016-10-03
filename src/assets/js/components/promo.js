import promobar from 'promobar'
import events from 'pubsub-js'

export default el => {
  const promo = promobar(el)

  setTimeout(promo.show, 4000)

  window.promobar = promo
}
