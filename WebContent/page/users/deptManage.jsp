<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!-- 用户管理界面 -->
<style type="text/css">
.addUser img {
	padding: 10ps 5px 0 5px;
}

.til span {
	margin: 0 5px
}

.tr2 {
	background-color: #EAEAEA;
}

#_page a {
	padding: 0px 5px;
	cursor: pointer;
}
</style>
<div>
	<div class="ri_dq">当前所在位置：系统管理 > 部门管理</div>

	<div>
		<ul>
			<li style="margin: 0 0 10px 20px">名称：<input name="deptName"
				id="deptName">
			</li>
			<li class="til" style="margin-left: 10px;"><span id="addDept">&nbsp;&nbsp;<img
					title="新增部门" src="\WebSite\resources\images\add.png">添加部门
			</span> <span id="delDept"><img title="批量删除"
					src="\WebSite\resources\images\delete.png">批量删除</span></li>
		</ul>
	</div>
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left">
				<span>部门管理</span>
			</div>
			<div class="cz_title_right">
				<samp>
					<p class="pack_up">
						<img src="/WebSite/resources/images/shouqi.png" /> 收起
					</p>
				</samp>
			</div>
		</div>
		<!--======scxq title========== -->
		<div class="cz_midle">
			<ul class="cz_midle_ts">
				<li style="width: 5%;" class="list_left"><input type="checkbox"
					id="all" /></li>
				<li style="width: 10%">名称</li>
				<li style="width: 10%">上级部门</li>
				<li style="width: 10%">名称缩写</li>
				<li style="width: 10%">区域</li>
				<li style="width: 10%">联系人</li>
				<li style="width: 10%">联系人手机</li>
				<li style="width: 10%">联系人邮箱</li>
				<li style="width: 25%">操作</li>
			</ul>
			<span id="_data"> <!--===== --> <c:forEach items="${depts }"
					var="dept" varStatus="status">
					<%-- <c:if test="${dept.super_dept!=null }"> --%>
					<ul dep='dep'
						<c:if test="${status.index %2==0}">style="background-color: #EAEAEA;"</c:if>>
						<li style="width: 5%;" class="list_left"><input
							type="checkbox" data="${dept.dept_id }" name="subBox" /></li>

						<li style="width: 10%" dept_name="${info.user_name}">${dept.dept_name}</li>

						<li style="width: 10%">${dept.superName }</li>

						<li style="width: 10%">${dept.dept_appr }</li>
						<li style="width: 10%">${dept.region }</li>
						<li style="width: 10%">${dept.linkman }</li>
						<li style="width: 10%">${dept.mobile}</li>
						<li style="width: 10%">${dept.email}</li>
						<li style="width: 25%"><span class="editDept"
							data="${dept.dept_id }"><img alt="修改"
								src="resources/images/edit.png" title="修改"> </span> <span
							class="showDept" data="${dept.dept_id }"><img alt="查看"
								src="resources/images/find.png" title="查看"> </span> <span
							class="delDept" data="${dept.dept_id }"><img alt="删除"
								src="resources/images/delete.png" title="删除"> </span></li>
					</ul>
					<%-- </c:if> --%>
				</c:forEach>
			</span>
		</div>
		<!--=========== -->
		<div class="djsb">
			<div class="sxfy">
				<c:if test="${page.pageIndex == 1}">
					<a href="javascript:void(0)"  data="1" class="reqDept as" >上一页</a>
				</c:if>
				<c:if test="${page.pageIndex != 1}">
					<a href="javascript:void(0)" data="${page.pageIndex-1 }" class="reqDept ax">上一页</a>
				</c:if>
				<span> 
					<a href="javascript:void(0)" data="1" class="reqDept yes">1</a> 
					<a href="javascript:void(0)" class="reqDept" data="2" >2</a>
				</span>
				<c:if test="${page.pageIndex == pageNum}">
					<a href="javascript:void(0)" data="${pageNum }" class="reqDept as">下一页</a>
				</c:if>
				<c:if test="${page.pageIndex != pageNum}">
					<a href="javascript:void(0)" data="${page.pageIndex+1 }" class="reqDept ax">下一页</a>
				</c:if>
				<ul>
					<li>共${pageNum }页 到第</li>
					<li><input class="goIndex" type="text" value="${page.pageIndex}" /> 页</li>
				</ul>
			</div>
		</div>
		<!-- <div id="_page">
		</div> -->
		<script type="text/javascript">
			$.getScript("/WebSite/resources/js/user/deptManage.js");
			$.getScript("/WebSite/resources/js/user/userUtil.js");
		</script>