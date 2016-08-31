import nanoajax from 'nanoajax'

const origin = window.location.origin || window.location.protocol+'//'+window.location.host

const checkForm = (fields) => {
  let keys = Object.keys(fields)

  for (let i = 0; i < keys.length; i++){
    let field = fields[keys[i]]
    if (!field.valid) return false
  }

  return true
}

const parseFormData = (fields) => {
  let data = ''
  let names = Object.keys(fields)

  for (let i = 0; i < names.length; i++){
    let field = fields[names[i]]
    data += `${encodeURIComponent(field.name)}=${encodeURIComponent(field.value || '')}${i < names.length -1 ? '&' : ''}`
  }

  return data
}

const getFormFields = (form) => {
  let fields = {}
  let namedAttributes = Array.prototype.slice.call(form.querySelectorAll('[name]'))

  for (let i = 0; i < namedAttributes.length; i++){
    let field = {}
    let node = namedAttributes[i]
    let name = node.getAttribute('name')
    let value = node.value || undefined 

    fields[name] = {
      valid: true,
      node,
      name,
      value
    } 
  }

  return fields 
} 

const getAction = (form) => {
  let action = form.getAttribute('action')
  return action.split(/\#/)[0]
}

class FormAjax {
  constructor(form, options = {}){
    this.form = form.getAttribute('action') ? form : form.getElementsByTagName('form')[0]

    Object.assign(this, {
      success: (data, response) => {},
      error: (data, response) => {},
      action: getAction(this.form),
      tests: []
    }, options)

    this.form.onsubmit = (e) => {
      e.preventDefault()

      this.fields = getFormFields(form)

      this.submit()
    }
  }

  submit(){
    for (let i = 0; i < this.tests.length; i++){
      let test = this.tests[i]
      let field = this.fields[test.name]

      let valid = test.validate(field)

      if (valid){
        test.success(field)
        field.valid = true
      } else {
        test.error(field)
        field.valid = false 
      }
    }

    if (checkForm(this.fields)){
      this.send(this.action, this.fields, this.success, this.error)
    } else {
      this.error(this.fields)
    }
  }

  send(action, fields, success, error){
    let data = parseFormData(fields) 

    nanoajax.ajax({
      url: action+'&'+data,
      method: 'GET'
    }, (status, res, req) => {
      let postSuccess = status >= 200 && status <= 300
      postSuccess ? success(fields, res, req) : error(fields, res, req)
    })
  }
}

export default FormAjax
