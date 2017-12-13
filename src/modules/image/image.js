import on from 'dom-event'
import Layzr from 'layzr.js'

const instance = Layzr({
  normal: 'data-normal',
  retina: 'data-retina',
  srcset: 'data-srcset',
  threshold: 0
})

instance
  .on('src:before', image => {
    on(image, 'load', (event) => {
      let wrapper = image.parentNode
      wrapper.classList.add('is-loaded')
    })
  })

export default (el) => {
  instance
    .update()
    .check()
    .handlers(true)
}
