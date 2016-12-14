const Profile = require('./model').Profile

const getFollowing = (req, res) => {
	console.log('getFollowing request')
	const username = req.params.user || req.username
	
	Profile.findOne({username}, (err, user) => {
		if (err) {
			console.error('Mongoose findOne error: Profile findOne failed since ' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose findOne bad request: Profile findOne for ' + username)
			res.status(400).send({error:'Can\'t find user ' + username})
		} else {
			console.log('Mongoose findOne success: Profile findOne for ' + username)
			res.json({username, following:user.following})
		}
	})
}

const putFollowing = (req, res) => {
	const username = req.params.user
	if (username !== req.username) {
		Profile.findOne({ username }, (err, friend) => {
			if (err) {
				console.error('Mongoose findOne error: Profile findOne failed since ' + err)
				res.status(500).send({error:err})
			} else if (friend) {
				Profile.findOneAndUpdate({username: req.username},
				{$addToSet: {following: username}},
				{new:true}, (err, user) => {
					if (err) {
						console.error('Mongoose update error: Profile update failed since ' + err)
						res.status(500).send({error:err})
					} else if (!user) {
						console.log('Mongoose update bad request: Profile update for ' + req.username)
						res.status(500).send({error: 'Can\'t find user ' + req.username})
					} else {
						console.log('Mongoose update success: Profile update for ' + username)
						res.json({
							username:user.username,
							following:user.following
						})
					}
				})
			} else {
				console.log('Mongoose findOne bad request: Profile findOne for ' + username)
				res.status(400).send({error: username + ' is not found'})
			}
		})
	} else {
		console.log('bad request, can\'t follow yourself')
		res.status(400).send({error: 'bad request, can\'t follow yourself'})
	}
}

const deleteFollowing = (req, res) => {	
	Profile.findOneAndUpdate({username: req.username},
	{$pull: {following: req.params.user}},
	{new:true}, (err, user) => {
		if (err) {
			console.error('Mongoose update error: Profile update failed since ' + err)
			res.status(500).send({error:err})
		} else if (!user) {
			console.log('Mongoose update bad request: Profile update for ' + req.username)
			res.status(500).send({error: 'Can\'t find user ' + req.username})
		} else {
			console.log('Mongoose update success: Profile update for ' + req.username)
			res.json({
				username: user.username,
				following: user.following
			})
		}
	})
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', putFollowing)
	app.delete('/following/:user', deleteFollowing)
}