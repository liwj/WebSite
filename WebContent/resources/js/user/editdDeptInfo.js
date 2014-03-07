$(function() {
	$("form input.required").each(function() {
		var $required = $("<span style='color:red'>*</span>");
		$(this).parent().append($required);
	});
	$('form input.required').blur(function() {
		var $parent = $(this).parent();
		// 验证部门名
		if ($(this).is("#dept_name")) {
			$(this).next().next().remove();
			if ($.trim($(this).val()).length == 0) {
				$parent.append('<samp class="error">请输入部门名称</samp>');
			}
		}
		// 验证上级部门
		// if($(this).is("#"))
		// 验证联系人
		if ($(this).is('#linkman')) {
			$(this).next().next().remove();
			if ($.trim($(this).val()).length == 0) {
				$parent.append('<samp class="error">请输入联系人</samp>');
			}
		}
		// 验证联系人手机
		if ($(this).is('#mobile')) {
			$(this).next().next().remove();
			var mobile = $.trim($(this).val());
			var regCode = /^1[3|4|5|8][0-9]\d{4,8}$/;
			if (mobile.length == 0) {
				$parent.append('<samp class="error">请输入联系人手机号码</samp>');
			} else if (!regCode.test(mobile)) {
				$parent.append('<samp class="error">请输入正确的手机格式</samp>');
			}
		}
		// 验证联系人邮箱
		if ($(this).is('#email')) {
			$(this).next().next().remove();
			var email = $.trim($(this).val());
			var regCode = /.+@.+\.[a-zA-Z]{2,4}$/;
			if (email.length == 0) {
				$parent.append('<samp class="error">请输入联系人邮箱</samp>');
			} else if (!regCode.test(email)) {
				$parent.append('<samp class="error">请输入正确的邮箱格式</samp>');
			}
		}

	});
	$('#editDept').submit(saveReport);
});
// 提交添加部门表单
function saveReport() {
	$("form :input.required").trigger('blur');
	var error = $('form .error').length;
	if (error == 0) {
		$("#editDept").ajaxSubmit(function(message) {
			if (message == "ok") {
				alert("添加成功");
				$("form :input").val();
			} else {
				alert("添加失败");
			}
		});
	}
	return false;
}