export default (el) => {
  let loginForm = document.getElementById('login_form')
  let recoveryForm = document.getElementById('recover')
  let recoverLink = document.getElementById('recovery_link')
  let cancelRecoverLink = document.getElementById('cancel_recover')

  let recoverIsTarget = !!document.location.hash.match(/#recover/)

  let successMessage = el.querySelector('.recovery-success') !== null

  if (recoverIsTarget || successMessage) {
    loginForm.style.display = 'none'
    recoveryForm.style.display = 'block'
  } else {
    loginForm.style.display = 'block'
  }

  recoverLink.addEventListener('click', (e) => {
    e.preventDefault()
    loginForm.style.display = 'none'
    recoveryForm.style.display = 'block'
  })

  cancelRecoverLink.addEventListener('click', (e) => {
    e.preventDefault()
    recoveryForm.style.display = 'none'
    loginForm.style.display = 'block'
  })
}
