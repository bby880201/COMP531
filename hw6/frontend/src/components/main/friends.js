import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import FriendItem from './friendItem'
import { AddFriend } from './mainAction'
import ErrorPanel from '../error'

export const Friends = ({friends, avatars, headlines, err, addFriend})=> {
	const friendNames = []
	let newFriend
	return (
		<div className="panel panel-primary">
			<div className="panel-heading"><a className="displayName" href="#">Friends</a></div>
			<div className="panel-body">
				<div className="table-responsive">
					<table className="table table-hover">
						<tbody>
						{friends.map(({id, name}) => {
							friendNames.push(name)
							return (
								<FriendItem key={id} friendName={name} headline={headlines[name]} 
								avatar={avatars[name]} />)
						})}
						</tbody>
					</table>
				</div>
				<div className="panel-body">
					<div className="friendBtn">
						<input type="text" placeholder="Add new friend" ref={(node)=>newFriend=node} />
						<button type="button" className="btn btn-primary btn-xs headlineBtn" 
						onClick={(e)=>{
							if (friendNames.indexOf(newFriend.value)<0) {
								addFriend(newFriend.value)	
							}
							newFriend.value=''
						}}>Add</button>
					</div>
					{err ? <ErrorPanel errMsg={err} /> : null}
				</div>
			</div>
		</div>
	)
}


Friends.propTypes = {
	friends: PropTypes.arrayOf(
		PropTypes.shape({
			...FriendItem.PropTypes
		}).isRequired
	).isRequired,
	avatars: PropTypes.object.isRequired,
	headlines: PropTypes.object.isRequired,
	err: PropTypes.string,
	addFriend: PropTypes.func.isRequired
}


export default connect((state) => {
		return {
			friends: state.friends.list,
			avatars: state.avatars.dict,
			headlines: state.headlines.dict,
			err: state.error.friendErr
		} 
	}, (dispatch) => {
		return {
			addFriend: (id) => (AddFriend(id)(dispatch))
		}
	}
)(Friends)