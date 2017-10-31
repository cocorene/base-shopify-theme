import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import {
  changeCollection
} from '../lib/actions'

const mapStateToProps = ({
  collection
}) => ({
  collection
})

const mapDispatchToProps = dispatch => ({
  changeCollection: (handle) => {
    dispatch(changeCollection(handle))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarMenuItem extends Component {
  render () {
    let {
      item = {},
      collection,
      changeCollection
    } = this.props

    let isActive = collection.split('/').pop() === item.handle

    return (
      <li
        class={cx(
          'plp__sidebar__menu-item pointer',
          {
            'is-active': isActive
          })}
        onClick={() => changeCollection(item.handle)}>
        <span
          href='#'
          class={cx('p2')}>
          {item.title}
        </span>
      </li>
    )
  }
}
