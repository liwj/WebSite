<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<script type="text/javascript">
$(function(){
	$(".btn").click(function(){
		var a = JVerfier().verfier();//true.验证通过，false.验证失败
		if(a){alert("success");}
	});
	//初始化编辑
	var initEdit = function(a){
		JEditTbl().doEdit();
		JVerfier().init();
		a.hide().parent().find(".btnSave").show();
	};
	var initSave = function(a){
		//提交数据保存
		var b = JVerfier().verfier({forms: "ul.edit"});//true.验证通过，false.验证失败
		if(b){
			a.hide().parent().find(".btnEdit").show();
			JEditTbl().doSave();
			var rsVer = JVerfier().showBubble($(".btnEdit"), "保存成功！", 3000);
		}
	};
	$(".btnEdit").click(function(){ initEdit($(this)); });
	$(".btnSave").click(function(){ initSave($(this)); });
})
</script>
</head>

<body>
<div class="right form">
	<div class="ri_dq">当前所在位置：wlan热点工程管理 > 基础配置</div>
	<!--========================== -->
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left"><span>市场需求信息</span></div>
			<div class="cz_title_right"><samp>
				<p class="btnEdit"><img src="images/edit.png" />编辑</p>
				<p class="btnSave" style="display: none;"><img src="images/edit.png" />保存</p>
				<p><img src="images/shouqi.png" />收起</p>
				</samp></div>
		</div>
		<!--======scxq title========== -->
		<div class="sc_midle editTbl">
			<ul class="list_sxq">
				<li style="background:none;"><span>asd室分传分传输</span>
					<p class="list_xx" conf='{className: "required int"}'>室分传输线路段路</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p conf='{type: "select", className: "required", option:[{val:0, txt:"abc"},{val:1, txt:"ABC"},{val:2, txt:"ABc"}]}'>abc</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p conf='{type: "checkbox", className: "required", option:[{val:0, txt:"abc"},{val:1, txt:"ABC"},{val:2, txt:"ABc"}]}'>ABc</p>
				</li>
			</ul>
			<ul class="list_sxq">
				<li style="width:100%; background:none;"><span> 室分传线路段路</span>
					<p conf='{type: "radio", className: "required", option:[{val:0, txt:"abc"},{val:1, txt:"ABC"},{val:2, txt:"ABc"}]}'>ABC</p>
				</li>
			</ul>
			<ul class="list_sxq">
				<li style=" background:none;"><span> 室分路输线路段路</span>
					<p>室分传输线路段路</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p>室分传输线路段路</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p>室分传输线路段路</p>
				</li>
			</ul>
			
			<!--===== -->
			<div class="cz_midle_bottom"> <span></span> <samp></samp></div>
			<!--==== --> 
		</div>
		<!--======scxq middle========== --> 
	</div>
	<!--================scxq over========================= -->
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left"><span>市场需求信息</span></div>
			<div class="cz_title_right">
            	<!--<samp>
				<p><img src="images/edit.png" />编辑</p>
				<p><img src="images/shouqi.png" />收起</p>
				</samp>-->
            </div>
		</div>
		<!--======scxq title========== -->
		<div class="sc_midle">
             <div class="fen"><span>设备信息</span></div>
			<ul class="list_sxq">
				<li style=" background:none;"><span> 室分传分传输线</span>
					<p class="list_xx">
						<input name="" type="text" class="required int" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
				<li><span> 室分传输线路段路int</span>
					<p>
						<input name="" type="text" class="int" />
					</p>
				</li>
			</ul>
            <ul class="list_sxq">
				<li style=" background:none;"><span class="list_line"> 室分传分传输线路分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p>
						<input name="" type="text" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
			</ul>
            <div class="fen"><span>材料信息</span></div>
            <ul class="list_sxq">
				<li style=" background:none;"><span class="list_line"> 室分传分传输线路分传输线路输线路段路</span>
					<p>
						<input name="" type="text" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
			</ul>
			<ul class="list_sxq">
				<li style=" background:none;"><span> 室分传分输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
				<li><span> 室分传输线路段路</span>
					<p class="list_xx">
						<input name="" type="text" class="required" />
					</p>
				</li>
			</ul>
            <ul class="list_sxq">
				<li style="width:100%; background:none;"><span> 室分传分传线路段路</span>
					<p>
						<input name="" type="text" />
					</p>
				</li>
			</ul>
			<div class="clear"></div>
			
			<!--===== -->
			<div class="cz_midle_bottom"> <span></span> <samp></samp></div>
			<!--==== --> 
		</div>
		<!--======scxq middle========== --> 
	</div>
	<!--================sbcl over========================= -->
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left"><span>网建部规划</span></div>
			<div class="cz_title_right"><samp>
				<p><img src="images/annex.png" />上传附件</p>
				<p><img src="images/edit.png" />编辑</p>
				<p><img src="images/shouqi.png" />收起</p>
				</samp></div>
		</div>
		<!--======scxq title========== -->
		<div class="sc_midle">
			<ul class="list_sxq">
				<li style="width:100%; background:none;"><span> 备注</span>
					<p>
						<input name="" type="text" />
					</p>
				</li>
			</ul>
			<div class="clear"></div>
			
			<!--===== -->
			<div class="cz_midle_bottom"> <span></span> <samp></samp></div>
			<!--==== --> 
		</div>
		<!--======scxq middle========== --> 
	</div>
	<!--================sbcl over========================= -->
	
	<div class="czgj">
		<div class="cz_title">
			<div class="cz_title_left"><span>操作轨迹</span></div>
			<div class="cz_title_right"><samp>
				<p><img src="images/shouqi.png" />收起</p>
				</samp></div>
		</div>
		<!--======scxq title========== -->
		<div class="cz_midle">
			<ul class="cz_midle_ts">
				<li style="width:5%;">序号</li>
				<li style="width:15%">环节名称</li>
				<li style="width:10%">操作人</li>
				<li style="width:10%">开始时间</li>
				<li style="width:10%">结束时间</li>
				<li style="width:20%">附件</li>
				<li style="width:30%" class="list_left">备注</li>
			</ul>
			<!--===== -->
			<ul>
				<li style="width:5%;">序号</li>
				<li style="width:15%">环节名称</li>
				<li style="width:10%">操作人</li>
				<li style="width:10%">开始时间</li>
				<li style="width:10%">结束时间</li>
				<li style="width:20%">附件</li>
				<li style="width:30%" class="list_left">备注</li>
			</ul>
			<!--===== -->
			<ul>
				<li style="width:5%;">序号</li>
				<li style="width:15%">环节名称</li>
				<li style="width:10%">操作人</li>
				<li style="width:10%">开始时间</li>
				<li style="width:10%">结束时间</li>
				<li style="width:20%">附件</li>
				<li style="width:30%"  class="list_left">备注</li>
			</ul>
			<!--===== -->
			<div class="cz_midle_bottom"> <span></span> <samp></samp></div>
			<!--==== --> 
		</div>
		<!--======scxq middle========== --> 
	</div>
	<!--================czgj over========================= --> 
<div class="bottom_btn">
<div class="btn"><a>取 消</a></div> <div class="btn" id="btn_ts"><a>保存并流转</a></div> <div class="btn"><a>保 存</a></div>
</div>
</div>