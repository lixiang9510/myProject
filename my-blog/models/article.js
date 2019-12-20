

const mongoose = require('mongoose');

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
		type:mongoose.Schema.Types.ObjectId
	},
	category:{
		type:mongoose.Schema.Types.ObjectId
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
const ArticleModel = mongoose.model('Article',ArticleSchema);

module.exports = ArticleModel