'use strict'

window.onload = function windowload(argument) {
	var cancel = document.getElementById('cancelPost')
	var arti = document.getElementById('newPost')

	cancel.onclick = () => {
		arti.value = ""
	}
}