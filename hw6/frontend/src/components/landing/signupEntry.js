import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'

// some constant texts
const labelMap = {
	account: {
		label: 'Account Name', 
		placeHold: 'Enter an account name',
		type: 'text'
	},
	display: {
		label: 'Display Name', 
		placeHold: 'Enter a display name', 
		type: 'text'
	},
	email: {
		label: 'Email Address', 
		placeHold: 'Your email as abc@xyz.com', 
		type: 'text'
	},
	phone: {
		label: 'Phone Number', 
		placeHold: 'Your phone number as ###-###-####', 
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
			<input type={type} className="form-control" name={name} placeholder={placeHold} />
		</div>
	)
}

SignupEntry.propTypes = {
	name: PropTypes.oneOf(
		['account', 'display', 'email', 'phone', 'dob', 'zip', 'pwd', 'pwdcnf']
		).isRequired,
	err: PropTypes.object
}

export default connect((state)=>{
		return {
			err: state.error.signupErr
		}
	}
)(SignupEntry)