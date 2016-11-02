import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { UpdateToServer } from './mainActions'

// user panel in main page that could disply user info and update headline
export const User = ({username, avatar, headline, update})=>{
	let newHeadline,newArticle
	return (
		<div className="panel panel-primary">
			<div className="panel-heading"><a className="displayName" href="profile.html">{username}</a></div>
			<div className="panel-body">
				<p><a href="profile.html">
				<img src={avatar} className="img-circle" height="80" width="80" alt="Avatar" />
				</a></p>
				<p className="headline">{'"'+headline+'"'}</p>
				<input type="text" placeholder="Update headline here!" ref={(node)=>{ newHeadline = node }} />
				<button className="btn btn-xs btn-primary headlineBtn" type="button" onClick={()=>{
						update(newHeadline.value, 'headline')
						newHeadline.value=""
					}}>
					<span className="glyphicon glyphicon-upload"></span>
				</button>
			</div>	
			<div className="panel-body">
				<div className="form-group">
					<textarea className="form-control newpost" placeholder="Post someting to your friends!" rows="5" ref={(node)=>{ newArticle = node }}></textarea>
				</div>
				<div className="col-sm-12 uploadImg">
					<input type="file" />
				</div>
				<div className=" pull-right">
					<button type="button" className="btn btn-primary btn-sm" onClick={()=>{
						update(newArticle.value, 'article')
						newArticle.value=""
					}}>Post</button>
				</div>
			</div>
		</div>
	)
}



User.propTypes = {
	username: PropTypes.string.isRequired,
	headline: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	update: PropTypes.func.isRequired
}

export default connect((state) => {
	return {username: state.user.username,
		avatar: state.avatars.dict[state.user.username],
		headline: state.headlines.dict[state.user.username]}
	},
	(dispatch) => {
		return {
			update: (text, type) => {
				UpdateToServer(text, type)(dispatch)
			}
		}
	}
)(User)