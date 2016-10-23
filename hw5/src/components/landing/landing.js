import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Login from './login'
import Signup from './signup'

export const Landing = ()=>(
	<div className="container text-center">
		<div className="row">
			<Login />
			<Signup />
		</div>
	</div>
)

export default connect()(Landing)