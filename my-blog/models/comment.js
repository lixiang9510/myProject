

const mongoose = require('mongoose');
const pagination = require('../utils/pagination.js')

const CommentSchema = new mongoose.Schema({
	content:{
		type:String
	},
	commentUser:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'User'
	},
	articleId:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Article'
	},
	createAt:{
		type:Date,
		default:Date.now
	}

})
CommentSchema.statics.getPaginationComments=function(req,query={}){
	const options = {
		limit:2,
		page:req.query.page,
		query:query,
		projection:"-password -__v",
		model:CommentModel,
		sort:{_id:-1},
		populates:[{path:'commentUser',select:'username'},{path:'articleId',select:'title'}]
	}
	return pagination(options)
}
const CommentModel = mongoose.model('Comment',CommentSchema);

module.exports = CommentModel