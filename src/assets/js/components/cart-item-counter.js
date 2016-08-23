import counter from './counter'

export default (el) => {
  const quantity = counter(el)
  const initialValue = quantity.value
  const updateButton = el.parentNode.querySelector('.js-update') 

  quantity.on('change', (val) => {
    if (val !== initialValue){
      updateButton.classList.add('is-active')
    } else if (val === initialValue){
      updateButton.classList.remove('is-active')
    }
  })
}
