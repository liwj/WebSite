<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<style type="text/css">
#addRole ul {
	border-top: 0px;
	border-bottom: 0px
}

#addRole ul li {
	margin-left: -280px;
	text-align: right;
}
</style>

<div class="ri_dq">当前所在位置：系统管理 > 角色管理 >添加角色</div>
<div class="czgj">
	<div class="cz_title">
		<div class="cz_title_left">
			<span>添加角色</span>
		</div>
		<div class="cz_title_right">
			<samp>
				<p class="pack_up"></p>
			</samp>
		</div>
	</div>
	<div class="sc_midle">
		<form id="addRole" method="post" action="addRole.cst"
			onsubmit="return saveReport();">
			<ul class="list_sxq">
				<li style="">角色名</li>
				<p>
					<input type="text" id="role_name" name="role_name" class="required"
						value="" required="required" /><span style="color: red">*</span>
				</p>
			</ul>
			<ul class="list_sxq" style="margin: 10px 0 10px 0">
				<li>备注</li>
				<p>
					<textarea cols="50" rows="8" name="role_remark">
						
					</textarea>
				</p>
			</ul>
			<div class="cz_midle_bottom">
				<span></span>
				<samp></samp>
			</div>

			<div style="text-align: right;">
				<input type="submit" value="保存" id="send"
					style="width: 60px; height: 30px; text-align: center;" /> <input
					type="button" value="取消" id="fanhui"
					style="width: 60px; height: 30px; text-align: center;" />
			</div>
		</form>
	</div>
</div>


<script type="text/javascript">
	function saveReport() {
		if ($.trim($('#role_name').val()).length != 0) {
			$("#addRole").ajaxSubmit(function(message) {
				if (message == "ok") {
					alert("添加成功");
				} else {
					alert("添加失败");
				}
			});
		}
		$('#role_name span').html("角色名不能为空");
		return false;
	}
</script>