
// This script logs into the dummy server and logs into your server
// it pulls data from the dummy server and pushes it into your server
const randomWords = require('random-words');
var fs = require('fs')
var request = require('request').defaults({jar: true})

var cred = {}

fs.readFile('./randomUser.json', function(err, data) {	
	var data = JSON.parse(data)	
	const testUsers = data.testUsers

	fs.readFile('./cred.json', function(err, data) {	
		var d = JSON.parse(data)	
		Object.keys(d).forEach(function(key) {
			cred[key] = d[key]
		})
		registerUser(testUsers)
		// login()
	})
})

function registerUser(users) {
	const user = users.pop()
	if (user) {
		console.log('register new user ' + user.username)
		request({ url: cred.site_url + '/register', method: 'POST',
		json: user}, function (err, res, body) {
			if (err) {
				console.error("There was an error registering new user on YOUR server with payload: " + user, err)
				console.dir(res.statusCode)
				process.exit(1)
			} else {
				if (res.statusCode !== 200) {
					console.log('unsuccessful request, statusCode is ' + res.statusCode)
					console.dir(res.body)
				}
				registerUser(users)
			}
		})
	} else {
		login()
	}
}

function login() {
	request({ url: cred.dummy_url + '/login', method: 'POST',
		json: { "username": cred.dummy_username, "password": cred.dummy_password }
	}, function (err, res, body) {
		if (err || body.result !== "success") {
			console.error("There was an error logging into the dummy server with credentials: " + cred, err)
			process.exit(1)
		}		
		getPosts()
	})
}

var postsToPost;
function getPosts(cookie) {	
	request({ url: cred.dummy_url + '/articles', method: 'GET', json:true }, function(err, res, body) {
		if (err) {
			console.error("There was an error grabbing posts from the dummy server", err)
			process.exit(1)
		}		
		postsToPost = body.articles
		console.log("Read " + postsToPost.length + " posts from dummy server")
		loginToSite()
	})
}

function loginToSite() {
	request({ url: cred.site_url + '/login', method: 'POST',
		json: { "username": cred.site_username, "password": cred.site_password }
	}, function(err, res, body) {
		if (err) {
			console.error("There was an error logging into YOUR server with credentials: " + cred, err)
			process.exit(1)
		}
		console.log('login success')
		getPostCount(sendPosts)
	})
}

function sendPosts() {	
	var post = postsToPost.pop()
	if (post) {		
		request({ url: cred.site_url + '/article', method: 'POST', json: post }, function(err, res, body) {
			if (err) {
				console.error("There was an error making a post to YOUR server.  post=" + post, err)
				process.exit(1)
			}
			const comments = generateComments()
			postComments(res.body.articles[0]._id, comments)
		})
	} else {
		getPostCount(function() {
			console.log('You now have some data in your database!')
		})
	}
}

function generateComments() {
	const comments = []
	for (var i = 0; i < Math.floor((Math.random() * 20) + 1); i++) {
		comments.push({
			commentId: -1,
			text: randomWords({min: 5, max: 140}).join(' ')
		})
	}
	return comments
}
function postComments(articleId, comments) {
	const comment = comments.pop()
	console.log('put new comment for article ' + articleId)
	if (comment)
		request({ url: cred.site_url + '/articles/' + articleId, method: 'PUT', json: comment }, function(err, res, body) {
			if (err ) {
				console.error("There was an error putting a new comment to YOUR server. " + comment, articleId, err)
				console.dir(res.body)
				process.exit(1)
			} else {
				if (res.statusCode !== 200) {
					console.log('unsuccessful request, statusCode is ' + res.statusCode)
					console.dir(res.body)
				}
				setTimeout(()=>(postComments(articleId, comments)), 1000)
			}
		})
	else {
		sendPosts()
	}
}


function getPostCount(next) {
	request({ url: cred.site_url + '/articles', method: 'GET', json:true }, function(err, res, body) {
		if (err) {
			console.error("There was an error grabbing posts from YOUR server", err)
			process.exit(1)
		}		
		console.log("Read " + body.articles.length + " posts from YOUR server")
		if (next) {
			next()
		}
	})
}