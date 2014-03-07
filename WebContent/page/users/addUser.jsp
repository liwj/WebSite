<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#addUser ul {
	border-top: 0px;
	border-bottom: 0px
}

#addUser ul li {
	margin-left: -280px;
	text-align: right;
}

.error {
	color: red
}

#allDept{
	position: absolute;
	top: 200px;
	left: 500px;
	background-color: #f90;
	border: 2px solid #EAEAEA;
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
</style>

<div class="ri_dq">当前所在位置：系统管理 > 用户管理 >添加用户</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>添加用户</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form id="addUser" method="post" action="saveUser.cst">
			<ul class="list_sxq">
				<li>登录名</li>
				<p>
					<input type="text" id="login_name" name="login_name" class="required" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>密码</li>
				<p>
					<input type="password" id="user_password" name="user_password"
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>确认密码</li>
				<p>
					<input type="password" id="reuser_password" name="reuser_password"
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>用户名</li>
				<p>
					<input type="text" id="user_name" name="user_name" value=""
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>邮箱</li>
				<p>
					<input type="text" id="user_email" name="user_email" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>电话</li>
				<p>
					<input type="text" id="user_tel" name="user_tel" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>手机</li>
				<p>
					<input type="text" id="user_mobile" name="user_mobile" value=""/>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>角色</li>
				<p>
				
					<input type="hidden" id="role_id" name="role_id" value="" /> 
					<input type="text" id="role" name="roleName" value="请选择" readonly="readonly" class="required"/>
					<%-- <select name="role_id"
						style="border-color: #999; height: 23px; margin: 4px 0 0 4px">
						<c:forEach items="${roles }" var="role">
							<option value="${role.role_id }">${role.role_name }</option>
						</c:forEach>
					</select> --%>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>部门</li>
				<p>
					<input type="hidden" id="dept_id" name="dept_id" value="" /> 
					<input type="text" id="dept_name" value="请选择" readonly="readonly" id="dept_name"  class="required"/>
					<%-- <select name="dept_id" class="dept"
						style="border-color: #999; height: 23px; margin: 4px 0 0 4px">
						<c:forEach items="${depts }" var="dept">
							<c:if
								test="${dept.super_dept != 0 && dept.dept_id != 1 && dept.super_dept != null && dept.super_dept != 1}">
								<option value="${dept.dept_id }">${dept.dept_name}</option>
							</c:if>
						</c:forEach>
					</select> --%>
				</p>
			</ul>

			<div class="cz_midle_bottom">
				<span></span>
				<samp></samp>
			</div>
			<div class="clear">&nbsp;</div>

			<div style="text-align: right;">
				<input type="submit" value="添  加" id="send"
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
	$.getScript("/WebSite/resources/js/user/addUser.js");
</script>