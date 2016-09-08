'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");
	canvas.width = window.innerWidth

	// Create the ground
	var floor = canvas.height /2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	// colors of windows
	var winColors = ['yellow', 'black']

	//build a building
	var buildings = []
	var paintBlg = function (building) {
		c.fillStyle= building['color']
		c.fillRect(building['x'], building['y'], building['width'], building['height'])
		for (var y = floor - floorSpacing; y > floor - building['height']; y -= floorSpacing + windowHeight) {
			for (var x = windowSpacing; x < building['width'] - windowWidth; x += windowSpacing + windowWidth) {
				c.fillStyle= winColors[Math.floor(Math.random()*winColors.length)]
				c.fillRect(building['x'] + x, y - windowHeight, windowWidth, windowHeight)
			}
		}
	}	

	var build = function() { 
		var building = {}
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		building['x'] = x0
		building['y'] = floor - blgHeight
		building['width'] = blgWidth
		building['height'] = blgHeight
		building['color'] = blgColors[ Math.floor(Math.random()*blgColors.length)]
		buildings.push(building)
		paintBlg(building)
	}

	// paint sun and car
	var sunLoc = [0,0,75,75]
	var sunImg = new Image()
	sunImg.src = 'http://images.clipartpanda.com/smile-clipart-119542516413717350massimo_sole_3.svg.med.png'
	sunImg.onload = function() {
		c.drawImage(sunImg, sunLoc[0], sunLoc[1], sunLoc[2], sunLoc[3])
	}

	var carLoc = [0, floor-50, 100, 50]
	var carImg = new Image()
	carImg.src = "http://rheck.com/flash/Animated%20Map%20Flash/smart-car.gif"
	carImg.onload = function() {
		c.drawImage(carImg, carLoc[0], carLoc[1], carLoc[2], carLoc[3])
	}

	var repaint = function() {
		c.clearRect(0, 0, canvas.width, floor);
		c.drawImage(sunImg, sunLoc[0], sunLoc[1], sunLoc[2], sunLoc[3])
		buildings.forEach(paintBlg)
		c.drawImage(carImg, carLoc[0], carLoc[1], carLoc[2], carLoc[3])
	}

	var yInc = 10
	var moveCarAndSun = function() {
		sunLoc[0] = move(sunLoc[0], canvas.width-sunLoc[2], 15)
		carLoc[0] = move(carLoc[0], canvas.width-carLoc[2], 30)
		sunLoc[1] += yInc
		if (sunLoc[1]+sunLoc[3]> canvas.height/4){
			sunLoc[1] = canvas.height/4 - sunLoc[3]
			yInc = -yInc
		} else if (sunLoc[1]<0) {
			sunLoc[1] = 0
			yInc = -yInc
		}
		repaint()
	}

	setInterval(moveCarAndSun, 100)

	// return apis for other elements to use
	return {
		build: build,
		buildings: buildings,
		repaint: repaint
	}
}

function move(x, boundary, inc) {
	x+=inc
	if (x>boundary){
		x = 0
	}
	return x
}

window.onload = function() {
	var canvas = document.querySelector("canvas")
	var app = createApp(canvas)
	document.getElementById("build").onclick = app.build
	var increaseBlg = function (event) {
		var canvasSize = canvas.getBoundingClientRect()
		var x = event.pageX - canvasSize.left, y = event.pageY - canvasSize.top;
		// check which building is clicked and increse the height
		app.buildings.forEach(function(element) {
        	if (y > element['y'] && y < element['y'] + element['height']  && x > element['x'] && x < element['x'] + element['width']) {
        		element['height'] += 10
        		element['y'] -= 10
        		app.repaint()
        	}
    	});
	}
	canvas.addEventListener('click', increaseBlg, false);
}

