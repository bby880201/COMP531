'use strict'

window.onload = function windowload(argument) {
	// a dict to map each field with its validation function
	var checkFunDict = {
		'name': checkName,
		'email': checkEmail,
		'phone': checkPhone, 
		'zipcode': checkZip,
		'pwd': checkPwd
	}

	var btn = document.getElementById('updatebtn')
	btn.onclick = function validate() {
		var fieldList = document.getElementsByName('update')
		var applyUpdate = false

		// iterate all update field twice
		// first time check if all updates are valid 
		Array.prototype.every.call(fieldList, function(element) {
			var input = element.getElementsByTagName('input')[0]
			if (input.value && input.name !== 'pwdcnf') {
				var checkFun = checkFunDict[input.name]
				applyUpdate = checkFun(input.value)
				return applyUpdate
			} else {
				return true
			}
		})

		// iterate second time to apply new values
		if (applyUpdate) {
			var msg = "Update succeed!\n"
			fieldList.forEach(function (element) {
				var input = element.getElementsByTagName('input')[0]
				if (input.name !== "pwdcnf") {
					output = element.children.namedItem('output')
					if (input.value && output.innerHTML !== input.value){
						msg += input.name + " is changed from " + output.innerHTML + " to " + input.value + "\n"
						output.innerHTML = input.value
					}
				}
				input.value = ""
			})
			window.alert(msg)
		}
	}
}

// validation functions for each field
function checkName(name) {
	var pattern = /^[a-zA-z][0-9a-zA-z]+$/g
	if (!pattern.test(name)) {
		window.alert("Your name can only be upper or lower case letters and numbers, but may not start with a number.")
		return false
	}
	return true
}

function checkEmail(email) {
	var pattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/g
	if (!pattern.test(email)) {
		window.alert("Your email address is invalid, please correct it before update.")
		return false
	}
	return true
}

function checkPhone(phone) {
	var pattern = /^\d{3}-\d{3}-\d{4}$/g
	if (!pattern.test(phone)) {
		window.alert("Your phone number is in invalid format, please input it in ###-###-#### form.")
		return false
	}
	return true
}

function checkZip(zip) {
	var pattern = /^\d{5}$/g
	if (!pattern.test(zip)) {
		window.alert("Your zipcode is invalid, only five digits zipcode is needed.")
		return false
	}
	return true
}

function checkPwd(pwd) {
	var pwdcnf = document.getElementsByName('pwdcnf')[0].value
	if (pwd !== pwdcnf) {
		window.alert("Your password and confirmation don't match.")
		return false
	}
	return true
}