<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/style/style.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/style/main.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/style/UI/animate.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/resources/style/UI/jPages.css">
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/menu.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/jquery.form.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/jQueryUI/jPages.js"></script>

<title>首页</title>
</head>
<body>
	<div class="context">
		<div class="head">
			<%@include file="nav.jsp"%>
		</div>
		<div class="main" style="width:100%;">
			<div class="main_left" style="float: left; height: 25%;">
				<%@include file="left.jsp"%>
			</div>
			<div class="main_right" style="width: 85%; float: left">
				<%@include file="users/userManage.jsp" %>
			</div>
		</div>
		<div class="foot"></div>
	</div>
</body>
</html>