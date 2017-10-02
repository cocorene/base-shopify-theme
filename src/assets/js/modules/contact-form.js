/**
 * @see https://github.com/estrattonbailey/conform.js
 */
import conform from 'conform.js'

export default (el) => {
  const success = document.getElementById('contactFormSuccess')

  const form = conform(el)

  form.on('success', data => {
    success.style.display = 'block'
  })
}
