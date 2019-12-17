

const express = require('express')
const UserModel = require('../models/user.js')
const pagination = require('../utils/pagination.js')

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
	console.log(UserModel)
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

//用户列表渲染
router.get("/users",(req,res)=>{
	/*
	const limit = 2;
	let { page } = req.query;
	page = parseInt(page)
	if(isNaN(page)){
		page = 1
	}
	UserModel.countDocuments({})
	.then(counts=>{
		const pages = Math.ceil(counts/limit)
		
		if(page == 0){
			page = 1
		}
		if(page>pages){
			page = pages
		}
		let list = [];
		for(i=1;i<=pages;i++){
			list.push(i)
		}
		const skip = (page-1)*limit;
		UserModel.find({},"-password -__v")
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user-list',{
				userInfo:req.userInfo,
				users,
				page,
				list,
				pages
			})	
		})
	})
	*/
	const options = {
		limit:2,
		page:req.query.page,
		query:{},
		projection:"-password -__v",
		model:UserModel,
		sort:{id:-1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/user-list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/admin/users"
		})
		
	})
	.catch(error=>{
		console.log(error)
	})

})



module.exports = router