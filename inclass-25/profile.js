'use strict'
const users = {
	users:[{
		id:0,
		username:'bb26',
		zipcode:12345,
		email:'abx@xyz.com',
		avatar:'./avatar/0.img',
		headline:'hello from a',
		dob: 479430683312
	},
	{
		id:1,
		username:'b',
		zipcode:12378,
		email:'bbb@xyz.com',
		avatar:'./avatar/1.img',
		headline:'hello from b',
		dob: 379430683312
	},
	{
		id:2,
		username:'c',
		zipcode:13213,
		email:'ccc@xyz.com',
		avatar:'./avatar/2.img',
		headline:'hello from c',
		dob: 279430683312
	},
	{
		id:3,
		username:'d',
		zipcode:32179,
		email:'ddd@xyz.com',
		avatar:'./avatar/4.img',
		headline:'hello from d',
		dob: 179430683312
	}]
}

const articles = {articles: [
	{id:1,
	author: 'Boyang',
	text: 'abcdefg'
	},
	{id:2,
	author: 'sylva',
	text: 'dsfajlfk;ds;f'
	},
	{id:3,
	author: 'nas',
	text: 'sapdjfopsa'
	}]
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     let ret = {id:articles.articles.length+1, author:'newauthor', text: req.body.text}
     console.log(ret)
     articles.articles.push(ret)
     res.send(JSON.stringify({articles: [ret]}))
}

const getArticles = (req, res) =>  {
	if (!req.params.id) {
		res.send(JSON.stringify(articles))
	} else {
		const id = req.params.id
		const body = {articles: articles.articles.filter((art) => {
			return art.id == id
		})}
		res.send(JSON.stringify(body))
	}
}

const getHeadlines = (req,res)=>{
	console.log(req.params.user)
	if (!req.params.user) {
		let ret = users.users.map((e)=>{
			return {username:e.username,headline:e.headline}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	} else {
		const headline = users.users.filter((e)=>{return req.params.user === e.username})
		let ret = headline.map((e)=>{
			return {username:e.username,headline:e.headline}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	}
}

const getEmail = (req,res)=>{
	console.log(req.params.user)
	if (!req.params.user) {
		let ret = users.users.map((e)=>{
			return {username:e.username,email:e.email}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	} else {
		const email = users.users.filter((e)=>{return req.params.user === e.username})
		let ret = email.map((e)=>{
			return {username:e.username,email:e.email}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	}
}

const getZip = (req,res)=>{
	console.log(req.params.user)
	if (!req.params.user) {
		let ret = users.users.map((e)=>{
			return {username:e.username,zipcode:e.zipcode}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	} else {
		const zip = users.users.filter((e)=>{return req.params.user === e.username})
		let ret = zip.map((e)=>{
			return {username:e.username,zipcode:e.zipcode}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	}
}

const getAvatar = (req,res) =>{
	console.log(req.params.user)
	if (!req.params.user) {
		let ret = users.users.map((e)=>{
			return {username:e.username,avatar:e.avatar}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	} else {
		const avatar = users.users.filter((e)=>{return req.params.user === e.username})
		let ret = avatar.map((e)=>{
			return {username:e.username,avatar:e.avatar}
		})
		console.log(ret)
		res.send(JSON.stringify(ret))
	}
}

const putHeadline = (req,res)=>{
	users.users[0].headline = req.body.headline || ''
	res.send({username:users.users[0].username,headline:users.users[0].headline})
}

const putEmail = (req,res)=>{
	users.users[0].email = req.body.email || ''
	res.send({username:users.users[0].username,email:users.users[0].email})
}

const putZip = (req,res)=>{
	users.users[0].zipcode = req.body.zipcode || ''
	res.send({username:users.users[0].username,zipcode:users.users[0].zipcode})
}

const putAvatar = (req,res)=>{
	users.users[0].avatar = req.fileurl || ''
	res.send({username:users.users[0].username,avatar:users.users[0].avatar})
}

const getDob = (req,res)=>{
	console.log({username:users.users[0].username, dob:users.users[0].dob})
	res.send({username:users.users[0].username, dob:users.users[0].dob})
}

const uploadImage = require('./uploadCloudinary').uploadImage

module.exports = app => {
     app.get('/headlines/:user?', getHeadlines)
     app.get('/email/:user?', getEmail)
     app.get('/zipcode/:user?', getZip)
     app.get('/avatars/:user?', getAvatar)
     app.put('/headline', putHeadline)
     app.put('/email', putEmail)
     app.put('/zipcode', putZip)
     app.put('/avatar', uploadImage('avatar'), putAvatar)
     app.post('/article', addArticle)
     app.get('/articles/:id?', getArticles)
     app.get('/dob', getDob)
}
