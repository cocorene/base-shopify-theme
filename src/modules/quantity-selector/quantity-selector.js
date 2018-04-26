import select from 'select-dom'
import on from 'dom-event'

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

export default (el) => {
  let field = select('[type="number"]', el)
  let minus = select('[data-count="-"]', el)
  let plus = select('[data-count="+"]', el)

  let counter = {
    disabled: el.hasAttribute('disabled'),
    field: field,
    minus: minus,
    plus: plus,
    max: parseInt(field.getAttribute('max')) || 999,
    min: parseInt(field.getAttribute('min')) || 0
  }

  on(counter.minus, 'click', (e) => {
    count(counter, counter.minus)
  })
  on(counter.plus, 'click', (e) => {
    count(counter, counter.plus)
  })

  update(counter)

  on(counter.field, 'blur', () => {
    update(counter)
  })
}
