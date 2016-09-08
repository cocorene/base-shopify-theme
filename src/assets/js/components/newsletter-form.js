import conform from '../lib/forms'
import closest from 'closest'

const addError = (field) => {
  let target = closest(field.node, '.js-field', true)
  if (target) target.classList.add('has-error')
}

const removeError = (field) => {
  let target = closest(field.node, '.js-field', true)
  if (target) target.classList.remove('has-error')
}

export default (el) => {
  let emailInput = document.getElementById('newsletterEmail')
  let formSuccess = document.getElementById('newsletterSuccess')

  emailInput.onchange = (e) => {
    if (e.target.value.length < 1){
      removeError({node: emailInput})
    }
  }

  const newsletter = conform(el, {
    success: (fields, res, req) => {
      console.log('Success')
      console.log(res)
      if (formSuccess) formSuccess.style.display = 'block'
    },
    error: (fields, res, req) => {
      console.log('Error')
      if (res) console.log(res)
    },
    tests: [
      {
        name: /EMAIL|customer\[email\]/,
        validate: (field) => {
          return typeof field.value === 'string' && field.value.length > 1 && field.value.match(/.+\@.+\..+/) ? true : false
        },
        success: removeError,
        error: addError 
      }
    ]
  })

  if (newsletter.action.match(/post\?u=/)){
    newsletter.action = newsletter.action.replace(/post\?u=/, 'post-json?u=')
  }

  window.news = newsletter
}
