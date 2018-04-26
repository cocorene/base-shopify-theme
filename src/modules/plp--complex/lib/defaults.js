import {isMobile} from 'lib/util'

export default {
  sidebarVisible: true,
  sort: 'price-ascending',
  view: (isMobile() ? 'large' : 'small'),
  price: {
    min: 0,
    max: 1000000
  },
  selected: [],
  compactView: true,
  variants: []
}
