import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import ProductCell from './product-cell'
import {isMobile} from '../lib/util'
import cx from 'classnames'
import {showAll} from '../lib/actions'

const mapStateToProps = ({
  variants,
  selected,
  sort,
  view,
  price,
  compactView
}) => ({
  variants,
  selected,
  sort,
  view,
  price,
  compactView
})

const mapDispatchToProps = dispatch => ({
  showAll: () => {
    dispatch(showAll())
  }
})

@connect(mapStateToProps, mapDispatchToProps)
export default class Grid extends Component {
  constructor (props) {
    super(props)
    this.compactLimit = 12
  }

  filterVariants ({options, price}) {
    let facetWorthiness = this.filterViaFacet(options)
    let priceWorthiness = this.filterViaPrice(price)
    return facetWorthiness && priceWorthiness
  }

  filterViaFacet (options) {
    let {selected = []} = this.props

    let categorized = selected.reduce((obj, filter) => {
      let split = filter.split('|')
      if (!obj[split[0]]) obj[split[0]] = []
      obj[split[0]].push(split[1])
      return obj
    }, {})

    if (!selected.length) return true

    return Object.keys(categorized).every(key => (
      options[key] &&
      !!~categorized[key].indexOf(options[key])
    ))
  }

  filterViaPrice (price) {
    let {price: limit} = this.props
    return price <= limit.max && price >= limit.min
  }

  sort (a, b) {
    let {sort} = this.props
    if (sort === 'price-ascending') {
      return a.price - b.price
    }
    if (sort === 'price-descending') {
      return b.price - a.price
    }
  }

  render () {
    let {
      variants = [],
      view,
      compactView,
      showAll
    } = this.props
    let interval = 5
    let filtered = variants
      .filter(v => this.filterVariants(v))
      .sort((a, b) => this.sort(a, b))

    let cut = (
      filtered.length > this.compactLimit &&
      compactView
    )

    return (
      <div class='align-c'>
        <div class={`plp__grid view--${view} grid`}>
          {filtered.length ? (
            filtered.slice(0, (cut ? this.compactLimit : filtered.length)).map(cell => {
              return (<ProductCell {...cell} />)
            })
          ) : (
            <div>No Products To Display</div>
          )}
        </div>
        {cut && (
          <a
            class='btn is-blush plp__load-more'
            onClick={showAll}><span class='btn__el'>Show All</span></a>
        )}
      </div>
    )
  }
}
