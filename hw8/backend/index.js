const express = require('express')
const bodyParser = require('body-parser')
const isLoggedIn = require('./src/auth').isLoggedIn
const cookieParser = require('cookie-parser')

const app = express()

const CORS = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', req.headers.origin)
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
	res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, X-Requested-With, Accept')
	next()
}

const index = (req, res)=>{
	res.send({username: req.username})
}

app.use(CORS)
app.use(cookieParser())
app.use(bodyParser.json())
require('./src/auth')(app)
app.use(isLoggedIn)
app.get('/', index)
require('./src/profile')(app)
require('./src/articles')(app)
require('./src/following')(app)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})