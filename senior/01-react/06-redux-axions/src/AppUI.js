// export const a = 2;

import React,{Component,Fragment} from 'react';
import { Button,Input,Row,Col,List } from 'antd';
import './App.css'
const AppUI = (props)=>{
	const {handleChange,value,handleAdd,list,handleDel} = props
	return (
		<div className="App">
			<Row>
				<Col span={12}>
					<Input 
						onChange={handleChange} 
						value={value}
					/>
				</Col>
				<Col span={12}>
					<Button type="primary"  onClick={handleAdd}>提交</Button>
				</Col>
			</Row>
			<List 
				style={{marginTop:'10px'}}
				bordered
				dataSource={list}
				renderItem={
					(item,index)=>{
						return <List.Item style={{cursor:'pointer'}} onClick={()=>{handleDel(index)}}>{item}</List.Item>
					}
				}
			/>
		</div>
	)
};
export default AppUI