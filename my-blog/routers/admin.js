

const express = require('express')
const multer  = require('multer')
const upload =  multer({ dest: 'public/uploads/' })
const UserModel = require('../models/user.js')
const CommentModel = require('../models/comment.js')
const pagination = require('../utils/pagination.js')
const hmac = require('../utils/hmac.js')

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

//处理评论显示
router.get('/comments',(req,res)=>{
	CommentModel.getPaginationComments(req,{},10)
	.then(data=>{
		res.render('admin/comment_list',{
			userInfo:req.userInfo,
			comments:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:"/admin/comments"
		})
	})
})
//处理评论删除
router.get('/comment/delete/:id',(req,res)=>{
	const {id} = req.params;
	CommentModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"添加分类成功",
			url:"/admin/comments"
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"删除分类失败成功",
		})
	})
})
//修改密码页面
router.get('/password',(req,res)=>{
	res.render('admin/password',{
		userInfo:req.userInfo
	})
})
//修改密码处理
router.post('/password',(req,res)=>{
	const { password } = req.body;
	UserModel.findOne({_id:req.userInfo._id})
	.then(user=>{
		if(user.password == hmac(password)){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"密码没有修改，不能提交"
			})
		}else{
			UserModel.updateOne({_id:req.userInfo._id},{password:hmac(password)})
			.then(result=>{
				req.session.destroy();
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"修改密码成功，请重新登陆",
					go:"/"
				})
			})
			.catch(err=>{
				throw err
			})
		}
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})
})
module.exports = router