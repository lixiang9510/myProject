
import { combineReducers } from 'redux';

import {reducer as todoListReducer } from '../page/todoList/store';

export default combineReducers({
	todoList:todoListReducer
})