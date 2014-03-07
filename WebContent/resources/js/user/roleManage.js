$(function() {
	$('.addRole').click(function() {
		$("div.main_right").load("/WebSite/page/users/addRole.jsp");
	});
	$('#all').click(function() {
		var cartCheckBox = document.getElementsByName("sub");
		for ( var i = 0; i < cartCheckBox.length; i++) {
			cartCheckBox[i].checked = document.getElementById("all").checked;
		}
	});
	$('.reqRole').click(doReqRole); // 访问角色
});
// 访问角色信息
function doReqRole() {
	$.get('roleManage.cst', {
		'pageIndex' : $(this).attr('data')
	}, function(msg) {
		$('.main_right').html(msg);
	});
}