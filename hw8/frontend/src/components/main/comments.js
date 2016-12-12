import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CommentItem from './commentItem'
import { PutArticle } from './feedAction'

export const Comments = ({artId, username, data, avatars, postCmt})=> {
	let newCmt
	return (
		<div id="cmtTbl" className="table-responsive">
			<hr />
			<table className="table">
				<tbody>
					{data.map((e) => (
						<CommentItem key={e.commentId} artId={artId} 
						data={e} avatar={avatars[e.author]} />
					))}
					<tr className="cmtRow">
						<td className="col-sm-1 pull-left">
							<img src={avatars[username]} className="img center-block" 
							height="32" width="32" alt="Avatar" />
						</td>
						<td className="col-sm-11 text-left">
							<div>
								<input type="text" className="cmtText" placeholder="Post new comment here!" 
								ref={(node)=>newCmt=node} />
								<button type="button" className="btn btn-xs btn-primary cmtPost" onClick={(e)=>
									{
										if (newCmt.value) {
											postCmt(artId, newCmt.value)
										}
										newCmt.value = ''
									}
								}>Post</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

Comments.proptypes = {
	artId: PropTypes.string.isRequired,
	data: PropTypes.arrayOf(PropTypes.shape({
		author: PropTypes.string.isRequired,
		commentId: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	avatars: PropTypes.object.isRequired,
	username: PropTypes.string.isRequired,
	postCmt: PropTypes.func.isRequired
}

export default connect((state) =>{
		return {
			username: state.user.username,
			avatars: state.avatars.dict
		}
	}, (dispatch) => {
		return {
			postCmt: (artId, cmt)=> (PutArticle(artId, cmt, -1)(dispatch))
		}
	}
)(Comments)