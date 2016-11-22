require("babel-core/register")
require("babel-polyfill")

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource, resourceForImg } from '../../serverAccess'

// implement all actions that main pages will use
export const UpdateToServer = (text, type, img)=>{
	if (!text) {return()=>{}}
	switch(type){
		case 'article':
			return (dispatch) => {
				console.log(img)
				let p
				if (!img) {
					p = resource('POST', 'article', {text})
					
				} else {
					const fd = new FormData()
					fd.append('text', text)
					fd.append('image', img)
					console.log(fd)
					p = resourceForImg('POST', 'article', fd)
				}
				p.then((res)=>{
					const data = res.articles[0]
					data.commentOn = false
					dispatch({type: 'ADD_ARTICLE', data})
				})
				.catch((err)=>{
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

export const ArticleFilter = (keyWord)=>{
	return (dispatch) => {
		dispatch({type: 'FILTER_ARTICLE', keyWord})
	}
}

export const FilterAndSort = (keyWord, feeds)=> {
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

export const RemoveFriend = (id) => {
	return (dispatch) =>{
		resource('DELETE', 'following/'+id)
		.then((res) => {
			const data = {}
			data.friends = res.following.map((name,id)=>({id,name}))
			dispatch({type: 'UPDATE_FRIEND', data})
		})
		.catch(() => {
			dispatch({type:'FRIEND_ERR', data:'Error occurs when delete your friend ' + id})
		})
	}
}

// for add a new friend to user's friend list, and update avatar/headline of that user
export const AddFriend = (id) => {
	return (dispatch) => {
		if (id) {
			Promise.all([
				resource('PUT', 'following/'+id),
				resource('GET','headlines/'+id),
				resource('GET','avatars/'+id)
			])
			.then((res)=>{
				if (res[1].headlines.length === 0) {
					throw new Error('Can\'t find user: ' + id)
				}
				dispatch({type: 'UPDATE_HEADLINE', data:res[1].headlines[0]})

				let data = {avatars:{}}
				data.avatars[res[2].avatars[0].username] = res[2].avatars[0].avatar
				dispatch({type: 'UPDATE_AVATAR', data})

				data = {}
				data.friends = res[0].following.map((name,id)=>({id,name}))
				dispatch({type: 'UPDATE_FRIEND', data})
			})
			.catch((err) => {
				console.log(err)
				dispatch({type:'FRIEND_ERR', data:err.message})
			})
		}
	}
}