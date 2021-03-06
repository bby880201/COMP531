import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { RemoveFriend } from './mainAction'

export const FriendItem = ({friendName, headline, avatar, remove})=>(
	<tr>
		<td className="col-sm-2">
			<a href="#">
				<img src={avatar} className="img-circle center-block friendAvatar" height="40" width="40" alt="Avatar" />
			</a>
		</td>
		<td className="col-sm-8 text-left">
			<div>
				<a href="#" className="friendList">{friendName}</a>
			</div>
			<div className="headline">{'"'+headline+'"'}</div>
		</td>
		<td className="col-sm-2">
			<button className="btn btn-xs btn-danger headlineBtn" name="flwRm" type="button"
			onClick={(e)=>{
				remove(friendName)
			}}>
				<span className="glyphicon glyphicon-remove"></span>
			</button>
		</td>
	</tr>
)

FriendItem.propTypes = {
	friendName: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	remove: PropTypes.func.isRequired
}

export default connect( null, (dispatch) => {
		return {
			remove: (id) => (RemoveFriend(id)(dispatch))
		}
	}
)(FriendItem)
