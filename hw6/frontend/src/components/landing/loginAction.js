require("babel-core/register")
require("babel-polyfill")

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource } from '../../serverAccess'

// login from local browser, and get all necessary before dispatch next action
export const LocalLogin = (username, password) => {
	if (username && password) {
		return (dispatch) => {
			resource('POST', 'login', { username, password })
			.then((response) => {
				initialVisit(username, dispatch)
				getMinorInfo(username, dispatch)
			}).catch((err) => {
				dispatch({type: "LOGIN_ERR", data:'Username or password is wrong'})
			})
		}
	} else {
		return (dispatch) => {
			dispatch({type: "LOGIN_ERR", data:'Username or password is missing'})
		}
	}
}

const makeDict = (list, key) => {
	const dict = {}
	if (list) {
		list.forEach((e)=>{
			dict[e.username] = e[key]
		})
	}
	return dict
}

// fetech all necessary data in parallel to save time
const initialVisit = (username, dispatch) => {

	resource('GET', 'following/'+username)
	.then((res) => {
		const users = [...res.following, username].join()
		Promise.all([
			
			resource('GET','headlines/'+users)
			.then((res)=>(makeDict(res.headlines,'headline'))),

			resource('GET','avatars/'+users)
			.then((res)=>(makeDict(res.avatars,'avatar'))),

			resource('GET', 'articles/')
			.then((res)=>(res.articles.map((e)=>({...e, commentOn: false}))))
		])
		.then((tmp)=>{
			const friends = {n: res.following.length, 
				list: res.following.map((name,id)=>{return {id,name}})}
			getCommentAvatars(tmp[2])
			.then((res)=>(dispatch({type: 'UPDATE_AVATAR', data:{avatars:res}})))
			dispatch({type: 'LOGIN', data:{
				headlines: tmp[0], avatars:tmp[1], 
				articles: tmp[2], friends, username, keyWord:''}
		})})
	})
	.catch((err)=>{
		console.log(err.message)
		dispatch({type: 'LOGIN_ERR', data: 'Failed to get your data, try login later'})
	})	
}

// fetch less important data separately and dont' block login
const getMinorInfo = (username, dispatch)=>{
	Promise.all([

	resource('GET', 'email/'+username)
	.then((res)=>{
		return res.email
	})
	.catch(()=>{
		return null
	}),
	
	resource('GET', 'zipcode/'+username)
	.then((res)=>{
		return res.zipcode
	})
	.catch(()=>{
		return null
	}),

	resource('GET', 'dob')
	.then((res)=>{
		return res.dob
	})
	.catch(()=>{
		return null
	})])
	.then(([email, zipcode, birthday])=>{
			dispatch({type: "UPDATE_INFO", data: {email, zipcode, birthday}})
		}
	)
}

const getCommentAvatars = (articles) =>{
	if (!articles) {
		return null
	}

	const authors = new Set()
	articles.forEach((e) => {
		e.comments.forEach((cmt) => {
			authors.add(cmt.author)
		})
	})

	return resource('GET', 'avatars/'+[...authors].join())
	.then((res)=>(makeDict(res.avatars,'avatar')))
}