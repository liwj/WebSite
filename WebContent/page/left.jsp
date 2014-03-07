<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="left">
	<c:forEach items="${menus}" var="menu">
		<ul>
			<c:if test='${menu.menu_super_id==3}'>
				<li class="nav_sq" data="3" main="main">${menu.menu_name }</li>
				<li class="left_menu" data="3">
				<c:forEach items="${menus}" var="m">
					<c:if test="${m.menu_super_id == menu.menu_id}">
			       	 <span url="${m.menu_url }">${m.menu_name }</span>
			        </c:if>
   				</c:forEach>
   				</li>
			</c:if>
			<c:if test='${menu.menu_super_id==4}'>
				<li class="nav_sq" data="4" main="main">${menu.menu_name }</li>
				<li class="left_menu" data="4">
				<c:forEach items="${menus}" var="m">
					<c:if test="${m.menu_super_id == menu.menu_id}">
			         <span url="${m.menu_url }">${m.menu_name }</span>
			        </c:if>
   				</c:forEach>
   				</li>
			</c:if>
			<c:if test='${menu.menu_super_id==5}'>
				<li class="nav_sq" data="5" main="main">${menu.menu_name }</li>
				<li class="left_menu" data="5">
				<c:forEach items="${menus}" var="m">
					<c:if test="${m.menu_super_id == menu.menu_id}">
			         <span url="${m.menu_url }">${m.menu_name }</span>
			        </c:if>
   				</c:forEach>
   				</li>
			</c:if>
		</ul>
	</c:forEach>
</div>

