export default searchBar => {
  const form = searchBar.getElementsByTagName('form')[0]
  const input = searchBar.getElementsByTagName('input')[0]
  const toggle = document.getElementById('searchToggle')

  const hide = () => {
    searchBar.classList.remove('is-active')
    input.blur()
  }
  const show = () => {
    searchBar.classList.add('is-active')
    input.focus()
  }
  const toggleSearch = e => {
    e.preventDefault()
    searchBar.classList.contains('is-active') ? hide() : show()
  }

  toggle.addEventListener('click', toggleSearch)

  /**
   * Example ajax submit
   *

  form.onsubmit = e => {
    e.preventDefault()

    let input = e.target.getElementsByTagName('input')[0]

    let query = encodeURIComponent(input.value)
    // let path = `search?q=${query}&type=product`
    let path = `search?q=${query}`

    router.go(path, () => hide())
  }

  */
}
