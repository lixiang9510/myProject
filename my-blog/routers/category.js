const express = require('express')
const CategoryModel = require('../models/category.js')
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
	const options = {
		limit:2,
		page:req.query.page,
		query:{},
		projection:"-password -__v",
		model:CategoryModel,
		sort:{order:-1}
	}
	pagination(options)
	.then(data=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/category'
		})
		
	})
	.catch(error=>{
		console.log(error)
	})
})

//显示添加分类
router.get("/add",(req,res)=>{
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})

//处理添加分类
router.post("/add",(req,res)=>{
	const { name,order } = req.body;
	CategoryModel.findOne({name})
	.then(category=>{
		if(category){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"分类名称已经存在"
			})
		}else{
			CategoryModel.insertMany({
				name,
				order
			})
			.then(result=>{
				res.render('admin/success',{
					userInfo:req.userInfo,
					message:"添加分类成功",
					url:"/category"
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

//显示编辑分类页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.findOne({_id:id})
	.then(category=>{
		res.render('admin/category_add_edit',{
			userInfo:req.userInfo,
			category
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})
})


//处理编辑页面
router.post('/edit',(req,res)=>{
	const { id,name,order } = req.body;
	CategoryModel.findOne({_id:id})
	.then(category=>{
		if(category.name == name && category.order == order){
			res.render('admin/error',{
				userInfo:req.userInfo,
				message:"分类没有修改，不能提交"
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(newCategory=>{
				if(newCategory){
					res.render('admin/error',{
						userInfo:req.userInfo,
						message:"分类名称已经存在，不能修改"
					})					
				}else{
					CategoryModel.updateOne({_id:id},{name:name,order:order})
					.then(result=>{
						res.render('admin/success',{
							userInfo:req.userInfo,
							message:"修改分类成功",
							url:"/category"
						})
					})
					.catch(err=>{
						throw err
					})
				}
			})
			.catch(err=>{
				throw err;
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
//处理删除操作
router.get('/delete/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"删除分类成功",
			url:"/category"
		})
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})
})


module.exports = router