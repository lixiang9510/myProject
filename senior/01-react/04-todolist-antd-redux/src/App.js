// export const a = 2;

import React,{Component,Fragment} from 'react';
import { Button,Input,Row,Col,List } from 'antd';
import store from './store/index.js'
import './App.css'


class App extends Component{
	constructor(props){
		super(props);
		// this.state={
		// 	list:["睡觉","吃饭","学习"],
		// 	val:''
		// }
		// console.log(store)
		this.state = store.getState();
		store.subscribe(()=>{
			this.setState(()=>{
				// console.log(store.getState())
				return store.getState()
			})
		})
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	
	handleAdd(){
		let action = {
			type:'add_item'
		}
		store.dispatch(action)
	}
	handleChange(ev){
		const value = ev.target.value;
		const action = {
			type:"change_input_val",
			payload:value
		}
		store.dispatch(action)
	}
	handleDel(index){
		const action = {
			type:'del_item',
			payload:index
		}
		store.dispatch(action)
	}
	render(){
		return (
			<div className="App">
				<Row>
					<Col span={12}>
						<Input 
							onChange={this.handleChange} 
							value={this.state.val}
							// ref={(input)=>{
							// 	this.input = input;
							// }}
						/>
					</Col>
					<Col span={12}>
						<Button type="primary"  onClick={this.handleAdd}>提交</Button>
					</Col>
				</Row>
				<List 
					style={{marginTop:'10px'}}  
					bordered
					dataSource={this.state.list}
					renderItem={
						(item,index)=>{
							return <List.Item style={{cursor:'pointer'}} onClick={this.handleDel.bind(this,index)}>{item}</List.Item>
						}
					}
				/>
			</div>
			)
	}
};


export default App