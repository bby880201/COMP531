import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const FriendItem = ({friendName, headline, avatar})=>(
	<tr>
		<td>
			<div className="panel-body friendList">
				<div className="friendAvatar ">
					<a href="#">
						<img src={avatar} className="img-circle img-responsive center-block friendAvatar" height="55" width="55" alt="Avatar" />
					</a>
				</div>
				<div className="friendName text-left">
					<p><a href="#" className="friendList">{friendName}</a></p>
					<p className="headline">{'"'+headline+'"'}</p>
				</div>
			</div>
		</td>
		<td>
			<button className="btn btn-xs btn-danger headlineBtn" type="button">
				<span className="glyphicon glyphicon-remove"></span>
			</button>
		</td>
	</tr>
)

FriendItem.propTypes = {
	friendName: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired
}

export default connect()(FriendItem)
