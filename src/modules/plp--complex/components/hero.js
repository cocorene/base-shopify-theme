import { h, Component } from 'preact'
import { connect } from 'preact-redux'
import cx from 'classnames'
import {
  resizeImage,
  stripWysiwyg
} from '../lib/util'

const mapStateToProps = ({
  meta
}) => ({
  meta
})

@connect(mapStateToProps)
export default class Hero extends Component {
  render () {
    let {meta = {}} = this.props
    let image = meta.image || ''
    let description = stripWysiwyg(meta.description) || ''
    return (
      <div class='plp__hero'>
        <div
          class='plp__hero__image img-gradient'
          style={{backgroundImage: `url(${resizeImage(image)})`}} />
        <div class='plp__hero__content'>
          <h1 class='h2 plp__hero__content__title'>{meta.title}</h1>
          <p
            class='p2'
            dangerouslySetInnerHTML={{__html: description}} />
        </div>
      </div>
    )
  }
}
