
import {CHANGE_INPUT_VAL,ADD_ITEM,DEL_ITEM,LOAD_DATA} from './actionTypes.js';
import axios from 'axios'; //为了发送ajax

export const getAddAction = ()=>{
	return {
		type:ADD_ITEM
	}
}
export const getChangeAction = (value)=>{
	return {
		type:CHANGE_INPUT_VAL,
		payload:value
	}
}
export const getDeleteAction = (index)=>{
	return {
		type:DEL_ITEM,
		payload:index
	}
}
export const getLoadDataAction = (payload)=>{
	return {
		type:LOAD_DATA,
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