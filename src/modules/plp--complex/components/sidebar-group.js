import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import Accordion from 'accornion'
import Facet from './sidebar-facet'
import MenuItem from './sidebar-menu-item'
import {
  IconArrowB
} from './icons'

const mapStateToProps = ({
  filters
}) => ({
  filters
})

@connect(mapStateToProps)
export default class SidebarGroup extends Component {
  constructor (props) {
    super(props)
    this.setState({
      open: true
    })
  }

  toggleAccordion () {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const {
      list,
      title,
      filter = false,
      price = false
    } = this.props

    const {
      open
    } = this.state

    return (
      <div class={`plp__sidebar__group${(filter ? '--filter' : '')}`}>
        <h4
          class='rel p1 pointer'
          onClick={() => this.toggleAccordion()}
        >{title}
          <i
            class={cx('accordion__caret dropdown__icon', {'is-open': open})}
            dangerouslySetInnerHTML={{__html: IconArrowB}} />
        </h4>
        <Accordion open={open} >
          {list.length && (
            <ul class={`plp__sidebar__group__ul${(filter ? '--filter' : '')}`}>
              {list.map(item => {
                return (filter
                  ? <Facet group={title} facet={item} />
                  : <MenuItem item={item} />
                )
              })}
            </ul>
          )}
        </Accordion>
      </div>
    )
  }
}
