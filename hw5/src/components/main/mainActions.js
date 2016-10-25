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
				})
				.catch(()=>{
					dispatch({type:'MAIN_ERR', data:'Error occurs when post an article'})
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

export const filterAndSort = (keyWord, feeds)=> {
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
	return newFeeds
}