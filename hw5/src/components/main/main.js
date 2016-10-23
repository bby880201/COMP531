import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Friends from './friends'
import User from './user'
import Feed from './feed'

export const Main = ({feeds})=>(
	<div className="container text-center">
		<div className="row">
			<div className="col-md-3">
				<User />
				<Friends />
			</div>
			<div className="col-md-9">
			{
				feeds.map((val,idx)=>(<Feed key={idx} author={val.author} avatar={val.avatar} time={val.time} content={val.content} contentImgs={val.contentImgs} />))
			}
			</div>	
		</div>			
	</div>
)

Main.propTypes = {
	feeds: PropTypes.arrayOf(PropTypes.shape({
        ...Feed.propTypes
    }).isRequired).isRequired
}


export default connect((state)=>{
	return {
		feeds: state.feedList
	}
})(Main)