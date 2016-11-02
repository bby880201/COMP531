const dateFormat = require('dateformat')

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const CommentItem = ({author, avatar, text, date}) => (
	<tr className="cmtRow">
		<td className="col-sm-1 pull-left cmtAvatar">
			<a href="#">
				<img src={avatar} className="img center-block" height="32" width="32" alt="Avatar" />
			</a>
		</td>
		<td className="col-sm-11 text-left">
			<div>
				<span className="cmtAuthor"><a href="#" className="friendList">{author}</a></span>
				<span className="cmtText">{text}</span>
			</div>
			<div className="cmtTs">{dateFormat(new Date(date), "mmmm dS, yyyy")}</div>
		</td>
	</tr>
)

CommentItem.propTypes = {
	author: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
}

export default connect()(CommentItem)