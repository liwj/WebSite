/*----------------------------------------------------------------
// Copyright (C) 2012 思建科技-潘毅
// 版权所有。	
// E-mail：407666067@QQ.com
//
// 文件名：JProducts.js
// 文件功能描述：Products JS
//
// 创建标识：2012-09-19 17：22
//
// 修改标识：
// 修改描述：
//----------------------------------------------------------------*/
var JProducts = function(){
	//定义一个对象，用于存储该js需要用到的私有变量
	var private = {
		conf: {
			clickEventConf: [
				//保存所有
				{nodeName: "a", className: "btn_saveAll", fn: function(event, element){ fn.saveAll(event, element); }},
				//保存并流转
				{nodeName: "a", className: "btn_saveAll_goto", fn: function(event, element){ fn.saveAllG(event, element); }},
				//删除
				{nodeName: "a", className: "btn_del", fn: function(event, element){ fn.del(event, element); }},
				//上传弹出框
				{nodeName: "a", className: "uploadfile", fn: function(event, element){ fn.uploadfile(event, element); }},
				//取消
				{nodeName: "a", className: "btn_res", fn: function(event, element){ fn.res(event, element); }},
				//收起
				{nodeName: "p", className: "pack_up", fn: function(event, element){ fn.packUp(event, element); }},
				//保存
				{nodeName: "p", className: "save", fn: function(event, element){ fn.save(event, element); }},
				//编辑
				{nodeName: "p", className: "edit", fn: function(event, element){ fn.edit(event, element); }}
			]
		}
	};
	//定义一个对象public，用于存储该js需要从外部传入的参数
	var public = {
		conf: {
			save_url: "",
			del_url: ""
		}
	};
	//定义一个对象，用于存储该js需要用到的文本字符串
	var lang = {
		S000: '<img src="images/edit.png" />',
		S001: '<img src="images/edit.png" />',
		S002: '<img src="images/zankai.png" />',
		S003: '<img src="images/shouqi.png" />'
	};
	//定义一个对象，用于存储该js需要用到的页面元素对象
	var elem = {
		right: "div.right"
	};
	//内部私有公共函数库
	private.fn = {
		//初始化页面元素
		initElem: function(a){
			for(var b in a){ a[b] = $(a[b]); }
			return a;
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
		//ajax提交
		ajaxSubmit: function(a){
			var b, c, d, f, g;
			b = {
				type: "get",
				contentType: "application/json; charset=utf-8",
				url: null,
				data: null,
				dataType:'json',
				timeout:30000,
				//error: function(){ $(".tip_msg_elem").html("<font color='#FF0000'>连接超时，请检测您的网络是否连接正常！</font>"); },
				error: function(){ alert("连接超时，请检测您的网络是否连接正常！"); },
				success: function(jqXHR, textStatus){  }
			};
			c = a.error, d = b.error, f = a.success, g = b.success;
			if(c){ a.error = function(e){ d(e); c(e);  }; }
			if(f){ a.success = function(h, i){ g(h, i); f(h, i); }; }
			$.extend(b, a);
			$.ajax(b);
		}
	};
	//函数体对象
	var fn = {
		//页面初始化加载数据
		loadInit: function(a){
			if(a != undefined){ $.extend(public.conf, a); }
			$(".sc_midle").css("overflow", "inherit");
			var b = $("div.czgj").find("div.sc_midle").attr("status", "edit").find("p");
			JEditTbl().doEdit({elem: b});
			JVerfier().init({forms: $(b).parents(".czgj")});
			JSelects.init({margin_top: "5px", margin_left: "5px"});
		},
		/**
		 * 保存所有
		 * @param a. event
		 * @param b. element
		*/
		saveAll: function(a, b){
			fn.saveAllByG(a, b);
		},
		/**
		 * 保存并流转
		 * @param a. event
		 * @param b. element
		*/
		saveAllG: function(a, b){
			fn.saveAllByG(a, b, fn.lz);
		},
		/**
		 * 流转
		*/
		lz: function(){
			JPopUp().alert("流转");
		},
		/**
		 * 保存所有或保存并流转
		 * @param a. event
		 * @param b. element
		 * @param f. function
		*/
		saveAllByG: function(a, b, c){
			var d, e, f;
			//true.验证通过，false.验证失败，isData=true，验证通过时就直接返回数据JSON对象
			d = JVerfier().verfier({forms: ".czgj",isData: true});
			if(d && d.length>0){
				alert("提交数据(JSON):"+JSON.stringify(d));
				e = new JPopRectangle();
				e.show({text: "保存中..."});
				f = {
					url: public.conf.save_url,
					data: d,
					error: null,//
					complete: function(){ e.hide();fn.complete(c); },//
					success: function(data, textStatus){
						//...
						e.hide();
						fn.complete(c);
					}
				};
				private.fn.ajaxSubmit(f);
			}
		},
		/**
		 * 保存成功后
		*/
		complete: function(a){
			var b = $("div.sc_midle[status=edit]").removeAttr("status");
			//b.each(function(ind, ele){ $(ele).parents(".czgj").find(".save").html(lang.S000+'编辑').removeClass("save").addClass("edit"); });
			//JEditTbl().doSave({elem: b.find("p")});
			if(a){ a(); }
		},
		/**
		 * 删除
		 * @param a. event
		 * @param b. element
		*/
		del: function(a, b){
			var c, d;
			c = {
				ok: function(){ JPopUp().alert("删除数据："+b.attr("data")); }
			};
			d = new JPopUp();
			d.confirm(c);
		},
		/**
		 * 取消
		 * @param a. event
		 * @param b. element
		*/
		res: function(a, b){
			JPopUp().alert("取消");
		},
		/**
		 * 收起
		 * @param a. event
		 * @param b. element
		*/
		packUp: function(a, b){
			var c, d, e;
			b = $(b);
			c = b.parents("div.czgj");
			e = c.find("div.sc_midle,div.cz_midle");
			//e = e.length>0?e:c.children().eq(1);
			d = e.attr("flag");
			if(d){
				if(d == "show"){ b.html(lang.S002+'展开'); e.attr("flag", "hide").hide(); }
				else{ b.html(lang.S003+'收起'); e.attr("flag", "show").show(); }
			}
			else{ b.html(lang.S002+'展开'); e.attr("flag", "hide").hide(); }
		},
		/**
		 * 保存
		 * @param a. event
		 * @param b. element
		*/
		save: function(a, b){
			b = $(b);
			var c, d, e, f;
			c = b.parents(".czgj");
			//提交数据保存
			var d = JVerfier().verfier({forms: c,isData: true});//true.验证通过，false.验证失败，isData=true，验证通过时就直接返回数据JSON对象
			if(d){
				alert("提交数据(JSON):"+JSON.stringify(d));
				/*b.html(lang.S000+'编辑').removeClass("save").addClass("edit");
				JEditTbl().doSave({elem: c.find("div.sc_midle").removeAttr("status").find("p")});*/
				e = new JPopRectangle();
				e.show({text: "保存中..."});
				f = {
					url: public.conf.save_url,
					data: d,
					error: null,//
					complete: function(){
						b.html(lang.S000+'编辑').removeClass("save").addClass("edit");
						JEditTbl().doSave({elem: c.find("div.sc_midle").removeAttr("status").find("p")});
						e.hide();
					},//
					success: function(data, textStatus){
						b.html(lang.S000+'编辑').removeClass("save").addClass("edit");
						JEditTbl().doSave({elem: c.find("div.sc_midle").removeAttr("status").find("p")});
					}
				};
				private.fn.ajaxSubmit(f);
			}
		},
		/**
		 * 编辑
		 * @param a. event
		 * @param b. element
		*/
		edit: function(a, b){
			b = $(b);
			var c = b.parents("div.czgj").find("div.sc_midle").attr("status", "edit").find("p");
			JEditTbl().doEdit({elem: c});
			JVerfier().init({forms: $(b).parents(".czgj")});
			JSelects.init({margin_top: "5px", margin_left: "5px"});
			b.html(lang.S001+'保存').removeClass("edit").addClass("save");
		},
		/**
		 * 上传文件
		*/
		uploadfile: function(a, b){
			
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
			private.fn.eventBubbling(private.conf.clickEventConf, "click", elem.right);
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