'use strict'

;window.onload = function windowLoad() {
	// cache images and other elements for game use
	const rotatedImgs = {}
	const imgs = Array.from(Array(3)).map((e,i)=>{
		var img = new Image()
		img.onload = ()=>{
			rotatedImgs[i] = rotate(img)
		}
		return img
	})
	imgs[0].src = 'img/rat.png'
	imgs[1].src = 'img/rat2.png'
	imgs[2].src = 'img/cat.png'

	const playBtn = document.getElementById('play')
	const msg = document.getElementById('msg')
	const canvas = document.querySelector("canvas")

	const stats = {score:document.getElementById('score'), left:document.getElementById('left'),
	missed:document.getElementById('missed'),caught:document.getElementById('caught'),
	rtime:document.getElementById('reaction'),level:document.getElementById('level')}
	const game = newGame(canvas, rotatedImgs, stats, msg)

	playBtn.onclick = () => {
		playBtn.innerHTML = 'Try Again'
		game.reset(true)
		game.start()
	}


	canvas.addEventListener('click', game.catchThem, false)
}

const newGame = function (canvas, imgs, statDivs, msg) {
	const c = canvas.getContext("2d");
	const borders = {l:0, r: canvas.width, t:0, b: canvas.height}
	const range = {l:{x:[0,0],y:[150,canvas.height-150], img:0}, r:{x:[canvas.width,canvas.width],y:[150,canvas.height-150], img:2},
	t:{x:[150,canvas.width-150], y:[0,0], img:1}, b:{x:[150,canvas.width-150], y:[canvas.height,canvas.height], img:3}}

	var stats = {score:0, left:10, missed:0, caught:0, rtime:0,level:1}
	var itvs = []
	var rats = []
	var cats = []
	var frameId = 0

	// reset game state to default
	const reset = function (cleanStats) {
		itvs.forEach((i)=>{
			clearInterval(i)
		})
		cancelAnimationFrame(frameId)
		c.clearRect(0, 0, canvas.width, canvas.height);
		itvs = []
		rats = []
		cats = []
		msg.parentElement.style.display = 'none'
		if (cleanStats) {
			stats = {score:0, left:10, missed:0, caught:0, rtime:0,level:1}
		}
		update()
	}

	// a 3s count down that allow player to prepare before game starting
	const start = function () {
		msg.innerHTML = '1'
		msg.parentElement.style.display = 'block'
		var cdItv = setInterval(()=>{
			msg.innerHTML--
			if (msg.innerHTML<0){
				msg.parentElement.style.display = 'none'
				clearInterval(cdItv)
				startGame()
			}
		},1000)
		itvs.push(cdItv)
	}

	const startGame = function () {
		itvs.push(setInterval(()=>{
			if (rats.length<stats.level+2 && (randInt(0,100)>90 || rats.length===0)) {
				rats.push(spawn('rat'))
			}
			if (stats.level>3 && cats.length<stats.level-3 && randInt(0,100)>98) {
				cats.push(spawn('cat'))
			}
		}, 100))

		itvs.push(setInterval(()=>{
			ratMove()
			catMove()
		}, 50))

		frameId = requestAnimationFrame(function cb(){
			repaint()
			requestAnimationFrame(cb)
		})
	}

	const spawn = function (type) {
		const startBd = Object.keys(range)[randInt(0,3)]
		const startPosRange = range[startBd]
		var x = randInt(startPosRange.x[0], startPosRange.x[1])
		var y = randInt(startPosRange.y[0], startPosRange.y[1])
		var {vx,vy} = getV(x, y, startBd, stats.level)
		var bonus = false
		var img

		switch (type) {
			case 'cat':
				img = imgs[2][startPosRange.img]
				if (x>=canvas.width-150-img.width) {
					x-=img.width
				}
				if (y>=canvas.height-150-img.height) {
					y-=img.height
				}
				return {img, x, y, vx, vy, out:false, time:0}
			case 'rat':
			default:
				if (randInt(0,100)<10) {
					img = imgs[1][startPosRange.img]
					vx = Math.floor(1.5*vx)
					vy = Math.floor(1.5*vy)
					bonus = true
				} else {
					img = imgs[0][startPosRange.img]
				}
				return {img, x, y, vx, vy, out:false, time:0, bonus}
		}
	}

	const ratMove = function () {
		rats.forEach((r)=>{
			r.x+=r.vx
			r.y+=r.vy
			r.time+=100
			if (r.x<borders.l-r.img.width || r.x>borders.r 
				|| r.y<borders.t-r.img.height || r.y>borders.b) {
				stats.missed+=1
				stats.score-=r.time
				r.out = true
				update()
			}
		})
	}

	const catMove = function () {
		cats.forEach((cat)=>{
			cat.x+=cat.vx
			cat.y+=cat.vy
			if (cat.x<borders.l){
				cat.img = imgs[2][0]
				cat.vx*=-1
			} else if (cat.x>borders.r-cat.img.width) {
				cat.img = imgs[2][2]
				cat.vx*=-1
			}
			if (cat.y<borders.t) {
				cat.img = imgs[2][1]
				cat.vy*=-1
			} else if (cat.y>borders.b-cat.img.height) {
				cat.img = imgs[2][3]
				cat.vy*=-1
			}
		})
	}

	const catchThem = function (event) {
		var {x,y} = relMouseCoords(canvas, event)
		const checkHit = function (element) {
			return y>=element.y && y<=element.y+element.img.height && x>=element.x && x<=element.x+element.img.width
		}
		cats.forEach((e)=>{
			if (checkHit(e)) {
				stats.score-=10000
				update()
			}
		})
		rats.forEach(function(e) {
			if (checkHit(e)) {
				e.out = true
				var s = Math.floor(100000/e.time) * 100
				e.bonus?stats.score+=s*2:stats.score+=s
				stats.rtime+=e.time
				stats.caught+=1
				if (stats.left>1){
					stats.left-=1
				} else {
					levelUp()
				}
				update()
			}
		})
	}

	const update = function () {
		Object.keys(stats).forEach((s)=>{
			statDivs[s].innerHTML = stats[s]
		})
		if (stats.score<0) {
			gameOver(false)
		}
		if (stats.score>1000000) {
			gameOver(true)
		}
	}

	const repaint = function () {
		c.clearRect(0, 0, canvas.width, canvas.height);
		rats = rats.filter((r)=>{
			if (r.out) {
      			return false
			} else {
				c.drawImage(r.img, r.x, r.y)
				return true
			}
		})
		cats.forEach((cat)=>{
			c.drawImage(cat.img, cat.x, cat.y)
		})
	}

	const gameOver = function (win) {
		if (win){
			msg.innerHTML = 'You Win!'
		} else {
			msg.innerHTML = 'You Lose!'
		}
		msg.parentElement.style.display = 'block'
		setTimeout(()=>{
			reset(false)
		},2000)
	}
	const levelUp = function () {
		if (stats.level<5) {
			stats.level+=1
			stats.left = stats.level*5+5
			reset(false)
			msg.innerHTML = 'Level up, Congrats!';
			msg.parentElement.style.display = 'block'
			setTimeout(()=>{
				start()
			},1000)
		} else {
			stats.left = 0
		}
	}

	update()

	return {
		reset,
		start,
		catchThem
	}
}

const rotate = function(img) {
	const angles = [0,90,180,270]
	var diffAngles = []

	angles.forEach((ang)=>{
		diffAngles.push(rotateAndCache(img,ang))
	})
	return diffAngles
}

const rotateAndCache = function(image,angle) {
	var offscreenCanvas = document.createElement('canvas')
	var offscreenCtx = offscreenCanvas.getContext('2d')

	var size = Math.max(image.width, image.height)
	offscreenCanvas.width = size
	offscreenCanvas.height = size

	offscreenCtx.translate(size/2, size/2)
	if (angle===180) {
		offscreenCtx.scale(-1,1)
	} else if (angle===90||angle===270){
		offscreenCtx.rotate(angle*Math.PI/180)
	}
	offscreenCtx.drawImage(image, -(image.width/2), -(image.height/2))

	return offscreenCanvas
}

const getV = function (x, y, bd, lvl) {
	const upper = 7+lvl/5
	const lower = 4+lvl/5
	switch(bd) {
		case 'l':
			return {vx:randInt(lower, upper),vy:randInt(-5, 5)}
		case 'r':
			return {vx:-randInt(lower, upper),vy:randInt(-5, 5)}
		case 't':
			return {vx:randInt(-5, 5),vy:randInt(lower, upper)}
		case 'b':
			return {vx:randInt(-5, 5),vy:-randInt(lower, upper)}
	}
}

const randInt = function(min, max) {
	var n = Math.floor(Math.random() * (max - min)) + min
	return n
}

const relMouseCoords = function(canvas, event){
    var totalOffsetX = 0
    var totalOffsetY = 0
    var canvasX = 0
    var canvasY = 0
    var currentElement = canvas

    do{
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop
    }
    while(currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX
    canvasY = event.pageY - totalOffsetY

    return {x:canvasX, y:canvasY}
}