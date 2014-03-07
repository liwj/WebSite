$(function() {
	$("form input.required").each(function() {
		var $required = $("<span style='color:red'>*</span>");
		$(this).parent().append($required);
	});
	$('form input.required').blur(function() {
		var $parent = $(this).parent();
		// 验证用户名
		if ($(this).is('#user_name')) {
			$(this).next().next().remove();
			if ($.trim($(this).val()).length == 0) {
				$parent.append('<samp class="error">请输入密码</samp>');
			}
		}
		// 验证手机
		if ($(this).is('#user_mobile')) {
			$(this).next().next().remove();
			var mobile = $.trim($(this).val());
			var regCode = /^1[3|4|5|8][0-9]\d{4,8}$/;
			if (mobile.length != 0)
				if (!regCode.test(mobile))
					$parent.append('<samp class="error">请输入正确的手机格式</samp>');
		}
		// 验证邮箱
		if ($(this).is('#user_email')) {
			$(this).next().next().remove();
			var email = $.trim($(this).val());
			var regCode = /.+@.+\.[a-zA-Z]{2,4}$/;
			if (email.length != 0) {
				if (!regCode.test(email))
					$parent.append('<samp class="error">请输入正确的邮箱格式</samp>');
			}
		}
	});
	/** ******************************** */
	// 返回
	$('#fanhui').click(function() {
		$.ajax({
			url : 'userManage.cst',
			data : {
				'pageIndex' : 1
			},
			success : function(data) {
				$('.main_right').html(data);
			}
		});
	});
	/** ******************************** */
	/** 选择角色 */
	// 弹出角色选择窗口
	$('#role').click(function() {
		$("#allRole").show();
	});
	// 关闭角色选择窗口
	$('#quxiao').click(function() {
		$('#allRole').hide();
	});
	$("#allRole ul li").click(function() {
		$(this).siblings().removeClass("sel");
		$(this).addClass('sel');
	});
	// 角色选择
	$('#selRole').click(function() {
		var _li = $("#allRole ul li");
		for ( var i = 0; i < _li.length; i++) {
			if ($(_li[i]).hasClass('sel')) {
				var rName = $(_li[i]).text();
				var rid = $(_li[i]).attr('data');
				$('#role').val(rName);
				$('#role_id').val(rid);
				$('#role').next().next().remove();// 删除错误提示
			}
		}
		$('#allRole').hide();
	});
	/** ******************************** */
	/** 显示部门信息 */
	$('#dept_name').click(function() {
		$.ajax({
			url : 'selDept.cst',
			type : 'post',
			success : function(data) {
				$('#allDept').html(data);
			}
		});

	});
	$("#send").submit(saveReport);
});

/** 提交添加用户数据 */
function saveReport() {
	$("form :input.required").trigger('blur');
	changes();
	var numError = $('form .error').length;
	if (numError == 0) {
		$("#send").ajaxSubmit(function(message) {
			if (message == "ok") {
				alert("修改成功");
			} else {
				alert("修改失败");
			}
		});
	}
	return false;
}
function changes() {
	if ($('#role').val() == "请选择") {
		$('#role').next().next().remove();
		$('#role').parent().append("<samp class='error'>请选择用户角色</samp>");
	} else {
		$('#role').next().next().remove();
	}
	if ($.trim($('#dept_name').val()) == '请选择') {
		$('#dept_name').next().next().remove();
		$('#dept_name').parent()
				.append("<samp class='error'>请选择用户的部门信息</samp>");
	} else {
		$('#dept_name').next().next().remove();
	}
}