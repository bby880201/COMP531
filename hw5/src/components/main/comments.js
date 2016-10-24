import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import CommentItem from './commentItem'

export const Comments = ({data, avatars})=>(
	<div className="table-responsive">
		<hr />
		<table className="table">
			<tbody>
			{data.map((e) => (
				<CommentItem key={e.commentId} author={e.author} 
				avatar={avatars[e.author]} text={e.text} date={e.date} />
			))}
			</tbody>
		</table>
	</div>
)

Comments.proptypes = {
	data: PropTypes.arrayOf(PropTypes.shape({
		author: PropTypes.string.isRequired,
		commentId: PropTypes.number.isRequired,
		date: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired
	})).isRequired,
	avatars: PropTypes.object.isRequired
}

export default connect((state) =>{
	return {
		avatars: state.avatars.dict
	}
})(Comments)