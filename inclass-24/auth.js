const md5 = require('md5')
const redis = require('redis').createClient('redis://h:phodkh1irp71afi9e31r88c2ar@ec2-54-221-229-191.compute-1.amazonaws.com:11399')

const pepper = md5('arandompepper')

// username bb26, password password
const users = {
	bb26: {
		salt: 'saltforbb26',
		hash: '4fe92d726ea595153c592ac2f4e8b77c'
	}
}

const isLoggedIn = (req, res, next)=> {
	redis.hgetall(req.cookies['sid'], (err, userObj)=>{
		if(userObj){
			console.log(req.cookies['sid']+' mapped to '+userObj)
			req.username = userObj.username
			next()
		}
		else{
			res.sendStatus(401)
		}
	})
}

const login = (req, res)=>{
	const username = req.body.username
	const pwd = req.body.password

	if (!username || !pwd) {
		return res.sendStatus(400)
	}

	const userData = users[username]
	const hash = md5(pepper + userData.salt + pwd)
	if (!userData || userData.hash !== hash) {
		return res.sendStatus(401)
	}

	const sid = md5('md5forsession'+new Date().getTime()+username)
	redis.hmset(sid, {username})

	res.cookie('sid', sid, {maxAge: 36000*1000, httpOnly:true})

	return res.send({username, result:'success'})
}

const logout = (req, res) => {
	const sid = req.cookies['sid']
	redis.del(sid)
	res.send('OK')
}

const cookieTest = (req, res)=>{
	const msg = 'Only after login could see this message, your username is ' + req.username
	console.log(msg)
	res.send(msg)
}

const index = (req, res) => {
     res.send({ hello: 'world' })
}

module.exports = app => {
	app.get('/', index)
	app.post('/login', login)
	app.put('/logout', isLoggedIn, logout)
	app.get('/cookieTest', isLoggedIn, cookieTest)
}