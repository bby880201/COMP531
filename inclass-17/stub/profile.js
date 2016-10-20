const users = {
	users:[{
		id:0,
		username:'a',
		zipcode:12345,
		email:'abx@xyz.com',
		avatar:'./avatar/0.img',
		headline:'hello from a'
	},
	{
		id:1,
		username:'b',
		zipcode:12378,
		email:'bbb@xyz.com',
		avatar:'./avatar/1.img',
		headline:'hello from b'
	},
	{
		id:2,
		username:'c',
		zipcode:13213,
		email:'ccc@xyz.com',
		avatar:'./avatar/2.img',
		headline:'hello from c'
	},
	{
		id:3,
		username:'d',
		zipcode:32179,
		email:'ddd@xyz.com',
		avatar:'./avatar/4.img',
		headline:'hello from d'
	}]
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

const getHeadlines = (req,res)=>{
	console.log(req.params.user)
	const reqUsers = (req.params.user||'').split('.')
	console.log(reqUsers)
	const headlines = users.users.filter((e)=>{return reqUsers.includes(e.username)})
	res.send(headlines.map((e)=>{
		return {username:e.username,headline:e.headline}
	}))
}

const getEmail = (req,res)=>{
	console.log(req.params.user)
	const reqUsers = (req.params.user||'').split('.')
	console.log(reqUsers)
	const emails = users.users.filter((e)=>{return reqUsers.includes(e.username)})
	res.send(emails.map((e)=>{
		return {username:e.username,email:e.email}
	}))
}

const getZip = (req,res)=>{
	console.log(req.params.user)
	const reqUsers = (req.params.user||'').split('.')
	console.log(reqUsers)
	const zips = users.users.filter((e)=>{return reqUsers.includes(e.username)})
	res.send(zips.map((e)=>{
		return {username:e.username,zipcode:e.zipcode}
	}))
}

const getAvatar = (req,res) =>{
	console.log(req.params.user)
	const reqUsers = (req.params.user||'').split('.')
	console.log(reqUsers)
	const avatar = users.users.filter((e)=>{return reqUsers.includes(e.username)})
	res.send(avatar.map((e)=>{
		return {username:e.username,avatar:e.avatar}
	}))
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
	users.users[0].avatar = req.body.avatar || ''
	res.send({username:users.users[0].username,avatar:users.users[0].avatar})
}

module.exports = app => {
     app.get('/', index)
     app.get('/headlines/:user?', getHeadlines)
     app.get('/email/:user?', getEmail)
     app.get('/zipcode/:user?', getZip)
     app.get('/avatars/:user?', getAvatar)
     app.put('/headline', putHeadline)
     app.put('/email', putEmail)
     app.put('/zipcode', putZip)
     app.put('/avatar', putAvatar)
}
