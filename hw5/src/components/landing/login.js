import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import {PostLogin} from './loginAction'

export const Login = ({onclick})=>{
	let usrname, pwd
	return (
		<div className="col-sm-6">
			<div className="panel panel-primary">
				<div className="panel-heading">Already had an account?</div>
				<div className="panel-body">
					<div className="col-sm-4 center-block">
						<div className="form-group">
							<label htmlFor="loginUsr" className="pull-left">Name:</label>
							<input type="text" className="form-control" ref={ (node) => usrname = node } />
						</div>
					</div>
					<div className="col-sm-4 center-block">
						<div className="form-group">
							<label htmlFor="loginPwd" className="pull-left">Password:</label>
							<input type="password" className="form-control" ref={ (node) => pwd = node } />
						</div>
					</div>
					<div className="col-sm-3 center-block logIn">
						<div className="form-group">
							<button className="btn btn-primary btn-sm logIn" id="login" onClick={(e)=>{
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

export default connect(null,
	(dispatch)=> {
		return {
			onclick: (usrname, pwd)=>{
				PostLogin(usrname, pwd)(dispatch)
			}
		}
	}
)(Login)
