import select from 'select-dom'
import on from 'dom-event'
import { set } from 'Lib/util'

const elements = select.all('.js-counter')

const update = (el) => {
  if (el.disabled) {
    for (let item of el.children) {
      item.disabled = true
    }
  } else {
    let value = parseInt(el.field.value)

    el.minus.disabled = (value === el.min)
    el.plus.disabled = (value === el.max)
  }
}

const count = (el, btn) => {
  if (!el.disabled) {
    let value = parseInt(el.field.value)

    if (btn === el.plus && value < el.max) value++
    if (btn === el.minus && value > el.min) value--

    el.field.value = value
    update(el)
  }
}

export default () => {
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

      set(el, 'is-init')
    }
  }
}
