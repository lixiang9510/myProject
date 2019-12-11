
import {
	ADD_TODO,
	DEL_TODO,
	SELECT_ALL_TODO,
	DEL_ALL_DONE
} from './types.js'


export default {
	[ADD_TODO](state,todo){
		//第一个参数是state里面的数据
		//第二个参数是action传递过来的todo
		state.todos.unshift(todo);
	},
	[DEL_TODO](state,index){
		state.todos.splice(index,1)
	},
	[SELECT_ALL_TODO](state,value){
		state.todos.forEach(item=>{
			item.done = value
		})
	},
	[DEL_ALL_DONE](state){
		state.todos = state.todos.filter(item=>!item.done)
	}
}