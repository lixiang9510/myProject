
//limit:每页显示条数
//page:当前页码
//query:数据库查找条件
//objection:数据库返回过滤掉的内容
//model:操作的数据库名称
//sort:排序
//populates:填充数组（渲染关联页面）
async function pagination(options){
	let { limit,page,model,query,projection,sort,populates } = options;

	page = parseInt(page)
	if(isNaN(page)){
		page = 1
	}
	if(page == 0){
		page = 1
	}
	const counts = await model.countDocuments(query);

	const pages = Math.ceil(counts/limit)
	
	if(page>pages){
		page = pages
	}
	if(pages==0){
		page=1
	}
	let list = [];
	for(let i=1;i<=pages;i++){
		list.push(i)
	}

	const skip = (page-1)*limit;
	let result = model.find(query,projection)
	if(populates){
		populates.forEach(populate=>{
			result = result.populate(populate)
		})
	}
	const docs = await result
	.sort(sort)
	.skip(skip)
	.limit(limit)

	return {
		docs,
		pages,
		list,
		page,
	}
}


module.exports = pagination