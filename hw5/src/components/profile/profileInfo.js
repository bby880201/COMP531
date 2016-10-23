import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Info = ({username, avatar, headline, email, phone, dob, zip})=>(
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
					<tr>ßß
						<td className="profileKey text-right">Name</td>
						<td className="profileValue text-left" name="usrname">{username}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Email address</td>
						<td className="profileValue text-left" name="email">{email}</td>
					</tr>
					<tr>
						<td className="profileKey text-right">Phone number</td>
						<td className="profileValue text-left" name="phone">{phone}</td>
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

export default connect((state)=>{
	return{
		username: state.username,
		avatar: state.avatar,
		headline: state.headline,
		email: state.email,
		phone: state.phone,
		dob: state.birthday,
		zip: state.zipcode
	}
})(Info)