$(function() {
	var totheTitle = window.dialogArguments;
	$("div[botitle]").html(totheTitle);

	$("form input.required").each(function() {
		var $required = $("<span class='high'>*</span>");
		$(this).parent().append($required);
	});
	$("form input").blur(
			function() {
				var $parent = $(this).parent(); 
				$parent.find(".formtips").remove();// 去掉当前input先前的提示
				// 部门名
				if ($(this).is("#dept_name")) {
					if ($.trim($(this).val()).length == 0) {
						var errorMsg = '请输入部门名称';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}

				// 联系人
				if ($(this).is("#linkman")) {
					if ($.trim(this.value).length == 0) {
						var errorMsg = '请输入联系人';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}

				// 验证手机
				if ($(this).is("#mobile")) {
					if ($.trim(this.value).length == 0) {
						var errorMsg = '请输入联系人手机';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}

				// 验证邮件
				if ($(this).is('#email')) {
					if ($.trim(this.value).length == 0
							|| (this.value != "" && !/.+@.+\.[a-zA-Z]{2,4}$/
									.test(this.value))) {
						var errorMsg = '请输入正确的E-Mail地址.';
						$parent.append('<span class="formtips onError">'
								+ errorMsg + '</span>');
					}
				}
			});
	// 重置
	$('#res').click(function() {
		$(".formtips").remove();
	});
	// 返回
	$('#fanhui').click(function() {
		$.ajax({
			url : 'deptManage.cst',
			success : function(data) {
				$('.main_right').html(data);
			}
		});
	});
});
// 表单提交
function saveReport() {
	$("form :input.required").trigger('blur');
	var numError = $('form .onError').length;
	if (numError) {
		return false;
	}
	$("#addDept").ajaxSubmit(function(message) {
		if (message == "ok") {
			alert("添加成功");
			$("form :input").val();
		} else {
			alert("添加失败");
		}
	});

	return false;
}