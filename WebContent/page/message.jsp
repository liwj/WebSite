<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>close</title>
<script type="text/javascript" src="<%=request.getContextPath() %>/resources/js/jquery-1.9.1.min.js"></script>
</head>
<body>
	<center>
		<h1>${msg}.....</h1>
	</center>
</body>
<script type="text/javascript">
	$(function() {
		var _window_close = function() {
			window.close();
		};
		setTimeout(_window_close, 1000);
	});
</script>
</html>