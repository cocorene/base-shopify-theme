import { h, Component } from 'preact'
import cx from 'classnames'
import select from 'dom-select'
import {
  IconCheckmark,
  IconArrowB
} from './icons'

export class Checkbox extends Component {
  shouldComponentUpdate (next) {
    let {active: _active} = this.props
    let {active} = next
    return active !== _active
  }

  render () {
    const {active} = this.props
    return (
      <i class='cb align-m plp__sidebar__cb'>
        <input type='checkbox' class='cb__el' checked={active} />
        <span class='cb__box' dangerouslySetInnerHTML={{__html: IconCheckmark}} />
      </i>
    )
  }
}

export const Select = ({children, ...props}) => {
  return (
    <div class='dropdown' {...props}>
      <select class='dropdown__el'>{children}</select>
      <i class='dropdown__icon' dangerouslySetInnerHTML={{__html: IconArrowB}} />
    </div>
  )
}
