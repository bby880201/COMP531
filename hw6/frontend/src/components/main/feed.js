const dateFormat = require('dateformat')

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Comments from './comments'
import { ToggleEdit, PutArticle, ToggleComment } from './feedAction'
import { NavigateTo } from '../utilActions'

export const NameTag = ({username, author, avatar, time, navto})=> (
	<div className="well contentAvatar">
		<p><a href="#" onClick={(e) => {
				e.preventDefault()
				if (username === author) {
					navto("PROFILE")
				}}}>
			<img src={avatar} className="img" height="55" width="55" alt="Avatar" />
		</a></p>
		<p><a href="#" className="friendList" onClick={(e) => {
				e.preventDefault()
				if (username === author) {
					navto("PROFILE")
				}}}>{author}</a></p>
		<p className="articalTS">{dateFormat(new Date(time),"mmmm dS, yyyy")}</p>
	</div>
)

// a feed card that contains an article and its comments
export const Feed = ({article, avatars, username, toggleComment, navto, toggleEdit, postArticle})=>{
	let newArticle
	return (
		<div className="row">
			<div className="col-sm-3">
				<NameTag author={article.author} username={username} navto={navto}
				 avatar={avatars[article.author]} time={article.date} />
			</div>
			<div className="col-sm-9">
				<div className="well text-left contentArtical">
					{article.img? <p><img src={article.img} className="img-responsive center-block" /></p> : null}
					{
						article.editable?
						(<div className="newpost artEdit" 
						suppressContentEditableWarning={true}
						contentEditable={true}
						ref={(node)=>{ newArticle = node }}>
							{article.text}
						</div>)
						:(<div className="feed">{article.text}</div>)
					}
					<div className="articleBtns">
						<div className="pull-right">
							{
								article.editable?
								<button type="button" className="btn btn-default btn-sm feedEditBtn"
								onClick={(e)=>{
									e.preventDefault()
									if (newArticle && newArticle.innerText!==article.text){
										postArticle(article._id, newArticle.innerText)
									}
									toggleEdit(article._id)
								}}>Post</button>:null
							}
							{
								article.author===username?
								<button type="button" className="btn btn-default btn-sm feedEdit"
								onClick={()=>toggleEdit(article._id)}>Edit</button>:null
							}
							<button type="button" className="btn btn-default btn-sm" 
							onClick={()=>(toggleComment(article._id))}>Comment</button>
						</div>
					</div>
					{article.commentOn?<Comments artId={article._id} data={article.comments} />:null}
				</div>
			</div>
		</div>
	)
}

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
		})).isRequired,
		editable: PropTypes.bool
	}),
	navto: PropTypes.func.isRequired,
	toggleEdit: PropTypes.func.isRequired,
	postArticle: PropTypes.func.isRequired
}

export default connect((state, ownProps)=>{
	return {
		...ownProps,
		username: state.user.username,
		avatars: state.avatars.dict}
	}, (dispatch)=>{
		return {
			toggleComment: (id) =>(ToggleComment(id)(dispatch)),
			navto: (location) => (NavigateTo(location)(dispatch)),
			toggleEdit: (artId)=>(ToggleEdit(artId)(dispatch)),
			postArticle: (artId, article)=> (PutArticle(artId, article)(dispatch))
		}
	}
)(Feed)