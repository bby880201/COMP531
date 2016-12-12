import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { UpdateToServer } from './mainAction'
import { NavigateTo } from '../utilActions'

// user panel in main page that could disply user info and update headline
export const User = ({username, avatar, headline, update, navto})=>{
	let newHeadline, newArticle, imgFile
	return (
		<div className="panel panel-primary">
			<div className="panel-heading" id="mainName">
				{username}
			</div>
			<div className="panel-body">
				<p><a href="#" onClick={(e) => {
					e.preventDefault()
					navto("PROFILE")}}>
				<img src={avatar} className="img-circle" height="80" width="80" alt="Avatar" />
				</a></p>
				<p className="headline" id="hdl">{'"'+headline+'"'}</p>
				<input type="text" placeholder="Update headline here!" id="newHdl"
				ref={(node)=>{ newHeadline = node }} />
				<button type="button" className="btn btn-xs btn-primary headlineBtn" 
				id="hdlPost" onClick={()=>{
						update(newHeadline.value, 'headline')
						newHeadline.value=""
					}}>
					<span className="glyphicon glyphicon-upload"></span>
				</button>
			</div>	
			<div className="panel-body">
				<div className="form-group">
					<textarea className="form-control newpost" id="newPost" 
					placeholder="Post someting to your friends!" 
					rows="5" ref={(node)=>{ newArticle = node }}></textarea>
				</div>
				<div className="col-sm-12 uploadImg">
					<input type="file" accept="image/*" ref={(node)=>{ imgFile = node }} />
				</div>
				<div className=" pull-right">
					<button type="button" className="btn btn-primary btn-sm" id="newPostBtn"
					onClick={()=>{
						update(newArticle.value, 'article', imgFile.files[0])
						newArticle.value = ''
						imgFile.value = ''
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
	update: PropTypes.func.isRequired,
	navto: PropTypes.func.isRequired
}

export default connect((state) => {
	return {username: state.user.username,
		avatar: state.avatars.dict[state.user.username],
		headline: state.headlines.dict[state.user.username]}
	},
	(dispatch) => {
		return {
			update: (text, type, img) => {
				UpdateToServer(text, type, img)(dispatch)
			},
			navto: (location) => (NavigateTo(location)(dispatch))
		}
	}
)(User)