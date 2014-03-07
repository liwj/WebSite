/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技-潘毅
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JSelects.js
// 文件功能描述：下拉框js
//
// 创建标识：2012-08-13 10：16
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var Select = function(){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		//正则表达式库
        regExp: {
			R000: /_/gi,											//设置样式替换下划线
			R001: /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i		//是否为RGB颜色值
        },
		conf: {
			maxItem: 5,
			itemsHeight: 22,
			itemsMinH: 20,
			itemsMaxH: 25,
			maxList: 200,
			backGround: "",
			overColor: "",
			btnBgColor: "",
			elem: {
				jSelPanel: null,
				jSelLable: null,
				jSelText: null,
				jSelBtn: null,
				jSelButton: null,
				jSelList: null,
				jSelListPanel: null,
				jSelItem: null
			}
		},
		style: {
			//select 主层
			jSelPanel: {
				width: "120px",
				height: "22px",
				font_size: "12px",
				position: "relative",
				color: "#000000"
			},
			//select 显示框区域
			jSelLable: {
				width: "120px",
				height: "22px",
				cursor: "pointer",
				position: "absolute",
				top: "0px",
				left: "0px",
				text_indent: "0px"
			},
			//select 文本显示区域
			jSelText: {
				float: "left",
				padding_left: "5px",
				overflow: "hidden",
				white_space: "nowrap",
				text_overflow: "ellipsis"
			},
			jSelBtn: {
				float: "right"
			},
			//select 按钮显示区域
			jSelButton: {
				border_style: "solid dashed dashed",
				border_width: "5px",
				font_size: "0",
				height: "0",
				line_height: "0",
				position: "absolute",
				right: "4px",
				top: "10px",
				width: "0"
			},
			//select 列表显示
			jSelList: {
				width: "120px",
				height: "auto",
				overflow: "hidden",
				position: "absolute",
				top: "22px",
				left: "-1px",
				display: "none"
			},
			//select 列表panel
			jSelListPanel: {
				width: "100%",
				height: "auto"
			},
			//select 列表内的item
			jSelItem: {
				width: "120px",
				height: "22px",
				line_height: "22px",
				padding_left: "5px",
				cursor: "pointer",
				float: "left",
				margin: "1px",
				overflow: "hidden",
				white_space: "nowrap",
				text_overflow: "ellipsis",
				text_indent: "0px"
			}
		}
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {
		conf: {
			//是否将当前选择的项在list中选中
			isSelect: true,
			clas: "jSelects",
			ids: "jSelects",
			//color: "#0F7565",
			color: "#C8C8C8",
			width: "120",
			height: "22",
			items: [{val: 0, txt: "请选择"}],
			//items: [{id: 0, val: "请选择"}],
			change: null,
			pNode: null,
			style: null
		}
	};
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
		/**
		 * 页面初始化加载数据
		 * @param a.public.conf对象的参数
		 */
		loadInit: function(a){
			if(a) $.extend(public.conf, a);
			fn.createSelect();
		},
		/**
		 * 创建select的html
		 */
		createSelect: function(){
			//定义函数内部变量
			var a, b, c, d, e, f;
			//初始化变量
			a = [];
			//select样式
			b = private.style;
			//私有配置
			c = private.conf;
			//公共配置
			d = public.conf;
			//私有配置中存放元素的对象
			e = c.elem;
			//添加select的html
			a.push('<div class="jSelPanel '+d.clas+'" id="'+d.ids+'">');
			a.push('	<div class="jSelLable">');
			a.push('		<div class="jSelText"></div>');
			a.push('		<div class="jSelBtn"><b class="jSelButton"></b></div>');
			a.push('	</div>');
			a.push('	<div class="jSelList"></div>');
			a.push('<div>');
			//将创建的html字符串转换为jquery对象
			f = $(a.join("\r\n"));
			//获取并设置select相关元素对象，同时设置对应的样式
			for(g in e){
				//获取以g为class的元素
				h = f.find("."+g);
				//如果h为空，就为本身f
				h = h.length>0 ? h : f;
				//将以g为class的元素对象赋值给以g为键的对象
				e[g] = h;
			}
			//绑定数据
			fn.bindItem(d.items, e.jSelList);
			//添加到指定的元素中
			if(d.pNode) d.pNode.html(f);
		},
		/**
		 * 设置样式和获取对象
		 * @param a.select main panel
		 */
		setStyleAndObject: function(a){
			var b, c, d, e;
			a = a ? a : private.conf.elem.jSelPanel;
			b = private.style;
			e = public.conf.style;
			if(e){
				for(c in e){
					b.jSelPanel[c] = e[c];
				}
			}
			//获取并设置select相关元素对象，同时设置对应的样式
			for(c in b){
				//获取以g为class的元素
				d = a.find("."+c);
				//如果h为空，就为本身f
				d = d.length>0 ? d : a;
				//设置对应的样式
				private.fn.setStyle(d, b[c]);
			}
		},
		/**
		 * 绑定select的list
		 * @param a.list的Item集合
		 * @param b.list元素对象
		 */
		bindItem: function(a, b){
			//定义函数内部变量
			var c, d, e, f, g, h, i;
			//初始化变量值
			b = b ? b : private.conf.elem.jSelList;
			c = [];				//存放select的list的html字符串
			d = public.conf;	//公共的参数配置对象
			e = private.conf;	//私有的参数配置对象
			f = a.length;		//item集合的长度
			//设置动态的关于select的样式
			fn.setSelStyleVal(f);
			//创建列表html
			c.push('<div class="jSelListPanel">');
			//如果item长度为0，添加一个空项
			if(f == 0){ c.push('<div class="jSelItem" data="" selectedIndex="0"></div>'); }
			//循环添加item项
			for(g=0; g<f; g++){
				//获取单个item
				h = a[g];
				//获取单个item的selected属性，判断select应该选中哪一个(默认选中第一项)
				i = h.selected;
				if(g==0||i=="true"||i=="selected"||i==true){
					b.attr("conf", g);
					b.parent().find(".jSelText").attr("data", h.val).attr("selectedIndex", g).html(h.txt);
					//b.parent().find(".jSelText").attr("data", h.id).attr("selectedIndex", g).html(h.val);
				}
				//创建每一个item的项
				c.push('<div class="jSelItem" data="'+h.val+'" selectedIndex="'+g+'">'+h.txt+'</div>');
				//c.push('<div class="jSelItem" data="'+h.id+'" selectedIndex="'+g+'" title="'+h.val+'">'+h.val+'</div>');
			}
			c.push('</div>');
			//添加到list中
			b.html(c.join("\r\n"));
			//绑定items的over事件和click事件
			b.find(".jSelItem").unbind("mouseover").mouseover(fn.overItem).unbind("click").click(fn.clickItem);
			//设置样式
			fn.setStyleAndObject();
		},
		/**
		 * 设置select一些样式的值
		 * @param a.当前select item的长度
		 */
		setSelStyleVal: function(a){
			//定义函数内部变量
			var a, b, c, d, e, f, g, h;
			//初始化变量值
			b = public.conf;	//公共的参数配置对象
			b.width = parseInt(b.width) < 50 ? 50 : b.width;
			c = private.conf;	//私有的参数配置对象
			c.itemsHeight = b.height > c.itemsMaxH ? c.itemsMaxH : b.height < c.itemsMinH ? c.itemsMinH : b.height;
			d = a*c.itemsHeight;//select list的高
			e = "hidden";		//select list的overflow-y
			f = c.maxItem;		//配置中设置的最多显示多少项不产生滚动条
			g = c.maxList;		//配置中设置的list最大高度
			h = private.style.jSelList;	//select list的样式对象
			//c.backGround = "#BEDAD5";
			c.backGround = private.fn.getColor("light", b.color, 180);
			c.overColor = private.fn.getColor("dark", c.backGround, 40);
			c.btnBgColor = private.fn.getColor("dark", c.backGround, 80);
			/*
			如果当前的item数大于配置中设置的最大item个数，则需判断当前的item数*每一个item的高度，是否大于当前设置的list的高度
			如果select list的高大于配置中设置的list最大高度，d就等于设置的最大高度，并将list元素的overflow-y设为"auto"，以显示滚动条；
			否则，d等于item的长度*每一个item的高
			*/
			if(a > f){ e = d > g ? "auto" : e; d = d > g ? g : d; }
			//将判断后的结果值添加到配置中的jSelList样式对象中
			h.height = d+"px";
			h.overflow_y = e;
			h.width = b.width+"px";
			h.border = "1px solid "+b.color;
			h.background = c.backGround;
			h.top = b.height+"px";
			//设置item的样式
			h = private.style.jSelItem;
			h.width = (parseInt(b.width) - (e == "auto" ? 25 : 9))+"px";
			h.height = (parseInt(c.itemsHeight) - 4)+"px";
			h.line_height = h.height;
			h.border = "1px solid "+c.backGround;
			//设置panel的样式
			h = private.style.jSelPanel;
			h.border = "1px solid "+b.color;
			h.background = c.backGround;
			h.width = b.width+"px";
			h.height = b.height+"px";
			h.line_height = h.height;
			//设置label的样式
			h = private.style.jSelLable;
			h.width = b.width+"px";
			h.height = b.height+"px";
			h.line_height = h.height;
			//设置text的样式
			h = private.style.jSelText;
			h.width = (parseInt(b.width)-24)+"px";
			//设置btn的样式
			h = private.style.jSelBtn;
			h.width = (24-5-1)+"px";
			h.height = b.height+"px";
			h.border_left = "1px solid "+b.color;
			//设置button的样式
			h = private.style.jSelButton;
			h.top = ((b.height/2)-2)+"px";
			h.border_color = b.color+" transparent transparent";
		},
		/**
		 * select label的点击事件，点击后显示select的list
		 * @param a.window.event
		 */
		clickSelLabel: function(a){
			a = a || window.event;
			var b, c, d, e, f, g;
			f = private.conf;
			g = public.conf;
			b = a.target || a.srcElement;
			d = $("div.jSelList[data=show]");
			e = b.className;
			c = d.attr("data", "hide").hide().parents("div.jSelPanel").css("z-index", "1");
			c.find(".jSelBtn").css("background", "");
			if(e=="jSelLable"||e=="jSelText"||e=="jSelSpan"||e=="jSelButton"||e=="jSelBtn"){
				c = $(b).parents(".jSelPanel");
				d = c.find("div.jSelList");
				if(c.attr("data") == "show"){ c.css("z-index", "1");d.attr("data", "hide").hide(); }
				else{
					c.css("z-index", "999");
					if(g.isSelect != false && g.isSelect != "false"){
						d.find("div.jSelItem").eq(d.attr("conf")).css("background", f.overColor).css("border", "1px solid "+g.color);
					}
					d.attr("data", "show").show();
					c.find(".jSelBtn").css("background", f.btnBgColor);
				}
			}
		},
		/**
		 * select item的over事件
		 */
		overItem: function(){
			var a, b, c, d;
			a = private.conf;
			d = public.conf;
			b = $(this).unbind("mouseout");
			c = b.parents("div.jSelList");
			b.css("background", a.overColor).css("border", "1px solid "+d.color);
			if(b.get(0) != c.find("div.jSelItem").eq(c.attr("conf")).get(0) || d.isSelect == false || d.isSelect == "false"){
				b.mouseout(function(){
					setTimeout(function(){ b.css("background", a.backGround).css("border", "1px solid "+a.backGround); }, 70);
				});
			}
		},
		/**
		 * select item的click事件
		 */
		clickItem: function(){
			var a, b, c, d, e, f, g, h;
			g = private.conf;
			h = public.conf;
			a = $(this);
			b = a.attr("data"), c = a.text(), d = a.attr("selectedIndex");
			e = {val: b, txt: c, selectedIndex: d, elem: g.elem.jSelPanel};
			//e = {id: b, val: c, selectedIndex: d, elem: g.elem.jSelPanel};
			a.parents("div.jSelPanel").find(".jSelText").html(c).attr("data", b).attr("selectedIndex", d);
			f = a.parents("div.jSelList");
			if(h.isSelect != false || h.isSelect != "false"){
				f.find("div.jSelItem").eq(f.attr("conf")).css("background", g.backGround).css("border", "1px solid "+g.backGround);
			}
			f.attr("conf", d);
			if(public.conf.change != null){ h.change(e); }
		},
		/**
		 * 指定select选中哪一项
		 * @param a.选中哪一项（或其它），默认是以list的下标从0开始
		 * @param b.如何指定选中项的key值，可以是selectIndex（默认）、data(当前项的value值)
		 */
		selected: function(a, b){
			var c, d, e, f;
			b = b ? b : "data";
			c = private.conf.elem.jSelList.find(".jSelItem");
			for(d=0, e=c.length; d<e; d++){
				f = c.eq(d);
				if(a == f.attr(b)){ f.click(); break; }
			}
		}
	};
	//函数体操作对象
	var handle = {
		//初始化需要初始化的函数
		fnInit: function(a){ fn.loadInit(a); },
		//绑定需要绑定的事件
		bindEvent: function(){ $(document.body).click(function(event){ fn.clickSelLabel(event); }); }
	};
	//返回对象(该对象中一般只包括一个init函数对象，根据需要，可以自行添加)
	var callback = {
		init: function(a){ handle.fnInit(a); handle.bindEvent(); return private.conf.elem.jSelPanel; },
		selElem: function(){ return private.conf.elem.jSelList; },
		selected: function(a, b){ fn.selected(a, b); },
		bind: function(a){ fn.bindItem(a); },
		selectedIndex: function(){ var a = private.conf.elem.jSelText.attr("selectedIndex"); return parseInt(a ? a : 0); },
		value: function(){ return parseInt(private.conf.elem.jSelText.attr("data")); },
		text: function(){ return private.conf.elem.jSelText.html(); }
	};
	return callback;
};

var JSelects = {
	init: function(p){
		var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o;
		//try{
			//获取页面下拉
			b = $("select[class*=selBox]");
			for(k = 0, l=b.length; k<l; k++){
				a = new Select();
				c = b.eq(k);
				if(c.attr("conf") == "hide"){ continue; }
				d = c.children();
				e = [], f = {};
				for(g=0, h=d.length; g<h; g++){
					i = d.eq(g);
					f = {};
					f.val = i.val();
					f.txt = i.text();
					//f.id = i.val();
					//f.val = i.text();
					if(i.attr("selected")){f.selected = "true";}
					e.push(f);
				}
				m = c.attr("onchange");
				//给自定义的select添加一个change事件
				n = function(param){ param.elem.prev().val(param.val).change(); };
				j = a.init({width: c.width(), items: e, change: n, style: p});
				o = c.next();
				if(o.length > 0){ if(o.hasClass("jSelPanel")){ o.remove(); } }
				c.after(j).attr("conf", "hide").hide();
			}
		//}
		//catch(ex){}
	}
};