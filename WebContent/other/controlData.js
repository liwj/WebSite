/*将返回的字符串转换为json对象，然后在进行遍历写入标签*/
var obj;
$(function() {
	// 将json字符串转换为json对象
	var data = _out($('.jsons').html());
	obj = eval('(' + data + ')');
	for ( var i = 0; i < obj.length; i++) {
		// 初始化加载头部菜单
		if (obj[i].menu_super_id == 2) {
			// 后面插入标签
			$('.top_nav').append(
					"<li data=" + obj[i].menu_id + ">" + obj[i].menu_name
							+ "</li>");
			// 为头部菜单添加单击事件
			$('li[data=' + obj[i].menu_id + ']').click(controlOneMenu);
		}
		// 初始化加载左边菜单
		if (obj[i].menu_super_id == 3) {
			$('.left ul').append(
					"<li class='nav_sq' data=" + obj[i].menu_id + ">"
							+ obj[i].menu_name + "</li>");
			// 为左边菜单添加单击事件
			$("li[data=" + obj[i].menu_id + "]").click(controlTwoMenu);
		}
	}
});

// 头部主菜单选择
function controlOneMenu() {
	var _id = $(this).attr('data');
	$('.left ul li').remove();
	for ( var j = 0; j < obj.length; j++) {
		var super_id = obj[j].menu_super_id;
		if (super_id == _id) {
			$('.left ul').append(
					"<li class='nav_sq' data=" + obj[j].menu_id + ">"
							+ obj[j].menu_name + "</li>");
			$('.left ul li').click(controlTwoMenu);
		}
	}
	$(this).attr("class", "dangq");
	$(this).siblings().removeClass();
}
// 左边一级菜单操作(添加子节点)
function controlTwoMenu() {
	$(".left_menu").remove();
	// 判断当前菜单节点的样式 （“+” 打开状态）
	if ($(this).is('.nav_sq')) {
		var _id = $(this).attr('data');
		var _text = "<li class='left_menu'>";

		for ( var j = 0; j < obj.length; j++) {
			var super_id = obj[j].menu_super_id;
			if (super_id == _id) {
				_text += "<span class=" + obj[j].menu_id + "   url="
						+ obj[j].menu_url + ">" + obj[j].menu_name + "</span>";
			}
		}
		_text += "</li>";
		// 添加子菜单
		$(this).after(_text);
		// 给子菜单添加点击事件，从而获取请求资源
		$('.left_menu span').click(getMenuData);
		// 给所有二级菜单添加class属性 （+）关闭状态
		$("li[class='nav_zk']").attr("class", "nav_sq");
		// 给当前对象添加class属性 （-） 打开状态
		$(this).attr("class", "nav_zk");
	} else {
		$(this).attr("class", "nav_sq");
	}
}
// 获取菜单选项的资源
function getMenuData() {
	var _url = $(this).attr('url');
	$.ajax({
		url : _url,
		success : function(data) {
			// 切换页面
			$('.main_right').html(data);
		}
	});
	$(this).siblings().removeClass("lm_yes");
	$(this).attr("class", "lm_yes");
}
// ajax请求数据
function _ajax(_type, _url, _fn) {
	$.ajax({
		type : _type,
		url : _url,
		success : _fn
	});
}
