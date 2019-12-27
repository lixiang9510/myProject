

const express = require('express')
const CommentModel = require('../models/comment.js')
const pagination = require('../utils/pagination.js')

const router = express.Router()

router.use((req,res,next)=>{
	if(req.userInfo._id){
		next()
	}else{
		res.json({
			status:10,
			message:'请登录后评论'
		})
	}
})
router.post('/add',(req,res)=>{
	const { content,articleId } = req.body;
	CommentModel.insertMany({
		content,
		articleId,
		commentUser:req.userInfo._id
	})
	.then(comments=>{
		CommentModel.getPaginationComments(req,{articleId})
		.then(data=>{
			res.json({
				status:0,
				data
			})			
		})

	})
	.catch(err=>{
		console.log(err);
		res.json({
			status:404,
			message:'评论失败，服务器端错误，请稍后重试'
		})
	})
})


module.exports = router