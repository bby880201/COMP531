import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { Logout, NavigateTo } from './utilActions'
import { ArticleFilter } from './main/mainAction'

export const HeaderButtons = ({location, navto, logout, search})=>{
	let keyWord
	return(
		<div className="collapse navbar-collapse" id="myNavbar">
			<ul className="nav navbar-nav">
				<li className={location=="MAIN"?"active":""}><a href="#" onClick={(e) => {
					e.preventDefault()
					navto("MAIN")}}>
				<span className="glyphicon glyphicon-home"></span>Home</a></li>
			</ul>
			<ul className="nav navbar-nav">
				<li className={location=="PROFILE"?"active":""}><a href="#" onClick={(e) => {
				e.preventDefault()
				navto("PROFILE")}}>
				<span className="glyphicon glyphicon-user"></span>My Profile</a></li>
			</ul>
			<ul className="nav navbar-nav">
				<li><a href="#" onClick={(e) => {
				e.preventDefault()
				logout()}}>
				<span className="glyphicon glyphicon-log-out"></span>Log Out</a></li>
			</ul>
			<form className="navbar-form navbar-right" role="search">
				<div className="form-group input-group">
					<input type="text" className="form-control" placeholder="Search.." ref={(node)=>{keyWord=node}}/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button" onClick={()=>{
							search(keyWord.value)
							keyWord.value=""
						}}>
							<span className="glyphicon glyphicon-search"></span>
						</button>
					</span>
				</div>
			</form>
		</div>)
}

// a header that can provide different buttons based on locaiton
export const Header = ({location, navto, logout, search})=>(
	<nav className="navbar navbar-inverse navbar-fixed-top">
		<div className="container-fluid">
			<div className="navbar-header">
				<button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
				<a className="navbar-brand" href="#">Ricebook</a>
			</div>
			{location!=="LANDING"? 
				<HeaderButtons location={location} navto={navto} logout={logout} search={search} />
				:null}
		</div>		
	</nav>
)

Header.propTypes = {
	location: PropTypes.oneOf(['MAIN', 'PROFILE', 'LANDING']).isRequired,
	navto: PropTypes.func.isRequired,
	logout: PropTypes.func.isRequired,
	search: PropTypes.func.isRequired
}

export default connect(
	(state) => {
		return {
			location: state.user.location
		}
	},
	(dispatch) => {
		return {
			navto: (location) => (NavigateTo(location)(dispatch)),
			logout: () => (Logout()(dispatch)),
			search: (keyWord) => (ArticleFilter(keyWord)(dispatch))
		}
	}
)(Header)