import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test profile update functions in main page and profile page', () => {
	before('should log in', (done) => {
		go().then(common.login).then(done)
	})

	it('should update headline and verify change', (done) => {
		const text = 'new headline for test!'
		sleep(500)
		.then(findId('newHdl').sendKeys(text))
		.then(findId('hdlPost').click())
		.then(sleep(500))
		.then(findId('hdl').getText()
			.then(hdl=>{
				expect(hdl).to.equal('"'+text+'"')
			})
			.then(done)
		)
	})
	
	it('should update user email, zipcode, password and verify', (done) => {
		const email = 'abc@aaa.ccc'
		const zip = '12345'
		const pwd = 'newpwd'

		sleep(500)
		.then(findId('toProfile').click())
		.then(sleep(500))
		.then(findId('newEmail').sendKeys(email))
		.then(findId('newZip').sendKeys(zip))
		.then(findId('newPwd').sendKeys(pwd))
		.then(findId('pwdCnf').sendKeys(pwd))
		.then(sleep(1000))
		.then(findId('updateInfo').click())
		.then(sleep(1000))
		.then(findId('emailProf').getText()
			.then(eml=>{
				expect(eml).to.equal(email)
			})
		)
		.then(findId('zipProf').getText()
			.then(newzip=>{
				expect(newzip).to.equal(zip)
			})
		)
		.then(findId('errMsg').getText()
			.then(err=>{
				expect(err).to.equal('Password update success but server side will not change')
			})
		)
		.then(done)
	})

	after('should log out', (done) => {
		common.logout().then(done)
	})
})
