import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import {
  updateSelected
} from '../lib/actions'
import {Checkbox} from './form-elements'

const mapStateToProps = ({
  filters,
  selected
}) => ({
  filters,
  selected
})

const mapDispatchToProps = dispatch => ({
  updateSelected: (cat, val) => {
    dispatch(updateSelected(cat, val))
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class SidebarFacet extends Component {
  render () {
    let {
      group,
      facet,
      filters,
      selected = [],
      updateSelected
    } = this.props

    let isActive = !!~selected.indexOf(`${group}|${facet}`)

    return (
      <li
        class='plp__sidebar__filter pointer'
        onClick={() => updateSelected(group, facet)}>
        <Checkbox active={isActive} />
        <span
          href='#'
          class={cx('inline-block p2 align-m', {'is-active': isActive})}>
          {facet}
        </span>
      </li>
    )
  }
}
