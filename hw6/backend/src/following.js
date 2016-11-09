const following = [{
	username: 'bb26',
	following: ['bb26test', 'sep1']
}]

const getFollowing = (req, res) => {
	const payload = following[0]
	res.send(payload)
}

const addFollowing = (req, res) => {
	const user = req.params.user
	following[0].following.push(user)
	const payload = following[0]
	res.send(payload)
}

const removeFollowing = (req, res) => {
	const user = req.params.user
	following[0].following = following[0].following.filter((e)=>{
		return e!==user
	})
	const payload = following[0]
	res.send(payload)
}

module.exports = app => {
	app.get('/following/:user?', getFollowing)
	app.put('/following/:user', addFollowing)
	app.delete('/following/:user', removeFollowing)
}