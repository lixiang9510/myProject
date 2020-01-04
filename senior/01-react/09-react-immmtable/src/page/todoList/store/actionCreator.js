
import * as types from './actionTypes.js'
import axios from 'axios'; //为了发送ajax

export const getAddAction = ()=>{
	return {
		type:types.ADD_ITEM
	}
}
export const getChangeAction = (value)=>{
	return {
		type:types.CHANGE_INPUT_VAL,
		payload:value
	}
}
export const getDeleteAction = (index)=>{
	return {
		type:types.DEL_ITEM,
		payload:index
	}
}
export const getLoadDataAction = (payload)=>{
	return {
		type:types.LOAD_DATA,
		payload
	}
}
export const getIniDataAction = ()=>{
	return (dispatch)=>{
		axios
		.get('http://127.0.0.1:3000')
		.then(result=>{
			const payload = result.data;
			const action = getLoadDataAction(payload);
			dispatch(action)
		})
		.catch(err=>{
			console.log(err)
		})		
	}
}