/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	var $register = $('#register');
	var $login = $('#login');
	//登陆/注册切换
	$('#go-register').on('click',function(){
		$register.show();
		$login.hide();
	})
	$('#go-login').on('click',function(){
		$register.hide();
		$login.show();
	})

	var usernameReg = /^[a-z][0-9a-z_]{2,9}$/i;
	var passwordReg = /^\w{3,6}$/i;
	//用户注册
	$('#sub-register').on('click',function(){
		var username = $register.find('[name="username"]').val();
		var password = $register.find('[name="password"]').val();
		var repassword = $register.find('[name="repassword"]').val();
		var $err = $register.find('.err')
		//账号字母开头3-10位，只能含有数字、字母、下划线
		var $errMsg = '';
		if(!usernameReg.test(username)){
			$errMsg = "账号字母开头3-10位，只能含有数字、字母、下划线";
		}
		//密码3-6位字母数字下划线
		else if(!passwordReg.test(password)){
			$errMsg = "密码3-6位字母数字下划线";
		}
		else if(password != repassword){
			$errMsg = "两次密码不一致";
		}
		if($errMsg){
			$err.html($errMsg);
			return;
		}else{
			$err.html('');
			$.ajax({
				url:"/user/register",
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status == 0){
					$('#go-login').trigger('click');
					$login.find('[name="username"]').val(username);
				}else{
					$err.html(result.message);
				}
			})
			.fail(function(error){
				$err.html('请求失败，请稍后再试一试')
			})
		}
	})
	//用户登陆
	$('#sub-login').on('click',function(){
		var username = $login.find('[name="username"]').val();
		var password = $login.find('[name="password"]').val();
		var $err = $login.find('.err')
		//账号字母开头3-10位，只能含有数字、字母、下划线
		var $errMsg = '';
		if(!usernameReg.test(username)){
			$errMsg = "账号字母开头3-10位，只能含有数字、字母、下划线";
		}
		//密码3-6位字母数字下划线
		else if(!passwordReg.test(password)){
			$errMsg = "密码3-6位字母数字下划线";
		}
		if($errMsg){
			$err.html($errMsg);
			return;
		}else{
			$err.html('');
			$.ajax({
				url:"/user/login",
				type:'post',
				dataType:'json',
				data:{
					username:username,
					password:password
				}
			})
			.done(function(result){
				if(result.status == 0){
					window.location.reload()
				}else{
					$err.html(result.message);
				}
			})
			.fail(function(error){
				$err.html('请求失败，请稍后再试一试')
			})
		}
	})
	//文章分页
	const $articleList = $('#article-list');
	var $articleWrap = $('#article-wrap');
	function buildArticleListHtml(articles){
		var html = '';

		articles.forEach(function(article){
			var getDate = moment(article.createAt).format('YYYY年MM月DD号 HH:MM:SS');
			html += `<div class="panel panel-default content-item">
				      <div class="panel-heading">
				        <h3 class="panel-title">
				          <a href="/view/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
				        </h3>
				      </div>
				      <div class="panel-body">
				        ${article.intro}
				      </div>
				      <div class="panel-footer">
				        <span class="glyphicon glyphicon-user"></span>
				        <span class="panel-footer-text text-muted">${article.author.username}</span>
				        <span class="glyphicon glyphicon-th-list"></span>
				        <span class="panel-footer-text text-muted">${article.category.name}</span>
				        <span class="glyphicon glyphicon-time"></span>
				        <span class="panel-footer-text text-muted">${getDate}</span>
				        <span class="glyphicon glyphicon-eye-open"></span>
				        <span class="panel-footer-text text-muted"><em>${article.click}</em>已阅读</span>
				      </div>
			    	</div>
					`
		})
		return html;	
	}
	function buildPaginationHtml(list,page){
		var html = '';
		html += `<li>
				      <a href="javascript:;" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
			    </li>`;
		list.forEach(function(i){
			if(page == i){
				html += `<li class="active"><a href="javascript:;">${ i }</a></li>`
			}else{
				html += `<li><a href="javascript:;">${ i }</a></li>`
			}
		});
		html += `<li>
				      <a href="javascript:;" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
			    </li>`;
		return html;

	}	
	$articleList.on('get-data',function(ev,data){
		console.log(data)
		$articleWrap.html(buildArticleListHtml(data.docs));
		if(data.pages>1){
			$articleList.html(buildPaginationHtml(data.list,data.page));
		}else{
			$articleList.html('')
		}
		

	})
	$articleList.getArticlePage({
		url:'/articles'
	})
})(jQuery);