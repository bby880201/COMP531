
const express = require('express')
const bodyParser = require('body-parser')

const articles = {articles: [
	{id:1,
	author: 'Boyang',
	text: 'abcdefg'
	},
	{id:2,
	author: 'sylva',
	text: 'dsfajlfk;ds;f'
	},
	{id:3,
	author: 'nas',
	text: 'sapdjfopsa'
	}]
}

const addArticle = (req, res) => {
     console.log('Payload received', req.body)  
     articles.articles.push({id:articles.articles.length+1, author:'newauthor', text: req.body.body})
     res.send(articles)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticles = (req, res)=> res.send(articles)

const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticles)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})
