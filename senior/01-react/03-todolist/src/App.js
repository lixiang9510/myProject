// export const a = 2;

import React,{Component,Fragment} from 'react';
import ItemLi from './ItemLi.js'
import './App.css'


class App extends Component{
	constructor(props){
		super(props);
		this.state={
			list:["睡觉","吃饭","学习"],
			val:''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
	}
	handleAdd(){
		this.setState(preState=>{
			return {
				list:[...preState.list,preState.val],
				val:''
			}
			
		},()=>{
			 console.log(this.ul.querySelectorAll('li'))
		})
		// console.log(this.ul.querySelectorAll('li'))
	}
	handleChange(ev){
		// const value = ev.target.value;
		const value = this.input.value
		this.setState(()=>({val:value}))
	}
	handleDel(index){
		const list = [...this.state.list];
		list.splice(index,1);
		this.setState(()=>{
			return {
				list
			}
		})
	}
	getItem(){
		return this.state.list.map((item,index)=>{
			return <ItemLi key={index} content={item} handleDel={this.handleDel.bind(this,index)} index={index} />
		})
	}
	render(){
		return (
			<div className="App">
				<input 
					onChange={this.handleChange} 
					value={this.state.val}
					ref={(input)=>{
						this.input = input;
					}}
				/>
				<button onClick={this.handleAdd}>提交</button>
				<ul ref={(ul)=>{
					this.ul=ul;
				}}>
					{
						this.getItem()
					}
				</ul>
			</div>
			)
	}
};


export default App