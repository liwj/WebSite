$(function() {
	$('#userName').keyup(
			function() {
				if (this.value == "") {
					$('ul[subul]').show();
				} else {
					$('ul[subul]').hide();
					$('li[user_name]').filter(":contains(" + this.value + ")")
							.parent().show();
				}
			});
	// 修改用户信息
	$('.editUser').click(function() {
		var _uid = $(this).attr("data");
		$.ajax({
			type : 'get',
			url : 'showUser.cst?uid=' + _uid,
			success : function(data) {
				$('.main_right').html(data);
			}
		});
	});
	// 添加用户
	$('.addUser').click(function() {
		$.ajax({
			type : 'get',
			url : 'addUser.cst',
			success : function(data) {
				$('.main_right').html(data);
			}
		});
	});
	// 删除用户
	$('.deleteUser').click(function() {
		var _uid = $(this).attr("data");
		var flag = confirm("确定删除该用户吗？");
		if (flag) {
			$.ajax({
				type : 'post',
				url : 'deleteUser.cst',
				data : {
					"uid" : _uid,
					'pageIndex' : $('.goIndex').val()
				},
				success : function(data) {
					// 刷新页面
					$('.main_right').html(data);
				}
			});
		}
	});
	// 批量删除用户
	$('.del').click(del);
	// 重置密码
	$('.resetPwd').click(_findUid);
	// 全选
	$('#all').click(selectAll);
	$('.reqUser').click(doReqUser); // 分页访问用户信息

});
// 访问用户信息(分页)
function doReqUser() {
	$.get('userManage.cst', {
		'pageIndex' : $(this).attr('data')
	}, function(msg) {
		$('.main_right').html(msg);
	});
}

function _findUid() {
	var ck = $(':checkbox:gt(0)');
	if (ck.is(':checked')) {// 先判断是否有选中的项
		var flag = confirm("是否重置选中用户的密码");
		if (flag) {
			var ids = "";
			for ( var i = 0; i < ck.length; i++) {
				if ($(ck[i]).is(':checked')) {
					ids += $(ck[i]).attr('data') + ":";
				}
			}
			$.ajax({
				url : 'resetPwd.cst',
				data : {
					"uid" : ids
				},
				type : 'post',
				success : function(data) {
					if (data == "ok")
						alert("重置密码成功");
					else
						alert("重置密码失败");
				}
			});
		}
	}
}
// 批量删除用户
function del() {
	var ck = $(':checkbox:gt(0)');
	if (ck.is(':checked')) {// 先判断是否有选中的项
		var flag = confirm("是否删除选中的用户");
		if (flag) {
			var ids = "";
			for ( var i = 0; i < ck.length; i++) {
				if ($(ck[i]).is(':checked')) {
					ids += $(ck[i]).attr('data') + ":";
				}
			}
			$.ajax({
				type : 'post',
				url : 'deleteUser.cst',
				data : {
					"uid" : ids
				},
				success : function(data) {
					// 刷新页面
					$('.main_right').html(data);
				}
			});
		}
	}
}
// 全选和反全选
function selectAll() {
	var cartCheckBox = document.getElementsByName("subBox");
	for ( var i = 0; i < cartCheckBox.length; i++) {
		cartCheckBox[i].checked = document.getElementById("all").checked;
	}
}