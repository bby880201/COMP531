import { expect } from 'chai'
import { go, sleep, findId, findCSS, By, driver } from './selenium'
import common from './common'

describe('Test feed articles and comment functions in main page', () => {
	before('should log in', (done) => {
		go().then(common.login).then(done)
	})

	it('should create new article and validate article appears in feed', (done) => {
		const text = 'This is a new article for test purpose!'
		sleep(500)
		.then(findId('newPost').sendKeys(text))
		.then(findId('newPostBtn').click())
		.then(sleep(500))
		.then(driver.findElements(By.className('feed'))
			.then(arr=>{
				arr[0].getText().then(cont => {
					expect(cont).to.equal(text)
				}).then(done)
			})
		)
	})

	it('should edit an article and validate changed article text', (done) => {
		const text = 'This is a new article for test purpose!'
		sleep(500)
		.then(findId('newPost').sendKeys('some random text'))
		.then(findId('newPostBtn').click())
		.then(sleep(500))
		.then(driver.findElements(By.className('feedEdit'))
			.then(arr=>{
				arr[0].click()
			})
			.then(driver.findElement(By.className('artEdit'))
				.then(ele=>{
					ele.clear()
					ele.sendKeys(text)
				})
				.then(driver.findElement(By.className('feedEditBtn')).click()
					.then(driver.findElements(By.className('feed'))
						.then(arr=>{
							arr[0].getText().then(cont => {
								expect(cont).to.equal(text)
							}).then(done)
						})
					)
				)
			)
		)
	})

	after('should log out', (done) => {
		common.logout().then(done)
	})
})
