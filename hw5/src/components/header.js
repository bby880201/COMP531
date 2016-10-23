import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export const HeaderButtons = ({location, onclick})=>(
	<div className="collapse navbar-collapse" id="myNavbar">
		<ul className="nav navbar-nav">
			<li className={location=="MAIN"?"active":""}><a href="#" onClick={(e) => {
				e.preventDefault()
				onclick("MAIN")}}>
			<span className="glyphicon glyphicon-home"></span>Home</a></li>
			</ul>
		<ul className="nav navbar-nav">
			<li className={location=="PROFILE"?"active":""}><a href="#" onClick={(e) => {
			e.preventDefault()
			onclick("PROFILE")}}>
			<span className="glyphicon glyphicon-user"></span>My Profile</a></li>
		</ul>
		<ul className="nav navbar-nav">
			<li><a href="#" onClick={(e) => {
			e.preventDefault()
			onclick("LANDING")}}>
			<span className="glyphicon glyphicon-log-out"></span>Log Out</a></li>
		</ul>
		<form className="navbar-form navbar-right" role="search">
			<div className="form-group input-group">
				<input type="text" className="form-control" placeholder="Search.." />
				<span className="input-group-btn">
					<button className="btn btn-default" type="button">
						<span className="glyphicon glyphicon-search"></span>
					</button>
				</span>
			</div>
		</form>
	</div>
)


export const Header = ({location, navto})=>(
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
			{location!=="LANDING"? <HeaderButtons location={location} onclick={navto}/>:null}
		</div>		
	</nav>
)

Header.propTypes = {
	location: React.PropTypes.oneOf(['MAIN', 'PROFILE', 'LANDING']).isRequired
}

export default connect(
	(state) => {
		return {
			location: state.location
		}
	},
	(dispatch) => {
		return {
			navto: (location) => dispatch({ type: 'TO', location: location})
		}
	}
)(Header)