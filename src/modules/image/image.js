import select from 'select-dom'
import on from 'dom-event'
import { lazy, get } from 'lib/util'

export default (el) => {
  lazy(el)
  on(window, 'resize', () => {
    lazy(el)
  })
}
