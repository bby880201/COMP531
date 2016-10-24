const dateFormat = require('dateformat')

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comments from './comments'
import { ToggleComment } from './mainActions'

export const NameTag = ({author, avatar, time})=> (
	<div className="well contentAvatar">
		<p><a href="#">
			<img src={avatar} className="img" height="55" width="55" alt="Avatar" />
		</a></p>
		<p><a href="#" className="friendList">{author}</a></p>
		<p className="articalTS">{dateFormat(new Date(time),"mmmm dS, yyyy")}</p>
	</div>
)

// a feed card that contains an article and its comments
export const Feed = ({article, avatars, username, toggleComment})=>(
	<div className="row">
		<div className="col-sm-3">
			<NameTag author={article.author} avatar={avatars[article.author]} time={article.date} />
		</div>
		<div className="col-sm-9">
			<div className="well text-left contentArtical">
				{article.img? <p><img src={article.img} className="img-responsive center-block" /></p> : null}
				<p>{article.text}</p>
				<div className="articleBtns">
					<div className="pull-right">
						<button type="button" className="btn btn-default btn-sm" onClick={()=>
							(toggleComment(article._id))}>Comment</button>
						{article.author===username?<button type="button" className="btn btn-default btn-sm">Edit</button>:null}
					</div>
				</div>
				{article.commentOn?<Comments data={article.comments} /> : null}
			</div>
		</div>
	</div>
)

Feed.propTypes = {
	username: PropTypes.string.isRequired,
	toggleComment: PropTypes.func.isRequired,
	article: PropTypes.shape({
		_id: PropTypes.number.isRequired,
		author: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		img: PropTypes.string,
		commentOn: PropTypes.bool.isRequired,
		comments: PropTypes.arrayOf(PropTypes.shape({
			author: PropTypes.string.isRequired,
			commentId: PropTypes.number.isRequired,
			date: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired
		})).isRequired
	})
}

export default connect((state, ownProps)=>{
	return {
		...ownProps,
		username: state.user.username,
		avatars: state.avatars.dict}
	}, (dispatch)=>{
		return {
			toggleComment: (id) =>{
				ToggleComment(id)(dispatch)
			} 
		}
	}
)(Feed)