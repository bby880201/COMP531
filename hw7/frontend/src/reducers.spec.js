import { expect } from 'chai'
import Reducer from './reducers'
import { user, friends, articles, headlines, avatars, error } from './reducers'

const initState = {
			articles: {
				keyWord: '',
				list: []
			},
			avatars: {
				dict: {}
			},
			headlines: {
				dict: {}
			},
			friends: {
				n: 0,
				list: []
			},
			user: {
				location: 'LANDING'
			},
			error: {}
		}

describe('Reducer tests', () => {
	it('should initialize state', () => {
		expect(Reducer({}, {})).to.eql(initState)
	})

	it('should clear state when logout', () => {
		const before = {
			articles: {
				keyWord: 'test',
				list: ['a','b','c']
			},
			avatars: {
				dict: {a:'a',b:'b',c:'c'}
			},
			headlines: {
				dict:  {a:'a',b:'b',c:'c'}
			},
			friends: {
				n: 3,
				list: ['a','b','c']
			},
			user: {
				username: 'test',
				email: 'test@test.com',
				zipcode: 12345,
				birthday: 1477353663923,
				location: 'MIAN'
			},
			error: {}
		}
		expect(Reducer(before, {type:'LOGOUT'}))
		.to.eql(initState)
	})
})

describe('user reducer tests', () => {
	it('should state success', () => {
		const before = initState.user
		const logged = user(before, {type:'LOGIN', data:{username:'test'}})
		expect(logged)
		.to.eql({'username':'test',location:'MAIN'})

		const toProfile = user(logged, {type:'TO', location:'PROFILE'})
		expect(toProfile)
		.to.eql({'username':'test',location:'PROFILE'})

		const newInfo = {
			email: 'test@test.com',
			zipcode: 12345,
			birthday: 1477353663923,
		}

		expect(user(toProfile,{type:'UPDATE_INFO', data:newInfo}))
		.to.eql({...toProfile, ...newInfo})
	})
})

describe('articles reducer tests', () => {
	const before = initState.articles
	const testArticles = {
			keyWord: '',
			articles: [{
				_id: 1,
				author: 'test',
				date: '10/11/1222',
				text: 'test testtest testtesttesttest',
				img: null,
				commentOn: false,
				comments: [{					
					author: 'bbb',
					commentId: 11,
					date: '10/11/1223',
					text: 'tes testte test'
				}]
			}]
		}

	it('should set the articles', () => {
		const logged = articles(before, {type:'LOGIN', data:testArticles})
		expect(logged)
		.to.eql({...before,list: testArticles.articles})
	})

	it('should set the search keyword', () => {
		const search = articles(before, {type:'FILTER_ARTICLE', keyWord:'test'})
		expect(search.keyWord)
		.to.eql('test')
	})

	it('should toggle comments', () => {
		const logged = articles(before, {type:'LOGIN', data:testArticles})
		var toggled = articles(logged, {type:'TOGGLE_COMMENT', _id:1})
		expect(toggled.list[0].commentOn)
		.to.eql(true)

		toggled = articles(toggled, {type:'TOGGLE_COMMENT', _id:1})
		expect(toggled.list[0].commentOn)
		.to.eql(false)
	})
})

describe('avatars reducer tests', () => {
	const before = initState.avatars
	const testAvatars = {
		test1: 'aaa',
		test2: 'bbb',
		test3: 'ccc'
	}
	it('should state success', () => {
		const logged = avatars(before, 
			{type: 'LOGIN', data:{avatars:testAvatars}})
		expect(logged.dict)
		.to.eql(testAvatars)

		const newAvatars = {
			test1: 'abc',
			test4: 'ddd'
		}

		const updated = avatars(logged, 
			{type:'UPDATE_AVATAR', data:{avatars:newAvatars}})
		expect(updated.dict)
		.to.eql({...testAvatars, ...newAvatars})
	})
})

describe('headlines reducer tests', () =>{
	const before = initState.headlines
	const testHeadlines = {
		test1: 'aaa',
		test2: 'bbb',
		test3: 'ccc'
	}

	it('should state success', () => {
		const logged = headlines(before, 
			{type: 'LOGIN', data:{headlines:testHeadlines}})
		expect(logged.dict)
		.to.eql(testHeadlines)

		const newHeadlines = {
			username: 'test1',
			headline: 'abc'
		}

		const updated = headlines(logged, 
			{type:'UPDATE_HEADLINE', data:newHeadlines})
		expect(updated.dict)
		.to.eql({...testHeadlines, test1: 'abc'})
	})
})

describe('friends reducer tests', () => {
	const before = initState.friends
	const testFriends = {
		n:5,
		friends: ['test1','test0','test4','test2','test3']
	}

	it('should state success', () => {
		const logged = friends(before,
			{type:'LOGIN', data:{friends:testFriends}})
		expect(logged)
		.to.eql(testFriends)
	})
})

describe('error reducer tests', () => {
	it('should state error', () => {
		const before = initState.error
		expect(error(before, {type:'LOGIN_ERR', data:'testerr'}))
		.to.eql({loginErr:'testerr'})
		
		expect(error(before, {type:'LOGOUT_ERR', data:'testerr'}))
		.to.eql({logoutErr:'testerr'})

		expect(error(before, {type:'MAIN_ERR', data:'testerr'}))
		.to.eql({mainErr:'testerr'})
	})

	it('should clear all error', () => {
		const errors = {
			loginErr: 'test loginErr',
			logoutErr: 'test logoutErr',
			mainErr: 'test mainErr'
		}
		expect(error(errors, {type:'ERR_CLEAR'}))
		.to.eql({})
	})
})