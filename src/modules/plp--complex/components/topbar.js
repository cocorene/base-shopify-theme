import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import {
  updateSelected,
  updateSort,
  updateView,
  toggleSidebar
} from '../lib/actions'
import {
  IconCross,
  IconSmallGrid,
  IconLargeGrid
} from './icons'
import {Select} from './form-elements'

const mapStateToProps = ({
  sidebarVisible,
  selected,
  view,
  sort
}) => ({
  sidebarVisible,
  selected,
  view,
  sort
})

const mapDispatchToProps = dispatch => ({
  updateSelected: (cat, val) => {
    dispatch(updateSelected(cat, val))
  },
  updateSort: e => {
    dispatch(updateSort(e))
  },
  updateView: view => {
    dispatch(updateView(view))
  },
  toggleSidebar: visible => {
    dispatch(toggleSidebar(visible))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class FilterMenu extends Component {
  updateSort (e) {
    let {updateSort} = this.props
    updateSort(e.target.value)
  }

  sortValues () {
    return [
      {
        key: 'price-descending',
        label: 'High To Low (Price)'
      },
      {
        key: 'price-ascending',
        label: 'Low to High (Price)'
      }
    ]
  }

  render () {
    let {
      selected,
      view,
      sort,
      sidebarVisible,
      updateSelected,
      updateSort,
      updateView,
      toggleSidebar
    } = this.props

    // Not updating sort value initially in filter bar..
    return (
      <div class='plp__topbar'>
        <a
          onClick={e => toggleSidebar(!sidebarVisible)}
          class='plp__topbar__filter-toggle btn is-black block align-c'>
          + Filter
        </a>
        <div class='plp__topbar__left'>
          {selected && selected.map(facet => {
            let split = facet.split('|')
            return (
              <span
                class='plp__topbar__selected'
                onClick={() => updateSelected(split[0], split[1])}
              >
                <i
                  class='plp__topbar__selected__icon'
                  dangerouslySetInnerHTML={{__html: IconCross}} />
                {split[1]}
              </span>
            )
          })}
        </div>
        <div class='plp__topbar__right'>
          <Select onChange={e => this.updateSort(e)}>
            {this.sortValues().map(({key, label}) => (
              <option value={key} selected={key === sort}>{label}</option>
            ))}
          </Select>
          <span
            class={cx('plp__topbar__view', {'is-active': (view === 'large')})}
            dangerouslySetInnerHTML={{__html: IconLargeGrid}}
            onClick={() => updateView('large')} />
          <span
            class={cx('plp__topbar__view', {'is-active': (view === 'small')})}
            dangerouslySetInnerHTML={{__html: IconSmallGrid}}
            onClick={() => updateView('small')} />
        </div>
      </div>
    )
  }
}
