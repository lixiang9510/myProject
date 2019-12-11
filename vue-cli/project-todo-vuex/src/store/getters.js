

export default {
	allTodo(state){
		return state.todos.length
	},
	todoDone(state){
		let allDone = 0;
		state.todos.forEach(item=>{
			if(item.done){
				allDone++
			}
		})
		return allDone
	},
	allDone(state,getter){
		return (getter.allTodo == getter.todoDone) && (getter.allTodo != 0)
	}
}