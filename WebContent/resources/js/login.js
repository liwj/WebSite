$(function() {
	// 用户名
	var name = $('input:text').val();
	// 判断cookie是否存在用户
	if ($.cookie(name) != null)
		$('input:password').val($.cookie(name));// 读取cookie的值
	// 当用户输入
	$('input:text').keyup(function() {
		name = $('input:text').val();
		if ($.cookie(name) != null)
			$('input:password').val($.cookie(name));// 读取cookie的值
		else
			$('input:password').val("");// 读取cookie的值

	});
	// 单击登录时
	$('.login_btn').click(req);
	$(document).keydown(function(e) {
		if (e.keyCode == 13) {
			req();
		}

	});
	// 将密码写入cookie
	function toIndex(data) {
		// 获取记住密码复选框样式
		var savepwd = $('input:checkbox').is(':checked');
		if (data == "ok") {
			if (savepwd)
				$.cookie(name, $('input:password').val(), {
					path : '/',
					expires : 10
				});
			else
				$.cookie(name, null, {
					path : '/'
				});
			window.location = "/WebSite/welcome.cst";
		} else if (data == "prohibit") {
			$('.error').html("该用户已禁用，请联系管理员");
		} else {
			$('input:password').val("");
			$('.error').html("用户名或密码错误");
		}
	}
	// 发送请求
	function req() {
		if ($.trim($('input:text').val()).length == 0) {
			$('.error').html("请输入用户名");
			$('input:text').focus();
			return;
		} else if ($.trim($('input:password').val()).length == 0) {
			$('.error').html("请输入密码");
			$('input:password').focus();
			return;
		}
		$.post("/WebSite/login.cst", {
			"name" : name,
			"password" : $('input:password').val()
		}, toIndex);
	}
});
