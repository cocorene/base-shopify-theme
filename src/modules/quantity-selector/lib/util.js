export const update = (el) => {
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

export const count = (el, btn) => {
  if (!el.disabled) {
    let value = parseInt(el.field.value)

    if (btn === el.plus && value < el.max) value++
    if (btn === el.minus && value > el.min) value--

    el.field.value = value
    update(el)
  }
}
