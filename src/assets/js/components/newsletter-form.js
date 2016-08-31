import form from '../lib/forms'
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

  const newsletter = new form(el, {
    success: (data, res, req) => {
      console.log(req)
      formSuccess.style.display = 'block'
    },
    error: (data, res, req) => {
      console.log(req)
      console.log('Newsletter form error.')
      if (res) console.log(res)
    },
    tests: [
      {
        name: 'EMAIL',
        validate: (data) => {
          return typeof data.value === 'string' && data.value.length > 1 && data.value.match(/.+\@.+\..+/) ? true : false
        },
        success: removeError,
        error: addError 
      }
    ]
  })

  newsletter.action = newsletter.action.replace(/post\?u=/, 'post-json?u=')

  console.dir(newsletter)
}

