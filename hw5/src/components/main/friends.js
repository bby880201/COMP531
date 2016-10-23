import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import FriendItem from './friendItem'

export const Friends = ({friendList})=>(
	<div className="panel panel-primary">
		<div className="panel-heading"><a className="displayName" href="#">Friends</a></div>
		<div className="panel-body">
			<div className="table-responsive">
				<table className="table table-hover">
					<tbody>
					{friendList.map(({name, avatar, headline, id}) => (
						<FriendItem key={id} friendName={name} headline={headline} avatar={avatar} />
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
	friendList: PropTypes.arrayOf(PropTypes.shape({
        ...FriendItem.propTypes
    }).isRequired).isRequired
}


export default connect(
	(state) => {
		return {
			friendList: state.friendList.map((val,id)=>{
				return {...val,id}
			})
		}
	}
)(Friends)