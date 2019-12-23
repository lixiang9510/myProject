const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')

const router = express.Router()


//显示首页
async function getCommonData(req){
	const getCategoriesPromise = CategoryModel.find({},'name').sort({_id:-1});
	const getArticlesPromise = ArticleModel.getPaginationArticles(req);
	const getTopArticlesPromise = ArticleModel.find({},'_id click title').sort({click:-1}).limit(10);
	const categories = await getCategoriesPromise;
	const articles = await getArticlesPromise;
	const topArticles = await getTopArticlesPromise;
	return {
		categories,
		articles,
		topArticles
	}
}
router.get("/",(req,res)=>{
	/*
	CategoryModel.find({},'name')
	.sort({_id:-1})
	.then(categories=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories
		})
	})
	*/
	getCommonData(req)
	.then(data=>{
		const {categories,articles,topArticles} = data;
		res.render('main/index',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			articles:articles.docs,
			page:articles.page,
			list:articles.list,
			pages:articles.pages,
			url:'/article'
		})
	})
})
//显示首页文章
router.get('/articles',(req,res)=>{
	ArticleModel.getPaginationArticles(req)
	.then(data=>{
		res.json({
			status:0,
			data
		})	
	})
	.catch(err=>{
		console.log(err)
	})
	
})



module.exports = router