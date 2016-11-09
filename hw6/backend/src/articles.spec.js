const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = 'https://ricebook-bb26.herokuapp.com'

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url+"/articles")
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles.length>=3).to.be.true
		})
		.then(done)
		.catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', 
	(done) => {
		
		let id
		fetch(url+"/article", {
			method: "POST",
			headers: {
      			'Content-Type': 'application/json'
    		},
    		body: JSON.stringify({
        		text: 'test article'
    		})
    	})
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			expect(JSON.parse(body).articles[0].id).to.exist
			id = JSON.parse(body).articles[0].id
			expect(JSON.parse(body).articles[0].id).to.eql(id)
			expect(JSON.parse(body).articles[0].author).to.eql('Boyang')
			expect(JSON.parse(body).articles[0].text).to.eql("abcdefg")
		}).then (
			fetch(url+"/article", {
				method: "POST",
				headers: {
	      			'Content-Type': 'application/json'
	    		},
	    		body: JSON.stringify({
	    			"text": "random text"
	    		})
	    	})
			.then(res => {
				expect(res.status).to.eql(200)	
				return res.text()
			})
			.then(body => {
				expect(JSON.parse(body).articles[0].id).to.eql(id+1)
				expect(JSON.parse(body).articles[0].author).to.eql('lz43')
				expect(JSON.parse(body).articles[0].text).to.eql("random text")
			})
		)
		.then(done)
		.catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		fetch(url+"/articles")
		.then(res => {
			expect(res.status).to.eql(200)	
			return res.text()
		})
		.then(body => {
			fetch(url+"/articles/" + JSON.parse(body).articles[0].id)
			.then(res => {
				expect(res.status).to.eql(200)	
				return res.text()
			})
			.then(body => {
				expect(JSON.parse(body).articles.length==1).to.be.true
			})
		})
		.then(done)
		.catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		fetch(url+"/articles/100")
			.then(res => {
				expect(res.status).to.eql(200)	
				return res.text()
			})
			.then(body => {
				expect(JSON.parse(body).articles).to.eql([])
			})
			.then(done)
			.catch(done)
	}, 200)
})