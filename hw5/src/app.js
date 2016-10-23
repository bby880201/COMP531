import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Landing from './components/landing/landing'
import Main from './components/main/main'
import Profile from './components/profile/profile'
import Header from './components/header'
import Footer from './components/footer'

export const App = ({location}) => {
	let page
	if (location=='PROFILE') {
		page = <Profile />
	}
	else if (location=='MAIN') {
		page = <Main />
	} 
	else {
		page = <Landing />
	}
	return (
		<div>
			<Header />
			{page}
			<Footer />
		</div>
		)
}

App.propTypes = {
	location: PropTypes.oneOf(['MAIN', 'PROFILE', 'LANDING']).isRequired
}

export default connect(
	(state) => {
		return {
			location: state.location
		}
	}
)(App)