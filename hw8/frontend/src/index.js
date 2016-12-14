require('expose?$!expose?jQuery!jquery')
require('bootstrap-webpack')
require('react-fontawesome')
require('./styles.css')

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

import Reducer from './reducers'
import App from './app'

import { initialVisit } from './components/landing/loginAction'
import { resource } from './serverAccess'

const logger = createLogger()
const store = createStore(Reducer, applyMiddleware(logger))

resource('GET', '')
.then((res) => {
	initialVisit(res.username, store.dispatch)
})
.catch((err)=>{})

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
)
