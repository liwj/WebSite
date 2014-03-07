<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#editDept ul {
	border-top: 0px;
	border-bottom: 0px
}

#editDept ul li {
	margin-left: -280px;
	text-align: right;
}

.onError {
	color: red
}

.high {
	color: red;
}
</style>

<div class="ri_dq">当前所在位置：系统管理 > 部门管理 > 部门信息</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>部门信息</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form action="editDept.cst" method="post" id="editDept">
			<ul class="list_sxq">
				<li>部门编号</li>
				<p>
					<input type="text" name="dept_id" value="${deptInfo.dept_id }"
						readonly="readonly" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>部门名称</li>
				<p>
					<input type="text" id="dept_name" name="dept_name"
						value="${deptInfo.dept_name }" class="required" /> <input
						type="hidden" name="dept_id" value="${deptInfo.dept_id }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>上级部门</li>
				<p>
					<input type="hidden" id="super_dept" name="super_dept"
						value="${deptInfo.super_dept }" class="required" /> <input
						type="text" id="superName" name="superName"
						value="${deptInfo.superName }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>区域</li>
				<p>
					<input type="text" id="region" name="region"
						value="${deptInfo.region }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>部门名称缩写</li>
				<p>
					<input type="text" id="dept_appr" name="dept_appr"
						value="${deptInfo.dept_appr }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人</li>
				<p>
					<input type="text" name="linkman" id="linkman"
						value="${deptInfo.linkman }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人手机</li>
				<p>
					<input type="text" id="mobile" name="mobile"
						value="${deptInfo.mobile }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人电话</li>
				<p>
					<input type="text" id="tel" name="tel" value="${deptInfo.tel }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>联系人邮箱</li>
				<p>
					<input type="text" id="email" name="email"
						value="${deptInfo.email}" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新人</li>
				<p>
					<input type="hidden" id="updateuserid" name="updateuserid" value="${loginUser.user_id}" /> 
					<input type="text" value="${deptInfo.updateName}" readonly="readonly" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新时间</li>
				<p>
					<input type="text" value="${deptInfo.updatetime}"
						readonly="readonly" />
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
					type="button" value="返回" id="fanhui"
					style="width: 60px; height: 30px; text-align: center;" />
			</div>
		</form>
	</div>
</div>


<script type="text/javascript">
$.getScript("/WebSite/resources/js/user/editdDeptInfo.js");
</script>