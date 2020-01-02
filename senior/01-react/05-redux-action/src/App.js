// export const a = 2;

import React,{Component,Fragment} from 'react';
import { Button,Input,Row,Col,List } from 'antd';
import store from './store/index.js'
import {getAddAction,getChangeAction,getDeleteAction} from './store/actionCreator.js';
import AppUI from './AppUI.js'



class App extends Component{
	constructor(props){
		super(props);
		this.state = store.getState();
		store.subscribe(()=>{
			this.setState(()=>{
				return store.getState()
			})
		})
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDel = this.handleDel.bind(this)
	}
	handleAdd(){
		let action = getAddAction();
		store.dispatch(action)
	}
	handleChange(ev){
		const value = ev.target.value;
		const action = getChangeAction(value)
		store.dispatch(action)
	}
	handleDel(index){
		const action = getDeleteAction(index)
		store.dispatch(action)
	}
	render(){
		return (
			<AppUI 
				handleChange={this.handleChange}
				value={this.state.val}
				handleAdd={this.handleAdd}
				list={this.state.list}
				handleDel={this.handleDel}
			/>	
		)
	}
};


export default App