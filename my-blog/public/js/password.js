
;(function($){
	$('#submit').on('click',function(){
		var password = $('[name="password"]').val();
		var repassword = $('[name="repassword"]').val();
		var $errMsgs = $('.err')
		//账号字母开头3-10位，只能含有数字、字母、下划线
		var passwordReg = /^\w{3,6}$/i;
		var $errMsg = '';
		//密码3-6位字母数字下划线
		if(!passwordReg.test(password)){
			$errMsgs.eq(0).html('密码3-6位字母数字下划线');
			return false
		}else{
			$errMsgs.eq(0).html('')
		}
		if(password != repassword){
			$errMsgs.eq(1).html('两次密码不一致');
			return false
		}else{
			$errMsgs.eq(1).html('')
		} 
	})
})(jQuery);