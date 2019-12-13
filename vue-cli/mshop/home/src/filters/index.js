

export	default{
	formatchPrice(price=0){
		price = parseFloat(price);
		return '$ ' + price.toFixed(2)
	},
	formatchTitle(title=0){
		return  title + 'title'
	}
}