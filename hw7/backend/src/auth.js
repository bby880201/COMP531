// all endpoints are for login or register purposes
const REDIS_URL = process.env.REDIS_URL || 'redis://h:pejanpr88gbdia9ajs78ogjsvpo@ec2-54-221-228-237.compute-1.amazonaws.com:11539'
const redis = require('redis').createClient(REDIS_URL)
const md5 = require('md5')
const pepper =  process.env.PEPPER || md5('arandompepper')
const pepperForSession = md5('arandompepperforsession')

const User = require('./model').User
const Profile = require('./model').Profile

const login = (req, res)=>{
	console.log('post login request')
	const username = req.body.username
	const password = req.body.password

	if (!username || !password) {
		return res.status(400).send({error: 'username or password is missing!'})
	}

	User.findOne({ username }, (err, user) => {
		if (err) {
			console.error('Mongoose findOne error: User findOne failed since ' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose findOne success: User findOne ' + username)
			if (user && user.hash === md5(pepper + password + user.salt)) {
				setSession(req, res, user, () => res.send({username, result:'success'}))
			} else {
				res.status(401).send({error: 'Username or password is wrong!'})
			}
		}
	})
}

const logout = (req, res) => {
	console.log('put logout request')
	setSession(req, res, null, ()=> res.send('OK'))
}

const register = (req, res)=>{
	console.log('post register request')
	const username = req.body.username
	
	User.findOne({ username }, (err, user)=>{	
		if (err) {
			console.error('Mongoose findOne error: User findOne failed since ' + err)
			res.status(500).send({error:err})
		} else if (user) {
			console.log('Mongoose findOne bad request: User findOne bad request '+username)
			res.status(400).send({error: 'Username is unavailable!'})
		} else {
			const newUser = makeCred(username, req.body.password)

			User.create(newUser, (err, newUser) => {
				if (err) {
					console.error('Mongoose create error: User create failed since ' + err)
					res.status(500).send({error:err})
				} else {
					console.log('Mongoose create success: User create ' + username)
					const userProfile = {
					    username,
					    headline: 'This is a lazy guy who leaves nothing.',
					    following: [],
					    email: req.body.email,
					    zipcode: req.body.zipcode,
					    dob: new Date(req.body.dob),
					    avatar: 'http://res.cloudinary.com/hxo10si90/image/upload/v1479778632/olsr9e7pnno3xczlwjfv.png'
					}

					Profile.create(userProfile, (err) => {
						if (err) {
							console.error('Mongoose create error: Profile create failed since ' + err)
							res.status(500).send({error:err})
						} else {
							console.log('Mongoose create success: Profile create for ' + username)
							setSession(req, res, newUser, ()=>res.send({ result: 'success', username }))
						}
					})
				}
			})			
		}
	})
}

// generate user credentials for new user on server side
const makeCred = (username, password) => {
	const salt = md5(Math.random().toString(36).substring(2) + username)
	const hash = md5(pepper + password + salt)
	return{ username, salt, hash }
}

const setSession = (req, res, user, next) => {
	if (user) {
		const sid = md5(user.hash + new Date().getTime() + user.username)
		redis.hmset(sid, { username: user.username }, (err, obj) => {
			if (err) {
				console.error('Redis hmset error: ' + err)
				res.status(500).send({error:err})
			} else {
				console.dir(obj)
				res.cookie('sid', sid, {maxAge: 36000*1000, httpOnly:true})
				if (next) {
					next()
				}
			}
		})
	} else {
		redis.del(req.cookies['sid'], (err, obj) => {
			if (err) {
				console.error('Redis del error: ' + err)
				res.status(500).send({error:err})
			} else {
				if (next) {
					next()
				}
			}
		})
	}
}

// login status validator that allow preflight request and unloggedin request to login endpoint
const isLoggedIn = (req, res, next) => {
	if (req.method === 'OPTIONS'||req.url === '/login'||req.url === '/register') {
		next()
	} else {
		const sid = req.cookies['sid'] || -1
		redis.hgetall(sid, (err, userObj) => {
			if (err) {
				console.error('Redis hgetall error: ' + err)
				res.status(500).send({error:err})			
			} else if(userObj){
				console.log('Redis hgetall success: ' + req.cookies['sid'] + ' mapped to ' + userObj)
				req.username = userObj.username
				next()
			} else {
				console.log('UnloggedIn request')
				res.status(401).send({error: 'Login or sign up first!'})
			}
		})
	}
}

const password = (req, res)=>{
	console.log('put password request')
	const username = req.username
	const password = req.body.password;
	const user = makeCred(username, password)

	User.findOneAndUpdate({username}, user, (err) => {
		if (err) {
			console.error('Mongoose update error: update password failed since ' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose update success: User update for ' + username)
			res.send({status:'success'})
		}
	})	
}	


module.exports = (app) => {
	app.post('/login', login)
	app.post('/register', register)
	app.put('/logout', logout)
	app.put('/password', password)
}

// export for global use
module.exports.isLoggedIn = isLoggedIn