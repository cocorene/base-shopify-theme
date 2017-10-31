import nano from 'nanoajax'

import {
  parseJSON,
  decodeCollectionMeta,
  calculateFilters
} from './util'

/**
 * Called directly by the Redux action. This
 * sets up the promise chain that returns the data
 * from all pages that need to be requested. This
 * is important when a collection has more than
 * 50 products, like the /collections/all collection
 *
 * @param {function} getState - Gets the current Redux state
 * @param {function} cb - Callback function to call when it's all over
 */
export const getData = (getState, cb) => {
  const {
    collection,
    sort
  } = getState()
  getAllCollectionPages(collection, sort).then(data => {
    const filters = calculateFilters(data)
    data = {...data, ...{filters}}
    cb(data)
  }).catch(e => {
    console.log(e)
  })
}

/**
 * Sets up a promise chain to get all pages of products.
 * First, we fire a request for page 1 to see how many pages
 * we need to get. Then, we set up a Promise.all to get
 * all the other pages at the same time.
 *
 * @param {string} collection - The collection handle used in the URL
 * @param {string} sort - The current sort value
 */
const getAllCollectionPages = (collection, sort) => {
  return getCollection(collection, sort, 1).then(data => {
    let {pages} = data
    pages = Number(pages)

    if (pages > 1) {
      const iterations = [...Array(pages - 1).keys()]
      const chain = iterations.map(i => (
        getCollection(collection, sort, (i + 2))
      ))

      return Promise.all(chain).then(responses => {
        responses.forEach(res => {
          data.variants = [...data.variants, ...res.variants]
        })

        return Promise.resolve(data)
      })
    } else {
      return Promise.resolve(data)
    }
  })
}

/**
 * Fires the actual ajax request to get the json from shopify.
 * Wraps this in a promise so we can chain onto it after it
 * completes
 *
 * @param {string} collection - The collection handle used in the URL
 * @param {string} sort - The current sort value
 * @param {int} page - The page of paginated results to return
 */
const getCollection = (collection, sort, page) => {
  return new Promise((resolve, reject) => {
    nano.ajax(
      {url: `${collection}?view=plp-endpoint&sort_by=${sort}&page=${page}`},
      (code, res) => {
        res = parseJSON(res)
        res.meta && decodeCollectionMeta(res.meta)
        resolve(res)
      }
    )
  })
}
