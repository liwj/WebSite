$(function() {
	$('.pack_up').click(shouQi);
});
// 收起数据列表项
function shouQi() {
	if ($.trim($(this).text()) == "收起") {
		$('.cz_midle').hide();
		$(this).html(
				"<img src='/WebSite/resources/images/zankai.png' />" + "展开");
	} else {
		$('.cz_midle').show();
		$(this).text("收起");
		$(this).append("<img src='/WebSite/resources/images/shouqi.png' />");
	}
}