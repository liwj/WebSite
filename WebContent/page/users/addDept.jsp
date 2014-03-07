<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#addDept ul {
	border-top: 0px;
	border-bottom: 0px
}

#addDept ul li {
	margin-left: -280px;
	text-align: right;
}

.error {
	color: red
}
</style>

<div class="ri_dq">当前所在位置：系统管理 > 部门管理 > 添加部门</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span title="添加部门">添加部门</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form id="addDept" method="post" action="saveDept.cst"
			onsubmit="return saveReport();">
			<ul class="list_sxq">
				<li>部门名称</li>
				<p>
					<input title="部门名称" type="text" id="dept_name" name="dept_name"
						class="required" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>上级部门</li>
				<p>
					<select name="super_dept" id="super_dept"
						style="border-color: #999; height: 23px; margin: 4px 0 0 4px">
						<c:forEach items="${depts }" var="dept">
							<c:if test="${dept.super_dept == 0  || dept.dept_id == null}">
								<option value="${dept.dept_id }">${dept.dept_name }</option>
							</c:if>
						</c:forEach>
					</select>
				</p>
			</ul>
			<ul class="list_sxq">
				<li>名称缩写</li>
				<p>
					<input type="text" id="dept_appr" name="dept_appr" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>区域</li>
				<p>
					<input type="text" id="region" name="region" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人</li>
				<p>
					<input type="text" id="linkman" name="linkman" value=""
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人电话</li>
				<p>
					<input type="text" id="tel" name="tel" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人手机</li>
				<p>
					<input type="text" id="mobile" name="mobile" value=""
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>邮箱</li>
				<p>
					<input type="text" id="email" name="email" value=""
						class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新人</li>
				<p>
					<input type="hidden" name="updateuserid"
						value="${sessionScope.loginUser.user_id }" /> <input type="text"
						id="updateuserid" readonly="readonly"
						value="${sessionScope.loginUser.user_name }" />
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


<script type="text/javascript">
	$.getScript("/WebSite/resources/js/user/addDept.js");
</script>