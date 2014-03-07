var $left;// 左边菜单
var $top;// 上面菜单
var $main;// 左边菜单的一级菜单
$(function() {
	$top = $('.top_nav li');
	$left = $('.left ul li');
	$main = $(".left ul li[main]");
	$($top[0]).addClass("dangq");
	$left.hide();// 隐藏左边所有的菜单
	$.each($left, function(i, n) {// 显示左边第一项菜单
		if ($($left[i]).attr("data") == 3)
			$($left[i]).show();
	});
	$top.click(controlOneMenu);// 一级菜单事件
	$main.next().hide();// 隐藏子菜单
	$main.click(controlTwoMenu);// 二级菜单操作
	$('.left_menu span').click(getMenuData);
	$('.logo img').click(quitSys);

});
// 一级菜单切换（top）
function controlOneMenu() {
	$left.hide();
	$top.removeClass();
	var _id = $(this).attr("data");
	$.each($top, function(i, n) {// 显示左边第一项菜单
		if ($($top[i]).attr("data") == _id)
			$($top[i]).addClass("dangq");
	});
	$.each($left, function(i, n) {// 显示左边第一项菜单
		if ($($left[i]).attr("data") == _id) {
			$($left[i]).show(500);
		}
	});
	$main.next().hide();// 隐藏子菜单
}
// 二级菜单切换（left）
function controlTwoMenu() {
	if ($(this).is('.nav_sq')) {
		$(this).next().show(500);
		// $("li[class='nav_zk']").attr("class", "nav_sq");
		$(this).attr("class", "nav_zk");
	} else {
		$(this).next().hide(500);
		$(this).attr("class", "nav_sq");
	}
}
// 子菜单，（请求资源）操作
function getMenuData() {
	var _url = $(this).attr('url');
	$.ajax({
		url : _url,
		type : 'get',
		success : function(data) {
			$('.main_right').html(data);
			// var u = _url.split('.')[0];
			// $.getScript("/WebSite/resources/js/"+u+".js",function(){});
		}
	});
	$(this).siblings().removeClass("lm_yes");
	$(this).attr("class", "lm_yes");
}
// 退出系统
function quitSys() {
	$.get('quitSys.cst', function(data) {
		window.location = "/WebSite/page/login.jsp";
	});
}