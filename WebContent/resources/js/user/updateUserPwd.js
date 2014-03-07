$(function() {
	$("form input.required").each(function() {
		var $required = $("<span style='color:red'>*</span>");
		$(this).parent().append($required);
	});
	// 文本框失去焦点后
	$('form input:password').blur(function() {
		var $parent = $(this).parent();
		// 验证原密码
		if ($(this).is('#oldpassword')) {
			$(this).next().next().remove();
			if ($.trim($(this).val()).length == 0) {
				$parent.append("<span class='error'>请输入原密码</span>");
			} else {
				$.ajax({
					url : "checkPwd.cst",
					type : "post",
					data : {
						"password" : $.trim($(this).val())
					},
					success : function(data) {
						if (data != "ok") {
							$parent.append("<span class='error'>原密码错误</span>");
						}
					}
				});
			}
		}
		// 新密码
		if ($(this).is('#pwd')) {
			$(this).next().next().remove();
			if ($.trim($(this).val()).length == 0)
				$parent.append("<span class='error'>密码不能为空</span>");
		}

		// 验证确认密码
		if ($(this).is('#repwd')) {
			$(this).next().next().remove();
			if ($(this).val().length == 0) {
				$parent.append("<span class='error'>确认密码不能为空</span>");
			} else if ($.trim($(this).val()) != $.trim($('#pwd').val())) {
				$parent.append("<span class='error'>两次输入密码不一致</span>");
			}
		}
	});

	// 提交，最终验证。
	$('#send').click(function() {
		$("form :input.required").trigger('blur');
		var len = $('form .error').length;
		if (len == 0) {
			$("#myform").ajaxSubmit(function(message) {
				if (message == "ok") {
					alert("更新成功");
				} else {
					alert("更新失败");
				}
			});
		}
		return false;
	});

});