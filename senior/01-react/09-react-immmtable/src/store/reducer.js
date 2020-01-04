
// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable'

import {reducer as todoListReducer } from '../page/todoList/store';

export default combineReducers({
	todoList:todoListReducer
})