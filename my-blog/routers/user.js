const express = require('express')
const UserModel = require('../models/user.js')
const hmac = require('../utils/hmac.js')

const router = express.Router()

//处理注册
router.post("/register",(req,res)=>{
	const { username,password } = req.body;
	const result = {
		status:0,
		message:''
	}
	UserModel.findOne({username})
	.then(user=>{
		if(user){
			result.status = 10;
			result.message = "该用户名已存在";
			res.json(result);
		}else{
			UserModel.insertMany({
				username,
				password:hmac(password),
				// isAdmin:true
			})
			.then(user=>{
				result.message = "注册成功";
				res.json(result)
			})
			.catch(error=>{
				throw error
			})
		}
	})
	.catch(error=>{
		result.status = 10;
		result.message = "服务器端错误，请稍后再试";
		res.json(result);
	})
})

//处理登陆
router.post("/login",(req,res)=>{
	const { username,password } = req.body;
	const result = {
		status:0,
		message:''
	}
	UserModel.findOne({username,password:hmac(password)},"-password -__v")
	.then(user=>{
		if(user){
			result.data = user;
			// req.cookies.set('userInfo',JSON.stringify(user))
			req.session.userInfo=user
			res.json(result);
		}else{
			result.status = 10;
			result.message = "用户名或密码不正确";
			res.json(result)
		}
	})
	.catch(error=>{
		result.status = 10;
		result.message = "服务器端错误，请稍后再试";
		res.json(result);
	})
})

//处理退出
router.get("/layout",(req,res)=>{
	const result = {
		status:0,
		message:''
	}
	req.session.destroy();
	res.json(result)
})



module.exports = router