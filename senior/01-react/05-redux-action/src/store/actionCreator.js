
import {CHANGE_INPUT_VAL,ADD_ITEM,DEL_ITEM} from './actionTypes.js'
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