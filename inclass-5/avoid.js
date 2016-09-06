window.onload = function () {
	var play = document.getElementById('playbtn')
	var isWon = false
	reset()


	play.onclick = function () {
		if (!isWon) {
			play.className = 'afterclick'
			play.innerHTML = 'Paly Again'
			play.removeEventListener('mouseover', mouseoverHandler)
			document.getElementById('msg').style.display = "block";
			isWon = true
		} else {
			reset()
			isWon = false
		}
	
	}
}

function reset () {
	var play = document.getElementById('playbtn')
	play.className = 'button'
	play.innerHTML = 'Click Me'
	play.style.position = 'absolute'
	play.style.left = 10 + 'px'
	play.style.top = 10 + 'px'
	play.addEventListener('mouseover', mouseoverHandler, false)
	document.getElementById('msg').style.display = "none";

}

function mouseoverHandler (e) {
	var play = document.getElementById('playbtn')
	if (!e) {
		e = window.event;
	}
	if (!e.shiftKey) {
		var w = window.innerWidth - 120;
		var h = window.innerHeight - 40;
		var buttonH = Math.floor(Math.random() * h);
		var buttonW = Math.floor(Math.random() * w);
		play.style.position = 'absolute'
		play.style.left = buttonW + 'px'
		play.style.top = buttonH + 'px'
	}
}