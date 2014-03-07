<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#send ul {
	border-top: 0px;
	border-bottom: 0px
}

#send ul li {
	margin-left: -280px;
	text-align: right;
}

#allRole {
	position: absolute;
	top: 200px;
	left: 500px;
	background-color: #f90;
	width: 250px;
	border: 2px solid #EAEAEA;
	display: none;
}

#allRole ul {
	padding-left: 20px;
	height: 360px;
	overflow: auto;
}

#allRole ul li {
	cursor: pointer
}

.sel {
	background-color: red;
}

.error {
	color:red
}
#allDept{
	position: absolute;
	top: 200px;
	left: 500px;
	background-color: #f90;
	border: 2px solid #EAEAEA;
}
</style>

<div class="ri_dq">当前所在位置：系统管理 > 用户管理</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>用户信息</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form action="editUser.cst" method="post" id="send">
			<ul class="list_sxq">
				<li style="">登录名</li>
				<p>
					<input readonly="readonly" type="text" id="login_name" name="login_name" class="required" value="${info.login_name }"/>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>用户名</li>
				<p>
					<input type="text" id="user_name" name="user_name" value="${info.user_name }" class="required" /> 
					<input type="hidden" name="user_id" value="${info.user_id }"/>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>邮箱</li>
				<p>
					<input type="text" id="user_email" name="user_email" value="${info.user_email }"/>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>电话</li>
				<p>
					<input type="text" id="user_tel" name="user_tel" value="${info.user_tel }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>手机</li>
				<p>
					<input type="text" id="user_mobile" name="user_mobile" value="${info.user_mobile }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>角色</li>
				<p>
					<input type="hidden" id="role_id" name="role_id" value="${info.role_id }" /> 
					<input type="text" id="role" class="required" name="role_name" value="${info.role_name }" readonly="readonly"/>
				</p>
				
			</ul>
			<ul class="list_sxq">
				<li>部门</li>
				<p>
					<input type="hidden" id="dept_id" name="dept_id" value="${info.dept_id }" /> 
					<input type="text" id="dept_name" value="${info.dept_name }" readonly="readonly" class="required"/>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>是否禁用</li>
				<p>
					<select name="user_disabled" style="border-color: #999; height: 23px; margin: 4px 0 0 4px">
						<c:if test="${info.user_disabled==1}">
							<option selected="selected" value="1">禁用</option>
							<option value="0">未禁用</option>
						</c:if>
						<c:if test="${info.user_disabled !=1}">
							<option selected="selected" value="0">未禁用</option>
							<option value="1">禁用</option>
						</c:if>
					</select>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新人</li>
				<p>
					<input type="hidden" name="updateuserid"
						value="${sessionScope.loginUser.user_id }" /> <input type="text"
						id="update_name" value="${info.update_name }" readonly="readonly" />
				</p>
			</ul>
			<div class="cz_midle_bottom">
				<span></span>
				<samp></samp>
			</div>
			<div class="clear">&nbsp;</div>

			<div style="text-align: right;">
				<input type="submit" value="修 改"
					style="width: 60px; height: 30px; text-align: center;" /> <input
					type="reset" value="重 置"
					style="width: 60px; height: 30px; text-align: center;" /> <input
					type="button" value="返回" id="fanhui"
					style="width: 60px; height: 30px; text-align: center;" />
			</div>
		</form>
	</div>
</div>
<!-- 所有角色信息 -->
<div id="allRole">
	<ul>
		<c:forEach items="${roles }" var="role">
			<li data="${role.role_id }">${role.role_name }</li>
		</c:forEach>
		<div>
			<input type="button" value="选择" id="selRole"> <input
				type="button" value="取消" id="quxiao">
		</div>
	</ul>
</div>

<!-- 所有的部门信息 -->
<div id="allDept">
	
</div>
<script type="text/javascript">
	$.getScript("/WebSite/resources/js/user/editdUser.js");
</script>