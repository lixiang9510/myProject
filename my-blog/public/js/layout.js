

//用户退出
	$('#layout').on('click',function(){
		$.ajax({
			url:'/user/layout'
		})
		.done(function(result){
			if(result.status == 0){
				// window.location.reload()
				window.location.href = "/"
			}else{
				$('#user-info .err').html(result.message);
			}
		})
		.fail(function(error){
			$('#user-info .err').html('请求失败，请稍后再试一试')
		})
	})	