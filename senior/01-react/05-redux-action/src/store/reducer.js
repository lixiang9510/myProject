import {CHANGE_INPUT_VAL,ADD_ITEM,DEL_ITEM} from './actionTypes.js'

const defaultState = {
	list:["睡觉","吃饭","学习"],
	val:''
}
export default (state=defaultState,action)=>{
	if(action.type == CHANGE_INPUT_VAL){
		let newState = JSON.parse(JSON.stringify(state))
		newState.val = action.payload;
		return newState
	}
	if(action.type ==ADD_ITEM){
		let newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.val)
		newState.val='';
		return newState
	}
	if(action.type == DEL_ITEM){
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1)
		return newState
	}
	return state;
}