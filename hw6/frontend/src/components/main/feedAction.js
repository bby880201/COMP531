require("babel-core/register")
require("babel-polyfill")

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource, resourceForImg } from '../../serverAccess'

export const ToggleComment = (_id) => {
	return (dispatch) => {
		dispatch({type: 'TOGGLE_COMMENT', _id})
	}
}

export const PutArticle = (artId, text, commentId=null) => {
	return (dispatch) => {
		const payload = commentId?{text, commentId}:{text}
		console.log(artId, text, payload)
		resource('PUT', 'articles/'+artId, payload)
		.then((res)=>{
			console.log(res)
			const data = res.articles[0]
			data.commentOn = commentId?true:false
			dispatch({type: 'ADD_ARTICLE', data})
		})
		.catch((err)=>{
			const msg = commentId?'Server error '+err.message+' when posting a comment'
			:'Server error '+err.message+' when posting an article'
			dispatch({type:'MAIN_ERR', data:msg})
		})
	}
}

export const ToggleEdit = (_id, commentId)=>{
	return (dispatch)=>{
		dispatch({type:'TOGGLE_EDIT', data:{_id, commentId}})
	}
}