
//limit:每页显示条数
//page:当前页码
//query:数据库查找条件
//objection:数据库返回过滤掉的内容
//model:操作的数据库名称
//sort:排序
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
	const docs = await model.find(query,projection)
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