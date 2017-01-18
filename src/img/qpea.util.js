
/**
版本号：1.0
最后更新日期2010-05-26

z-index 约定：
	frameBg 遮挡半透明层，z-index:100;
	miniWindow 页面窗口层，z-index:200;
**/

window.qpea = {
	$:function(id){
		return typeof id == "string" ? document.getElementById(id) : id;
	},
	create:function(){
		return function(){this.init.apply(this,arguments);}
	},
	bind:function(o,fn,arr){
		var arr = arr || [];
		return function(e){
				fn.apply(o,[e || window.event].concat(arr));
			};
	},
	extend:function(destination,source){
		for (var property in source){
			destination[property] = source[property];
		}
		return destination;
	},
	createDom:function(type,pros,styles,parNode){
		var dom = document.createElement(type);
		qpea.setPro(dom,pros);
		qpea.setStyle(dom,styles);
		if(parNode){
			parNode.appendChild(dom);dom = null;
			return;
		}else{
			return dom;
		}
	},
	setStyle:function(o,styles){
		for(var p in styles){
			o.style[p] = styles[p];
		}
	},
	setPro:function(o,pros){
		for(var p in pros){
			o.setAttribute(p,pros[p]);
		}
	},
	addEvent:function(o,type,fn){
		if (o.addEventListener) {
			if(type == "mousewheel"){o.addEventListener("DOMMouseScroll",fn,false);}
			o.addEventListener(type,fn,false);
		}else if(o.attachEvent){o.attachEvent("on" + type,fn);
		} else {o["on" + type] = fn;
		}
	},
	removeEvent:function(o,type,fn){
		if (o.removeEventListener){o.removeEventListener(type,fn,false);
		}else if(o.detachEvent) {o.detachEvent("on" + type,fn);
		}else{o["on" + type] = null;
		}
	},
	getMouseWheel:function(e){
		var e = e || window.event;
		var detail = e.wheelDelta || e.detail;
		if(e.wheelDelta){detail = detail/120;}else{detail = -detail/3;}
		return parseInt(detail);
	},
	stopEvent:function(e,stopDefault){
		if(!e){return false;}
		if(e.stopPropagation){e.stopPropagation();}
		else{e.cancelBubble = true;
		}
		if(e.preventDefault){e.preventDefault();}
		else {e.returnValue=false;
		}
	},
	IE6:(navigator.appVersion.indexOf('MSIE') != -1) && (parseFloat(navigator.appVersion.substr(navigator.appVersion.indexOf('MSIE')+5,3))) <= 6 ? true : false,
	getFixOffsetX:function(el){
		var fixLeft = el.offsetLeft;
		while(el = el.offsetParent){
			fixLeft += el.offsetLeft;
		}
		return fixLeft;
	},
	getFixOffsetY:function(el){
		var fixTop = el.offsetTop;
		while(el = el.offsetParent){
			fixTop += el.offsetTop;
		}
		return fixTop;
	},
	getRandom:function(n,m){
		return Math.round(Math.random()*(m-n))+n;
	},
	toParCenter:function(el,par){
		var el = qpea.$(el),par = typeof par !== 'undefined' ? qpea.$(par) : el.parentNode;
		var left = par.offsetWidth/2 - el.offsetWidth/2,top = par.offsetHeight/2 - el.offsetHeight/2;
		qpea.setStyle(el,{left:left+'px',top:top+'px'});
	},
	toPageCenter:function(el){
		var pg_wh = qpea.getPageBound(),pg_w = pg_wh.w,pg_h = pg_wh.h;
		var cont_w = (pg_w - el.offsetWidth)/2;
		var cont_h = (pg_h - el.offsetHeight)/2;
		el.style.left = cont_w + "px";
		el.style.top = cont_h + "px";		
	},
	toViewCenter:function(el){
		var v_wh = qpea.getViewBound(),v_w = v_wh.w,v_h = v_wh.h;
		var cont_w = (v_w - el.offsetWidth)/2;
		var cont_h = (v_h - el.offsetHeight)/2 + document.documentElement.scrollTop + document.body.scrollTop;
		el.style.left = cont_w + "px";
		el.style.top = cont_h + "px";
	},
	getViewBound:function(){
		//alert(document.body.offsetHeight);
		return {w:document.body.clientWidth,h:document.documentElement.clientHeight};
	},
	getPageBound:function(){
		var sol_w = document.body.scrollWidth,sol_h = document.body.scrollHeight,de_w = document.documentElement.offsetWidth,de_h = document.documentElement.offsetHeight;
		var w = sol_w > de_w ? sol_w : de_w,h= sol_h > de_h ? sol_h : de_h;
		if(qpea.IE6){
			w -= 18;
		}
		return {w:w,h:h};
	},
	getParam:function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r!=null){return unescape(r[2])};
		return ""; 
	},
	getUrlFileName:function(url){
		var url = url || location.pathname;
		return url.replace(/.*[\\|\/]([^\\]*)/g,'$1');
	},
	getUrlFileType:function(url){
		return qpea.getUrlFileName(url).replace(/(^.*\.)/,'');
	},
	cookies:{
	   get:function(n){
			var dc = "; "+document.cookie+"; ";
			var coo = dc.indexOf("; "+n+"=");
			if (coo!=-1){
				var s = dc.substring(coo+n.length+3,dc.length);
				return unescape(s.substring(0, s.indexOf("; ")));
			}else{
				return null;
			}
		},
		set:function(name,value,expires){
			//var expDays = expires*24*60*60*1000;
			var expDays = expires*60*60*1000;
			var expDate = new Date();
			expDate.setTime(expDate.getTime()+expDays);
			var expString = expires ? "; expires="+expDate.toGMTString() : "";
			var pathString = ";path=/";
			document.cookie = name + "=" + escape(value) + expString + pathString;
		},
		del:function(n){
			var exp = new Date();
			exp.setTime(exp.getTime() - 1);
			var cval=this.get(n);
			if(cval!=null) {document.cookie= n + "="+cval+";expires="+exp.toGMTString()};
		}
	},
	applyFrame:function(option){
		var show = option.show,el = option.el,opacity = option.opacity;
		var dom = document.getElementById("_iframe_bg");
		if(dom == null){
			var frame = document.createElement("span");
				frame.innerHTML = '<div id="_iframe_bg" style="background:#333;display:none;z-index:100;left:0;position:absolute;top:0;width:100%;height:100%;filter:alpha(opacity=50);opacity:.5;"><iframe id="_iframe_cont" style="filter:alpha(opacity=0);width:100%;height:100%;opacity:0;background:#333" ></iframe><div style="background:#333;position:absolute;top:0;left:0;width:100%;height:100%;filter:alpha(opacity=1);opacity:0.1;"></div></div>';
			document.body.appendChild(frame);
				frame = null;
				dom = document.getElementById("_iframe_bg");
		}
		var dis = !!show ? "block" : "none";
		dom.style.display = dis;
		
		if(typeof opacity != 'undefined'){
			dom.style.filter = 'alpha(opacity='+opacity+')';
			dom.style.opacity = opacity/100;
		}
		
		if(el){
			qpea.setStyle(dom,{left:el.offsetLeft+"px",top:el.offsetTop+"px",width:el.offsetWidth+"px",height:el.offsetHeight+"px"});
		}else{
			var wh = qpea.getPageBound();
			qpea.setStyle(dom,{left:0,top:0,width:wh.w+'px',height:wh.h+'px'});
		}
	},
	trim:function(s){
		return s.replace(/^\s+|\s+$/g,'');
	},
	isContains:function(par,el){
		while(el != null && typeof el.tagName != undefined){
			if(el == par){return true;}
			el = el.parentNode;
		}
		return false;
	}

};
















