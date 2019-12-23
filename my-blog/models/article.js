

const mongoose = require('mongoose');
const pagination = require('../utils/pagination.js')

const ArticleSchema = new mongoose.Schema({
	title:{
		type:String
	},
	intro:{
		type:String
	},
	content:{
		type:String
	},
	author:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	click:{
		type:Number,
		default:0
	},
	createAt:{
		type:Date,
		default:Date.now
	}

})
ArticleSchema.statics.getPaginationArticles=function(req,query={}){
	const options = {
		limit:2,
		page:req.query.page,
		query:query,
		projection:"-password -__v",
		model:ArticleModel,
		sort:{_id:-1},
		populates:[{path:'author',select:'username'},{path:'category',select:'name'}]
	}
	return pagination(options)
}
const ArticleModel = mongoose.model('Article',ArticleSchema);

module.exports = ArticleModel