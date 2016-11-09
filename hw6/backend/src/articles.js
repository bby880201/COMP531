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
     articles.articles.push({id:articles.articles.length+1, author:'newauthor', text: req.body.text})
     res.send(articles)
}


const getArticles = (req, res)=>{
	if (!req.params.id) {
		res.send({articles: articles.articles})
	} else {
		const id = req.params.id
		const data = articles.articles.filter((e)=>{
			return e.id==id
		})
		res.send({articles:data})
	}
}

const editArticle = (req, res) => {
	const id = req.params.id
	var data = articles.articles.filter((e)=>{	
		return e.id==id
	})
	if (data.length===0) {
		articles.articles.push({id:articles.articles.length+1, author: 'Boyang',text: req.body.text})
		data = [articles.articles[-1]]
	} else {
		data[0].text = req.body.text
	}
	res.send({articles: data})
}

module.exports = app => {
	app.post('/article', addArticle)
	app.get('/articles/:id?', getArticles)
	app.put('/articles/:id')
}

