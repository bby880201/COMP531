const login = (req, res)=>{
	const payload = { username: req.body.username, result: "success" }
	res.send({payload})
}

const logout = (req, res)=>{
	const payload = 'OK'
	res.send(payload)
}

const register = (req, res)=>{
	const payload = { result: 'success', username: req.body.username }
	res.send(payload)
}

const password = (req, res)=>{
	const payload = { username: req.body.username, status: 'will not change' }
	res.status(500).send(payload)
}


module.exports = app => {
	app.post('/login', login)
	app.put('/logout', logout)
	app.post('/register', register)
	app.put('/password', password)
}