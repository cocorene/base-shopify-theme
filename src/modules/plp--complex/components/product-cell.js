import { h, Component } from 'preact'
import {
  formatPrice
} from '../lib/util'

export default class ProductCell extends Component {
  title () {
    let {
      product,
      options
    } = this.props

    return `${product.title} in ${options.Metal} with ${options.Stone}`
  }

  render () {
    let {
      image,
      url,
      price,
      product,
      variant,
      id
    } = this.props

    return (
      <div className='plp__product align-c cell'>
        <a className='plp__product__wrapper rel' href={url} title={this.title()}>
          <div
            class='plp__product__image'
            style={{'backgroundImage': `url(${image})`}}
          />
          <p class='p2'>{this.title()}<br />${formatPrice(price)}</p>
        </a>
      </div>
    )
  }
}
