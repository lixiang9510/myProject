/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$.fn.extend({
		getArticlePage:function(options){
			var $elem = $(this)
			$elem.on('click','a',function(ev){
				var $this = $(this);
				var currentPage = $elem.find('.active a').html();
				var page = 0;
				var labelAttr = $this.attr('aria-label');
				if(labelAttr == 'Next'){
					page = currentPage*1 + 1;
					
				}else if(labelAttr == 'Previous'){
					page = currentPage*1 - 1;
				}else{
					page = $this.html();
				}
				if( page == currentPage ){
					return false;
				}
				$.ajax({
					url:options.url + '?page=' + page,
					dataType:'json'
				})
				.done(function(result){
					if(result.status == 0){
						$elem.trigger('get-data',result.data)
					}
				})
				.fail(function(err){
					console.log(err)
				})
			})
		}
	})

})(jQuery);