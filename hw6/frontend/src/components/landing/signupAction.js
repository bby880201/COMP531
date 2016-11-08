import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { resource } from '../../serverAccess'

export const Register = (form) => {
	return (dispatch) => {
		const username = form.elements.namedItem('account').value
		const email = form.elements.namedItem('email').value
		const dob = form.elements.namedItem('dob').value
		const zipcode = form.elements.namedItem('zip').value
		const password = form.elements.namedItem('pwd').value
		const payload = {username, email, dob, zipcode, password}

		if (validate(form, dispatch)) {
			resource('POST', 'register', payload)
			.then((response) => {
				console.log(response)
				dispatch({type: "SIGNUP_ERR", data:{server: 'Register success but can\'t log in'}})
				form.reset()
			}).catch((err) => {
				dispatch({type: "SIGNUP_ERR", data:{server: 'Register failed at server end'}})
			})
		}
	}
}

// validate all fields before submit forms to server
const validate = (form, dispatch)=>{
	let flag = true
	let err = {}

	const accountPattern = /^[a-zA-z][0-9a-zA-z]*$/g
	const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g
	const phonePattern = /^\d{3}-\d{3}-\d{4}$/g
	const zipPattern = /^\d{5}$/g
	const dob = form.elements.namedItem('dob').value
	const pwd = form.elements.namedItem('pwd').value
	const pwdcnf = form.elements.namedItem('pwdcnf').value 

	if (!accountPattern.test(form.elements.namedItem('account').value)) {
		err['account'] = 'Account name can only be upper or lower case letters and numbers, but may not start with a number'
		flag = false
	} else if (!emailPattern.test(form.elements.namedItem('email').value)) {
		err['email'] = 'Email address should follow pattern like "abc@xyz.com"'
		flag = false
	} else if (!phonePattern.test(form.elements.namedItem('phone').value)) {
		err['phone'] = 'Phone number should be in ###-###-#### format'
		flag = false
	} else if (!dob || calculateAge(dob)<18) {
		err['dob'] = 'Only users aged 18 or older on the date of registration are valid'
		flag = false
	} else if (!zipPattern.test(form.elements.namedItem('zip').value)) {
		err['zip'] = 'Zipcode should be composed by five digits'
		flag = false
	} else if (!pwd) {
		err['pwd'] = 'Please set a password'
		flag = false
	} else if (pwd !== pwdcnf) {
		err['pwdcnf'] = 'The password and confirmation are not matched'
		flag = false
	}

	if (!flag) {
		dispatch({type: "SIGNUP_ERR", data:err})
	}

	return flag
}

const calculateAge = (birthday)=>{
	var today = new Date()
	var birthDate = new Date(birthday)
	var age = today.getFullYear() - birthDate.getFullYear()
	var m = today.getMonth() - birthDate.getMonth()
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--
	}
	return age
}

