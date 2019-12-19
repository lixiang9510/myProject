const express = require('express')
const CategoryModel = require('../models/category.js')


const router = express.Router()


//显示首页
router.get("/",(req,res)=>{
	CategoryModel.find({},'name')
	.sort({_id:-1})
	.then(categories=>{
		res.render('main/index',{
			userInfo:req.userInfo,
			categories
		})
	})
	
})




module.exports = router