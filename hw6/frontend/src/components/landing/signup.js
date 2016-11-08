import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import SignupEntry from './signupEntry'
import { Register } from './signupAction'
import ErrorPanel from '../error'

const entries = ['account', 'display', 'email', 'phone', 'dob', 'zip', 'pwd', 'pwdcnf']

export const Signup = ({err, onclick})=>{
	const errMsg = err ? err['server'] : null
	let signupForm
	return (
		<div className="col-sm-6">
			<div className="panel panel-primary">
				<div className="panel-heading">New to Here?</div>
				<div className="panel-body">
					{errMsg ? <ErrorPanel strong="Signup failed: " errMsg={errMsg} /> : null}
					<form ref={(node)=>signupForm=node}>
						{
							entries.map((val, idx)=>(<SignupEntry key={idx} name={val} />))
						}
						<input type="button" value="Sign Up!" className="btn btn-primary btn-sm" 
						onClick={(e)=>{
							e.preventDefault()
							onclick(signupForm)
						}}/>
						<input type="reset" className="btn btn-primary btn-sm" value="Clear" />
					</form>
				</div>
			</div>
		</div>
	)	
}

Signup.propTypes = {
	err: PropTypes.object,
	onclick: PropTypes.func.isRequired
}

export default connect((state)=>{
	return {
		err: state.error.signupErr
	}
}, (dispatch)=> {
		return {
			onclick: (form)=>{
				Register(form)(dispatch)
			}
		}
	}
)(Signup)