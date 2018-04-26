import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import qs from 'query-string'

const mapStateToProps = ({
  collection,
  sort,
  selected,
  view,
  price,
  compactView
}) => ({
  collection,
  sort,
  selected,
  view,
  price,
  compactView
})

@connect(mapStateToProps)
export default class URI extends Component {
  watchedProps () {
    return [
      'collection',
      'sort',
      'selected',
      'view',
      'price',
      'compactView'
    ]
  }

  componentWillUpdate (next) {
    this.updateURI(
      this.generateURI(next)
    )
  }

  generateURI (props) {
    let {
      collection,
      sort,
      selected,
      view,
      price
    } = props

    let filtered = this.watchedProps()
      .filter(key => (
        key !== 'collection'
      ))
      .map(key => {
        if (key === 'selected') {
          return this.createFilterURI(props[key])
        } else if (~['sort', 'view'].indexOf(key)) {
          return `${key}=${props[key]}`
        } else if (key === 'price') {
          return `${key}=${props[key].min},${props[key].max}`
        } else if (key === 'compactView') {
          return `${key}=${props[key] ? 1 : 0}`
        }
      })

    return `${collection}?${filtered.join('&')}`
  }

  updateURI (url) {
    history.replaceState({}, 'Collections', url)
  }

  createFilterURI (selected) {
    // console.dir(selected)
    return qs.stringify({selected}, {arrayFormat: 'bracket'})
  }
}
