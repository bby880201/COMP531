const md5 = require('md5')
const cookieParser = require('cookie-parser')

const pepper = md5('arandompaper')

const users = {
	bb26: {
		salt: 'saltforbb25'
		hash:  '5d41c3e80fcfa3cd9c07a26787b1724b'
	}
}


app.use(cookieParser())

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

	res.cookie(cookieKey, hash, {maxAge: 36000*1000, httpOnly:true})

	return res.send({username:username,
		result:'success'})
}


module.exports = app => {
	app.get('/', index)
	app.post('/register', register)
	app.post('/login', login)
}