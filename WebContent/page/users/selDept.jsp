<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<style type="text/css">
	#depts ul{float: left;height: 200px; width: 120px; border:2px solid #EAEAEA;}
	#depts .subDept{overflow: auto;}
	#depts .subDept li{display: none;}
	#depts  li{cursor: pointer;}
	#depts p{clear: both;}
	.sel{background-color: red}
</style>
<div id="depts">
	<ul class="dept">
		<c:forEach items="${depts}" var="dept">
			<c:if test="${dept.super_dept == 0 && dept.dept_id > 1}">
				<li data="${dept.dept_id }">${dept.dept_name }</li>
			</c:if>
		</c:forEach>
	</ul>
	<ul class="subDept">
		<c:forEach items="${depts}" var="dep">
			<c:if test="${dep.super_dept > 0 && dep.super_dept != null }">
				<li superId="${dep.super_dept }" data="${dep.dept_id }">${dep.dept_name }</li>
			</c:if>
		</c:forEach>
	</ul>
	<p>
		<input type="button" value="选择" id="selDept"> <input
				type="button" value="取消" id="qx">
	</p>
</div>
<script type="text/javascript">
	$(function(){
		$(".dept li").click(function() {
			$(this).siblings().removeClass("sel");
			$(this).addClass('sel');
			var _id = $(this).attr('data');
			var _sub = $('.subDept li');
			for(var i=0;i<_sub.length;i++){
				if($.trim($(_sub[i]).attr('superId'))==_id){
					$(_sub[i]).show();
					$(_sub[i]).click(function(){
						$(this).siblings().removeClass("sel");
						$(this).addClass('sel');
					});
				}else{
					$(_sub[i]).hide();
				}
			}
			
			//选择部门
			$('#selDept').click(function(){
				var _li = $(".subDept li");
				for ( var i = 0; i < _li.length; i++) {
					if ($(_li[i]).hasClass('sel')) {
						var dName = $(_li[i]).text();
						var dId = $(_li[i]).attr('data');
						$('#dept_name').val(dName);
						$('#dept_id').val(dId); 
						$('#dept_name').next().next().remove();
					}
				}
				$('#depts').hide();
			});
		});
		$('#qx').click(function(){$('#depts').hide();});
	});	
</script>