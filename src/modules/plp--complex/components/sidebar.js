import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import {
  changeCollection,
  toggleSidebar
} from '../lib/actions'
import Group from './sidebar-group'

const mapStateToProps = ({
  menu,
  collection,
  filters,
  sidebarVisible
}) => ({
  menu,
  collection,
  filters,
  sidebarVisible
})

const mapDispatchToProps = dispatch => ({
  changeCollection: url => {
    dispatch(changeCollection(url))
  },
  toggleSidebar: visible => {
    dispatch(toggleSidebar(visible))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Sidebar extends Component {
  render () {
    let {
      menu,
      changeCollection,
      toggleSidebar,
      sidebarVisible,
      collection,
      filters
    } = this.props

    return (
      <div class={cx('plp__sidebar', {'is-hidden': sidebarVisible})}>
        <div class='plp__sidebar__section--shop-by'>
          <h4 class='h4 plp__sidebar__header'>Shop By:</h4>
          {menu && menu.map(item => {
            return (
              <Group title={item.title} list={item.links} />
            )
          })}
        </div>
        <div class='plp__sidebar__section--filters'>
          <h4 class='h4 plp__sidebar__header'>Refine By:</h4>
          {filters && Object.keys(filters).map(key => {
            return (
              <Group title={key} list={filters[key]} filter />
            )
          })}
          <Group title='Price' list={[]} filter price />
        </div>
        <div class='plp__sidebar__actions'>
          <a
            class='plp__sidebar__actions__btn btn is-black align-c'
            onClick={e => toggleSidebar(!sidebarVisible)}>
            Apply Filters
          </a>
        </div>
      </div>
    )
  }
}
