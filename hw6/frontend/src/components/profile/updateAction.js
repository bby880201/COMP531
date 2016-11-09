import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource, resourceForImg } from '../../serverAccess'

// for update changable information of user, will update one by one
export const Update = (fields)=>{
	return (dispatch)=>{
		const email = fields.email.value
		if (email && checkEmail(email, dispatch)) {
			resource('PUT', 'email', {email})
			.then((res) => {
				dispatch({type: "UPDATE_INFO", data: {email: res.email}})
			})
			.catch((err) => {
				dispatch({type: "PROFILE_ERR", data: {update: 'Email update failed at server end: '+err.message}})
			})
		}

		const zipcode = parseInt(fields.zip.value)
		if (zipcode && checkZipcode(zipcode, dispatch)) {
			resource('PUT', 'zipcode', {zipcode})
			.then((res)=>{
				console.log(res)
				dispatch({type: "UPDATE_INFO", data: {zipcode: res.zipcode}})
			})
			.catch((err) => {
				dispatch({type: "PROFILE_ERR", data: {update: 'Zipcode update failed at server end: '+err.message}})
			})
		}

		const password = fields.pwd.value
		const pwdcnf = fields.pwdcnf.value
		if (password && checkPwd(password, pwdcnf,dispatch)) {
			resource('PUT', 'password', {password})
			.then((res)=>{
				console.log(res)
				dispatch({type: "PROFILE_ERR", 
					data: {update: 'Password update success but server side will not change'}})

			})
			.catch((err) => {
				dispatch({type: "PROFILE_ERR", data: {update: 'Password update failed at server end: '+err.message}})
			})
		}
	}
} 

export const Clear = (fields) => {
	return ()=>{
		Object.keys(fields).forEach((k)=> {
			fields[k].value = ''
		})
	}	
}

// for update user's avatar
export const UpdateAvatar = (input) => {
	return (dispatch) => {
		const img = input.files[0]
		if (img) {
			const fd = new FormData()
			fd.append('image', img)
			resourceForImg('PUT', 'avatar', fd)
			.then((res) => {
				const data = {avatars:{}}
				data.avatars[res.username] = res.avatar
				dispatch({type: 'UPDATE_AVATAR', data})
			})
			.catch((err) => {
				dispatch({type: 'PROFILE_ERR', 
					data: {update: 'avatar update failed at server end'}})
			})
		}
	}
}

const checkEmail = (email, dispatch) => {
	const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g
	const flag = emailPattern.test(email)
	if (!flag) {
		dispatch({type: "PROFILE_ERR", data:{update:'Email address is invalid'}})
	}
	return flag
}

const checkZipcode = (zipcode, dispatch) =>{
	const zipPattern = /^\d{5}$/g	
	const flag = zipPattern.test(zipcode)
	if (!flag) {
		dispatch({type: "PROFILE_ERR", data:{update:'Zipcode is invalid'}})
	}
	return flag
}

const checkPwd = (pwd, cnf, dispatch) => {
	if (pwd!==cnf) {
		dispatch({type: "PROFILE_ERR", 
			data:{update:'Password and confirmaiton are not matched'}})
	}
	return pwd===cnf
}