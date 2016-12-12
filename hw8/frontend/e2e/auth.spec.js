import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test login and register function of landing page', () => {

	before('should log in', (done) => {
		go().then(common.login).then(done)
	})

	it('should log in as the test user', (done) => {
		sleep(500)
		.then(findId('mainName').getText()
		.then(text => {
			expect(text).to.equal(common.creds.username)
		})
		.then(done))
	})

	it('should log out', (done) => {
		sleep(500)
		.then(common.logout)
		.then(findId('username').getText())
		.then(text => {
			expect(text).to.be.undefined
		})
		.then(done)
	})

	const entries = {account:'bb27', display:'test', email:'abc@xyz.com', 
	phone:'123-321-1234', dob:'11/11/1111', zip:'12345', pwd:'pwd', pwdcnf:'pwd'}

	it('should register new user', (done) => {
		sleep(500)
		.then(findId('account').clear())
		.then(findId('account').sendKeys(entries['account']))
		.then(findId('display').clear())
		.then(findId('display').sendKeys(entries['display']))
		.then(findId('email').clear())
		.then(findId('email').sendKeys(entries['email']))
		.then(findId('phone').clear())
		.then(findId('phone').sendKeys(entries['phone']))
		.then(findId('dob').sendKeys(entries['dob']))
		.then(findId('zip').clear())
		.then(findId('zip').sendKeys(entries['zip']))
		.then(findId('pwd').clear())
		.then(findId('pwd').sendKeys(entries['pwd']))
		.then(findId('pwdcnf').clear())
		.then(findId('pwdcnf').sendKeys(entries['pwdcnf']))
		.then(findId('signup').click())
		.then(sleep(1000))
		.then(findId('errMsg').getText().then(text=>{
			expect(text).to.equal('Register success but can\'t log in')
		})
		.then(done))
	})
})