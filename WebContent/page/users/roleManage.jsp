<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 用户管理界面 -->
<div>
	<div class="ri_dq">当前所在位置：系统管理 > 角色管理</div>

	<div>
		<ul>
			<li class="til"><span class="addRole"><img title="添加角色"
					src="\WebSite\resources\images\add.png">添加角色</span></li>
		</ul>
	</div>


	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left">
				<span>角色管理</span>
			</div>
			<div class="cz_title_right">
				<samp>
					<p class="pack_up">
						<img src="resources/images/shouqi.png" /> 收起
					</p>
				</samp>
			</div>
		</div>
		<!--======scxq title========== -->
		<div class="cz_midle">
			<ul class="cz_midle_ts">
				<li style="width: 5%;" class="list_left"><input type="checkbox"
					id="all" /></li>
				<li style="width: 47%">角色</li>
				<li style="width: 48%">权限管理</li>
			</ul>
			<!--===== -->
			<c:forEach items="${roles }" var="role" varStatus="status">
				<ul
					<c:if test="${status.index %2!=0}">style="background-color: #EAEAEA;"</c:if>>
					<c:if test='${role.role_id != "1"}'>
						<li style="width: 5%;" class="list_left"><input
							type="checkbox" data="${info.user_id }" name="sub" /></li>
					</c:if>
					<c:if test='${role.role_id == "1"}'>
						<li style="width: 5%;" class="list_left"></li>
					</c:if>
					<li class="roleName" style="width: 47%">${role.role_name }</li>
					<li style="width: 48%"><a href="#">分配权限</a></li>
				</ul>
			</c:forEach>
		</div>
		<!--=========== -->
		<div class="clear"></div>

		<div class="djsb">
			<div class="sxfy">
				<c:if test="${page.pageIndex == 1}">
					<a href="javascript:void(0)" data="1" class="reqRole as">上一页</a>
				</c:if>
				<c:if test="${page.pageIndex != 1}">
					<a href="javascript:void(0)"  data="${page.pageIndex-1 }"
						class="reqRole ax">上一页</a>
				</c:if>
				<span> 
					<a href="javascript:void(0)" data="1" class="reqRole yes">1</a> 
					<a href="javascript:void(0)" class="reqRole" data="2">2</a>
				</span>
				<c:if test="${page.pageIndex == pageNum}">
					<a href="javascript:void(0)" data="${pageNum }" class="reqRole as">下一页</a>
				</c:if>
				<c:if test="${page.pageIndex != pageNum}">
					<a href="javascript:void(0)" data="${page.pageIndex+1 }" class="reqRole ax">下一页</a>
				</c:if>
				<ul>
					<li>共${pageNum }页 到第</li>
					<li><input class="goIndex" type="text" value="${page.pageIndex}"/> 页</li>
				</ul>

			</div>
		</div>

		<script type="text/javascript">
			$.getScript("/WebSite/resources/js/user/roleManage.js");
			$.getScript("/WebSite/resources/js/user/userUtil.js");
		</script>