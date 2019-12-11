
import {
	ADD_TODO,
	DEL_TODO,
	SELECT_ALL_TODO,
	DEL_ALL_DONE
} from './types.js'

export default {
	addTodo({commit},todo){
		//第一个参数：commit getters...方法
		//第二个参数：{task: "22", done: false}
		commit(ADD_TODO,todo)
	},
	delTodo({commit},index){
		commit(DEL_TODO,index)
	},
	selectAllDone({commit},value){
		commit(SELECT_ALL_TODO,value)
	},
	delAllDone({commit}){
		commit(DEL_ALL_DONE)
	}
}