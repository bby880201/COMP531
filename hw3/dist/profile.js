'use strict'

window.onload = function windowload(argument) {
	// a dict to map each field with its validation function
	var checkFunDict = {
		'status': function(){return true},
		'usrname': checkName,
		'email': checkEmail,
		'phone': checkPhone, 
		'zip': checkZip,
		'pwd': checkPwd
	}
	// get all inputs for update
	var fields = ['status','usrname','email','phone','zip','pwd','pwdcnf']
	var outputs = {}
	var inputs = fields.map((name)=>{
		var updates = document.getElementsByName(name)
		if (updates.length>1) {
			outputs[name] = updates[0]
			return updates[1]
		} else {
			return updates[0]
		}
	})


	var btn = document.getElementById('updatebtn')
	var clear = document.getElementById('clear')

	btn.onclick = function validate() {
		// iterate all update field twice
		// first time check if all updates are valid 
		var applyUpdate
		inputs.every((e) => {
			if (e.value && e.name !== 'pwdcnf') {
				var checkFun = checkFunDict[e.name]
				applyUpdate = checkFun(e.value)
				return applyUpdate
			} else {
				return true
			}
		})

		// iterate second time to apply new values
		if (applyUpdate) {
			inputs.forEach(function (e) {
				var output = outputs[e.name]
				if (output) {
					if (e.value && output.innerHTML !== e.value){
						output.innerHTML = e.value
					}
				}
				e.value = ""
			})
		}
	}

	clear.onclick = () => {
		inputs.forEach((e) => {
			e.value = ''
		})
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

function checkBirth(birth) {
	var age = calculateAge(birth)
	if (age < 18) {
		window.alert('Only users aged 18 or older is allowed.')
		return false
	}
	return true
}