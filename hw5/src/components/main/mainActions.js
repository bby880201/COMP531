require("babel-core/register")
require("babel-polyfill")

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource } from '../../serverAccess'

// implement all actions that main pages will use
export const UpdateToServer = (text, type)=>{
	if (!text) {return()=>{}}
	switch(type){
		case 'article':
			return (dispatch) => {
				resource('POST', 'article', {text})
				.then((res)=>{
					dispatch({type: 'ADD_ARTICLE', data: res.articles})
					throw new Error('asd')
				})
				.catch(()=>{
					dispatch({type:'MAIN_ERR', data:'Error occurs when update an article'})
				})
			}

		case 'headline':
			return (dispatch) => {
				resource('PUT', 'headline', { headline:text })
				.then((response) => {
					dispatch({type: 'UPDATE_HEADLINE', data: response})
				})
				.catch(() => {
					dispatch({type:'MAIN_ERR', data:'Error occurs when update your headline'})
				})
			}
	}	
}

export const ToggleComment = (_id) => {
	return (dispatch) => {
		dispatch({type: 'TOGGLE_COMMENT', _id})
	}
}

export const ArticleFilter = (keyWord)=>{
	return (dispatch) => {
		dispatch({type: 'FILTER_ARTICLE', keyWord})
	}
}