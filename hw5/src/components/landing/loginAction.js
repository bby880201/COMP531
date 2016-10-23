require("babel-core/register")
require("babel-polyfill")

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { url, resource } from '../../serverAccess'

export const PostLogin = (username, password) => {
	if (username && password) {
		return (dispatch) => {
			resource('POST', 'login', { username, password })
			.then((response) => {
				initialVisit(username, dispatch)
			}).catch((err) => {
				// dispatch(updateError(`There was an error logging in as ${username}`))
			})
		}
	} else {
		return (dispatch) => {
			dispatch({type: "LOGIN_MISS_CRED"})
		}
	}
}

const initialVisit = async (username, dispatch) => {
	// GET /articles/{id}
	// GET /headlines/{users}
	// GET /avatars/{users}
	// GET /following/:user?
	let data = await Promise.all([

	resource('GET', '/following/'+username)
	.done(async (res) => {
		const users = [...res.following, username]
		const [headlines, avatars] = await Promise.all([
			
			resource('GET','/headlines/'+users)
			.then((hRes)=>{
			console.log(hRes)
			return hRes}),

			resource('GET','/avatars/'+users)
			.then((aRes)=>{
			console.log(aRes)
			return aRes
		})]) 
	}),

	resource('GET', '/articles/'+username)
	.then((res)=>{
		console.log(res)
		return res
	})])

	console.log(data)

	return {user: {
		username:'Eddard Stark',
		avatar:'img/avatars/gundam00.jpg',
		headline:'I\'m Building Facebook Jr.',
		email:'abc@xyz.com',
		phone:'666-666-6666',
		birthday:'1988-12-08',
		zipcode:12345
	},
	friendList:[{name:'Eddard Stark', headline:'Winter is comming', avatar:'img/avatars/stark_sigil.png'},
	{name:'Eddard Stark', headline:'Winter is comming', avatar:'img/avatars/stark_sigil.png'},
	{name:'Eddard Stark', headline:'Winter is comming', avatar:'img/avatars/stark_sigil.png'}],
	feedList: 
	[{author:'Eddard Stark', avatar:'img/avatars/stark_sigil.png', time:'Sep 17 2016 10:18:58', 
	content:'The Undercity is the capital city of the Forsaken undead of the Horde. It is located in Tirisfal Glades, at the northern edge of the Eastern Kingdoms. Far beneath the ruined capital city of Lordaeron, the royal crypts have been turned into a bastion of evil and undeath. Originally intended by Prince Arthas to be the Scourge\'s seat of power, the budding "Undercity" was abandoned when Arthas was recalled to aid the Lich King in distant Northrend. In Arthas\'s absence, the Dark Lady, Sylvanas Windrunner, led the rebel Forsaken to the Undercity, and claimed it for her own. Since taking up residence, the Forsaken have worked to complete the Undercity\'s construction by dredging the twisted maze of catacombs, tombs, and dungeons that Arthas began.',
	contentImgs:['http://vignette4.wikia.nocookie.net/gameofthrones/images/5/5c/Eddard_1x01.jpg']}]	}
}