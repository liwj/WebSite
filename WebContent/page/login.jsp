<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/jquery.cookie.js"></script>
<script type="text/javascript"
	src="<%=request.getContextPath()%>/resources/js/login.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=request.getContextPath()%>/resources/style/style.css"></link>
<script type="text/javascript">
</script>
<title>登陆</title>
</head>
<body style="background: #e0e0e0;">
	<div class="login">
		<div class="lantong">
			<img src="<%=request.getContextPath()%>/resources/images/lt_logo.png" />
		</div>
		<div class="clear"></div>
		<div class="login_middle">
			<div class="login_logo">
				<img src="<%=request.getContextPath()%>/resources/images/web_logo.png" />
			</div>
			<!-- -->
			<p style="position: relative; top: 92px; color: red" class="error">&nbsp;</p>
			<div class="login_input">
				<ul>
					<li><input type="text" value="admin"
						style="color: #ff7800; font-family: Arial;"></li>
					<li><input type="password" /></li>
				</ul>
				<span class="login_btn"></span>
			</div>
			<p
				style="position: relative; bottom: 105px; width: 105px; left: 400px; float: left">
				<input checked="checked" type="checkbox" style="width: 13px; height: 13px;"/>&nbsp;&nbsp;记住密码
			</p>
		</div>
	</div>
</body>
</html>
