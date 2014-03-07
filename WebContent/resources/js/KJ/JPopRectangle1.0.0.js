/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JPopRectangle.js
// 文件功能描述：矩形提示框js
//
// 创建标识：2012-08-13 11:54
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var JPopRectangle = function(param){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		a: {
			zIndex: 1000,
			recClass: "rectanglePanel",
			recTxtClass: "recTxtPanel",
			bacClass: "backgroundPanel",
			pMain: null,
			pText: null,
			pBack: null
		},
		skin: {
			sMain: ""
			
		},
		style: {
			rectanglePanel: {
				width: "auto",
				height: "39px",
				display: "none",
				margin_top: "-15px",
				position: "fixed",
				top: "50%"
			},
			border1: {
				background: "#000000",
				border_top: "1px solid #000000",
				border_bottom: "1px solid #000000",
				font_size: "0px",
				width: "1px",
				height: "34px",
				float: "left",
				margin_top: "2px"
			},
			border2: {
				background: "#FFFFFF",
				border_top: "1px solid #000000",
				border_bottom: "1px solid #000000",
				font_size: "0px",
				width: "1px",
				height: "36px",
				float: "left",
				margin_top: "1px"
			},
			recTxtPanel: {
				background: "#FFFFFF",
				border_top: "1px solid #000000",
				border_bottom: "1px solid #000000",
				float: "left",
				height: "38px",
				line_height: "38px",
				padding: "0px 15px"
			},
			backgroundPanel: {
				display: "none",
				background_color: "#000000",
				width: "100%",
				position: "absolute",
				top: "0px",
				left: "0px",
				filter: "alpha(opacity=20)",
				_moz_opacity: 0.2,
				opacity: 0.2
			}
		},
		//正则表达式库
        regExp: {
			R000: /_/gi 										//设置样式替换下划线
        }
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {
		conf: {
			color: "#000000",
			text: "Loading...",
			isBack: true,
			timeOut: 3000
		}
	};
	//定义一个对象，用于存储该js需要用到的文本字符串
	var lang = {};
	//定义一个对象，用于存储该js需要用到的页面元素对象
	var elem = {
		rectangle: "."+private.a.recClass,
		background: "."+private.a.bacClass
	};
	//内部私有公共函数库
	private.fn = {
		//初始化页面元素
		initElem: function(a){
			for(var b in a){ a[b] = $(a[b]); }
			return a;
		},
		//设置样式
		setStyle: function(a, b){
			var c = private.regExp;
			for(var d in b){ a.css(d.replace(c.R000, "-"), b[d]); }
			return a;
		},
		//获取浏览器的宽和高（包括滚动条）
		wh: function(){
			var a, b, c;
			a = {};
			b = document.documentElement.clientHeight;
			c = document.body.offsetHeight;
			a.height = c >= b ? c : b;
			return a;
		},
		/**
		 * 获取一个额颜色
		*/
		getColor: function(key, color, num){
			if(!private.regExp.R001.test(color)){alert( "你传递的颜色不符合规则: #RRGGBB "); return color;}
			var r = parseInt("0x"+ RegExp.$1, 16);
			var g = parseInt("0x"+ RegExp.$2, 16);
			var b = parseInt("0x"+ RegExp.$3, 16);
			switch(key) {
				case "red": r += parseInt(num, 10); break;
				case "green": g += parseInt(num, 10); break;
				case "blue": b += parseInt(num, 10); break;
				case "light": r += parseInt(num, 10); g += parseInt(num, 10); b += parseInt(num, 10); break;
				case "dark": r -= parseInt(num, 10); g -= parseInt(num, 10); b -= parseInt(num, 10); break;
			}
			r = r>255 ? 255 : r<0 ? 0 : r;
			g = g>255 ? 255 : g<0 ? 0 : g;
			b = b>255 ? 255 : b<0 ? 0 : b;
			r = r.toString(16);
			g = g.toString(16);
			b = b.toString(16);
			r = ("00"+r).substr(r.length);
			g = ("00"+g).substr(g.length);
			b = ("00"+b).substr(b.length);
			return "#"+ r + g + b;
		}
	};
	//函数体对象
	var fn = {
		//页面初始化加载数据
		loadInit: function(a){
			var b, c, d, e, f;
			if(a != undefined){ $.extend(public.conf, a); }
			if(elem.background.length == 0){
				fn.createBackground();
				fn.setFixedStyle();
			}
			else{ private.a.pBack = elem.background.hide(); }
			if(elem.rectangle.length == 0){
				fn.createHtml();
				fn.setFixedStyle();
			}
			else{
				private.a.pMain = elem.rectangle.hide();
				private.a.pText = elem.rectangle.find("."+private.a.recTxtClass);
			}
		},
		createColor: function(){
			
		},
		//创建提示框html
		createHtml: function(){
			var a, b, c;
			a = [], b = private.a;
			a.push('<div class="'+b.recClass+'">');
			a.push('	<div class="border1"></div>');
			a.push('	<div class="border2"></div>');
			a.push('	<div class="'+b.recTxtClass+'">'+public.conf.text+'</div>');
			a.push('	<div class="border2"></div>');
			a.push('	<div class="border1"></div>');
			a.push('</div>');
			c = $(a.join("\r\n"));
			b.pMain = c;
			b.pText = c.find("."+b.recTxtClass);
			$(document.body).append(c);
		},
		//创建背景层
		createBackground: function(){
			var a, b, c;
			a = [], b = private.a;
			b.zIndex++;
			a.push('<div class="'+b.bacClass+'"></div>');
			c = $(a.join("\r\n"));
			b.pBack = c;
			$(document.body).append(c);
		},
		//设置需要改变的样式a:[{elem:需要设置的元素对象，style:需要设置的样式json对象}]
		changeStyle: function(){
			var a, b, c, d;
			d = private.a, a = [];
			if(public.conf.isBack){
				if(d.pBack){
					a.push({elem: d.pBack, style: { z_index: d.zIndex+1, height: private.fn.wh().height }});
				}
			}
			if(d.pMain){ a.push({elem: d.pMain, style: { z_index: d.zIndex+1 }}); }			
			for(b=0, c=a.length; b<c; b++){
				d = a[b];
				private.fn.setStyle(d.elem, d.style);
			}
		},
		//设置固定的样式
		setFixedStyle: function(){
			var a, b, c, d, e;
			a = private.style;
			for(b in a){
				c = a[b];
				private.fn.setStyle($("."+b), c);
			}
			fn.changeStyle();
		},
		show: function(a){
			var b, c, d, e, f;
			if(a){ $.extend(public.conf, a); }
			b = private.a;
			c = public.conf;
			b.pText.html(c.text);
			if(c.isBack){ b.pBack.show(); }
			fn.changeStyle();
			b.pMain.show();
			b.pMain.css("left", (((document.documentElement.clientWidth - b.pMain.width())/2) + document.documentElement.scrollLeft)+"px");
			if(c.timeOut!=0){ setTimeout(fn.hide, c.timeOut); }
		},
		hide: function(){
			var a = private.a;
			if(public.conf.isBack){ a.pBack.css("z-index", parseInt(a.pBack.css("z-index"))-1).hide(); }
			a.pMain.css("z-index", parseInt(a.pMain.css("z-index"))-1).hide();
		}
	};
	//函数体操作对象
	var handle = {
		//初始化需要初始化的函数
		fnInit: function(a){
			//初始化页面元素
			private.fn.initElem(elem);
			//初始化页面加载参数
			fn.loadInit(a);
		}
	};
	//返回对象(该对象中一般只包括一个init函数对象，根据需要，可以自行添加)
	var callBack = {
		show: function(a){ fn.show(a); },
		hide: function(){ fn.hide(); }
	};
	handle.fnInit(param);
	return callBack;
};