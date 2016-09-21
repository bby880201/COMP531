'use strict'

window.onload = function windowload() {
	// for each picture cell, cache all avaliable picture to memory
	var imageCache = {
		"arcaneGiant" : 
		["https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/b/bf/Arcane_Giant%2842049%29.png", 
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/e/e9/Arcane_Giant%2842049%29_Gold.png"],
		"pirate" :
		["https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/d/d1/Skycap%27n_Kragg%2822260%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/d/db/Skycap%27n_Kragg%2822260%29_Gold.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/1/18/Skycap%27n_Kragg_full.jpg"],
		"murloc" : 
		["https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/e/e4/Murloc_Raider%2855%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/2/24/Bilefin_Tidehunter%2835219%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/9/9c/Bluegill_Warrior%28289%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/8/87/Grimscale_Oracle%28510%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/6/6e/Murloc_Knight%2822362%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/c/ca/Murloc_Tidehunter%28357%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/9/9e/Murloc_Tinyfin%2827225%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/2/21/Coldlight_Oracle%2888%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/4/49/Coldlight_Seer%28424%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/5/5c/Corrupted_Seer%2835228%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/3/36/Murloc_Tidecaller%28420%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/9/93/Murloc_Warleader%28222%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/f/f5/Vilefin_Inquisitor%2833158%29.png",
		"https://hydra-media.cursecdn.com/hearthstone.gamepedia.com/a/a8/Sir_Finley_Mrrgglton%2827215%29.png",
		]
	}
	var keys = Object.keys(imageCache)
	keys.forEach(function(key) {
		imageCache[key] = imageCache[key].map(function(src) {
			var img = new Image()
			img.src = src
			return img
		})
	})

	// get all cells with picture, and iterate though them to set intervals
	var cardpics = document.getElementsByName('cardpic')
	cardpics.forEach(function (cell) {
		setIntervalForPic(cell, imageCache)
	})
}

// generate a function for setInterval that iterate through all image src to change the card pic
function intervalFunctionFac(img, imgList) {
	// random pick one picture source at beginning
	var i = makeRandom(-1, imgList.length-2);
	return function () {
		i++;
		if (i >= imgList.length){
			i = 0
		}
		return img.src = imgList[i].src
	}
}

function setIntervalForPic(tablecell, imgDict) {
	var img = tablecell.getElementsByTagName('img')[0]
	var imgList = imgDict[img.name]
	var itv = setInterval(intervalFunctionFac(img, imgList), makeRandom(1000, 5000))
	var btn = tablecell.getElementsByTagName('button')[0]

	btn.onclick = function () {
		if (btn.innerHTML==='Stop') {
			clearInterval(itv)
			btn.innerHTML = 'Start'
		} else {
			itv = setInterval(intervalFunctionFac(img, imgList), makeRandom(1000, 5000))
			btn.innerHTML = 'Stop'	
		}
	}
}

function makeRandom(min, max) {
	var n = Math.floor(Math.random() * (max - min)) + min
	return n
}