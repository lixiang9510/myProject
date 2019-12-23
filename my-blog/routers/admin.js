

const express = require('express')
const multer  = require('multer')
const upload =  multer({ dest: 'public/uploads/' })
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
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

//用户列表渲染
router.get("/users",(req,res)=>{
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

//处理上传图片

router.post('/uploadImage',upload.single('upload'),(req,res)=>{
	const uploadedFilePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:uploadedFilePath
	})
})

module.exports = router