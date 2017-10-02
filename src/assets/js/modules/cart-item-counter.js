import updown from 'up-down'

export default (el) => {
  const counter = updown(el)
  const initialValue = counter.value
  const updateButton = el.parentNode.querySelector('.js-update')

  counter.on('change', (val) => {
    if (val !== initialValue) {
      updateButton.classList.add('is-active')
    } else if (val === initialValue) {
      updateButton.classList.remove('is-active')
    }
  })
}
