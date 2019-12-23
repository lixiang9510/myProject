const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
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
	/*
	const options = {
		limit:2,
		page:req.query.page,
		query:{},
		projection:"-password -__v",
		model:ArticleModel,
		sort:{_id:-1},
		populates:[{path:'author',select:'username'},{path:'category',select:'name'}]
	}
	*/
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			users:data.docs,
			page:data.page,
			list:data.list,
			pages:data.pages,
			url:'/article'
		})
		
	})
	.catch(error=>{
		console.log(error)
	})
})

//显示添加分类
router.get("/add",(req,res)=>{
	CategoryModel.find({},'name')
	.sort({_id:-1})
	.then(categories=>{
		res.render('admin/article_add_edit',{
			userInfo:req.userInfo,
			categories
		})		
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})

})

//处理添加分类
router.post("/add",(req,res)=>{
	const { category,title,intro,content } = req.body;
	ArticleModel.insertMany({
		category,
		title,
		intro,
		content,
		author:req.userInfo._id
	})
	.then(article=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"修改分类成功",
			url:"/article"
		})
	})
	.catch(err=>{
		console.log(err)
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})
	
})

//显示编辑文章页面
router.get('/edit/:id',(req,res)=>{
	const { id } = req.params;
	CategoryModel.find({},'name')
	.sort({_id:-1})
	.then(categories=>{
		ArticleModel.findOne({_id:id})
		.then(article=>{
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				article,
				categories
			})
		})
		.catch(err=>{
			throw err
		})		
	})
	.catch(err=>{
		res.render('admin/error',{
			userInfo:req.userInfo,
			message:"服务器端错误，请稍后重试"
		})
	})
})


//处理编辑文章页面
router.post('/edit',(req,res)=>{
	const { id,category,title,intro,content } = req.body;
	ArticleModel.updateOne({_id:id},{category,title,intro,content})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"修改文章成功",
			url:"/article"
		})
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
	ArticleModel.deleteOne({_id:id})
	.then(result=>{
		res.render('admin/success',{
			userInfo:req.userInfo,
			message:"删除文章成功",
			url:"/article"
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