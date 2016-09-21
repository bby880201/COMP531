'use strict'
window.onload = function windowload() {

	var signUpBtn = document.getElementById('signUp')
	signUpBtn.onclick = () => {
		 return validateForm()
	}

	function validateForm(form) {
		if (!form) {
			form = document.getElementById('signUpForm')
		}

		// page loaded timestamp is required
		if (!form.elements.namedItem('loadedTime').value) {
			window.alert("Invalid timestamp, please reload page!")
			return false
		}

		// account name can only be upper or lower case letters and numbers, but may not start with a number
		var accountNamePattern = /^[a-zA-z][0-9a-zA-z]+$/g
		if (!accountNamePattern.test(form.elements.namedItem('accountName').value)) {
			console.log(form.elements.namedItem('accountName').value)
			window.alert("Account name can only be upper or lower case letters and numbers, but may not start with a number.")
			return false
		}

		// password and confirmation should be exactly same
		if (form.elements.namedItem('password').value !== form.elements.namedItem('pwdcnf').value) {
			console.log(form.elements.namedItem('password').value, form.elements.namedItem('pwdcnf').value)
			window.alert("Password and confirmation don't match!")
			return false
		}

		// check if under 18
		if (calculateAge(form.elements.namedItem('birthday').value) < 18) {
			console.log(form.elements.namedItem('birthday').value)
			window.alert('Only users aged 18 or older on the date of registration are valid.')
			return false
		}

		return true
	}

	function calculateAge(birthday) {
		var today = new Date()
		var birthDate = new Date(birthday)
		var age = today.getFullYear() - birthDate.getFullYear()
		var m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--
		}
	    return age
    }

	function getTime(element) {
		element.value = Date.now()
	}

	var loginBtn = document.getElementById('login')
	loginBtn.onclick = () => {
		var usrName = document.getElementById('loginUsr').value
		var pwd = document.getElementById('loginPwd').value

		if (!usrName) {
			window.alert('Please enter your account name')
			return false
		}

		if (!pwd) {
			window.alert('Please enter your password')
			return false
		}

		window.location='main.html'
		return true
	}

	getTime(document.getElementById('loadedTime'))
}