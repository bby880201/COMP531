import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Friends from './friends'
import User from './user'
import Feed from './feed'
import ErrorPanel from '../error'

export const Main = ({feeds, avatars, keyWord, mainErr})=>{
	let newFeeds
	// filter out articles containing key word
	if (keyWord) {
		newFeeds = feeds.filter((e)=>{
			return e.author.search(keyWord)>=0 || e.text.search(keyWord)>=0
		})
	} else {
		newFeeds = feeds
	}
	// sort articles so that newest article appears first
	newFeeds.sort((a,b)=>{
		const keya = a.date
		const keyb = b.date
		return keya>keyb ? -1:1
	})
	return (
		<div className="container text-center">
			<div className="row">
				{mainErr ? <ErrorPanel errMsg={mainErr}	/>:null}
				<div className="col-md-3">
					<User />
					<Friends />
				</div>
				<div className="col-md-9">
				{
					newFeeds.map((val)=>(<Feed key={val._id} article={val} />))
				}
				</div>	
			</div>			
		</div>
	)
}


Main.propTypes = {
	feeds: PropTypes.arrayOf(PropTypes.shape({
		...Feed.propTypes
	}).isRequired).isRequired,
	avatars: PropTypes.object.isRequired,
	keyWord: PropTypes.string,
	mainErr: PropTypes.string
}

export default connect((state)=>{
	return {
		feeds: state.articles.list,
		avatars: state.avatars.dict,
		keyWord: state.articles.keyWord,
		mainErr: state.error.mainErr
	}
})(Main)