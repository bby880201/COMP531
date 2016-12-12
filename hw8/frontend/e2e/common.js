import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
	username: "bb26test",
	password: "center-each-train"
}

exports.login = () => 
	sleep(1000)
	.then(findId('username').clear())
	.then(findId('password').clear())
	.then(findId('username').sendKeys(exports.creds.username))
	.then(findId('password').sendKeys(exports.creds.password))
	.then(findId('login').click())
	.then(sleep(2000))

exports.logout = () =>
	sleep(500)
	.then(findId('logout').click())
	.then(sleep(500))
