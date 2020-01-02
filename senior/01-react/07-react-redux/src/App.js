// export const a = 2;

import React,{Component,Fragment} from 'react';
import { Button,Input,Row,Col,List } from 'antd';
import { connect } from 'react-redux'
import {getAddAction,getChangeAction,getDeleteAction,getIniDataAction} from './store/actionCreator.js';
import './App.css'
class App extends Component{
	componentDidMount(){
		this.props.handleGetInitData();
	};
	render(){
		return (
			<div className="App">
				<Row>
					<Col span={12}>
						<Input 
							value={this.props.val}
							onChange={this.props.handleChange}
						/>
					</Col>
					<Col span={12}>
						<Button type="primary" onClick={this.props.handleAdd}>提交</Button>
					</Col>
				</Row>
				<List 
					style={{marginTop:'10px'}}
					bordered
					dataSource={this.props.list}
					renderItem={
						(item,index)=>{
							return <List.Item style={{cursor:'pointer'}} onClick={()=>{this.props.handleDel(index)}} >{item}</List.Item>
						}
					}
				/>
			</div>
		)
	}
};
const mapStateToProps = (state)=>{
	return {
		val:state.val,
		list:state.list
	}
}
const mapDispatchToProps = (dispatch)=>{
	return {
		handleChange:(ev)=>{
			const value = ev.target.value;
			const action = getChangeAction(value)
			dispatch(action)
		},
		handleAdd:()=>{
			let action = getAddAction();
			dispatch(action)
		},
		handleDel:(index)=>{
			const action = getDeleteAction(index);
			dispatch(action)
		},
		handleGetInitData:()=>{
			const action = getIniDataAction()
			dispatch(action);
		}
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(App)