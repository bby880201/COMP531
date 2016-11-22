const dateFormat = require('dateformat')

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { NavigateTo } from '../utilActions'
import { ToggleEdit, PutArticle } from './feedAction'

export const CommentItem = ({username, artId, data, avatar, navto, toggleEdit, postCmt}) => {
	const editable = data.editable? data.editable:false
	let newCmt
	return (
		<tr className="cmtRow">
			<td className="pull-left cmtAvatar">
				<a href="#" onClick={(e) => {
					e.preventDefault()
					if (username === data.author) {
						navto("PROFILE")
					}}}>
					<img src={avatar} className="img center-block" 
					height="32" width="32" alt="Avatar" />
				</a>
			</td>
			<td className="text-left">
				{
					editable?
					(<div>
						<textarea className="newpost newCmt" defaultValue={data.text} 
						ref={(node)=>{ newCmt = node }}></textarea>
						<div><a className="pull-right cmtEdit" href="#" onClick={(e)=>{
							e.preventDefault()
							if (newCmt && newCmt.value!==data.text){
								postCmt(artId, newCmt.value, data.commentId)
							}
							toggleEdit(artId, data.commentId)
						}}>Post</a></div>
					</div>)
					:(<div>
						<span className="cmtAuthor">
							<a href="#" className="friendList">{data.author}</a>
						</span>
						<span className="cmtText">{data.text}</span>
						<div>
							<span className="pull-left cmtTs">
								{dateFormat(new Date(data.date), "mmmm dS, yyyy")}
							</span>
							{
								username===data.author?
								<span><a className="cmtEdit" href="#" onClick={(e)=>{
									e.preventDefault()
									toggleEdit(artId, data.commentId)
								}}>Edit</a></span>:null
							}
						</div>
					</div>)
				}
			</td>
		</tr>
	)
}

CommentItem.propTypes = {
	username: PropTypes.string.isRequired,
	artId: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	data: PropTypes.shape({
		author: PropTypes.string.isRequired,
		commentId: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		editable: PropTypes.bool
	}).isRequired,
	navto: PropTypes.func.isRequired,
	toggleEdit: PropTypes.func.isRequired,
	postCmt: PropTypes.func.isRequired
}

export default connect((state)=>{
		return {
			username: state.user.username
		}
	}, (dispatch)=> {
		return {
			navto: (location) => (NavigateTo(location)(dispatch)),
			toggleEdit: (artId, cmtId)=>(ToggleEdit(artId, cmtId)(dispatch)),
			postCmt: (artId, cmt, cmtId)=> (PutArticle(artId, cmt, cmtId)(dispatch))
		}
	}
)(CommentItem)