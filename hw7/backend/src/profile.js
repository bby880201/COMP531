const Profile = require('./model').Profile
const User = require('./model').User
const uploadImage = require('./uploadCloudinary').uploadImage

const getHeadlines = (req,res)=>{
	console.log('getHeadlines request')
	const reqUsers = (req.params.user||'').split(',')

	Profile.find({username:{$in: reqUsers}}, {username:true, headline:true},
	(err,headlines) => {
		if (err) {
			console.error('Mongoose find failed: Profile find failed since' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose find success: Profile find ' + reqUsers)
			res.send({ headlines })
		}
	})
}

const getAvatar = (req,res)=>{
	console.log('getAvatar request')
	const reqUsers = (req.params.user||'').split(',')
	
	Profile.find({username:{$in: reqUsers}}, {username:true, avatar:true},
	(err,avatars) => {
		if (err) {
			console.error('Mongoose find failed: Profile find failed since' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose find success: Profile find ' + reqUsers)
			res.send({ avatars })
		}
	})
}

const getEmail = (req,res)=>{
	console.log('getEmail request')
	const reqUser = (req.params.user || req.username)

	Profile.findOne({username: reqUser}, {username:true, email:true},
	(err,email) => {
		if (err) {
			console.error('Mongoose findOne failed: Profile findOne failed since' + err)
			res.status(500).send({error:err})
		} else if (!email) {
			console.log('Mongoose findOne bad requeset: Profile findOne ' + reqUser)
			res.status(400).send({error:'Can\'t find email for ' + reqUser})
		} else {
			console.log('Mongoose findOne success: Profile findOne ' + reqUser)
			res.send(email)
		}
	})
}

const getZipcode = (req,res)=>{
	console.log('getZipcode request')
	const reqUser = (req.params.user || req.username)

	Profile.findOne({username: reqUser}, {username:true, zipcode:true},
	(err,zipcode) => {
		if (err) {
			console.error('Mongoose findOne failed: Profile findOne failed since' + err)
			res.status(500).send({error:err})
		} else if (!zipcode) {
			console.log('Mongoose findOne bad requeset: Profile findOne ' + reqUser)
			res.status(400).send({error:'Can\'t find zipcode for ' + reqUser})
		} else {
			console.log('Mongoose findOne success: Profile findOne ' + reqUser)
			res.send(zipcode)
		}
	})
}

const getDob = (req,res)=>{
	console.log('getDob request')
	const reqUser = req.username

	Profile.findOne({username: reqUser}, {username:true, dob:true},
	(err,dob) => {
		if (err) {
			console.error('Mongoose findOne failed: Profile findOne failed since' + err)
			res.status(500).send({error:err})
		} else if (!dob) {
			console.log('Mongoose findOne bad requeset: Profile findOne ' + reqUser)
			res.status(400).send({error:'Can\'t find dob for ' + reqUser})
		} else {
			console.log('Mongoose findOne success: Profile findOne ' + reqUser)
			res.send(dob)
		}
	})
}

const putHeadline = (req,res)=>{
	console.log('putHeadline request')

	Profile.findOneAndUpdate({username: req.username}, 
	{headline: req.body.headline}, {new:true}, 
	(err,user) => {
		if (err) {
			console.error('Mongoose update failed: Profile update failed since' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad requeset: Profile update ' + req.username)
			res.status(400).send({error:'Can\'t update headline for ' + req.username})	
		} else {
			console.log('Mongoose update success: Profile update' + req.username)
			res.json({username: user.username, headline:user.headline})
		}
	})
}

const putEmail = (req,res)=>{
	console.log('putEmail request')

	Profile.findOneAndUpdate({username: req.username}, {email: req.body.email},
	{new:true}, (err,user) => {
		if (err) {
			console.error('Mongoose update failed: Profile update failed since' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad requeset: Profile update ' + req.username)
			res.status(400).send({error:'Can\'t update email for ' + req.username})	
		} else {
			console.log('Mongoose update success: Profile update' + req.username)
			res.json({username: user.username, email:user.email})
		}
	})

}

const putZipcode = (req,res)=>{
	console.log('putZipcode request')

	Profile.findOneAndUpdate({username: req.username}, {zipcode: req.body.zipcode},
	{new:true}, (err,user) => {
		if (err) {
			console.error('Mongoose update failed: Profile update failed since' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad requeset: Profile update ' + req.username)
			res.status(400).send({error:'Can\'t update zipcode for ' + req.username})	
		} else {
			console.log('Mongoose update success: Profile update' + req.username)
			res.json({username: user.username, zipcode:user.zipcode})
		}
	})
}

const putAvatar = (req,res)=>{
	console.log('putAvatar request')
	const img = req.fileurl
	if (!img) {
		console.log('Mongoose update bad requeset: Profile update ' + req.username)
		return res.status(400).send({error:'Invalid avatar file url'})	
	}

	Profile.findOneAndUpdate({username: req.username}, {avatar: img},
	{new:true}, (err,user) => {
		if (err) {
			console.error('Mongoose update failed: Profile update failed since' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad requeset: Profile update ' + req.username)
			res.status(400).send({error:'Can\'t update zipcode for ' + req.username})	
		} else {
			console.log('Mongoose update success: Profile update' + req.username)
			res.json({username: user.username, avatar:user.avatar})
		}
	})
}

module.exports = app => {
	app.get('/headlines/:user?', getHeadlines)
	app.get('/email/:user?', getEmail)
	app.get('/zipcode/:user?', getZipcode)
	app.get('/avatars/:user?', getAvatar)
	app.get('/dob', getDob)
	app.put('/headline', putHeadline)
	app.put('/email', putEmail)
	app.put('/zipcode', putZipcode)
	app.put('/avatar', uploadImage('avatar'), putAvatar)
}
