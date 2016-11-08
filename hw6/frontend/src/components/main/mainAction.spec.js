import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import { expect } from 'chai'

import { UpdateToServer, ToggleComment, ArticleFilter } from './mainAction'

describe('Main actions tests', () => {
	let resource, url
	beforeEach(() => {
		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			resource = require('../../serverAccess').resource
			url = require('../../serverAccess').url

		}
	})

	afterEach(() => {
		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
		}
	})
	
	it('should dispatch new article', (done)=> {
		mock(`${url}/article`, {
			method: 'POST',
			headers: {'Content-Type':'application/json'},
			json:{
				articles: ['test']
			}
		})

		UpdateToServer('test', 'article')((action)=>{
			expect(action).to.eql({type: 'ADD_ARTICLE', data: ['test']})
		})
		done()
	})
	
	it('should dispatch new article', (done)=> {
		mock(`${url}/headline`, {
			method: 'PUT',
			headers: {'Content-Type':'application/json'},
			json:{
				username: 'test',
				headline: 'test headline'
			}
		})

		UpdateToServer('test', 'headline')((action)=>{
			expect(action).to.eql({type: 'UPDATE_HEADLINE', data: {
				username: 'test',
				headline: 'test headline'
			}})
		})
		done()
		
	})
})