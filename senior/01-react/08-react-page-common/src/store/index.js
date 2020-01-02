
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
//为了使app.js页面各个函数操作派发的都是action
//加了以后就可以返回函数 store.dispatch本来是不可以派发函数的的，现在就可以了
import {createLogger} from 'redux-logger';
import reducer from './reducer.js'

let middleArgs = [thunk];
if(process.env.NODE_ENV != 'production'){
	let logger = createLogger({})
	middleArgs.push(logger)
}
const store = createStore(reducer,applyMiddleware(...middleArgs));

export default store