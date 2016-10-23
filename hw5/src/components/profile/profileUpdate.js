import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const Update = ()=>(
	<div className="panel panel-primary">
		<div className="panel-heading">Update your profile</div>
		<div className="panel-body">
			<div className="table-responsive">
				<table className="table table-hover" id="update">
				<tbody>
					<tr>
						<td className="profileKey text-right">Status</td>
						<td className="text-left"><input type="text" name="status" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Name</td>
						<td className="text-left"><input type="text" name="usrname" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Email address</td>
						<td className="text-left"><input type="email" name="email" placeholder="xxx@yyy.zzz" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Phone number</td>
						<td className="text-left"><input type="text" name="phone" placeholder="###-###-####" maxLength="15" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Zipcode</td>
						<td className="text-left"><input type="text" name="zip" maxLength="5" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Password</td>
						<td className="text-left"><input type="password" name="pwd" /></td>
					</tr>
					<tr>
						<td className="profileKey text-right">Confirm password</td>
						<td className="text-left"><input type="password" name="pwdcnf" /></td>
					</tr>
					<tr>
						<td><button className="pull-right btn btn-primary btn-sm btn-responsive" id="updatebtn">Update</button></td>
						<td><button className="pull-left btn btn-primary btn-sm btn-responsive" id="clear">Clear</button></td>
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
})(Update)				