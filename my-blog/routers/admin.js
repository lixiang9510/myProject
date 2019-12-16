const express = require('express')
const UserModel = require('../models/user.js')

const router = express.Router()

router.use((req,res,next)=>{
	if(req.userInfo.isAdmin){
		next()
	}else{
		res.send('<h1>请用管理员账号登录</h1>')
	}
})

//显示首页
router.get("/",(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

//用户列表渲染
router.get("/users",(req,res)=>{
	UserModel.find({},"-password -__v")
	.then(users=>{
		res.render('admin/user-list',{
			userInfo:req.userInfo,
			users
		})	
	})
})



module.exports = router