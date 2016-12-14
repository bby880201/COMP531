import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'
import SuccessPanel from '../success'
import { Update, Clear, Link, Unlink } from './updateAction'

export const InfoUpdate = ({ update, clear, link, unlink, err })=>{
	const errMsg = err ? err['update'] : null
	const sucMsg = err ? err['link'] : null
	const fields = {}
	let username, password
	return (
		<div>
		<div className="panel panel-primary">
			<div className="panel-heading">Update your profile</div>
			<div className="panel-body">
				{errMsg ? <ErrorPanel strong="Update failed: " errMsg={errMsg} /> : null}
				{sucMsg ? <SuccessPanel strong="Update Success: " errMsg={sucMsg} /> : null}
				<div className="table-responsive">
					<table className="table table-hover" id="update">
					<tbody>
						<tr>
							<td className="profileKey text-right">Email address</td>
							<td className="text-left">
								<input type="email" name="email" placeholder="xxx@yyy.zzz" id="newEmail"
								ref={(node)=>fields['email']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Zipcode</td>
							<td className="text-left">
								<input type="text" name="zip" maxLength="5" placeholder="5 digits zipcode"
								id="newZip" ref={(node)=>fields['zip']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Password</td>
							<td className="text-left">
								<input type="password" name="pwd" id="newPwd"
								ref={(node)=>fields['pwd']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Confirm password</td>
							<td className="text-left">
								<input type="password" name="pwdcnf" id="pwdCnf"
								ref={(node)=>fields['pwdcnf']=node} />
							</td>
						</tr>
						<tr>
							<td><button className="pull-right btn btn-primary btn-sm btn-responsive" 
							id="updateInfo" onClick={(e)=>{
								update(fields)
							}}>Update</button></td>
							<td><button className="pull-left btn btn-primary btn-sm btn-responsive" 
							onClick={(e)=>{
								e.preventDefault()
								clear(fields)
							}}>Clear</button></td>
						</tr>
					</tbody>
					</table>
				</div>
			</div>
		</div>
		<div className="panel panel-primary">
			<div className="panel-heading">Link your account</div>
			<div className="panel-body">
				<div className="table-responsive">
					<table className="table table-hover" id="update">
					<tbody>
						<tr>
							<td className="profileKey text-right">Username</td>
							<td className="text-left">
								<input type="text" ref={(node)=>username=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Password</td>
							<td className="text-left">
								<input type="password" ref={(node)=>password=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right"><button className="pull-right btn btn-primary btn-sm btn-responsive" 
							id="updateInfo" onClick={(e)=>{
								link(username.value, password.value)
							}}>Link</button></td>
							<td className="text-left"><button className="pull-left btn btn-primary btn-sm btn-responsive" 
							onClick={(e)=>{
								e.preventDefault()
								unlink()
							}}>Unlink from all 3rd party accounts</button></td>
						</tr>
					</tbody>	
					</table>
				</div>
			</div>
		</div>
		</div>
	)
}

InfoUpdate.propTypes = {
	update: PropTypes.func.isRequired,
	clear: PropTypes.func.isRequired,
	link: PropTypes.func.isRequired,
	unlink: PropTypes.func.isRequired,
	err: PropTypes.object
}

export default connect((state)=>{
		return {
			err: state.error.profileErr
		}
	}, (dispatch)=>{
		return {
			clear: (fields)=>{
				Clear(fields)(dispatch)
			},
			update: (fields)=>{
				Update(fields)(dispatch)
			},
			link: (username, password)=> {
				Link(username, password)(dispatch)
			},
			unlink: () => {
				Unlink()(dispatch)
			}
		} 
	}
)(InfoUpdate)