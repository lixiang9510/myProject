import { fromJS } from 'immutable'
import * as types from './actionTypes.js'

const defaultState = fromJS({
	list:["睡觉","吃饭","学习"],
	val:'写程序'
})
export default (state=defaultState,action)=>{
	if(action.type == types.CHANGE_INPUT_VAL){
		/*
		let newState = JSON.parse(JSON.stringify(state))
		newState.val = action.payload;
		return newState
		*/
		return state.set('val',action.payload)
	}
	if(action.type ==types.ADD_ITEM){
		/*
		let newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.val)
		newState.val='';
		return newState
		*/
		let list = state.get('list');
		list.push(state.get('val'));
		return state.merge({
			list,
			val:''
		})
	}
	if(action.type == types.DEL_ITEM){
		/*
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1)
		return newState
		*/
		let list = [...state.get('list')];
		list.splice(action.payload,1);
		return state.set('list',list)
	}
	if(action.type == types.LOAD_DATA){
		/*
		let newState = JSON.parse(JSON.stringify(state));
		newState.list = action.payload;
		return newState
		*/
		return state.set('list',action.payload)

	}

	return state;
}