<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 用户管理界面 -->
<style type="text/css">
.addUser img {
	padding: 10ps 5px 0 5px;
}
</style>
<div>
	<div class="ri_dq">当前所在位置：系统管理 > 用户管理</div>
	<div>
		<ul>
			<li style="margin: 0 0 10px 20px">用户名：<input name="userName"
				id="userName">
			</li>

			<li class="til" style="margin-left: 10px;"><span class="addUser">&nbsp;&nbsp;<img
					title="新增用户" src="\WebSite\resources\images\add.png">添加用户
			</span> <span class="resetPwd"><img title="重置密码"
					src="\WebSite\resources\images\annex.png">重置密码</span> <span
				class="del"><img title="批量删除"
					src="\WebSite\resources\images\delete.png">批量删除</span></li>
		</ul>
	</div>
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left">
				<span>用户管理</span>
			</div>
			<div class="cz_title_right">
				<samp>
					<p class="pack_up">
						<img src="\WebSite\resources\images\shouqi.png" /> 收起
					</p>
				</samp>
			</div>
		</div>
		<!--======scxq title========== -->
		<div class="cz_midle">
			<ul class="cz_midle_ts">
				<li style="width: 5%;" class="list_left"><input type="checkbox"
					name="all" id="all" /></li>
				<li style="width: 10%">登录名</li>
				<li style="width: 10%">用户名</li>
				<li style="width: 10%">部门</li>
				<li style="width: 10%">角色</li>
				<li style="width: 10%">手机</li>
				<li style="width: 10%">邮箱</li>
				<li style="width: 10%">电话号码</li>
				<li style="width: 10%">是否禁用</li>
				<li style="width: 15%">操作</li>
			</ul>
			<!--===== -->
			<c:forEach items="${userInfo }" var="info" varStatus="status">
				<ul subul='subul'
					<c:if test="${status.index %2!=0}">style="background-color: #EAEAEA;"</c:if>>
					<c:if test='${info.login_name != "admin"}'>
						<li style="width: 5%;" class="list_left"><input
							type="checkbox" data="${info.user_id }" name="subBox" /></li>
					</c:if>
					<c:if test='${info.login_name == "admin"}'>
						<li style="width: 5%;" class="list_left"></li>
					</c:if>
					<li class="loginName" style="width: 10%"
						title="${info.login_name }">${info.login_name }</li>
					<li style="width: 10%" user_name="${info.user_name}"
						title="${info.user_name}">${info.user_name }</li>
					<li style="width: 10%" title="${info.dept_name }">${info.dept_name
						}</li>
					<li style="width: 10%" title="${info.role_name }">${info.role_name
						}</li>
					<li style="width: 10%" title="${info.user_mobile }">${info.user_mobile
						}</li>
					<li style="width: 10%" title="${info. user_email}">${info.
						user_email}</li>
					<li style="width: 10%" title="${info. user_tel}">${info.
						user_tel}</li>
					<c:if test="${info.user_disabled == 1}">
						<li style="width: 10%" title="禁用">禁用</li>
					</c:if>
					<c:if test="${info.user_disabled != 1}">
						<li style="width: 10%" title="未禁用">未禁用</li>
					</c:if>
					<li style="width: 15%"><span class="editUser"
						data="${info.user_id }"><img alt="修改"
							src="resources/images/edit.png" title="修改"> </span> <span
						class="editUser" data="${info.user_id }"><img alt="查看"
							src="resources/images/find.png" title="查看"> </span> <c:if
							test='${info.login_name != "admin"}'>
							<span class="deleteUser" data="${info.user_id }"><img
								alt="删除" src="resources/images/delete.png" title="删除"> </span>
						</c:if></li>
				</ul>
			</c:forEach>
		</div>
		<!--=========== -->
		<div class="djsb">
			<div class="sxfy">
				<c:if test="${page.pageIndex == 1}">
					<a href="javascript:void(0)"  data="1" class="reqUser as" >上一页</a>
				</c:if>
				<c:if test="${page.pageIndex != 1}">
					<a href="javascript:void(0)" data="${page.pageIndex-1 }" class="reqUser ax">上一页</a>
				</c:if>
				<span> 
					<a href="javascript:void(0)" data="1" class="reqUser yes">1</a> 
					<a href="javascript:void(0)" class="reqUser" data="2" >2</a>
				</span>
				<c:if test="${page.pageIndex == pageNum}">
					<a href="javascript:void(0)" data="${pageNum }" class="reqUser as">下一页</a>
				</c:if>
				<c:if test="${page.pageIndex != pageNum}">
					<a href="javascript:void(0)" data="${page.pageIndex+1 }" class="reqUser ax">下一页</a>
				</c:if>
				<ul>
					<li>共${pageNum }页 到第</li>
					<li><input class="goIndex" type="text" value="${page.pageIndex}" /> 页</li>
				</ul>
			</div>
		</div>

		<script type="text/javascript">
			$.getScript("/WebSite/resources/js/user/userManage.js");
			$.getScript("/WebSite/resources/js/user/userUtil.js");
		</script>