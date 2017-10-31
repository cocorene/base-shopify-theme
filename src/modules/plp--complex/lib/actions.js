import { getData } from './connectors'

export const changeCollection = collection => {
  return (dispatch, getState) => {
    dispatch({
      type: 'CHANGE_COLLECTION',
      collection
    })

    getData(getState, (data) => {
      dispatch({
        type: 'UPDATE_COLLECTION_DATA',
        data
      })
      dispatch(removeLoadingState())
    })
  }
}
export const updateSelected = (key, facet) => {
  return {
    type: 'UPDATE_SELECTED',
    filter: `${key}|${facet}`
  }
}
export const updateSort = sort => {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATE_SORT',
      sort
    })

    if (/price/.test(sort)) {
      return
    }

    getData(getState, (data) => {
      dispatch({
        type: 'UPDATE_COLLECTION_DATA',
        data
      })
    })
  }
}
export const updateView = view => {
  return {
    type: 'UPDATE_VIEW',
    view
  }
}
export const updatePrice = price => {
  return {
    type: 'UPDATE_PRICE',
    price
  }
}
export const removeLoadingState = () => {
  setTimeout(() => {
    document.querySelector('.js-plp-app').classList.remove('is-loading')
  }, 500)

  return {
    type: 'REMOVE_LOADING_STATE'
  }
}
export const showAll = () => {
  return {
    type: 'SHOW_ALL'
  }
}
export const toggleSidebar = visible => {
  return {
    type: 'TOGGLE_SIDEBAR',
    visible
  }
}
