
const Reducer = (state =  {
	nextId: 2,
	todoItems: [
	    {id: 0, text: "This is an item", done: false},
	    {id: 1, text: "Another item", done: false}
	]
}, action) => {
	switch(action.type) {
		case 'ADD_TODO':
			// IMPLEMENT ME
			var newTodo = {id: state.nextId++, text: action.text, done: false}
			var newState = {nextId: state.nextId, todoItems: [...state.todoItems, newTodo]}
			return newState
		case 'REMOVE_TODO':
			// IMPLEMENT ME
			var newState = {nextId: state.nextId, todoItems: state.todoItems.filter(({id, text}) => id != action.id)}
			return newState
		case 'TOGGLE_TODO':
			// IMPLEMENT ME
			var newState = {nextId: state.nextId, todoItems: state.todoItems.map(({id, text, done}) => 
				{ if (id == action.id) {return {id,text,done:!done}}
				else {return {id,text,done}}
			}) }
			return newState
		default: 
			return state
	}
}

export default Reducer