$(function() {
	// 查询部门（临时）
	$('#deptName').keyup(
			function() {
				if (this.value == "") {
					$('ul[dep]').show();
				} else {
					$('ul[dep]').hide();
					$('li[dept_name]').filter(":contains(" + this.value + ")")
							.parent().show();
				}
			});
	// 跳转到添加部门页面
	$('#addDept').click(function() {
		$.post('addDept.cst', function(data) {
			$('.main_right').html(data);
		});
	});
	// 跳转到修改部门
	$('.editDept').click(showDept);
	// 查看部门信息
	$('.showDept').click(showDept);
	// 全选和不全选
	$("#all").click(selectAll);
	// 批量删除部门
	$('#delDept').click(deleteDept);
	// 删除部门
	$('.delDept').click(function() {
		var _uid = $(this).attr("data");
		var flag = confirm("确定删除该用户吗？");
		if (flag) {
			$.ajax({
				type : 'post',
				url : 'deleteDept.cst',
				data : {
					"uid" : _uid
				},
				success : function(data) {
					// 刷新页面
					$('.main_right').html(data);
				}
			});
		}
	});
	$('.reqDept').click(doReqDept); // 访问部门信息
});

// 访问部门信息(分页)
function doReqDept() {
	$.get('deptManage.cst', {
		'pageIndex' : $(this).attr('data')
	}, function(msg) {
		$('.main_right').html(msg);
	});
}

// 批量删除部门信息
function deleteDept() {
	var ck = $(':checkbox:gt(0)');
	if (ck.is(':checked')) {// 先判断是否有选中的项
		var flag = confirm("是否删除选中部门");
		if (flag) {
			var ids = "";
			for ( var i = 0; i < ck.length; i++) {
				if ($(ck[i]).is(':checked')) {
					ids += $(ck[i]).attr('data') + ":";
				}
			}
			$.ajax({
				url : 'deleteDept.cst',
				data : {
					"uid" : ids
				},
				type : 'post',
				success : function(data) {
					$('main_right').html(data);
					alert("删除成功");
				},
				error : function() {
					alert("删除失败");
				}
			});
		}
	}
}
// 跳到修改部门页面
function showDept() {
	var _id = $(this).attr('data');
	$.post('showDept.cst', {
		'id' : _id
	}, function(data) {
		$('.main_right').html(data);
	}

	);
}
// 全选和反全选
function selectAll() {
	var cartCheckBox = document.getElementsByName("subBox");
	for ( var i = 0; i < cartCheckBox.length; i++) {
		cartCheckBox[i].checked = document.getElementById("all").checked;
	}
}