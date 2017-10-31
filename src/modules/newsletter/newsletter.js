import conform from 'conform.js'

export default (el) => {
  const form = el.getElementsByTagName('form')[0]
  const success = document.getElementById('newsletterSuccess')

  const newsletter = conform(form, {
    tests: [
      {
        name: /EMAIL|contact\[email\]/,
        validate: ({ value }) => /.+@.+\..+/.test(value), // basic email check
        success: ({node}) => node.classList.remove('has-error'),
        error: ({node}) => node.classList.add('has-error')
      }
    ]
  })

  /**
   * Convert action to work with JSONp
   * Mailchimp API
   *
   * Enable JSONp flag on Conform instance
   */
  if (/post\?u=/.test(newsletter.action)) {
    newsletter.jsonp = 'c'
    newsletter.action = newsletter.action.replace(/post\?u=/, 'post-json?u=')
  }

  newsletter.on('submit', () => {
    //
  })

  newsletter.on('error', () => {
    //
  })

  /**
   * If a message is returned (Mailchimp only)
   * show the message. Otherwise, show
   * default message hard-coded in
   * the markup.
   */
  newsletter.on('success', data => {
    let msg = data.res.msg
    form.style.display = 'none'
    if (msg) { success.innerHTML = msg }
    success.style.display = 'block'
  })
}
