import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const NameTag = ({author, avatar, time})=> (
	<div className="well contentAvatar">
		<p><a href="#">
			<img src={avatar} className="img-rounded" height="55" width="55" alt="Avatar" />
		</a></p>
		<p><a href="#" className="friendList">{author}</a></p>
		<p className="articalTS">{time}</p>
	</div>
)

export const Feed = ({author, avatar, time, content, contentImgs, username})=>(
	<div className="row">
		<div className="col-sm-3">
			<NameTag author={author} avatar={avatar} time={time} />
		</div>
		<div className="col-sm-9">
			<div className="well text-left contentArtical">
				{contentImgs.map((url, idx)=>(<p key={idx}><img src={url} className="img-responsive center-block" /></p>))}
				<p>{content}</p>
				<div className="articleBtns">
					<div className="pull-right">
						<button type="button" className="btn btn-default btn-sm">
							<span className="glyphicon glyphicon-thumbs-up"></span> Like
						</button>
						<button type="button" className="btn btn-default btn-sm">Comment</button>
						{author===username?<button type="button" className="btn btn-default btn-sm">Edit</button>:null}
					</div>
				</div>
			</div>
		</div>
	</div>
)

Feed.propTypes = {
	username: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,
	time: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	contentImgs: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
}

export default connect(
	(state, ownProps)=>{
		return {
			...ownProps,
			username: state.user.username
		}
	}
	)(Feed)