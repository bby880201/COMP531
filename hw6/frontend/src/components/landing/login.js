import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'
import { LocalLogin } from './loginAction'

// login view that could do login action
export const Login = ({loginErr, onclick})=>{
	let usrname, pwd
	return (
		<div className="col-sm-6">
			<div className="panel panel-primary">
				<div className="panel-heading">Already had an account?</div>
				<div className="panel-body">
					{loginErr? <ErrorPanel strong="Login Failed: " errMsg={loginErr}	 />:null}
					<div className="col-sm-4 center-block">
						<div className="form-group">
							<label htmlFor="loginUsr" className="pull-left">Name:</label>
							<input type="text" className="form-control" id="username"
							ref={ (node) => usrname = node } />
						</div>
					</div>
					<div className="col-sm-4 center-block">
						<div className="form-group">
							<label htmlFor="loginPwd" className="pull-left">Password:</label>
							<input type="password" className="form-control" id="password"
							ref={ (node) => pwd = node } />
						</div>
					</div>
					<div className="col-sm-3 center-block logIn">
						<div className="form-group">
							<button className="btn btn-primary btn-sm logIn" id="login" 
							onClick={(e)=>{
								e.preventDefault()
								onclick(usrname.value, pwd.value)
							}}>Log In</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

Login.propTypes = {
	onclick: PropTypes.func.isRequired,
	loginErr: PropTypes.string
}

export default connect((state)=>{
		return {
			loginErr: state.error.loginErr
		}
	},
	(dispatch)=> {
		return {
			onclick: (usrname, pwd)=>{
				LocalLogin(usrname, pwd)(dispatch)
			}
		}
	}
)(Login)