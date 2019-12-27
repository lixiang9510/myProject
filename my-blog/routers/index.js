const express = require('express')
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const CommentModel = require('../models/comment.js')

const router = express.Router()


//获取分类、获取排行
async function getCommonData(){
	const getCategoriesPromise = CategoryModel.find({},'name').sort({_id:-1});
	const getTopArticlesPromise = ArticleModel.find({},'_id click title').sort({click:-1}).limit(10);

	const categories = await getCategoriesPromise;
	const topArticles = await getTopArticlesPromise;
	return {
		categories,
		topArticles
	}
}
//评论异步封装函数
async function getDetailData(req){
	const { id } = req.params;
	const commonDataPromise = getCommonData();
	const getArticlePromise = ArticleModel.findOneAndUpdate({_id:id},{$inc:{click:1}},{new:true})
							 .populate({path:'author',select:'username'})
							 .populate({path:'category',select:'name'});
	const commentPagePromise = CommentModel.getPaginationComments(req,{articleId:id});



	const data = await commonDataPromise;
	const article = await getArticlePromise;
	const commentPage = await commentPagePromise;

	const {categories,topArticles} = data;
	return {
		categories,
		topArticles,
		article,
		commentPage
	}


}
//显示博客首页
router.get("/",(req,res)=>{
	getCommonData()
	.then(data=>{
		const {categories,topArticles} = data;
		ArticleModel.getPaginationArticles(req)
		.then(articles=>{
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
		.catch(err=>{
			console.log(err)
		})
	})
})
//显示首页文章
router.get('/articles',(req,res)=>{
	const {id} = req.query;
	let query = {};
	if(id){
		query.category = id
	}
	ArticleModel.getPaginationArticles(req,query)
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
//详情页处理
router.get('/view/:id',(req,res)=>{
	getDetailData(req)
	.then(data=>{
		const { id } = req.params;
		const {categories,topArticles,article,commentPage} = data;
		res.render('main/detail',{
			userInfo:req.userInfo,
			categories,
			topArticles,
			article,
			category:article.category._id,
			comments:commentPage.docs,
			page:commentPage.page,
			list:commentPage.list,
			pages:commentPage.pages,
			categoryId:id
		})	
	})
	.catch(err=>{
		console.log(err)
	})
})
//处理列表页
router.get('/list/:id',(req,res)=>{
	getCommonData()
	.then(data=>{
		const { id } = req.params;
		const {categories,topArticles} = data;
		ArticleModel.getPaginationArticles(req,{category:id})
		.then(articles=>{
			res.render('main/list',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				articles:articles.docs,
				page:articles.page,
				list:articles.list,
				pages:articles.pages,
				url:'/article',
				category:id
			})	
		})
		.catch(err=>{
			console.log(err)
		})
	})
})
//处理评论ajax
router.get('/comments',(req,res)=>{
	const {id} = req.query;
	let query = {};
	if(id){
		query.articleId = id
	}
	CommentModel.getPaginationComments(req,query)
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