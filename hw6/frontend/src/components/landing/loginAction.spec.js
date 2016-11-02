
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { LocalLogin } from './loginAction' 

describe('Login action tests', () => {
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

	mock(`${url}/login`, { 
		method: 'POST',
		headers: {'Content-Type': 'application/json'},
		json: {
			username: 'test', result: 'success' 
		}
	})
	
	it('should log the user in', (done) => {
		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			json: {
				username: 'test', result: 'success' 
			}
		})
		LocalLogin('user','pwd')((action) =>{
			expect(action).to.eql({type:'LOGIN', username: 'test'})
		})
		done()
	})

	it('should not log in an invalid user', (done) => {
		mock(`${url}/login`, { 
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			status: 401
		})

		LocalLogin()((action) =>{
			expect(action).to.eql({type: "LOGIN_ERR", data:'Username or password is missing'})
		})

		LocalLogin('user','pwd')((action) =>{
			expect(action).to.eql({type:'LOGIN_ERR', data:'Username or password is wrong'})
		})

		done()
	})
})
