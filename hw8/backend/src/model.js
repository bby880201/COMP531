// this is model.js 
const mongoose = require('mongoose')
require('./db.js')

const commentSchema = new mongoose.Schema({
	commentId: { type:String, required:true },
	author: { type:String, required:true },
	date: { type:Date, required:true },
	text: { type:String, required:true }
})

const articleSchema = new mongoose.Schema({
	author: { type:String, required:true },
	img: String,
	date: { type:Date, required:true }, 
	text: { type:String, required:true },
	comments: [ commentSchema ]
})

const authSchema = new mongoose.Schema({
	provider: String,
	id: String,
	name: String
})

const userSchema = new mongoose.Schema({
	username: { type:String, required:true },
	salt: { type:String, required:true },
	hash: { type:String, required:true },
	auth: [authSchema]
})

const profileSchema = new mongoose.Schema({
	username: { type:String, required:true },
	headline: String,
	following: [ String ],
	email: String,
	dob: { type:Date, required:true },
	zipcode: String,
	avatar: String
})

exports.Article = mongoose.model('article', articleSchema)
exports.User = mongoose.model('users', userSchema)
exports.Profile = mongoose.model('profiles', profileSchema)