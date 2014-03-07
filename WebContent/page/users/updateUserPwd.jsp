<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#myform ul {
	border-top: 0px;
	border-bottom: 0px
}

#myform ul li {
	margin-left: -280px;
	text-align: right;
}

.addBorder {
	border: 1px solid red;
}

.error {
	color: red;
}
</style>

<div class="ri_dq">当前所在位置：系统管理 > 修改密码</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>修改密码</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form action="updatePwd.cst" method="post" id="myform">
			<ul class="list_sxq">
				<li title="原密码">原密码</li>
				<p>
					<input class="required" id="oldpassword" type="password" name="oldpassword"
						required="required" value="" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li title="新密码">新密码</li>
				<p>
					<input id="pwd" type="password" name="password" value="" class="required"
						required="required" />
				</p>
			</ul>
			<ul class="list_sxq">
				<li title="确认密码">确认密码</li>
				<p>
					<td><input id="repwd" type="password" name="repassword"
						value="" required="required" class="required" />
				</p>
			</ul>
			<div class="cz_midle_bottom">
				<span></span>
				<samp></samp>
			</div>
			<div class="clear">&nbsp;</div>

			<div style="text-align: right;">
				<input type="submit" value="修改" id="send"
					style="width: 60px; height: 30px; text-align: center;" />
			</div>
		</form>
	</div>
	<script type="text/javascript">
		$.getScript("/WebSite/resources/js/user/updateUserPwd.js");
	</script>