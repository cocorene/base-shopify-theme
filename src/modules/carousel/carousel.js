import Flickity from 'flickity'

export default (el) => {
  if (!el.classList.contains('is-init')) {
    var carousel = new Flickity(el, {
      arrowShape: 'M13.6,26.8L0,13.4L13.6,0h9L8.8,13.4l13.8,13.4H13.6z',
      cellAlign: 'left',
      wrapAround: true
    })
    el.classList.add('is-init')
  }
}
