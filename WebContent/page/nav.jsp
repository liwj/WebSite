<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
	<div class="top">
		<div class="logo">
			<img src="resources/images/out_system_btn.png" />
		</div>
		<div class="clear"></div>
		<!--==============logoover================= -->
		<span class="top_ts">
			<c:if test="${!empty sessionScope.loginUser.user_name}">
				${sessionScope.loginUser.user_name }
			</c:if>
		欢迎您！</span>
		<!--===== -->
		<ul class="top_nav">
			<c:forEach items="${menus}" var="menu">
				<c:if test='${menu.menu_super_id=="2"}'>
					<li data="${menu.menu_id }">${menu.menu_name }</li>
				</c:if>
			</c:forEach>
		</ul>
		<!--===== -->
		<div class="top_time" >
			当前时间：<span></span>
		</div>
		<!--===== -->
		<div class="clear"></div>
	</div>
<script type="text/javascript">
	$(function() {
		function getTime() {
			var date = new Date();
			var yy = date.getFullYear();
			var mm = date.getMonth() + 1;
			var dd = date.getDate();
			var hh = date.getHours();
			var mi = date.getMinutes();
			$('.top_time span').html(
					yy + "年" + mm + "月" + dd + "日" + "   " + hh + ":" + mi);
		}
		setInterval(getTime, 1000);
	});
</script>

