import { combineReducers } from 'redux'

// handle err actions
export const error = (state = {}, action)=>{
	switch(action.type) {
		case 'LOGIN_ERR':
			return {loginErr: action.data}
		case 'LOGOUT_ERR':
			return {logoutErr: action.data}
		case 'MAIN_ERR':
			return {mainErr: action.data}
		case 'ERR_CLEAR':
			return {}
		default:
			return state
	}
}

export const articles = (state = {keyWord:'', list:[]}, action)=>{
	switch (action.type) {
		case 'LOGOUT':
			return {keyWord:'', list:[]}
		case 'LOGIN':
			return {keyWord: action.data.keyWord, list:[...action.data.articles]}
		case 'TOGGLE_COMMENT':
			return {...state, list: state.list.map((e)=>{
				return e._id===action._id ? {...e, commentOn: !e.commentOn} : e
			})}
		case 'FILTER_ARTICLE':
			return {...state, keyWord:action.keyWord} 
		case 'ADD_ARTICLE':
			return {...state, articles:[...articles, ...action.data]}
		default:
			return state
	}
}

export const headlines = (state = {dict:{}}, action)=>{
	switch (action.type) {
		case 'LOGOUT':
			return {dict:{}}
		case 'LOGIN':
			return {dict:{...action.data.headlines}}
		case 'UPDATE_HEADLINE':
			const newHeadlines = {...state.dict}
			newHeadlines[action.data.username] = action.data.headline
			return {...state, dict: newHeadlines}
		default:
			return state
	}
}

export const avatars = (state = {dict:{}}, action)=>{
	switch (action.type) {
		case 'LOGOUT':
			return {dict:{}}
		case 'LOGIN':
			return {dict:{...action.data.avatars}}
		case 'UPDATE_AVATAR':
			return {...state, dict:{...state.dict, ...action.data.avatars}}
		default:
			return state
	}
}

export const friends = (state = {n:0, list:[]}, action)=>{
	switch (action.type) {
		case 'LOGOUT':
			return {n:0, list:[]}
		case 'LOGIN':
			return {...action.data.friends}
		default:
			return state
	}
}

export const user = (state = {location: 'LANDING'}, action)=>{
	switch(action.type) {
		case'LOGOUT':
			return {location:'LANDING'}
		case 'TO':
			return { ...state, location: action.location }
		case 'LOGIN':
			return { ...state, username: action.data.username, location:'MAIN' }
		case 'UPDATE_INFO':
			return {...state, ...action.data}
		default: 
			return state
	}
}

// separate actions to different reducers
const Reducer = combineReducers({error, articles, headlines, avatars, friends, user})

export default Reducer

