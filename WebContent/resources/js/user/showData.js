$(function() {
	var totheTitle = window.dialogArguments;
	// 设置botitle
	$("div[botitle]").html(totheTitle);

	$("form input.required").each(function() {
		var $required = $("<span class='high'>*</span>");
		$(this).parent().append($required);
	});
	$("form input").blur(
			function() {
				var $parent = $(this).parent();
				$parent.find(".formtips").remove();// 去掉当前input先前的提示

				// 验证登陆名
				if ($(this).is("#login_name")) {
					if ($.trim((this.value)).length == 0) {
						var errorMsg = '请输入登陆名';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}

				// 验证用户名
				if ($(this).is("#user_name")) {
					if ($.trim((this.value)).length == 0) {
						var errorMsg = '请输入用户名.';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}

				// 验证邮件
				if ($(this).is('#user_email')) {
					if (this.value == ""
							|| (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/
									.test(this.value))) {
						var errorMsg = '请输入正确的E-Mail地址,例如XXX@XXX.XXX';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}
				// 验证手机号码
				if ($(this).is('#user_mobile')) {
					if (this.value != "") {
						if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(this.value))) {
							var errorMsg = '请输入正确的手机号，例如1[3,4,5,8]XXXXXXXXX';
							$parent.append('<span class="formtips onError">'
									+ errorMsg + '</span>');
						}
					}
				}

				// 验证电话号码
				if ($(this).is('#user_tel')) {
					if (this.value != "") {
						var regCode = /^\d{7,8}$/;
						if (!regCode.test(this.value)) {
							var errorMsg = '请输入正确的电话号码';
							$parent.append('<span class="formtips onError">'
									+ errorMsg + '</span>');
						}
					}
				}
			});
});
// 表单提交
function saveReport() {
	$("form :input.required").trigger('blur');
	var numError = $('form .onError').length;
	if (numError == 0) {
		$("#edit").ajaxSubmit(function(message) {
			if (message == "ok") {
				alert("更新成功");
			} else {
				alert("更新失败");
			}
		});
	}
	return false;
}