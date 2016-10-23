import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Singup = ()=>(
	<div className="col-sm-6">
		<div className="panel panel-primary">
			<div className="panel-heading">New to Here?</div>
			<div className="panel-body">
				<form id="signUpForm" action="main.html" method="GET">
					<div className="form-group">
						<label htmlFor="usr" className="pull-left">Account name</label>
						<input type="text" className="form-control" id="accountName" name="accountName" placeholder="Enter an account name" required="required" />
					</div>

					<div className="form-group">
						<label htmlFor="displayName" className="pull-left">Display name</label>
						<input type="text" className="form-control" id="displayName" name="displayName" placeholder="Enter a display name" />
					</div>

					<div className="form-group">
						<label htmlFor="displayName" className="pull-left">Email address</label>
						<input type="email" className="form-control" id="emailAddress" name="emailAddress" placeholder="Enter your email" pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$" required="required" />
					</div>

					<div className="form-group">
						<label htmlFor="phoneNumber" className="pull-left">Phone number</label>
						<input type="text" className="form-control" id="phoneNumber" name="phoneNumber" placeholder="Your phone number as ###-###-####" pattern="^\d{3}-\d{3}-\d{4}$" maxLength="15" required="required" />
					</div>

					<div className="form-group">
						<label htmlFor="birthday" className="pull-left">Birthday</label>
						<input type="date" className="form-control" id="birthday" name="birthday" placeholder="Enter your birthday" required="required" />
					</div>
					
					<div className="form-group">
						<label htmlFor="zipcode" className="pull-left">Zipcode</label>
						<input type="text" className="form-control" id="zipcode" name="zipcode" pattern="^\d{5}$" maxLength="5" placeholder="5 digits zipcode" required="required" />
					</div>

					<div className="form-group">
						<label htmlFor="password" className="pull-left">Password</label>
						<input type="password" className="form-control" id="password" name="password" placeholder="Set a password" placeholder="Set a password" required="required" />
					</div>

					<div className="form-group">
						<label htmlFor="pwdcnf" className="pull-left">Confirm password</label>
						<input type="password" className="form-control" id="pwdcnf" name="pwdcnf" placeholder="Re-enter the password" required="required" />
					</div>

					<input type="hidden" id="loadedTime" name="loadedTime" required="required" />

					<input type="submit" value="Sign Up!" id="signUp" className="btn btn-primary btn-sm" />
					<input type="reset" className="btn btn-primary btn-sm" value="Clear" />
				</form>
			</div>
		</div>
	</div>
)

export default connect()(Singup)