import { h, Component } from 'preact'
import { Provider } from 'preact-redux'
import store from '../lib/store'
import Sidebar from './sidebar'
import Hero from './hero'
import Grid from './grid'
import URI from './uri'
import Topbar from './topbar'
import {
  changeCollection
} from '../lib/actions'

export default class App extends Component {
  componentDidMount () {
    store.dispatch(
      changeCollection(location.pathname)
    )
  }

  render () {
    return (
      <Provider store={store}>
        <div class='plp__wrap'>
          <URI />
          <Sidebar />
          <div class='plp__main'>
            <Hero />
            <Topbar />
            <Grid />
          </div>
        </div>
      </Provider>
    )
  }
}
