import {
  removeUnavailableFilters,
  toggleSelectedFilter
} from './util'
import defaults from './defaults'

export const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_COLLECTION':
      let {collection} = action
      return Object.assign({}, state, {collection})
    case 'UPDATE_COLLECTION_DATA':
      let {data} = action
      data.selected = removeUnavailableFilters(
        state.selected,
        data.filters
      )
      return Object.assign({}, state, data)
    case 'UPDATE_SELECTED':
      let {filter} = action
      return Object.assign({}, state, {
        selected: toggleSelectedFilter(filter, state.selected)
      })
    case 'UPDATE_SORT':
      let {sort} = action
      return Object.assign({}, state, {sort})
    case 'UPDATE_PRICE':
      let {price} = action
      return Object.assign({}, state, {price})
    case 'UPDATE_VIEW':
      let {view} = action
      return Object.assign({}, state, {view})
    case 'SHOW_ALL':
      return Object.assign({}, state, {compactView: false})
    case 'TOGGLE_SIDEBAR':
      let {visible} = action
      return Object.assign({}, state, {sidebarVisible: visible})
  }
  return state
}
