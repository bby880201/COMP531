const Reducer = (state = {
	location: "LANDING"
}, action)=>{
	switch(action.type) {
		case 'TO':
			return { ...state, location: action.location }
		case 'LOGIN':
			return { ...state, ...action.data, location:"MAIN" }
		default: 
			return state
	}
}

export default Reducer

