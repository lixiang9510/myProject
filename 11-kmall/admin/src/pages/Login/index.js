/*
* @Author: TomChen
* @Date:   2019-04-09 19:29:30
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 20:54:27
*/

import React,{ Component,Fragment } from 'react'
import axios from 'axios';

import { Form, Input, Button,message } from 'antd';

import './index.css'

class NormalLoginForm extends Component {
  constructor(props){
  	super(props);
  	this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ',values);
        axios({
        	method:'post',
        	url:'http://127.0.0.1:3000/admin/login',
        	data:values
        })
        .then(result=>{
        	if(result.data.code == 0){
            window.location.href = '/';
          }else if(result.data.code ==1){
            message.error(result.data.message)
          }
        })
        .catch(err=>{
        	console.log(err);
          message.error('网络请求失败');
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
    	<div className="Login">
			<Form className="login-form">
			<Form.Item>
			  {getFieldDecorator('username', {
			    rules: [{ required: true, message: '请输入用户名!' },{ pattern: /^[a-z0-9_]{3,6}$/, message: '用户名为3-6位的字母,数字或者下划线!' }],
			  })(
			    <Input  placeholder="用户名" />
			  )}
			</Form.Item>
			<Form.Item>
			  {getFieldDecorator('password', {
			    rules: [{ required: true, message: '请输入密码!' },{ pattern: /^\w{3,6}$/, message: '密码为3到6位的字符!' }],
			  })(
			    <Input type="password" placeholder="密码" />
			  )}
			</Form.Item>
			<Form.Item>
			  <Button 
			  	type="primary" 
			  	onClick={this.handleSubmit}
			  	className="login-form-button" 
			  >
			    登录
			  </Button>
			</Form.Item>
			</Form>
		</div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);


export default WrappedNormalLoginForm;