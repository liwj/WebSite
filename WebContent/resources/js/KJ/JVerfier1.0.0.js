/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技-潘毅
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JVerfier.js
// 文件功能描述：表单验证js
//
// 创建标识：2012-09-04 16:46
// 描述：表单验证，需要给需要验证的元素用一个容器装起，最好是form(默认)，可根据自己定义；必填项，在元素上添加class name [required]，输入框的内容最少不能少于多少，直接在元素
// 		上添加属性[min="6"]，其他验证需添加的class name，参考private.conf.verClass
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var JVerfier = function(){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		//正则表达式库
        regExp: {
			R000: /_/gi,											//设置样式替换下划线
			R001: /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i		//是否为RGB颜色值
        },
		conf: {
			//深色的颜色值
			darkColor: "#FF0000",
			//浅色的颜色值
			lightColor: "#FFDCDC",
			//文字的颜色
			fontColor: "",
			border: null,
			bubble: '<span class="bMain"><div class="bLabel">*</div><div class="bSpan"></div></span>',
			mClass: "required",
			wClass: "watermarks",
			inputBg: "m/images/input_bg.png",
			//num 数字、email 邮件、tel 电话、phone 手机、postcode 邮编、idcard 身份证、url URL地址、Alphanumeric 字母数字混合、
			//V000 数字,字母,下划线,中划线,点、V001 中文,括号,数字或字母,中划线、V002 中文,字母,中划线
			verClass: ["int", "num", "email", "tel", "phone", "telPhone", "postcode", "idcard", "url", "Alphanumeric", "V000", "V001", "V002", "V003"]
		},
		style: {
			bMain: {
				border: "none",
				background: "none",
				padding: "0px",
				width: "auto",
				height: "30px",
				font_size: "11px",
				position: "absolute",
				z_index: "10",
				float: "left",
				margin_top: "-32px"
			},
			bLab: {
				width: "auto",
				height: "32px",
				float: "left",
				opacity: "0.85"
			},
			bLab1: {
				width: "1px",
				font_size: "0px",
				height: "20px",
				float: "left",
				margin_top: "2px"
			},
			bLab2: {
				width: "1px",
				font_size: "0px",
				height: "22px",
				float: "left",
				margin_top: "1px"
			},
			bLabel: {
				width: "auto",
				height: "24px",
				line_height: "24px",
				padding: "0px 2px",
				float: "left",
				text_indent: "0px"
			},
			bSpan: {
				width: "9px",
				height: "10px",
				float: "left",
				position: "absolute",
				left: "10px",
				top: "24px",
				opacity: "0.85"
			}
		}
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {
		conf: {
			//颜色值
			color: "#FF0000",
			//color: "#000000",
			//focus控件的颜色
			focusColor: "#C8C8C8",
			//forms
			//forms: "div#navTab",
			forms: ".form",
			//是否启用输入框背景
			isBg: false,
			//是否在验证通过时,返回JSON数据对象
			isData: false,
			//提示消息框的三角形显示位置
			layout: "bottom",
			//需要做验证的标签名
			element: "input,textarea,select"
		}
	};
	//定义一个对象，用于存储该js需要用到的文本字符串
	var lang = {
		S000: "请输入正确格式的内容",
		S001: "*必填",
		int: "请输入正整数",
		num: "请输入数字",
		email: "请输入正确的邮件(如:xxx@163.com)",
		tel: "请输入正确的座机号码(如:68888888)",
		phone: "请输入正确的手机号码(如:13888888888)",
		telPhone: "请输入电话号码(座机或手机)",
		postcode: "请输入正确的邮编(如:400000)",
		idcard: "请输入正确的身份证号码",
		url: "请输入正确的地址",
		Alphanumeric: "只能为字母和数字",
		V000: "只能为数字,字母,下划线,中划线,点",
		V001: "只能为中文,括号,数字或字母,中划线,下划线",
		V002: "只能为中文,字母,中划线,下划线",
		V003: "只能为中文"
	};
	//定义一个对象，用于存储该js需要用到的页面元素对象
	var elem = {};
	//内部私有公共函数库
	private.fn = {
		/**
		 * 初始化页面元素
		 * @param a.元素的选择器json对象
		 */
		initElem: function(a){
			for(var b in a){ a[b] = $(a[b]); }
			return a;
		},
		/**
		 * 设置样式
		 * @param a.需要设置样式的元素
		 * @param b.样式json对象
		 */
		setStyle: function(a, b){
			var c = private.regExp;
			for(var d in b){ a.css(d.replace(c.R000, "-"), b[d]); }
			return a;
		},
		/**
		 * 文本框水印
		 * @param target.需要添加水印的元素对象
		 * @param msg.文字
		 * @param style.样式
		 */
		watermark: function (target, msg, style) {
			var $target = $(target), j, k;
			var height = $target.height();
			height = height ? height+4 : 24;
			var _style = { height: (height)+"px", size: "12px" };
			var color = {
				deep: "#111111",   //深色
				tint: "#AAAAAA"   //浅色
			};
			$.extend(_style, style);
			var cssText = [];
			j = $target.css("float");
			if(j == "left"){ k = "-"+($target.width())+"px"; }
			else{ k = "0px"; }
			//span样式
			cssText.push('float:left;margin-left:'+k+';-moz-transition: all 0.2s ease-out 0s;padding: 0 0 0 3px;');
			cssText.push('position: absolute;opacity:1;z-index:2; visibility:visible;');
			cssText = cssText.join("\r\n");
			var spanText = '<span class="'+private.conf.wClass+'">' + msg + '</span>';
			var $span = null;	
			(function () {
				try {
					//init load
					var hasVal = $target.val().length > 0;
					//是否有val
					$span = $(spanText)
						.css("border", "0px")
						.css("cssText", cssText)
						.css("line-height", _style.height)
						.css("font-size", _style.size)
						.css("color", color.deep)
						.css("visibility", hasVal ? "hidden" : "visible")
						.css("opacity", hasVal ? 0 : 1);
					//inster span
					$target.before($span);
				} catch (e) { }
			})();
			var fn = {
				span_click: function () {
					/// <summary>点击文本框</summary>
					$span.css("color", color.tint);
					$target.focus();
				},
				text_click: function () {
					/// <summary>文本框点击</summary>
					$span.css("color", color.tint);
					$target.focus();
				},
				text_blur: function () {
					/// <summary>文本框失去焦点</summary>
					if ($target.val().length == 0) { $span.css("visibility", "visible").css("color", color.deep).css("opacity", 1); }
					$span.css("color", color.deep);
				},
				text_keyup: function (event) {
					/// <summary>文本框输入</summary>
					if ($target.val().length > 0) { $span.css("visibility", "hidden").css("opacity", 0); }
				},
				text_mouseout: function () {
					/// <summary>文本框mouseout[主要作用在于用户用鼠标进行内容粘贴时](2012-04-06 新增)</summary>
					if ($target.val().length > 0) { $span.css("visibility", "hidden").css("opacity", 0); }
				}
			};	
			//input operate
			$target.click(fn.text_click)
				   .blur(fn.text_blur)
				   .keyup(fn.text_keyup)
				   .keydown(fn.text_keyup)
				   .change(fn.text_keyup)
				   .mouseout(fn.text_mouseout);
			//span operate
			$span.unbind().click(fn.span_click);
		},
		/**
		 * 表单验证
		 * @param a.需要验证的内容
		 * @param b.验证的类型
		 * num 数字、email 邮件、tel 电话、phone 手机、postcode 邮编、idcard 身份证、url URL地址、Alphanumeric 字母数字混合、
		 * V000 数字,字母,下划线,中划线,点、V001 中文,括号,数字或字母,中划线,下划线、V002 中文,字母,中划线
		 */
		validate:function(a, b){
			var c, d, e, f, g;
			b = b ? b : "Alphanumeric";
			e = a.length;
			switch(b){
				case "V000": c = /^[0-9a-zA-Z_.\-]{1,}$/; break;
				case "V001": c = /^[\u4E00-\u9FA5\uF900-\uFA2D0-9a-zA-Z\-\_\(\)\（\）]{1,}$/; break;
				case "V002": c = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z\-\_]{1,}$/; break;
				case "V003": c = /^[\u4E00-\uFA29]*$/; break;
				case "Alphanumeric": c = /^[A-Za-z0-9]+$/; break;
				case "int": c = /^[0-9]*[0-9][0-9]*$/; break;
				case "num": c = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/; break;
				case "email": c = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; break;
				//case "idcard": c = /^\d{15}|\d{}18$/; break;
				case "tel": c = /(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/; break;
				case "phone": c = /^1[3-9]{1}[0-9]{9}$/; break;
				case "url": c = /^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/; break;
				case "postcode": c = /^[1-9][0-9]{5}$/; break;
			};
			d = new RegExp(c).test(a);
			if(b == "telPhone"){
				d = private.fn.validate(a, "tel");
				if(!d){ d = private.fn.validate(a, "phone"); }
			}
			//如果为身份证
			if(b == "idcard"){
				//长度为15或18为
				if(e == 15 || e == 18){
					f = isNaN(a.substring(0, e-1));
					if(!f){
						f = a.substring(e-1, e).toUpperCase();
						d = f == "X" || !isNaN(f) ? true : false;
					}
					else{ d = false; }
				}
				else{ d = false; }
			}
			return d;
		},
		/**
		 * 通过设置获取相应颜色值
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
		},
		/**
		 * 移除数组相同元素
		 * @param a.Array
		 */
		removeRepeat: function(a){
			var len = a.length;
			for(var i=len-1; i>=1; i--){
				if(a[i-1] == a[i]) { a.splice(i,1); }
			}
			return a;
		},
        /**
		 * 设置文本不能被选择
		 * @param a.当前元素对象
		 * @param b.鼠标样式 选填，默认为"default"
		 * @return 当前元素对象 a
		 */
        disableSelection: function (a, b) {
            /// <summary>设置文本不能被选择</summary>
            /// <param name="a" type="Object">当前元素对象</param>
            /// <param name="b" type="String">鼠标样式 选填，默认为"default"</param>
            /// <returns type="Object" />当前元素对象 a
            //定义函数内部变量
            var c, d, e;
			a = $(a);
            //初始化变量值
            c = a.length;
            b = b ? b : "default";
            //循环元素
            for (d = 0; d < c; d++) {
                //获取单个元素
                e = a[d];
                if (typeof e.onselectstart != "undefined") {
					e.onselectstart = function () { return false; };
					e.onmouseover = function(event){
						try{
							var element = event.target || event.srcElement;
							var nodeName = element.nodeName;
							if(nodeName == "INPUT" || nodeName == "TEXTAREA"){
								e.onselectstart = function () { return true; };
								element.onmouseout = function(){ e.onselectstart = function () { return false; }; };
							}
						}catch(ex){}
					};
				}
                else if (typeof e.style.MozUserSelect != "undefined") {
					e.style.MozUserSelect = "none";
					e.onmouseover = function(event){
						var element = event.target || event.srcElement;
						var nodeName = element.nodeName;
						if(nodeName == "INPUT" || nodeName == "TEXTAREA"){
							e.style.MozUserSelect = "";
							element.onmouseout = function(){ e.style.MozUserSelect = "none"; };
						}
					};
				}
                e.style.cursor = b;
            }
            //删除临时变量
            delete b, delete c, delete d, delete e;
            return a;
        },
		//获取元素在页面上的坐标
        getElementTL: function (a) {
            /// <summary>获取元素在页面上的坐标</summary>
            /// <param name="a" type="Object">需要获取坐标的元素</param>
            /// <returns type="Object">{top: 坐标y, left: 坐标x}
            //定义函数内部变量
            var b, e, f, g, h, i;
            //初始化变量值
            b = navigator.userAgent.toLowerCase();
            e = { top: 0, left: 0 };
            //如果元素的父级为空或者元素为隐藏的，则返回false
            if (a.parentNode == null || a.style.display == "none") { e = false; }
            if (a.getBoundingClientRect) {
                f = a.getBoundingClientRect();
                //获取滚动条信息
                g = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                h = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                e.top = f.top + g, e.left = f.left + h;
            }
            else if (document.getBoxObjectFor) {
                f = document.getBoxObjectFor(a);
                g = a.style.borderLeftWidth ? parseInt(a.style.borderLeftWidth) : 0;
                h = a.style.borderTopWidth ? parseInt(a.style.borderTopWidth) : 0;
                e.top = f.y - h, e.left = f.x - g;
            }
            else {
                e.top = a.offsetTop, e.left = a.offsetLeft, i = a.offsetParent;
                if (i != a) { while (i) { e.top += i.offsetTop, e.left += i.offsetLeft, i = i.offsetParent; } }
                if (b.indexOf("opera") != -1 || (b.indexOf("safari") != -1 && a.style.position == "absolute")) {
                    e.top -= document.body.offsetTop, e.left -= document.body.offsetLeft;
                }
            }
            i = a.parentNode ? a.parentNode : null;
            while (i && i.tagName != "BODY" && i.tagName != "HTML") {
                e.top -= i.scrollTop, e.left -= i.scrollLeft;
                i = i.parentNode ? i.parentNode : null;
            }
            //删除临时变量
            delete a, delete b, delete f, delete g, delete h, delete i;
            return e;
        }
	};
	//函数体对象
	var fn = {
		//页面初始化加载数据
		loadInit: function(a){
			if(a != undefined){ $.extend(public.conf, a); }
			fn.inpEach();
			fn.initBubble();
		},
		/**
		 * init bubble
		 */
		initBubble: function(){
			var a, b, c, d, e, f, g, h, i, j, k, l;
			a = private.conf;
			b = public.conf;
			l = b.layout;
			f = private.style;
			g = a.darkColor = b.color;
			h = a.lightColor = private.fn.getColor("light", b.color, 220);
			i = a.fontColor = private.fn.getColor("dark", b.color, 180);
			c = [];
			c.push('<span class="bMain">');
			c.push('	<div class="bLab">');
			c.push('		<div class="bLab1 bLabB"></div>');
			c.push('		<div class="bLab2 bLabB"></div>');
			c.push('		<div class="bLabel">*</div>');
			c.push('		<div class="bLab2 bLabB"></div>');
			c.push('		<div class="bLab1 bLabB"></div>');
			c.push('	</div>');
			c.push('	<div class="bSpan">');
			for(d=1; d<=9; d++){
				e = d<6?d:10-d;
				//添加尖角元素
				c.push('<b class="bb'+(e)+'"></b>');
				//添加对应尖角样式
				if(l == "top"){					
					f["bb"+e] = {
						font_size: "0", height: (e)+"px", width: "1px", float: "left", background: h,
						margin_top: (9-e)+"px", border_bottom: "1px solid "+h, border_top: "2px solid "+g
					};
				}
				else if(l == "right"){
					f["bb"+e] = {
						font_size: "0", width: (e)+"px", height: "1px", float: "left", background: h,
						margin_right: (9-e)+"px", border_right: "1px solid "+h, border_left: "2px solid "+g
					};
				}
				else if(l == "bottom"){
					f["bb"+e] = {
						font_size: "0", height: (e)+"px", width: "1px", float: "left", background: h,
						border_top: "1px solid "+h, border_bottom: "2px solid "+g
					};
				}
				else if(l == "left"){
					f["bb"+e] = {
						font_size: "0", width: (e)+"px", height: "1px", float: "left", background: h,
						margin_left: (9-e)+"px", border_right: "1px solid "+h, border_left: "2px solid "+g
					};
				}
			}
			c.push('	</div>');
			c.push('</span>');
			a.bubble = c.join("\r\n");
			//设置关于颜色的样式
			j = f.bLabB = {};
			j.border_top = "2px solid "+g;
			j.border_bottom = "2px solid "+g;
			j.background = g;
			f.bLabel.border_top = "2px solid "+g;
			f.bLabel.border_bottom = "2px solid "+g;
			f.bLabel.background = h;
			f.bLabel.color = i;			
			return a.bubble;
		},
		/**
		 * input each
		*/
		inpEach: function(){
			var c, d, e, f, g, h, i, j, k;
			j = private.conf;
			k = public.conf;
			//必填文本框背景图片地址
			g = j.inputBg;
			$(k.forms).find(k.element).each(function(a, b){
				b = $(b);
				b.css("width", (parseInt(b.css("width"))-10)+"px").css("padding-right", "10px");
				//获取元素的type和nodeName
				h = b.attr("type"), i = b.get(0).nodeName.toUpperCase();
				if(h == "text" || h == "password" || i == "TEXTAREA"){
					//获取水印文字
					c = b.attr("alt");
					//添加水印
					if(c) private.fn.watermark(b, c);
					//是否为必填项
					d = b.hasClass(j.mClass);
					//获取文本框的宽和高
					e = parseInt(b.width()), f = parseInt(b.height());
					if(d && k.isBg){
						b.css("background", "url("+g+") no-repeat 0 0 #BEDAD5").css("background-position", (e-1000+10)+"px "+((f/2)-3)+"px");
					}
				}
			});
		},
		/**
		 * input event
		 * @param a.event object 当前事件对象
		 * @param b.element object 当前元素对象
		 */
		inpEvent: function(a, b){
			var c, d, e;
			b = b ? b : $(this);
			c = private.conf;
			d = public.conf;
			e = 0;
			if(b.attr("type")!="radio" && b.attr("type")!="checkbox"){
				fn.focusEvent(b);
				b.blur(function(){ if(e == 0){ fn.blurEvent(b); e++; } });
			}
		},
		/**
		 * input focus
		 * @param a.element object 当前元素对象
		 */
		focusEvent: function(a){
			var b= private.conf;
			a = a ? a : $(this);
			//if(!b.border){ b.border = a.css("border"); }
			b.border = "1px solid "+public.conf.focusColor;
			a.css("border", b.border).removeClass("error");
			a.prev("span.bMain").remove();
		},
		/**
		 * input blur
		 * @param a.element object 当前元素对象
		 */
		blurEvent: function(a){
			var b, c, d, e, f, g;
			b = a.val();
			c = a.hasClass(private.conf.mClass);
			if(c){ if(b){ fn.regVerfier(a,b); }else{ fn.error(a); } }
			//如果非必填，有其他验证
			d = private.conf.verClass;
			for(e=0, f=d.length; e<f; e++){
				g=d[e];
				if(a.hasClass(g)){ if(b){ fn.regVerfier(a,b); } }else{ g = null; }
			}
		},
		/**
		 * input verfier error
		 * @param a.element object 当前元素对象
		 * @param b.error content 错误消息内容
		 */
		error: function(a, b){
			var c, d, e;
			c = private.conf;
			//e = a.next("div.jSelPanel");
			//a = e.length == 0 ? a : e;
			a.addClass("error");
			f = a.attr("type");
			if(f!="radio"&&f!="checkbox"){
				d = { border: "1px solid "+c.darkColor };
				private.fn.setStyle(a, d);
			}
			if(b){ fn.showBubble(a, b); }
		},
		/**
		 * verfier error, show message
		 * @param a.element object 当前元素对象
		 * @param b.error content 错误消息内容
		 */
		showBubble: function(a, b){
			var c, d, e, f, g, h, i, j, k, l, m;
			b = b ? b : lang.S000;
			c = private.conf;
			d = private.style;
			e = public.conf;
			f = $(c.bubble);
			f.find("div.bLabel").html(b);
			if(e.layout == "top"){ d.bSpan.top = "-9px", d.bSpan.left = "10px"; }
			if(e.layout == "right"){ d.bSpan.top = "10px", d.bSpan.left = "0px"; }
			if(e.layout == "bottom"){ d.bSpan.top = "24px", d.bSpan.left = "10px"; }
			if(e.layout == "left"){ d.bSpan.top = "10px", d.bSpan.left = "-9px"; }
			fn.setElemTL(a, f.find(".dMain"), d.bMain);
			//设置样式
			for(g in d){
				h = f.find("."+g);
				h = h.length > 0 ? h : f;
				private.fn.setStyle(h, d[g]);
			}
			a.prev("span.bMain").remove();
			a.before(f);
			l = f.width();;
			l = l<36?36:l;
			f.css("width", (l+100)+"px");
			m = f.find("div.bLabel").width();			
			f.css("width", (m+9)+"px");
			//禁止选择内容			
			private.fn.disableSelection(f);
		},
		//设置提示框的坐标
		setElemTL: function(a, b, f){
			var c, d, e, g, h, i;
			c = private.style;
			i = public.conf;
			d = private.fn.getElementTL(a.get(0));
			g = (d.top)+"px", h = (d.left)+"px";
			if(i.layout == "top"){ g = (d.top+a.height()+40)+"px", h = (d.left)+"px"; }
			else if(i.layout == "right"){ g = (d.top+a.height())+"px", h = (d.left)+"px"; }
			else if(i.layout == "bottom"){ g = (d.top)+"px", h = (d.left)+"px"; }
			else if(i.layout == "left"){ g = (d.top+(30))+"px", h = (d.left+a.width()+10)+"px"; }
			f = f ? f : {};
			f.top = g;
			f.left = h;
			private.fn.setStyle(b, f);
		},
		/**
		 * regexp verfier
		 * @param b.element object 当前元素对象
		 * @param val.element value 元素的value值字符串
		 */
		regVerfier: function(b, val){
			var e, f, g, h, h1, i, j, k, l, m;
			e = private.conf.verClass;
			//验证长度
			i = parseInt(b.attr("minlength"));
			h = val.length < i ? false : true;
			if(!h){ fn.error(b); fn.showBubble(b, "最少需要"+i+"个字符"); }
			
			for(f=0, g=e.length; f<g; f++){
				h1=e[f];
				if(b.hasClass(h1)){ break; }else{ h1 = null; }
			}
			if(h1){
				i = lang[h1];
				h = private.fn.validate(val, h1);
				if(!h){ fn.error(b); fn.showBubble(b, i); }
				//判断开始和结束是否包含空格
				l = val.substring(0, 1);
				m = val.substring(val.length-1, val.length);
				if(l == " " || m == " "){
					fn.error(b); fn.showBubble(b, "值的开始和结束不能包括空格");
					h = false;
				}
			}
			//验证选择个数
			if(b.attr("type") == "checkbox"){
				k = $(public.conf.forms).find("input[name="+b.attr("name")+"]");
				k.eq(0).prev("span.bMain").remove();
				l = 0;
				k.each(function(){ this.checked ? l++ : ""; });
				i = parseInt(k.eq(0).attr("minlength"));
				h = l < i ? false : true;
				if(!h){ fn.error(k.eq(0)); fn.showBubble(k.eq(0), "最少需要选择"+i+"项"); }
				i = parseInt(k.eq(0).attr("maxlength"));
				if(i > 0){
					h = l > i ? false : true;
					if(!h){ fn.error(k.eq(0)); fn.showBubble(k.eq(0), "最多只能选择"+i+"项"); }
				}
			}
			//验证关联元素值是否相等
			i = b.attr("equalto");
			if(i){
				i = $(public.conf.forms).find(i);
				h = i.length == 0 ? false : true;
				if(h){
					if(b.val() != i.val()){ fn.error(b); fn.showBubble(b, "与新密码不相符"); }
				}
			}
			if(b.hasClass(private.conf.mClass)){
				//判断开始和结束是否包含空格
				l = val.substring(0, 1);
				m = val.substring(val.length-1, val.length);
				if(l == " " || m == " "){
					fn.error(b); fn.showBubble(b, "值的开始和结束不能包括空格");
					h = false;
				}
			}
			return h;
		},
		/**
		 * submit verfier
		 */
		subVerfier: function(){
			var c, d, e, f, g, h, i, j, k, l, m;
			c = private.conf;
			i = public.conf;
			f = 0;
			k = [];
			$(i.forms).find(i.element).each(function(a, b){
				b = $(b);
				//获取当前项的value
				e = b.val();
				//获取元素的type
				j = b.attr("type");
				//判断是否为必填项
				d = b.hasClass(c.mClass);
				//如果是必填项，则需要判断用户是否输入数据
				if(d){
					if(j == "radio" || j == "checkbox"){ k.push(b.attr("name")); }
					if(!e){ fn.error(b, lang.S001); ++f; }
					else{
						//先移除气泡
						b.prev("span.bMain").remove();
						g = fn.regVerfier(b, e); if(g == false) ++f;
					}
				}
				//否则，再判断是否符合配置的内容格式
				else{ if(e){ g = fn.regVerfier(b, e); if(g == false) ++f; } }
			});
			k = private.fn.removeRepeat(k);
			for(a=0, b=k.length; a<b; a++){
				e = $(i.forms).find("input[name="+k[a]+"]");
				g = false;
				e.each(function(){ if(this.checked){ g = true; } });
				if(!g){ fn.error(e.eq(0), lang.S001); ++f; }
			}
			f = f == 0 ? true : false;
			f = i.isData && f ? fn.getSubData() : f;
			return f;
		},
		/**
		 * get submit data
		*/
		getSubData: function(){
			var a, b, c, d, e, f, g, h, i, j, k, l, m;
			a = public.conf;
			b = $(a.forms);
			c = [];
			//遍历form
			b.each(function(index, element){
				element = $(element);
				//获取input
				e = element.find("input");
				//获取select
				f = element.find("select");
				//获取textarea
				g = element.find("textarea");
				if(e.length>0||f.length>0||g.length>0){
					//d.当前表单下的数据JSON对象, j.用于判断同一个分组的radio或checkbox
					d = {}, j = "";
					//遍历input
					e.each(function(ind, ele){
						ele = $(ele);
						//获取当前元素value
						m = ele.val();
						//获取当前元素id，用作key
						h = ele.attr("id");
						//如果没有id，就为该标签名加index
						h = h ? h : ele.get(0).nodeName+ind;
						//获取标签的type，用于判断标签类型
						i = ele.attr("type");
						if(i == "radio" || i == "checkbox"){
							//获取name，该key用name代替
							k = ele.attr("name");
							j = k != j ? k : j;
							if(k == j){
								//获取是否为选中
								l = ele.attr("checked");
								if(l){ d[k] = d[k] ? d[k]+","+m : m; }
							}
						}
						else if(i == "text" || i == "password"){ d[h] = m; }
					});
					//遍历select
					f.each(function(ind, ele){
						ele = $(ele);
						h = ele.attr("id");
						h = h ? h : ele.get(0).nodeName+ind;
						d[h] = ele.val();
					});
					//遍历textarea
					g.each(function(ind, ele){
						ele = $(ele);
						h = ele.attr("id");
						h = h ? h : ele.get(0).nodeName+ind;
						d[h] = ele.val();
					});
					if(d!={}){ c.push(d); }
				}
			});
			return c;
		}
	};
	//函数体操作对象
	var handle = {
		//初始化需要初始化的函数
		fnInit: function(a){
			//初始化页面加载参数
			fn.loadInit(a);
		},
		//绑定需要绑定的事件
		bindEvent: function(){
			var a = public.conf;
			$(a.forms).find(a.element).unbind("focus").focus(fn.inpEvent);
			$(window).resize(function(){
				var m, b, c, d;
				m = $(".bMain");
				m.each(function(index, element){
					element = $(element);
					b = element.next();
					if(b.length>0){ fn.setElemTL(b, element); }
				});
			});
		}
	};
	//返回对象(该对象中一般只包括一个init函数对象，根据需要，可以自行添加)
	var callBack = {
		init: function(a){
			handle.fnInit(a);
			handle.bindEvent();
		},
		verfier: function(a){
			if(a != undefined){ $.extend(public.conf, a); }
			fn.initBubble();
			return fn.subVerfier();
		},
		showBubble: function(a, b, c, d){
			var e = typeof(c);
			if(e != 'object'){ d = c; c = null; }
			handle.fnInit(c); handle.bindEvent(); fn.showBubble(a, b);
			if(d) setTimeout(function(){ a.prev("span.bMain").remove(); }, d);
		}
	};
	return callBack;
};
$(function(){ JVerfier().init(); });