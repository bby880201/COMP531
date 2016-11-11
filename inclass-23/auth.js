const request = require('request')
const qs = require('querystring')
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const app = express()
app.use(session({secret: 'HelloWorld'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(cookieParser())

const config = {
	clientID: '708618609292408',
	clientSecret: 'acc9f265afa405039e9d94ef9327c5cb',
	callbackURL: 'http://localhost:3000/auth/callback'
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

const logout = (req, res)=>{
	req.logout()
	res.redirect('/')
}

const isLoggedIn = (req, res, next)=>{
	if (req.isAuthenticated()) {
		next()
	} else {
		res.redirect('/login')
	}
}

const profile = (req, res)=>{
	res.send('ok now what?')
}

const fail = (req, res)=>{
	res.send('Login from facebook failed')
}

const hello = (req, res) => {
	res.send('Login from facebook success')
}


app.use('/auth/facebook', passport.authenticate('facebook', {scope:'email'}))
app.use('/auth/callback', passport.authenticate('facebook', 
	{successRedirect: '/profile', failureRedirect:'/fail'}))
app.use('/profile', isLoggedIn, profile)
app.use('/fail', fail)
app.use('/logout', logout)
app.use('/', hello)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
	const addr = server.address()
	console.log(`Server listening at http://${addr.address}:${addr.port}`)
})