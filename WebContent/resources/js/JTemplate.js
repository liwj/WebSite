/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技-潘毅
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JTemplate.js
// 文件功能描述：模版js
//
// 创建标识：2012-08-13 09：47
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var JTemplate = function(){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		//事件配置(nodeName:标签名,className:唯一标识类名,fn:函数名[默认第一个参数为当前事件触发的元素,第二个参数由用户自定义,它是一个json对象],params:函数的第二个参数[json对象])
		clickEventConf: [{nodeName: "button", className: "className", fn: function(a){}, params: {}}]
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {};
	//定义一个对象，用于存储该js需要用到的文本字符串
	var lang = {};
	//定义一个对象，用于存储该js需要用到的页面元素对象
	var elem = {};
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
		/**
		 * 文本框水印
		 * @param target.需要添加水印的元素对象
		 * @param msg.文字
		 * @param style.样式
		 */
		watermark: function (target, msg, style) {
			var $target = $(target);
			var _style = { height: "24px", size: "12px" };
			var color = {
				deep: "#111111",   //深色
				tint: "#BBBBBB"   //浅色
			};
			$.extend(_style, style);
			var cssText = '-moz-transition: all 0.2s ease-out 0s;padding: 0 0 0 6px;position: absolute;opacity:1;z-index:2; visibility:visible;'; //span样式
			var spanText = '<span>' + msg + '</span>';
			var $span = null;
	
			(function () {
			try {
				//init load
				var hasVal = $target.val().length > 0;
				//是否有val
				$span = $(spanText)
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
		//num 数字、email 邮件、tel 电话、phone 手机、postcode 邮编、idcard 身份证、url URL地址、Alphanumeric 字母数字混合、
		//V000 数字,字母,下划线,中划线,点、V001 中文,括号,数字或字母,中划线、V002 中文,字母,中划线
		validate:function(a, b){
			var c;
			b = b ? b : "Alphanumeric";
			switch(b){
				case "V000": c = /^[0-9a-zA-Z_.\-]{1,}$/; break;
				case "V001": c = /^[\u4E00-\u9FA5\uF900-\uFA2D0-9]|\w\(\)|[a-z][A-Z]\-$/; break;
				case "V002": c = /^[\u4E00-\u9FA5\uF900-\uFA2Da-zA-Z]|\w\-+/; break;
				case "Alphanumeric": c = /^[A-Za-z0-9]+$/; break;
				case "num": c = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/; break;
				case "email": c = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/; break;
				case "idcard": c = /^\d{15}|\d{}18$/; break;
				case "tel": c = /(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/; break;
				case "phone": c = /^1[3-9]{1}[0-9]{9}$/; break;
				case "url": c = /^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/; break;
				case "postcode": c = /^[1-9][0-9]{5}$/; break;
			};
			return new RegExp(c).test(a);
		},
		//事件冒泡
		eventBubbling: function(params, events, element){
			var a, b, c, d, f, g, h, i, j, k, l, m, n, o, p, q;
			var callBack = {
				install: function(e){
					e = e || window.event;
					a = e.target || e.srcElement;
					b = a.nodeName;
					c = a.className;
					o = a.type;
					g = params.length;
					for(d=0; d<g; d++){
						h = params[d];
						q = h.unClass;
						p = true;
						if(h.type){ p = h.type.indexOf(o)>-1 ? true : false; }
						if(h.nodeName == ""){ b = ""; }
						if(h.nodeName.toUpperCase() == b && p){
							i = h.className, m = false, j = $(a);
							if(i != ""){
								i = i.split(",");
								for(k=0, l=i.length; k<l; k++){
									if(j.hasClass(i[k]) && j.parents("."+q).length == 0){
										n = typeof(h.fn) == 'string' ? eval(h.fn+'(e, j, '+h.params+');') : h.fn(e, j, h.params);
										m = true;
										break;
									}
								}
							}
							else{
								if(j.parents("."+q).length == 0){
									n = typeof(h.fn) == 'string' ? eval(h.fn+'(e, j, '+h.params+');') : h.fn(e, j, h.params);
									m = true;
									break;
								}
							}
							if(m){ break; }
						}
					}
					return n;
				}
			};
			if(events){eval((element?'element':'$(document.body)')+"."+events+"(function(event){return callBack.install(event);});");}
			return callBack;
		},
		//通过设置获取相应颜色值
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
        //设置文本不能被选择
        disableSelection: function (a, b) {
            /// <summary>设置文本不能被选择</summary>
            /// <param name="a" type="Object">当前元素对象</param>
            /// <param name="b" type="String">鼠标样式 选填，默认为"default"</param>
            /// <returns type="Object" />当前元素对象 a
            //定义函数内部变量
            var c, d, e;
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
		/**
		 * 解决ie下textarea的maxlength的限制
		 * @param a.需要操作的元素集合
		*/
		limitLength: function(a){
			var $this = $(this);
			var maxLength = $this.attr("maxlength");
			maxLength = maxLength ? maxLength : 100;
			var doBeforePaste = function(){ event.returnValue = false; };
			var doKeypress = function(){
				var oTR = document.selection.createRange();
				if(oTR.text.length >= 1) event.returnValue = true
				else if(this.value.length > maxLength-1) event.returnValue = false
			};
			var doKeydown = function(){
				var _obj=this;
				setTimeout(function(){
					if(_obj.value.length > maxLength-1){
						var oTR = window.document.selection.createRange();
						oTR.moveStart("character", -1*(_obj.value.length-maxLength));
						oTR.text = "";
					}
				},1);
			};
			var doPaste = function(){
				event.returnValue = false;
				var oTR = document.selection.createRange();
				var iInsertLength = maxLength - this.value.length + oTR.text.length;
				var sData = window.clipboardData.getData("Text").substr(0, iInsertLength);
				oTR.text = sData;
			};
			$this.unbind("keydown").bind("keydown",doKeydown)
				.unbind("keypress").bind("keypress",doKeypress)
				.unbind("beforepaste").bind("beforepaste",doBeforePaste)
				.unbind("paste").bind("paste",doPaste);
		},
		/**
		 * 禁止删除键
		 * @param a.键值(默认为8，即退格键)
		*/
		banBack: function(a){
			var b, c
			a = a ? a : 8;
			b = $(this);
			b.unbind("keydown").keydown(function(e){
				e = e || window.event;
				c = e.which || e.keyCode;
				if(c == a){ return false; }
			});
		}
	};
	//函数体对象
	var fn = {
		//页面初始化加载数据
		loadInit: function(a){
			if(a != undefined){ $.extend(public, a); }
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
		},
		//绑定需要绑定的事件
		bindEvent: function(){
			private.fn.eventBubbling(private.clickEventConf, "click");
		}
	};
	//返回对象(该对象中一般只包括一个init函数对象，根据需要，可以自行添加)
	var callBack = {
		init: function(a){
			handle.fnInit(a);
			handle.bindEvent();
		}
	};
	return callBack;
};