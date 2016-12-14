// some config parameters that should be loaded from config file
const REDIS_URL = process.env.REDIS_URL || 'redis://h:pejanpr88gbdia9ajs78ogjsvpo@ec2-54-221-228-237.compute-1.amazonaws.com:11539'
const clientID = process.env.CLIENT_ID || '708618609292408'
const clientSecret = process.env.CLIENT_SECRET || 'acc9f265afa405039e9d94ef9327c5cb'
const callbackURL = process.env.CALLBACK_URL || 'http://localhost:3000/auth/callback'
const pepperStr =  process.env.PEPPER || 'arandompepper'
const pepperStrForSession = process.env.SESSION_PEPPER || 'arandompepperforsession'
const sessionSecret = process.env.SESSION_SECRET || 'HelloWorld'

const redis = require('redis').createClient(REDIS_URL)
const md5 = require('md5')
const pepper = md5(pepperStr)
const pepperForSession = md5(pepperStrForSession)
const request = require('request')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

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

const register = (req, res, next)=>{
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
			if (req.auth) {
				newUser.auth = req.auth
			}

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
							setSession(req, res, newUser, ()=>res.json({ result: 'success', username }))
						}
					})
				}
			})			
		}
	})
}

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
				res.cookie('sid', sid, {maxAge: 36000*1000, httpOnly:true})
				if (next) {
					next(req, res)
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
					next(req, res)
				}
			}
		})
	}
}

// login status validator that allow preflight request and unloggedin request to login endpoint
const isLoggedIn = (req, res, next) => {
	if (req.method === 'OPTIONS') {
		next()
	} else if (req.isAuthenticated()) {
		req.username = req.session.passport.user.displayName
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
	const password = req.body.password
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

const fail = (req, res)=>{
	res.send('Login failed')
}

const config = {
	clientID,
	clientSecret,
	callbackURL,
	profileFields: ['id', 'email', 'name', 'photos', 'displayName']
}

passport.serializeUser((user, done)=>{
	done(null, user)
})

passport.deserializeUser((id, done)=>{
	done(null, id)
})

passport.use(new FacebookStrategy(config, 
	(token, refreshToken, profile, done)=>{
		process.nextTick(()=>{
			return done(null, profile)
		})
	})
)

const authLogin = (req, res)=> {
	const username = req.user.displayName + '@' + req.user.provider
	User.findOne({ $or: [{username},
		{'auth.id': req.user.id, 'auth.provider': req.user.provider}]}, (err, user) => {
		if (err) {
			console.error('Mongoose findOne error: User findOne failed since ' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			Profile.findOne({email:req.user.emails[0].value}, (err, profile)=>{
				if (err) {
					console.error('Mongoose findOne error: Profile findOne failed since ' + err)
					res.status(500).send({error:err})
				} else if (!profile) {
					const newUser = {
						username, 
						email:req.user.emails[0].value,
						dob: -1, 
						zipcode: '00000', 
						password: ''
					}
					req.auth = [{
						provider: req.user.provider,
						id: req.user.id,
						name: req.user.displayName + '@' + req.user.provider
					}]
					req.body = newUser
					req.session.passport.user.displayName = username
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
							if (req.auth) {
								newUser.auth = req.auth
							}

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
											setSession(req, res, newUser, (req,res)=>res.redirect(req.headers.referer))
										}
									})
								}
							})			
						}
					})					
				} else {
					console.log('Mongoose findOne success: Profile findeOne for ' + profile.username)
					req.session.passport.user.displayName = profile.username
					linkLocal(req, res, (req, res) => {
						res.redirect(req.headers.referer)
					})
				}
			})
		} else {
			console.log('Mongoose findOne success: User findeOne for ' + user.username)
			req.session.passport.user.displayName = user.username
			res.redirect(req.headers.referer)
		}
	})

}

const linkLocal = (req, res, next)=> {
	User.findOneAndUpdate({username: req.session.passport.user.displayName},
		{$push: {auth: {
			provider: req.user.provider,
			id: req.user.id,
			name: req.user.displayName + '@' + req.user.provider
		}}}, {new: true}, (err, user)=> {
			next(req, res)
		})
}

// unlink local account from all 3rd party oauth accounts
const unlink = (req, res) => {
	User.findOneAndUpdate({username: req.username},
		{auth: []}, {new: true}, (err, user) => {
			res.send("success")
		})
}

const link = (req, res) => {
	console.log('post link request ' + req.username)
	const username = req.body.username
	const password = req.body.password
	const oauthUser = req.username

	User.findOne({ username }, (err, user) => {
		if (err) {
			console.error('Mongoose findOne error: User findOne failed since ' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose findOne success: User findOne ' + username)
			if (user && user.hash === md5(pepper + password + user.salt)) {
				User.findOneAndRemove({username:oauthUser}, (err, oauth)=> {
					if (!oauth || err) {
						console.error('Mongoose remove failed: User remove failed ' )
						res.status(500).send({error:err})
					} else {
						User.findOneAndUpdate({username}, 
							{$push: {auth:oauth.auth[0]}},
							(err, oauth)=>{
								if (err) {
									res.status(500).send({error:err})
								} else {
									console.log('Mongoose update success: User remove for ' + oauth.username)
								}
							})
							Profile.findOneAndRemove({ username:oauthUser }, (err, profile) => {
							if (profile) {
								console.log('Mongoose findOne success: Profile findeOne for ' + oauthUser)
								Profile.findOneAndUpdate({ username }, 
									{$push: {following:{$each:profile.following}}}, {new: true},
									(err, newProfile)=> {
										console.log('Mongoose update success: Profile update for ' + username)
										res.send('success')
									})
							}
						})
					}	
				})
			} else {
				res.status(401).send({error: 'Username or password is wrong!'})
			}
		}
	})
}

module.exports = (app) => {
	app.post('/login', login)
	app.post('/register', register)

	//use passport OAuth endpoints and middlewares to allow OAuth from Facebook
	app.use(session({
		secret: sessionSecret,
		secure: true,
		resave: true,
		saveUninitialized: true,
		cookie: {secure: false, maxAge: (4*60*60*1000)}
	}))
	app.use(passport.initialize())
	app.use(passport.session())
	app.get('/auth/facebook', passport.authenticate('facebook', {scope:'email'}))
	app.get('/auth/callback', passport.authenticate('facebook', {
		successRedirect:'/auth/login',
		failureRedirect:'/fail'
	}))
	app.use('/fail', fail)
	app.use('/auth/login', authLogin)
	app.get('/unlink', isLoggedIn, unlink)
	app.post('/link', isLoggedIn, link)
	app.put('/logout', isLoggedIn, logout)
	app.put('/password', isLoggedIn, password)
}

module.exports.isLoggedIn = isLoggedIn