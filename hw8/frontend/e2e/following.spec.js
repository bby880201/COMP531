import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test add/remove friend functions in main page', () => {
	before('should log in', (done) => {
		go().then(common.login).then(done)
	})

	it('should add the follower user and verify following count increases by one', (done) => {
		const newFriend = 'sep1'
		let count
		sleep(500)
		.then(driver.findElements(By.name('flwRm'))
			.then(arr=>{
				count = arr.length
			})
		)
		.then(findId('newFrd').sendKeys(newFriend))
		.then(findId('addFrd').click())
		.then(sleep(1000))
		.then(driver.findElements(By.name('flwRm'))
			.then(arr=>{
				expect(arr.length).to.equal(count+1)
			})
			.then(done)
		)	
	})

	it('should remove the follower user and verify following count decreases by one', (done) => {
		let count
		sleep(500)
		.then(driver.findElements(By.name('flwRm'))
			.then(arr=>{
				count = arr.length
				arr[0].click()
			})
		)
		.then(sleep(1000))
		.then(driver.findElements(By.name('flwRm'))
			.then(arr=>{
				expect(arr.length).to.equal(count-1)
			})
			.then(done)
		)	
	})

	after('should log out', (done) => {
		common.logout().then(done)
	})
})