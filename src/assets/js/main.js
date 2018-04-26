__webpack_public_path__ = BRRL_PATH(BRRL_PUBLIC_PATH) // eslint-disable-line camelcase

import init from 'lib/init'
import { set, unset, toggle, isMobile } from 'lib/util'

document.addEventListener('DOMContentLoaded', () => {
  init({
    module: 'modules'
  }).mount()
})
