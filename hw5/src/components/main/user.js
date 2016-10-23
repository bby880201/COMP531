import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const User = ({username, avatar, headline})=>(
	<div className="panel panel-primary">
		<div className="panel-heading"><a className="displayName" href="profile.html">{username}</a></div>
		<div className="panel-body">
			<p><a href="profile.html">
			<img src={avatar} className="img-circle" height="80" width="80" alt="Avatar" />
			</a></p>
			<p className="headline">{'"'+headline+'"'}</p>
			<input type="text" placeholder="Update headline here!"/>
			<button className="btn btn-xs btn-primary headlineBtn" type="button">
				<span className="glyphicon glyphicon-upload"></span>
			</button>
		</div>	
		<div className="panel-body">
			<div className="form-group">
				<textarea className="form-control newpost" id="newPost" placeholder="Post someting to your friends!" rows="5"></textarea>
			</div>
			<div className="col-sm-12 uploadImg">
				<input type="file" id="fileinput" />
			</div>
			<div className=" pull-right">
				<button type="button" className="btn btn-primary btn-sm">Post</button>
				<button type="button" className="btn btn-danger btn-sm" id="cancelPost">Cancel</button>
			</div>
		</div>
	</div>
)

User.propTypes = {
	username: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired
}

export default connect(
	(state) => {
		return {
			username: state.user.username,
			avatar: state.user.avatar,
			headline: state.user.headline
		}
	}
)(User)