const dateFormat = require('dateformat')

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// profile info page
export const Info = ({username, avatar, headline, email, dob, zip})=>(
	<div className="panel panel-primary">
		<div className="panel-heading">Your profile</div>
		<div className="panel-body">
			<p><img src={avatar} className="img-circle" height="80" width="80" alt="Avatar" /></p>
			<input className='center-block profileUpload' type="file" id="fileinput" />
		</div>
		<div className="panel-body">
			<div className="table-responsive">
				<table className="table table-hover">
				<tbody>
					<tr>
						<td className="profileKey text-right">Headline</td>
						<td className="profileValue text-left" name="status">{headline}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Name</td>
						<td className="profileValue text-left" name="usrname">{username}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Email address</td>
						<td className="profileValue text-left" name="email">{email}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Birthday</td>
						<td className="profileValue text-left" name="birth">{dob}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Zipcode</td>
						<td className="profileValue text-left" name="zip">{zip}</td>
					</tr>
				</tbody>
				</table>
			</div>
		</div>
	</div>
)

Info.propTypes = {
	username: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	dob: PropTypes.string.isRequired,
	zip: PropTypes.number.isRequired
}

export default connect((state)=>{
	return{
		username: state.user.username,
		avatar: state.avatars.dict[state.user.username],
		headline: state.headlines.dict[state.user.username],
		email: state.user.email,
		dob: dateFormat(new Date(state.user.birthday),"mmmm dS, yyyy"),
		zip: state.user.zipcode
	}
})(Info)