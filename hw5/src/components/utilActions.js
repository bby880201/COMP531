import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource } from '../serverAccess'

// this action is to logout from both server and local
export const Logout = () => {
	return (dispatch)=>{
		resource('PUT', 'logout')
		.then(()=>{
			dispatch({type:'LOGOUT'})
		})
		.catch((err)=>{
			console.error(err)
			dispatch({type:'LOGOUT'})
			dispatch({type:'LOGOUT_ERR', data:err})
		})
	}
}

// handle all page directing action
export const NavigateTo = (location) => {
	return (dispatch)=>{
		dispatch({ type: 'TO', location: location})}
}

// reset error messages
export const ClearError = () => {
	return (dispatch)=>{
		dispatch( { type:'ERR_CLEAR' } )
	}
}