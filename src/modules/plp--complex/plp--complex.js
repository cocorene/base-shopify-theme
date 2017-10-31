import { h, render } from 'preact'
import App from './components/app'

const init = el => {
  render(<App />, el)
}

export default init
