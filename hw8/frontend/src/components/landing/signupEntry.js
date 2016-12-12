import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'

// some constant texts
const labelMap = {
	username: {
		label: 'Username', 
		placeHold: 'Enter a username for your account',
		type: 'text'
	},
	email: {
		label: 'Email Address', 
		placeHold: 'Your email as abc@xyz.com', 
		type: 'text'
	},
	dob: {
		label: 'Birthday', 
		placeHold: '', 
		type: 'date'
	},
	zip: {
		label: 'Zipcode', 
		placeHold: '5 digits zipcode', 
		type: 'text'
	},
	pwd: {
		label: 'Password', 
		placeHold: 'Set a password', 
		type: 'password'
	},
	pwdcnf: {
		label: 'Confirm password', 
		placeHold: 'Re-enter the password', 
		type: 'password'
	}
}

export const SignupEntry = ({name, err})=>{
	const errMsg = err ? err[name] : null
	const {label, placeHold, type} = labelMap[name]
	return (
		<div className="form-group">
			{errMsg? <ErrorPanel strong={label+' invalid: '} errMsg={errMsg} className="smallSize"/>:null}
			<label htmlFor={name} className="pull-left">{label}</label>
			<input type={type} className="form-control" id={name} 
			name={name} placeholder={placeHold} />
		</div>
	)
}

SignupEntry.propTypes = {
	name: PropTypes.oneOf(
		['username', 'email', 'dob', 'zip', 'pwd', 'pwdcnf']
		).isRequired,
	err: PropTypes.object
}

export default connect((state)=>{
		return {
			err: state.error.signupErr
		}
	}
)(SignupEntry)