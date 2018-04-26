import { h, Component } from 'preact'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { decodeQueryString } from './util'
import {reducer} from './reducers'
import defaults from './defaults'

let initial = Object.assign({}, defaults, decodeQueryString())

export default createStore(
  reducer,
  initial,
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension && window.devToolsExtension())
