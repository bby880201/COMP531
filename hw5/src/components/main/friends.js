import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FriendItem from './friendItem'

export const Friends = ({friends, avatars, headlines})=>(
	<div className="panel panel-primary">
		<div className="panel-heading"><a className="displayName" href="#">Friends</a></div>
		<div className="panel-body">
			<div className="table-responsive">
				<table className="table table-hover">
					<tbody>
					{friends.map(({id, name}) => (
						<FriendItem key={id} friendName={name} headline={headlines[name]} avatar={avatars[name]} />
					))}
					</tbody>
				</table>
			</div>
			<div className="panel-body">
				<input type="text" name="addFriend" placeholder="Add your friend" />
				<button type="button" className="btn btn-primary btn-xs headlineBtn">Add</button>
			</div>
		</div>
	</div>
)

Friends.propTypes = {
	friends: PropTypes.arrayOf(
		PropTypes.shape({
			...FriendItem.PropTypes
		}).isRequired
	).isRequired,
	avatars: PropTypes.object.isRequired,
	headlines: PropTypes.object.isRequired,

}


export default connect(
	(state) => {
		return {
			friends: state.friends.list,
			avatars: state.avatars.dict,
			headlines: state.headlines.dict
		}
	}
)(Friends)