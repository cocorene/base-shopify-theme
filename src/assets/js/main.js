__webpack_public_path__ = BRRL_PATH(BRRL_PUBLIC_PATH) // eslint-disable-line camelcase

import init from 'lib/init'

document.addEventListener('DOMContentLoaded', () => {
  init({
    component: 'components/',
    page: 'pages/',
    module: 'modules',
    util: 'util/'
  }).mount()
})
