import select from 'select-dom'
import on from 'dom-event'
import { count, update } from 'lib/util'

export default (el) => {
  for (let el of elements) {
    if (!el.classList.contains('is-init')) {
      let field = select('.js-field', el)
      let minus = select('.js-minus', el)
      let plus = select('.js-plus', el)

      let counter = {
        disabled: el.hasAttribute('disabled'),
        field: field,
        minus: minus,
        plus: plus,
        max: parseInt(field.getAttribute('max')) || 999,
        min: parseInt(field.getAttribute('min')) || 0
      }

      on(counter.minus, 'click', (e) => {
        count(counter, e.target)
      })
      on(counter.plus, 'click', (e) => {
        count(counter, e.target)
      })

      update(counter)

      on(counter.field, 'blur', () => {
        update(counter)
      })
    }
  }
}
