
const defaultState = {
	list:["睡觉","吃饭","学习"],
	val:''
}
export default (state=defaultState,action)=>{
	if(action.type == 'change_input_val'){
		let newState = JSON.parse(JSON.stringify(state))
		newState.val = action.payload;
		return newState
	}
	if(action.type =='add_item'){
		let newState = JSON.parse(JSON.stringify(state))
		newState.list.push(state.val)
		newState.val='';
		return newState
	}
	if(action.type == 'del_item'){
		let newState = JSON.parse(JSON.stringify(state));
		newState.list.splice(action.payload,1)
		return newState
	}
	return state;
}