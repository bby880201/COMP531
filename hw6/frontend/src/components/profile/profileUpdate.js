import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorPanel from '../error'
import { Update, Clear } from './updateAction'

export const InfoUpdate = ({ update, clear, err })=>{
	const errMsg = err ? err['update'] : null
	const fields = {}
	return (
		<div className="panel panel-primary">
			<div className="panel-heading">Update your profile</div>
			<div className="panel-body">
				{errMsg ? <ErrorPanel strong="Update failed: " errMsg={errMsg} /> : null}
				<div className="table-responsive">
					<table className="table table-hover" id="update">
					<tbody>
						<tr>
							<td className="profileKey text-right">Email address</td>
							<td className="text-left">
								<input type="email" name="email" placeholder="xxx@yyy.zzz" 
								ref={(node)=>fields['email']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Zipcode</td>
							<td className="text-left">
								<input type="text" name="zip" maxLength="5" placeholder="5 digits zipcode"
								ref={(node)=>fields['zip']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Password</td>
							<td className="text-left">
								<input type="password" name="pwd" 
								ref={(node)=>fields['pwd']=node} />
							</td>
						</tr>
						<tr>
							<td className="profileKey text-right">Confirm password</td>
							<td className="text-left">
								<input type="password" name="pwdcnf" ref={(node)=>fields['pwdcnf']=node} />
							</td>
						</tr>
						<tr>
							<td><button className="pull-right btn btn-primary btn-sm btn-responsive" 
							onClick={(e)=>{
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
	)
}

InfoUpdate.propTypes = {
	update: PropTypes.func.isRequired,
	clear: PropTypes.func.isRequired,
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
			}
		} 
	}
)(InfoUpdate)