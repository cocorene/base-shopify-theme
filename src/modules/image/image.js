import on from 'dom-event'
import Layzr from 'layzr.js'

const instance = Layzr({
  normal: 'data-normal',
  retina: 'data-retina',
  srcset: 'data-srcset',
  threshold: 0
})

export default (el) => {
  instance
    .update()
    .check()
    .handlers(true)
}
