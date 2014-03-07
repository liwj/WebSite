<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#edit ul {
	border-top: 0px;
	border-bottom: 0px
}

#edit ul li {
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

<div class="ri_dq">当前所在位置：系统管理 > 我的信息</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>我的信息</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form action="editUser.cst" method="post" id="edit"
			onsubmit="return saveReport();">
			<ul class="list_sxq">
				<li style="">登录名</li>
				<p>
					<input type="text" id="login_name" name="login_name"
						class="required" value="${info.login_name }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>用户名</li>
				<p>
					<input type="text" id="user_name" name="user_name"
						value="${info.user_name }" class="required" />
					<input type="hidden" name="user_id"
						value="${info.user_id }" /> <input
						type="hidden" name="user_disabled"
						value="${info.user_disabled }" />

				</p>
			</ul>
			<ul class="list_sxq">
				<li>邮箱</li>
				<p>
					<input type="text" id="user_email" name="user_email"
						value="${info.user_email }" class="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>电话</li>
				<p>
					<input type="text" id="user_tel" name="user_tel"
						value="${info.user_tel }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>手机</li>
				<p>
					<input type="text" id="user_mobile" name="user_mobile"
						value="${info.user_mobile }" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>角色</li>
				<p>
					<input type="hidden" name="role_id"
						value="${info.role_id }" /> <input type="text"
						id="role_id" value="${info.role_name }"
						readonly="readonly" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>部门</li>
				<p>
					<input type="hidden" name="dept_id"
						value="${info.dept_id }" /> <input type="text"
						id="dept_name" value="${info.dept_name }"
						readonly="readonly" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新人</li>
				<p>
					<input type="hidden" name="updateuserid"
						value="${info.user_id }" /> <input type="text"
						id="dept_name" value="${info.update_name }"
						readonly="readonly" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li>更新时间</li>
				<p>
					<input type="text" id="dept_name" value="${info.updatetime}"
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
					style="width: 60px; height: 30px; text-align: center;" />
			</div>
		</form>
	</div>
</div>


<script type="text/javascript">
	$.getScript("/WebSite/resources/js/user/showData.js");
</script>