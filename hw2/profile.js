window.onload = function windowload(argument) {
	var btn = document.getElementById('updatebtn')
	var checkFunDict = {
		'name': checkName,
		'email': checkEmail,
		'phone': checkPhone, 
		'zipcode': checkZip,
		'pwd': checkPwd
	}

	btn.onclick = function validate() {
		var fieldList = document.getElementsByName('update')
		var applyUpdate = false
		Array.prototype.every.call(fieldList, function(element) {
			var input = element.getElementsByTagName('input')[0]
			if (input.value && input.name !== 'pwdcnf') {
				console.log(input.value)
				var checkFun = checkFunDict[input.name]
				applyUpdate = checkFun(input.value)
				return applyUpdate
			} else {
				return true
			}
		})

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
	if (input.value !== pwdcnf) {
		window.alert("Your password and confirmation don't match.")
		return false
	}
	return true
}