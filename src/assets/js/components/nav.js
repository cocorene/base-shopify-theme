export const hideMobileNav = e => {
  document.body.classList.add('mobile-nav-is-hiding')
  setTimeout(() => {
    document.body.classList.remove('mobile-nav-is-active')
    document.body.classList.remove('mobile-nav-is-hiding')
  }, 200)
}

export const showMobileNav = e => {
  document.body.classList.add('mobile-nav-is-active')
}

export const toggleMobileNav = e => document.body.classList.contains('mobile-nav-is-active') ? hideMobileNav() : showMobileNav()

export default el => {
  const mobileToggle = document.getElementById('mobileToggle') 

  mobileToggle.addEventListener('click', toggleMobileNav)
}
