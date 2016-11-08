import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Friends from './friends'
import User from './user'
import Feed from './feed'
import ErrorPanel from '../error'
import { FilterAndSort } from './mainAction'

export const Main = ({feeds, avatars, mainErr})=>(
	<div className="container text-center">
		<div className="row">
			{mainErr ? <ErrorPanel errMsg={mainErr}	/>:null}
			<div className="col-md-3">
				<User />
				<Friends />
			</div>
			<div className="col-md-9">
			{
				feeds.map((val)=>(<Feed key={val._id} article={val} />))
			}
			</div>	
		</div>			
	</div>
)

Main.propTypes = {
	feeds: PropTypes.arrayOf(PropTypes.shape({
		...Feed.propTypes
	}).isRequired).isRequired,
	avatars: PropTypes.object.isRequired,
	mainErr: PropTypes.string
}

export default connect((state)=>{
	return {
		feeds: FilterAndSort(state.articles.keyWord, state.articles.list),
		avatars: state.avatars.dict,
		mainErr: state.error.mainErr
	}
})(Main)