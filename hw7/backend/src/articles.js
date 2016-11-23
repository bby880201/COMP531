// all endpoints are for manipulating articles
const Article = require('./model').Article
const Profile = require('./model').Profile
const ObjectId = require('mongoose').Types.ObjectId
const md5 = require('md5')
const uploadImage = require('./uploadCloudinary').uploadImage

// if id is existed and is an article id, then get corresponding article
// if id is not an article id, consider it as a username, and get feeds for that user
// if id isn't existed, then get all feeds of login user
const getArticles = (req, res)=>{
	console.log('getArticles request')
	const id = req.params.id
	if (id && ObjectId.isValid(id) && (new ObjectId(id)).str === id) {
		console.log((new ObjectId(id)).str)
		Article.findOne({_id: id}, (err, article) => {
			if (err) {
				console.error('Mongoose findOne error: Article findOne failed since ' + err)
				res.status(500).send({error:err})
			} else if (!article) {
				console.log('Mongoose findOne bad request: Article findOne for ' + id)
				res.status(400).send({error: 'can\'t find article ' + id})
			} else {
				console.log('Mongoose findOne success: Article findOne for ' + id)
				res.json({articles:[article]})
			}
		})
	} else {
		const username = id ? id : req.username
		Profile.findOne({username}, (err, userProfile) => {
			if (err) {
				console.error('Mongoose findOne error: Profile findOne failed since ' + err)
				res.status(500).send({error:err})
			} else if (!userProfile) {
				console.log('Mongoose findOne bad request: Profile findOne for ' + username)
				res.status(400).send({error: 'can\'t finde user ' + username})
			}else {
				console.log('Mongoose findOne success: Profile findOne for ' + username)
				const users = userProfile.following
				users.push(req.username)

				Article.find({author:{$in: users}}, (err, articles) => {
					if (err) {
						console.error('Mongoose find error: Article find failed since ' + err)
						res.status(500).send({error:err})
					} else {
						console.log('Mongoose find success: Article find for ' + username)
						res.json({articles})
					}
				})
			}
		})
	}
}

const postArticle = (req, res) => {
	console.log('postArticle request')
	const newArticle = {
		text: req.body.text,
		date: new Date(),
		author: req.username,
		comments: []
	}

	if (req.fileurl || req.body.img) {
		newArticle.img = req.fileurl || req.body.img
	}

	Article.create(newArticle, (err, article) => {
		if (err) {
			console.error('Mongoose create error: Article create failed since ' + err)
			res.status(500).send({error:err})
		} else {
			console.log('Mongoose create success: new article ' + article._id)
			res.json({articles: [article]})
		}
	})
}

const putArticles = (req, res) => {
	console.log('putArticles request')
	const id = req.params.id
	const commentId = req.body.commentId

	if (!commentId) {
		Article.findOneAndUpdate(
		{_id:id, author:req.username}, {text:req.body.text}, {new:true}, 
		(err, article) => {
			if (err) {
				console.error('Mongoose update error: Article update failed since ' + err)
				res.status(500).send({error:err})
			} else if (!article) {
				console.error('Mongoose update unauthorized: Article update unauthorized ' + id)
				res.status(401).send({error: 'Fobidden to edit other\'s article'})
			} else {
				console.log('Mongoose update success: update article ' + id)
				res.json({articles:[article]})
			}
		})
	} else if (commentId != -1) {
		Article.findOneAndUpdate(
		{_id:id, comments:{$elemMatch: {commentId, author:req.username}}},
		{$set:{"comments.$.text":req.body.text}},
		{new:true}, (err, article) => {
			if (err) {
				console.error('Mongoose update error: comment update failed since ' + err)
				res.status(500).send({error:err})
			} else if (!article) {
				console.error('Mongoose update unauthorized: comment update unauthorized ' + commentId)
				res.status(401).send({error: 'Fobidden to edit other\'s comment'})
			} else {
				console.log('Mongoose update success: update comment ' + commentId)
				res.json({articles:[article]})
			}
		})
	} else {
		const newComment = {
			author: req.username, 
			date: new Date(), 
			text: req.body.text,
			commentId: md5(new Date() + req.username)
		}

		Article.findOneAndUpdate(
			{_id:id}, {$push:{comments:newComment}}, {new:true},
			(err, article) => {
				if (err) {
					console.error('Mongoose update error: comment update failed since ' + err)
					res.status(500).send({error:err})
				} else if (!article) {
					console.log('Mongoose findOne bad request: Article findOne for ' + id)
					res.status(400).send({error: 'can\'t finde article ' + id})
				} else {
					console.log('Mongoose update success: update comment ' + newComment.commentId)
					res.json({articles:[article]})
				}
			}
		)
	}
}

module.exports = app => {
	app.get('/articles/:id?', getArticles)
	app.put('/articles/:id', putArticles)
	app.post('/article', uploadImage('image'), postArticle)
}

