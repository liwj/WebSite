/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技-潘毅
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JPopUp.js
// 文件功能描述：div弹出对话框js
// 创建标识：2012-08-13 09：47
//
// 解决方案流程描述：首次初始化时，如果提供了参数，则以此参数创建一个弹出框，否则以默认参数创建一个空白弹出框(初始化创建的为隐藏状态)，
			显示弹出框的函数，同样可传递参数，与初始化参数一样，因为初始化一个对象，可以用这个对象来创建一个不同类型及内容的弹出框，
			所以，在弹出框显示出来之前，如果有参数，就根据参数设置弹出框的内容、按钮、模式等。显示弹出框后，需要做的是如何关闭弹出框，
			本插件采用的是多弹出框时共用一个背景遮罩层，初始化一个对象只可创建并打开一个弹出框（弹出框的显示状态[模态(Modal)、非模态
			(Non-Modal)、多窗口合并(Multi-Window)]根据自己设置而显示）,模态窗口可以没有背景遮罩层，如果需要再打开新的弹出框，需要重新实例化一个对象。
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var JPopUp = function(param){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		conf: {
			//弹出框及遮罩层共用的zIndex
			zIndex: 1000,
			//当前页面的弹出框个数
			quantity: 0,
			//弹出框的最小宽度
			minW: 240,
			//弹出框的最小高度
			minH: 150,
			//弹出框对象
			pMain: null,
			//弹出框的内容栏对象
			pCont: null,
			//弹出框的标题栏对象
			pTitl: null,
			//弹出框的按钮栏对象
			pButt: null,
			//背景遮罩层对象
			pBack: null,
			//右键菜单层对象
			pRight: null,
			//右键菜单按钮栏对象
			pMenu: null,
			//右键菜单对象的class
			prmClass: "prmPanel",
			//弹出框对象的class
			popClass: "popUpPanel",
			//背景遮罩层的class
			bacClass: "backgroundPanel",
			//皮肤颜色配置
			skin: {
				//主色
				mainColor: "",
				//深色
				darkColor: "",
				//浅色
				lightColor: "",
				//反主色
				fanColor: "",
				//字体色
				fontColor: "",
				//禁用字体色
				dfontColor: "",
				//偏红色
				predColor: ""
			},
			/*显示状态[模态(Modal)、非模态(Non-Modal)、多窗口合并(Multi-Window)]
			特点：Modal.每个模态窗口对应一个背景遮罩层，但是背景遮罩层可以多个层共用一个，遮罩层必须且与当前层即后打开的层对应，将先打开的弹出框覆盖，当前可操作的窗口只能有一个
				  Non-Modal：非模态窗口，只有一个背景遮罩层，可任意操作任何一个窗口（注：这就要考虑zIndex）
				  Multi-Window：多窗口合并模式，只有一个背景遮罩层，每一个操作的窗口均同属于一个父级，以选项卡的形式切换不同的窗口操作*/
			showModal: ["Modal", "Non-Modal", "Multi-Window"],
			/*弹出框点击事件配置(nodeName:标签名[不区分大小写],
			className:唯一标识类名[支持同时指定多个，以逗号隔开,如：都是span标签，只是类名不一样],
			fn:函数名[默认第一个参数为当前事件触发的元素,第二个参数由用户自定义,它是一个json对象],
			params:函数的第二个参数[json对象])*/
			popClickEvent: [
				{ nodeName: "button", className: "ok", fn: function(){ handle.ok(); handle.closeContextMenu(); } },
				{ nodeName: "button", className: "cancel", fn: function(){ handle.cancel(); handle.closeContextMenu(); } },
				{ nodeName: "div", className: "close", fn:  function(){ handle.close(); handle.closeContextMenu(); } },
				{ nodeName: "select", className: "close", fn:  function(){ handle.close(); handle.closeContextMenu(); } },
				{ nodeName: "input", className: "", fn: function(){ handle.closeContextMenu(); } },
				{ nodeName: "td", className: "", fn: function(){ handle.closeContextMenu(); } },
				{ nodeName: "div", className: "", fn:  function(){ handle.closeContextMenu(); } },
				{ nodeName: "nobr", className: "", fn:  function(){ handle.closeContextMenu(); } },
				{ nodeName: "img", className: "", fn:  function(){ handle.closeContextMenu(); } }
			],
			//弹出框右键事件配置
			popRightEvent: [
				{ nodeName: "button", className: "", fn: function(event, element){ return handle.buttonContextMenu(event, element); } },
				{ nodeName: "input", className: "",fn: function(event, element){ return handle.buttonContextMenu(event, element); } },
				{ nodeName: "div", className: "close", fn:  function(event, element){ return handle.buttonContextMenu(event, element); } },
				{ nodeName: "div", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "span", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "label", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "p", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "td", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "nobr", className: "", fn:  function(event, element){ return handle.popUpContextMenu(event, element); } },
				{ nodeName: "img", className: "", fn:  function(event, element){ return handle.imgContextMenu(event, element); } },
				{ nodeName: "a", className: "", fn:  function(event, element){ return handle.aContextMenu(event, element); } }
			],
			//弹出框mousedown事件配置
			popDownEvent: [
				{ nodeName: "div", className: "icoItem,txtTitle,titleBtn", fn: function(event, element){ fn.popUpDrag(event, element); } },
				{ nodeName: "button", className: "", fn: function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "input", className: "", fn: function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "div", className: "close", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "div", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "span", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "label", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "p", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "td", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "nobr", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "img", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } },
				{ nodeName: "a", className: "", fn:  function(event, element){ handle.popUpDown(event, element); } }
			],
			//背景遮罩右键事件配置
			bgRightEvent: [
				{ nodeName: "div", className: "backgroundPanel", fn: function(event, element){ return handle.bgContextMenu(event, element); } }
			],
			//背景遮罩点击事件配置
			bgClickEvent: [
				{ nodeName: "div", className: "backgroundPanel", fn: function(){ handle.closeContextMenu(); } }
			],
			//右键菜单的右键事件配置
			rRightEvent: [
				{ nodeName: "td", className: "", fn: function(){ return false } },
				{ nodeName: "tr", className: "", fn: function(){ return false } },
				{ nodeName: "table", className: "", fn: function(){ return false } }
			],
			//右键菜单的项mouseover事件配置
			rTDOverEvent: [
				{ nodeName: "td", className: "rmItem", fn: function(event, element){ handle.rTDOver(event, element); } }
			],
			//右键菜单的项mouseover事件配置
			rTDClickEvent: [
				{ nodeName: "td", className: "rmItem", fn: function(event, element){ handle.rTDClick(event, element); } }
			],
			//右键菜单默认配置参数
			contextMenu: {
				event: null,
				copyright: "版权所有",
				style: {
					prmPanel: {
						font_size: "12px",
						width: "auto",
						height: "auto",
						position: "absolute",
						z_index: "9999"
					},
					prmTable: {
						width: "100%"
					}
				},
				//临时项(保存当前显示的右键菜单项)
				tempItems: [],
				items: [
					{ text: "帮助", disabled: false, fn: function(){ JPopUp().alert("灰色为禁用(无事件)，深色为启用(有事件)", "Help", true); } },
					{ text: "关于", disabled: false, fn: function(){ JPopUp().alert("v1.0.0 beta", "About", true); } },
					{ text: "设置" },
					{ text: "全局设置..." },
                    { text: "版本 v1.0.0 beta" },
					{ text: "技术支持：思建科技" }
				]
			}
		},
		//正则表达式库
        regExp: {
			R000: /_/gi, 										//设置样式替换下划线			
			R001: /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i,	//是否为RGB颜色值
			R003: /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/	 		//十六进制颜色值的正则表达式
        },
		//popup样式配置参数
		style: {
			//popUp主层样式
			popUpPanel: {
				display: "none",
				height: "auto",
				position: "fixed",
				top: "50%",
				left: "0px",
				font_size: "12px"
			},
			//popUp Title栏样式
			popUpTitle: {
				width: "100%",
				height: "30px",
				float: "left"
			},
			//icoItem弹窗图标层样式
			icoItem: {
				width: "auto",
				height: "auto",
				float: "left",
				margin_top: "6px",
				margin_left: "6px",
				margin_right: "3px"
			},
			//ico图标图片样式
			titIco: {
				width: "18px",
				height: "18px"
			},
			//txtTitle弹窗标题内容层样式
			txtTitle: {
				width: "70%",
				height: "30px",
				line_height: "33px",
				float: "left",
				overflow: "hidden",
				white_space: "nowrap",
				text_overflow: "ellipsis",
				font_weight: "bold"
			},
			//titleBtn弹窗标题栏上的按钮栏样式
			titleBtn: {
				width: "30px",
				height: "100%",
				float: "right"
			},
			//titBtn弹窗标题栏关闭按钮层样式
			titBtn: {
				width: "18px",
				height: "18px",
				text_align: "center",
				float: "right",
				margin_top: "7px",
				margin_right: "6px",
				cursor: "pointer"
			},
			//popUp Content栏样式
			popUpContent: {
				width: "100%",
				height: "auto",
				float: "left",
				overflow: "hidden",
				overflow_y: "auto"
			},
			//txtContent弹窗内容层样式
			txtContent: {
				width: "auto",
				height: "auto",
				float: "left",
				margin: "30px 7px",
				text_align: "center"
			},
			//popUp Button栏样式
			popUpButton: {
				width: "100%",
				height: "40px",
				float: "left"
			},
			//popBtn弹窗按钮栏按钮样式
			popBtn: {
				float: "right",
				margin: "10px"
			}
		},
		//background背景遮罩层样式
		backgroundPanel: {
			display: "none",
			background: "#000000",
			width: "100%",
			position: "absolute",
			top: "0px",
			left: "0px",
			filter: "alpha(opacity=20)",
			_moz_opacity: 0.2,
			opacity: 0.2
		}
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {
		//popup弹窗公共配置参数
		conf: {
			//是否显示背景遮罩
			isBack: true,
			//是否可拖动
			isDrag: false,
			//是否可改变弹窗大小
			isChange: true,
			//是否使用右键菜单
			isContextMenu: false,
			//关闭弹出框时是否为删除
			isDelete: false,
			//是否显示滚动条，主要是只y轴，[true.设置了固定高度，内容超出范围内，显示滚动条(默认)， false.设置了固定高度，内容超出范围内，将弹出框撑开]
			isScroll: true,
			//是否启用特效
			isEffects: true,
			//显示状态[模态[Modal]、非模态[Non-Modal]、多窗口合并[Multi-Window]、]
			showModal: "Modal",
			//皮肤主色
			color: "#000000",
			//color: "#377818",
			//弹窗的宽和高
			style: { width: 240, height: 150, textAlign: "center" },
			//弹窗默认标题
			title: "无标题",
			//弹窗默认内容
			content: "[空白面板]"
		},
		button: {
			icoItem: {
				ico: {val: "http://imgs.veeqi.com/img05/allimg/071113/01005383.png", show: false}
			},
			titleBtn: { close: {val: "x", show: true} },
			//底部按钮栏参数配置
			btnButton: {
				//{val: "ok"[按钮的文字], show: true[true.显示 false.不显示], fn: function(){alert("ok");}[点击ok执行的操作函数]}
				cancel: {val: "cancel", show: true},
				no: {val: "no", show: false},
				ok: {val: "ok", show: true}
			}
		}
	};
	//定义一个对象，用于存储该js需要用到的文本字符串
	var lang = {
		S000: "Alert",
		S001: "点击确定继续！",
		S002: "Confirm",
		S003: "您确定要执行此项操作吗？点击确定继续！"
	};
	//定义一个对象，用于存储该js需要用到的页面元素对象
	var elem = {
		popup: "."+private.conf.popClass,
		background: "."+private.conf.bacClass
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
		//事件冒泡
		eventBubbling: function(params, events, element){
			var a, b, c, d, f, g, h, i, j, k, l, m, n, o, p;
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
						p = true;
						try{ if(h.type){ p = h.type.indexOf(o)>-1 ? true : false; } }catch(ex){ p = false; break; }
						if(h.nodeName.toUpperCase() == b && p){
							i = h.className, m = false, j = $(a);
							if(i != ""){
								i = i.split(",");
								for(k=0, l=i.length; k<l; k++){
									if(j.hasClass(i[k])){
										n = typeof(h.fn) == 'string' ? eval(h.fn+'(e, j, '+h.params+');') : h.fn(e, j, h.params);
										m = true;
										break;
									}
								}
							}
							else{
								n = typeof(h.fn) == 'string' ? eval(h.fn+'(e, j, '+h.params+');') : h.fn(e, j, h.params);
								m = true;
								break;
							}
							if(m){ break; }
						}
					}
					return n;
				}
			};
			if(events){eval((element?'element':'$(document.body)')+".unbind('"+events+"')."+events+"(function(event){return callBack.install(event);});");}
			return callBack;
		},
		/**
		 * 自定义的继承，可深度继承
		 * @param a.原始对象
		 * @param b.继承的对象
		 * @param c.是否深度继承
		 * @return 继承后的对象
		 */
		extend: function(a, b, c){
			var d, e, f;
			e = a;
			if(e != null){
				for(d in b) {
					f = b[d];
					//判断是否需要深度继承
					if (c == true && typeof(f) == 'object' && f != null) {
						if(private.fn.isJson(f)){ e[d] = private.fn.extend(e[d], f, true); }
						else{ e[d] = f; }
					}
					else { e[d] = f; }
				}
			}
			return e;
		},
		/**
		 * 判断是否为json对象
		 * @param obj.需要判断的对象
		 * @return Boolean (true|false)
		 */
		isJson: function(obj){
			var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;    
			return isjson;
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
		},
		//创建一个兼容多浏览器的颜色渐变特效CSS样式字符串
        colStyleCss: function (a, b, c) {
            /// <summary>创建一个兼容多浏览器的颜色渐变特效CSS样式字符串</summary>
            /// <param name="a" type="String">开始颜色值</param>
            /// <param name="b" type="String">结束颜色值</param>
            /// <param name="c" type="Int">0.由上到下 1.由下到上</param>
            /// <returns type="String" />CSS样式字符串
            //定义函数内部变量
            var d, e;
            //初始化变量值
            c = c ? c : 0;
            if (c == 0) {
                //将结束颜色值转换为RGB格式(firefox用)
                d = private.fn.toRgb(b);
                e = "filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=100)" +
					"progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + a + ",endcolorstr=" + b + ",gradientType=0);" +
					"-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=100)" +
					"progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + a + ",endcolorstr=" + b + ",gradientType=0);" +
					"background:-moz-linear-gradient(top, " + a + ", rgba(" + d + ",1));" +
					"background:-webkit-gradient(linear, 0 0, 0 top, from(" + a + "), to(rgba(" + d + ",1)));";
            }
            else {
                d = private.fn.toRgb(a);
                e = "filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=100)" +
					"progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + b + ",endcolorstr=" + a + ",gradientType=0);" +
					"-ms-filter:alpha(opacity=100 finishopacity=100 style=1 startx=0,starty=0,finishx=0,finishy=100)" +
					"progid:DXImageTransform.Microsoft.gradient(startcolorstr=" + b + ",endcolorstr=" + a + ",gradientType=0);" +
					"background:-moz-linear-gradient(top, " + b + ", rgba(" + d + ",1));" +
					"background:-webkit-gradient(linear, 0 0, 0 top, from(" + b + "), to(rgba(" + d + ",1)));";
            }
            //删除临时变量
            delete a, delete b, delete c, delete d;
            return e;
        },
        //16进制颜色转为RGB格式
        toRgb: function (a) {
            /// <summary>16进制颜色转为RGB格式</summary>
            /// <param name="a" type="String">16进制颜色值</param>
            /// <returns type="String" />转换后的RGB颜色值
            //定义函数内部变量
            var b, c, d, e;
            //初始化变量值
            b = a.toLowerCase();
            if (b && private.regExp.R003.test(a)) {
                if (b.length == 4) {
                    c = "#";
                    for (d = 1; d < 4; d++) { c += b.slice(d, d + 1).concat(b.slice(d, d + 1)); }
                    b = c;
                }
                e = [];
                for (d = 1; d < 7; d += 2) { e.push(parseInt("0x" + b.slice(d, d + 2))); }
                b = e.join(",");
            }
            //删除临时变量
            delete a, delete c, delete d, delete e;
            return b;
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
		 * javascript 模拟线程
		 * @param a.执行函数
		 * @param b.间隔b毫秒执行一次函数a
		 */
		Thread: function(a, b){
			var c;
			this.start = function(){
				c = window.setInterval(function(){ a(); }, b);
			};
			this.stop = function(){
				window.clearInterval(c);
				c = null;
			};
			return this;
		}
	};
	//函数体对象
	var fn = {
		/**
		 * 页面初始化加载数据(初始化弹出框，创建弹出框html，设置基本布局样式，并获取弹出框相应的对象)
		 * @param: a.参数对象
		 */
		loadInit: function(a){
			var b = private.conf, c = public, d, e;
			if(a != undefined){ c = private.fn.extend(public, a, true); }
			d = b.skin;
			e = c.conf.color;
			//设置皮肤颜色
			d.mainColor = e;
			d.darkColor = private.fn.getColor("light", e, 80);
			d.lightColor = private.fn.getColor("light", e, 140);
			d.fanColor = private.fn.getColor("light", e, 210);
			d.predColor = private.fn.getColor("red", e, 250);
			d.dfontColor = private.fn.getColor("light", e, 80);
			d.fontColor = e;
			if(elem.background.length == 0){ fn.createBackgroundHtml(); }
			else{ b.pBack = elem.background.hide(); }
			fn.createPopUpHtml(c);
		},
		/**
		 * 创建popUp Background Html
		 */
		createBackgroundHtml: function(){
			var a, b, c;
			a = [], b = private.conf;
			b.zIndex++;
			a.push('<div class="'+b.bacClass+'"></div>');
			c = $(a.join("\r\n"));
			b.pBack = c;
			private.backgroundPanel.background = b.skin.mainColor;
			private.fn.setStyle(c, private.backgroundPanel);
			$(document.body).append(c);
		},
		/**
		 * 创建popUp Html
		 * @param: p.参数对象
		 */
		createPopUpHtml: function(p){
			//定义函数内部变量
			var a, b, c, d, e, f, g, h, i, j, k;
			//初始化变量值
			a = [], b = private.conf, c = private.style, d = 0;
			//创建html
			a.push('<div class="'+b.popClass+'" style="display:none;">');
			a.push('	<div class="popUpTitle">');
			a.push('		<div class="icoItem" conf="img"></div>');
			a.push('		<div class="txtTitle">Title</div>');
			a.push('		<div class="titleBtn" conf="div"></div>');
			a.push('	</div>');
			a.push('	<div class="popUpContent">');
			a.push('		<div class="txtContent">Content</div>');
			a.push('	</div>');
			if(public.button.btnButton){
				a.push('	<div class="popUpButton">');
				a.push('		<div class="btnButton" conf="button"></div>');
				a.push('	</div>');
			}
			a.push('</div>');
			//将html转换为jquery对象
			e = $(a.join("\r\n"));
			b.pMain = e;
			b.pCont = e.find(".txtContent");
			b.pTitl = e.find(".txtTitle");
			b.pButt = e.find(".popUpButton");
			//将弹窗html添加到body
			$(document.body).append(e);
			//绑定文本不可选中事件
			private.fn.disableSelection(b.pTitl);
		},
		/**
		 * 设置需要改变的样式
		 * @param: a.[{elem:需要设置的元素对象，style:需要设置的样式json对象}]
		 */
		changeStyle: function(a){
			var b, c, d;
			for(b=0, c=a.length; b<c; b++){
				d = a[b];
				private.fn.setStyle(d.elem, d.style);
			}
		},
		/**
		 * 设置固定的样式
		 * @param: a.弹出框层
		 */
		setFixedStyle: function(a){
			var b, c, d, e, f, g, h, i, j, k;
			b = private.style;
			for(c in b){
				k = a.find("."+c);
				if(k.length == 0){ k = a; }
				private.fn.setStyle(k, b[c]);
			}
			d = private.conf, e = [], f = public.conf;
			if(f.isBack){
				if(d.pBack){
					e.push({elem: d.pBack, style: { z_index: d.zIndex, height: private.fn.wh().height }});
					d.zIndex++;
				}
			}
			if(d.pMain){
				g = {
					z_index: d.zIndex,
					width: f.style.width+"px",
					height: f.style.height+"px",
					left: (((document.documentElement.clientWidth - d.pMain.width())/2) + document.documentElement.scrollLeft)+"px",
					margin_top: "-"+(d.pMain.height()/2)+"px"
				}
				e.push({elem: d.pMain, style: g});
			}
			fn.changeStyle(e);
		},
		/**
		 * 创建弹窗的按钮
		 * @param: a.弹出框层
		 * @param: b.按钮的配置参数
		 */
		createButton: function(a, b){
			var c, d, e, f, g, h, i, j;
			for(c in b){
				//获取单个对象
				d = b[c];
				//获取以c为class的元素
				e = a.find("."+c);
				//获取元素h的属性conf的值(该值为需要在元素h下创建的元素标签名)
				f = e.attr("conf");
				j = false;
				//循环d中元素
				for(g in d){
					//获取单个元素，也就是要创建元素的参数对象
					h = d[g];
					if(!h.show){ continue; }
					i = "";
					//创建一个以i为标签名的元素，并添加到h中(由于现在还没找到合适的方法来处理，所以只有一个一个的判断)
					if(f == "img"){ i = '<img class="titIco '+g+'" src="'+h.val+'" />'; }
					else if(f == "div"){ i = '<div class="titBtn '+g+'">'+h.val+'</div>'; }
					else if(f == "button"){ i = '<button class="popBtn '+g+'">'+h.val+'</button>'; }
					//将创建的html转换为jquery对象
					i = $(i);
					if(j == false){ e.html(""); j = true; }
					//添加到e中
					e.append(i);
				}
				e.find(".popBtn").eq(0).focus();
			}
		},
		/**
		 * 显示弹出框
		 * @param: a.当前显示弹出框的配置参数，将继承于public集合对象
		 */
		open: function(a){
			var b, c, d, e, f, g, h, i, j = public, k, l, m, skin;
			if(a){ j = private.fn.extend(public, a, true); }
			b = private.conf;
			c = j.conf;
			d = j.button;
			l = b.pBack.css("z-index");
			skin = b.skin;
			b.zIndex = l && l!="auto" ? l : 1000;
			//如果不存在，再重新创建弹出框(主要防止public.conf.isDelete = true时)
			if(b.pMain == null){ fn.createPopUpHtml(j); }
			//创建按钮
			fn.createButton(b.pMain, d);
			//设置渐变
			b.pMain.find("div.popUpTitle").attr("style", private.fn.colStyleCss(b.skin.darkColor, b.skin.lightColor));
			fn.setFixedStyle(b.pMain);
			//设置zIndex
			e = [];
			//获取默认配置中弹出框的最小宽度和高度
			f = b.minW, g = b.minH;
			//获取外部传入参数中的样式-宽和高
			h = c.style.width, i = c.style.height;
			//对比宽和高，如果外部传入的参数小于配置的值，就取配置的值，即最小值
			h = h<f ? f : h, i = i<g ? g : i;
			//根据弹出框的宽度设置left
			k = (((document.documentElement.clientWidth - h)/2) + document.documentElement.scrollLeft);
			k = (c.style.left ? c.style.left : k)+"px";
			//添加标题
			b.pTitl.html(c.title);
			//添加内容
			typeof(c.content) == 'object' ? b.pCont.html("").append(c.content) : b.pCont.html(c.content);
			//显示弹出框及背景遮罩(如果isBack=true)
			if(c.isBack){ b.pBack.show(); }
			b.pMain.show();
			//如果isBack=true，并且showModal=Modal或showModal=Multi-Window，设置背景遮罩的zIndex和高
			if(c.isBack && (c.showModal == "Modal" || c.showModal == "Multi-Window")){
				e.push({elem: b.pBack, style: { z_index: b.zIndex, height: private.fn.wh().height }});
			}
			//如果isBack=false，并且showModal=Non-Modal或showModal=Multi-Window
			if(!c.isBack && (c.showModal == "Non-Modal" || c.showModal == "Multi-Window")){
				
			}
			//设置弹出框主层宽、高、left（或top）
			m = {
				width: h,
				height: i,
				left: k,
				margin_top: "-"+(i/2)+"px",
				border: "1px solid "+skin.mainColor,
				background: skin.lightColor,
				color: skin.fontColor
			};
			if(c.style.top){ m.top = c.style.top+"px"; m.margin_top = "0px";  }
			e.push({elem: b.pMain, style: m});
			//设置标题栏的样式
			m = b.pTitl.parent();
			m = { width: (m.width() - m.find("div.icoItem").width() - m.find("div.titleBtn").width() - 10)+"px" };
			e.push({elem: b.pTitl, style: m});
			//设置内容主层的高
			m = d.btnButton ? 0 : 39
			m = {
				height: (parseInt(i)-70+m),
				border_top: "1px solid "+skin.mainColor,
				border_bottom: "1px solid "+skin.mainColor,
				background: skin.fanColor
			};
			try{e.push({elem: b.pCont.parent(), style: m});}catch(ex){}
			//设置内容层的textAlign
			m = ((m.height - b.pCont.height())/2);
			m = { text_align: c.style.textAlign, margin: (m < 0 ? 0 : m)+"px 7px", width: (h-(2*7))+"px" }
			e.push({elem: b.pCont, style: m});
			fn.changeStyle(e);
			//绑定弹出框相关事件
			handle.bindEvent(c.isContextMenu);
		},
		/**
		 * Alert
		 * @param: a.Alert的文本内容
		 * @param: b.Alert的Title
		 * @param: c.Alert的按钮OK的执行函数
		 */
		alert: function(a, b, c, d){
			a = a == undefined || a == null ? lang.S001 : a;
			b = b == undefined || b == null ? lang.S000 : b;
			if(typeof(a) == 'function'){ c = a; a = lang.S001; }
			if(typeof(b) == 'function'){ c = b; b = lang.S000; }
			if(typeof(c) == 'boolean'){ d = c; c = null; }
			var d = {
				conf: { title: b, content: a, isDelete: true, isContextMenu: d ? d : public.conf.isContextMenu, style: {width: 300, textAlign: "left"} },
				button: { btnButton: { ok: {val: "ok", show: true, fn: c }, cancel: { show: false } } }
			};
			fn.open(d);
			private.fn.disableSelection(private.conf.pMain);
		},
		/**
		 * Confirm
		 * @param: a.Confirm的文本内容
		 * @param: b.Confirm的Title
		 * @param: c.Confirm的按钮OK、Cancel和Close按钮的执行函数{ok:function, cancel: function, close: function}
		 */
		confirm: function(a, b, c){
			a = a == undefined || a == null ? lang.S003 : a;
			b = b == undefined || b == null ? lang.S002 : b;
			if(typeof(a) == 'object'){ c = a; a = lang.S003; }
			if(typeof(b) == 'object'){ c = b; b = lang.S002; }
			var d = {
				conf: { title: b, content: a, style: {width: 300, textAlign: "left"} },
				button: {
					titleBtn: { close: { val: "x", show: true, fn: c ? c.close : null } },
					btnButton: { ok: { val: "ok", show: true, fn: c ? c.ok : null }, cancel: { val: "cancel", show: true, fn: c ? c.cancel : null } }
				}
			};
			fn.open(d);
			private.fn.disableSelection(private.conf.pMain);
		},
		/**
		 * upload file
		 *
		*/
		uploadFile: function(p){
			var a, b, c, d, e, f, g, h, i, j;
			g = private.conf;
			h = 500, i = 360;
			//初始化文件上传弹出框的宽和高
			if(p){
				h = p.width ? p.width < h ? h : p.width : h;
				i = p.height ? p.height < i ? i : p.height : i;
			}
			//指定文件上传界面样式
			d = {
				ufTable: {
					width: "100%",
					height: "auto",
					border: "1px solid "+g.skin.lightColor
				},
				ufButton: {
					border: "1px solid "+g.skin.mainColor,
					background: g.skin.lightColor,
					float: "left",
					margin: "6px",
					color: g.skin.fontColor
				},
				ufPreview: {
					border: "1px solid "+g.skin.mainColor,
					background: g.skin.lightColor,
					width: (h-34)+"px",
					height: (i-120)+"px",
					float: "left",
					margin: "5px",
					overflow_y: "auto"
				},
				ufText: {
					float: "left",
					margin: "-3px auto 3px 5px"
				},
				ufLoading: {
					font_weight: "bold",
					float: "left",
					margin: "-3px auto 3px 10px"
				},
				ufCopyRight: { margin: "-3px 5px 3px auto" },
				right: { float: "right" },
				red: { color: g.skin.predColor }
			};
			a = [];
			//创建文件上传界面html
			a.push('<table class="ufTable">');
			a.push('	<tr><td>');
			a.push('		<input class="ufButton ufFile" type="button" value="选择文件" />');
			a.push('		<input class="ufButton ufUpLoad right" type="button" value="上传" />');
			a.push('		<input class="ufButton ufClear right" type="button" value="清空" />');
			a.push('	</td></tr>');
			a.push('	<tr style="display:none;"><td>');
			a.push('		<input type="file" class="openFiles" />');
			a.push('	</td></tr>');
			a.push('	<tr><td>');
			a.push('		<div class="ufPreview"></div>');
			a.push('	</td></tr>');
			a.push('	<tr><td>');
			a.push('		<span class="ufText">等待上传：<label class="wait red">0</label>个 已上传：<label class="complete red">0</label>个</span>');
			a.push('		<span class="ufLoading"></span>');
			a.push('		<span class="ufCopyRight right">2012(C)思建科技</span>');
			a.push('	</td></tr>');
			a.push('</table>')
			a = $(a.join("\r\n"));
			//禁止内容被选中
			private.fn.disableSelection(a);
			//绑定事件
			a.find(".ufFile").click(function(){ a.find(".openFiles").click(); });
			a.find(".ufUpLoad").click(function(){ this.disabled = true; fn.uploadStart(a); });
			a.find(".ufClear").click(function(){ fn.uploadClear(a); });
			//设置样式
			for(e in d){
				f = a.find("."+e);
				f = f.length == 0 ? a : f;
				private.fn.setStyle(f, d[e]);
			}
			//配置弹出框参数
			b = {
				conf: { title: "文件上传", content: a, isDelete: true, isDrag: false, isContextMenu: true, style: {width: h, height: i, textAlign: "left"} },
				button: { btnButton: null }
			};
			//打开弹出框
			c = new JPopUp(b).open();
		},
		uploadStart: function(a){
			var k = 0, l = "";
			j = new private.fn.Thread(function(){
				if(k == 3){ k = 0, l = ""; }
				else{ l = l + ".", k++; }
				a.find(".ufLoading").html("uploading"+l);
			}, 400);
			j.start();
			a.find("div.ufPreview").css("cursor", "wait");
		},
		uploadClear: function(a){
			a.find(".ufPreview").html("");
		},
		/**
		 * 关闭弹出框
		 * @param: a.当前触发该事件的元素
		 */
		close: function(a){
			//定义函数内部变量
			var b, c, d;
			//初始化变量值
			b = private.conf;				//获取私有的配置对象
			c = public.conf;				//获取公共的配置对象
			//关闭弹出框
			if(c.isDelete){ b.pMain.remove(); b.pMain = null; }else{ b.pMain.hide(); }
			//隐藏背景遮罩
			if(c.isBack){
				d = b.pBack.css("z-index");
				if(d == 1001){ b.pBack.hide(); }
				b.pBack.css("z-index", --d);
			}
		},
		/**
		 * 创建右键菜单
		 * @param a.创建右键菜单的参数对象
		 */
		rightMenu: function(a){
			var b, c, d, e, f, g, h, i, j, ph, pw, x, y, ww, wh, st, sl;
			b = private.conf;
			//if(a){ a = private.fn.extend(b.contextMenu, a); }
			c = [];
			d = a.items;
			e = a.event;
			g = d.length;
			i = a.style;
			i.prmPanel.border = "1px solid "+b.skin.mainColor;
			i.prmPanel.background = b.skin.fanColor;
			i.prmPanel.color = b.skin.fontColor;
			//如果右键菜单对象不存在，就创建
			if(!b.pRight){
				c.push('<div class="'+b.prmClass+'">');
				c.push('	<table cellpadding="3" cellspacing="0"></table>');
				c.push('</div>');
				b.pRight = c = $(c.join("\r\n"));
				b.pMenu = c.find("table");
				$(document.body).append(c);
			}
			//设置样式
			for(f in i){ private.fn.setStyle(b.pRight.parent().find("."+f), i[f]); }
			//清空原菜单
			b.pMenu.html(""), c = [];
			//添加菜单信息栏
			c.push('<tr align="center"><td width="20px" rowspan="'+(g+1)+'" style="background:'+b.skin.lightColor+'">'+a.copyright+'</td></tr>');
			//绑定菜单选项
			for(f=0; f<g; f++){
				//获取单个菜单项
				h = d[f];
				if(h.disabled == false){
					j = "border-left:1px solid "+b.skin.mainColor+";";
					c.push('<tr align="left"><td style="'+j+'" class="rmItem" data="'+f+'" abled="'+h.disabled+'">'+h.text+'</td></tr>');
				}
				else{
					j = "border-left:1px solid "+b.skin.mainColor+";color:"+b.skin.dfontColor+";";
					c.push('<tr align="left"><td style="'+j+'" class="rmItem" data="'+f+'">'+h.text+'</td></tr>');
				}
			}
			c = $(c.join("\r\n"));
			b.pMenu.append(c);
			//禁止内容被选中
			private.fn.disableSelection(b.pMenu);
			//设置坐标并显示
			x = e.pageX, y = e.pageY;
			pw = b.pRight.width(), ph = b.pRight.height();
			ww = document.documentElement.clientWidth, wh = document.documentElement.clientHeight;
			st = document.documentElement.scrollTop, sl = document.documentElement.scrollLeft;
			x = (x+pw-sl)>ww ? x-pw : x; y = (y+ph-st)>wh ? y-ph : y;
			b.pRight.css("top", (y+1)+"px").css("left", (x+1)+"px").show();
			//屏蔽右键菜单层的右键事件
			private.fn.eventBubbling(b.rRightEvent, "contextmenu", b.pRight);
			//绑定右键菜单上的项的over事件
			private.fn.eventBubbling(b.rTDOverEvent, "mouseover", b.pRight);
			//绑定右键菜单上的项的click事件
			private.fn.eventBubbling(b.rTDClickEvent, "click", b.pRight);
		},
		/**
		 * drag 拖动
		 * @param a.当前事件 event
		 * @param b.当前事件触发对象 element
		 */
		popUpDrag: function(a, b){
			//定义函数内部变量
			var c, d, e, f, g, h, i, j, k, mt, diffW, diffH;
			//初始化变量值
			//获取私有配置参数
			c = private.conf;
			//获取公共配置参数
			d = public.conf
			//获取当前操作的弹窗主层
			e = b.parents("div."+c.popClass);
			//获取弹出框的实际宽和高
			j = parseInt(e.width()), k = parseInt(e.height());
			//获取当前鼠标位置于当前需要拖动元素位置的差值
			f = a.clientX - parseInt(e.css("left"));
			g = a.clientY - parseInt(e.css("top"));
			//获取当前可见区域的宽和高
			h = document.documentElement.clientWidth;
			i = document.documentElement.clientHeight;
			//获取拖动元素的margin-top，并取绝对值
			mt = Math.abs(parseInt(e.css("margin-top")));
			//获取弹出框在可见区域的最大定位值
			diffW = h - j, diffH = i - k + mt;
			//拖动函数
			var drag = function(event){
				//定义函数内部变量
				var a, b, c, d, top, left;
				a = event || window.event;
				//获取鼠标当前坐标位置
				b = a.clientX, c = a.clientY;
				//获取当前需要移动元素需要设置的top和left
				left = b - f, top = c - g;
				//不允许拖出可见区域，须做一下处理
				left = left < 0 ? 0 : left>diffW ? diffW-3 : left;
				top = (top-mt) < 0 ? mt : top>diffH ? diffH-2 : top;
				//设置需要移动元素的top和left
				e.css("top", top+"px").css("left", left+"px");
				//private.conf.pCont.html(diffW+","+diffH+"--"+left+","+(top));
			};
			//取消拖动
			var undrag = function(){$(this).unbind();};
			//绑定拖动事件
			b.unbind("mousemove").mousemove(drag).unbind("mouseup").mouseup(undrag).unbind("mouseout").mouseout(undrag);
		}
	};
	//函数体操作对象
	var handle = {
		//初始化需要初始化的函数
		fnInit: function(a){ private.fn.initElem(elem); fn.loadInit(a); },
		//事件绑定
		bindEvent: function(f){
			var a = private.conf;
			//绑定弹出框相关点击事件
			private.fn.eventBubbling(a.popClickEvent, "click", a.pMain);
			if(public.conf.isDrag){ private.fn.eventBubbling(a.popDownEvent, "mousedown", a.pMain); }
			if(f){
				//绑定弹出框相关右键事件
				private.fn.eventBubbling(a.popRightEvent, "contextmenu", a.pMain);
				//绑定背景遮罩右键事件
				private.fn.eventBubbling(a.bgRightEvent, "contextmenu", a.pBack);
				//绑定背景遮罩点击事件
				private.fn.eventBubbling(a.bgClickEvent, "click", a.pBack);
			}
		},
		//确定按钮点击事件
		ok: function(){
			var a = public.button.btnButton.ok, b = "true";
			if(a.fn){ b = a.fn(private.conf.pMain)+""; }
			if(b != "false"){ fn.close(); }
		},
		//否定按钮点击事件
		no: function(){
			var a = public.button.btnButton.no;
			if(a.fn){ a.fn(private.conf.pMain); }
			fn.close();
		},
		//取消按钮点击事件
		cancel: function(){
			var a = public.button.btnButton.cancel;
			if(a.fn){ a.fn(private.conf.pMain); }
			fn.close();
		},
		//关闭按钮点击事件
		close: function(){
			var a = public.button.titleBtn.close;
			if(a.fn){ a.fn(private.conf.pMain); }
			fn.close();
		},
		//绑定右键菜单按钮项
		contextMenu: function(d, e){
			var a, b, c, f, g, h, i, j, k;
			a = {};
			b = private.conf;
			a = private.fn.extend(a, b.contextMenu);
			c = a.items;
			//将默认的items添加到最后
			for(f =0, g = c.length; f<g; f++){ d.push(c[f]); }
			a.event = e;
			a.items = d;
			//保存当前创建的右键菜单项
			b.contextMenu.tempItems = d;
			h = e.target || e.srcElement;
			i = h.nodeName;
			if(i == "TEXTAREA"){ handle.closeContextMenu(); j = true; }
			else if(i == "INPUT"){
				k = h.type;
				if(k == "text" || k == "password"){ handle.closeContextMenu(); j = true; }
				else{ fn.rightMenu(a); j = false; }
			}
			else{ fn.rightMenu(a); j = false; }
			return j;
		},
		//关闭右键菜单层
		closeContextMenu: function(){
			 var a = private.conf.pRight; if(a) a.hide();
		},
		//背景遮罩层右键事件
		bgContextMenu: function(e){
			var a = [];
			return handle.contextMenu(a, e);
		},
		//弹出框上按钮上的右键
		buttonContextMenu: function(e, m){
			var a = [{text: "点击", disabled: false, fn: function(){ m.click(); }}];
			return handle.contextMenu(a, e);
		},
		//弹出框上的右键
		popUpContextMenu: function(e){
			var a = [
				//{text: "移动"},
				//{text: "还原"},
				//{text: "最大化"},
				//{text: "最小化"},
				{text: "关闭", disabled: false, fn: handle.close}
			];
			return handle.contextMenu(a, e);
		},
		//弹出框上图片的右键
		imgContextMenu: function(e){
			var a = [
				{text: "查看图片"},
				{text: "图片另存为"}
			];
			return handle.contextMenu(a, e);
		},
		//弹出框上超链接的右键
		aContextMenu: function(e, m){
			var a = [
				{text: "打开", disabled: false, fn: function(){ window.location = m.attr("href"); }},
				{text: "新窗口打开", disabled: false, fn: function(){ window.open(m.attr("href")); }},
				//{text: "连接另存为"},
				//{text: "添加到收藏夹"},
				//{text: "设为首页"}
			];
			return handle.contextMenu(a, e);
		},
		//右键菜单上的项的over事件
		rTDOver: function(a, b){
			var c, d, e, f;
			f = b.attr("abled");
			c = {
				cursor: "default",
				background: f == "disabled" || f == "false" ? private.conf.skin.darkColor : private.conf.skin.lightColor
			};
			private.fn.setStyle(b, c);
			b.unbind("mouseout").mouseout(function(){var $this = $(this); setTimeout(function(){$this.css("background", "");}, 45); });
		},
		//右键菜单上的项的click事件
		rTDClick: function(a, b){
			var c, d, e, f, g;
			c = private.conf.contextMenu.tempItems;
			//获取当前点击元素的一个属性data
			d = b.attr("data");
			g = b.attr("abled");
			if(g == "disabled" || g == "false"){
				//获取当前点击项的操作函数fn
				e = c[d].fn;
				if(d && e){
					private.conf.pRight.hide();
					//执行操作函数，并获取返回值
					f = e();
					if(f!=false){ handle.closeContextMenu(); }
				}
				else{handle.closeContextMenu();}
			}
		},
		//弹出框的mousedown事件(主要作用在于，非模态多弹窗的时候，设置zIndex)
		popUpDown: function(a, b){
			var c, d, e, f, g, h;
			//当前窗口不是模态，而当前窗口下的一个窗口是模态
			//获取当前点击元素的主窗体
			c = b.parents("div.popUpPanel");
			c = c.length == 0 ? b : c;
		}
	};
	//返回对象(该对象中一般只包括一个init函数对象，根据需要，可以自行添加)
	var callBack = {
		panel: function(){ return private.conf.pMain; },
		open: function(a){ fn.open(a); },
		alert: function(a, b, c){ fn.alert(a, b, c); },
		confirm: function(a, b, c){ fn.confirm(a, b, c); },
		close: function(){ fn.close(); },
		uploadFile: function(a){ fn.uploadFile(a); }
	};
	handle.fnInit(param);
	return callBack;
};