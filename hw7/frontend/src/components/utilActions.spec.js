
import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

import { Logout, NavigateTo, ClearError } from './utilActions' 

describe('Logout and Error clear action tests', () => {
	let resource, url
	beforeEach(() => {
		if (mockery.enable) {
			mockery.enable({warnOnUnregistered: false, useCleanCache:true})
			mockery.registerMock('node-fetch', fetch)
			require('node-fetch')
			resource = require('../serverAccess').resource
			url = require('../serverAccess').url
		}
	})

	afterEach(() => {
		if (mockery.enable) {
			mockery.deregisterMock('node-fetch')
			mockery.disable()
		}
	})

	it('should log out a user', (done) => {
		mock(`${url}/logout`, { 
			method: 'PUT',
			headers: {'Content-Type': 'application/json'}
		})
		Logout()((action) =>{
			expect(action).to.eql({type:'LOGOUT'})
		})
		done()
	})

	it('should clear error', (done) => {
		ClearError()((action) => {
			expect(action).to.eql({type:'ERR_CLEAR'})
		})
		done()
	})

	it('should navigate to other pages', (done) => {
		NavigateTo('LANDING')((action) => {
			expect(action).to.eql({ type: 'TO', location: 'LANDING'})
		})
		done()
	})
})
