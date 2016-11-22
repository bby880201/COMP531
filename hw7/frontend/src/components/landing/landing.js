import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'
import Login from './login'
import Signup from './signup'

// landing page that could handle both login and signup 
export const Landing = ({err})=>(
	<div className="container text-center">
		<div className="row">
			{err? <ErrorPanel errMsg={err}	 />:null}
			<Login />
			<Signup />
		</div>
	</div>
)
Landing.propTypes = {
	err: PropTypes.string
}
export default connect((state)=>{
		return {
			err: state.error.logoutErr
		}
	}
)(Landing)
