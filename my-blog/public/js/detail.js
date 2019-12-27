/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$('#sub-comment').on('click',function(){
		var content = $('#comment-content').val().trim();
		var articleId = $(this).data('id');
		var $err = $('.err')
		if(!content){
			$err.html('评论不能为空');
			return false;
		}else if(content.length>100){
			$err.html('评论最长不能唱过100字符');
			return false;
		}else{
			$err.html('')
		}
		$.ajax({
			url:'/comment/add',
			type:'post',
			dataType:'json',
			data:{
				content,
				articleId
			}
		})
		.done(function(result){
			if(result.status == 0){
				$('#comment-content').val('');
				$('#comment-list').trigger('get-data',result.data)
			}
		})
		.fail(function(err){
			console.log(err)
		})


	})
})(jQuery);