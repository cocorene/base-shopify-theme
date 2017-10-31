import qs from 'query-string'

export const decodeQueryString = () => {
  let initState = qs.parse(
    location.search,
    {arrayFormat: 'bracket'}
  )
  let {price = false} = initState
  if (price) {
    initState['price'] = {
      min: Number(price.split(',')[0]),
      max: Number(price.split(',')[1])
    }
  }
  if (typeof initState.compactView !== 'undefined') {
    let {compactView} = initState
    initState.compactView = !!Number(compactView)
  }
  return initState
}

export const removeUnavailableFilters = (selected = [], filters) => {
  return selected.splice(0).filter((filter) => {
    let split = filter.split('|')
    return !!~filters[split[0]].indexOf(split[1])
  })
}

export const toggleSelectedFilter = (filter, selected) => {
  let i = selected.indexOf(filter)
  let updated = selected.splice(0)
  if (~i) {
    updated.splice(i, 1)
  } else {
    updated.push(filter)
  }

  return updated
}

export const calculateFilters = ({variants}) => {
  let opts = variants
    .map(v => v.options)
    .reduce((obj, v) => {
      Object.keys(v).map(key => (
        obj[`${key}|${v[key]}`] = true
      ))
      return obj
    }, {})
  // Restructure
  let categorized = {}
  Object.keys(opts).map(str => {
    let arr = str.split('|')
    if (!categorized[arr[0]]) {
      categorized[arr[0]] = []
    }
    categorized[arr[0]].push(arr[1])
  })

  return categorized
}

export const parseJSON = string => {
  let json = {}
  string = string.replace(/<!--.*-->/g, '')
  try {
    json = JSON.parse(string)
  } catch (e) {
    console.log(e)
  }
  return json
}

export const decodeCollectionMeta = meta => {
  for (let key in meta) {
    if (key !== 'json') {
      meta[key] = decodeURIComponent(meta[key]).replace(/\+/g, ' ')
    }
  }
}

export const resizeImage = (src, size = 1440) => {
  return (src || '').replace(/(_small\.(?:jpe?g|png))/, `_${size}x.progressive.jpg`)
}

export const stripWysiwyg = (str) => {
  return (str || '').replace(/"p1"/, '')
}
export const formatPrice = (num) => {
  return (Number(num) / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2
  })
}
