
/**
版本号：1.0
最后更新日期2010-04-14

**/
//el 当前事件dom
//s 区别于其他tab组的标识前缀，固定模式："tabC"+标识+数字
//i 触发数字
//n 总数量

qpea.tab = function(el,s,i,n){
	for(var j = 1;j<=n;j++){
		var domT = document.getElementById('tabT_'+s+'_'+j);
		var domC = document.getElementById('tabC_'+s+'_'+j);
			domT.className = qpea.trim(domT.className.replace('curr',''));
			domC.className = 'hidden';
	}
	el.className = el.className + " curr";
	document.getElementById("tabC_"+s+"_"+i).className = document.getElementById("tabC_"+s+"_"+i).className + " show";
	
     var pageTop=function(){
	    var d = document,y=(navigator.userAgent.toLowerCase().match(/iPad/i)=="ipad")?window.pageYOffset:Math.max(d.documentElement.scrollTop,d.body.scrollTop);
	    return d.documentElement.clientHeight + y;
    };


	jQuery("#" + "tabC_"+s+"_"+i).find("img").each(function(){
	       if($(this).offset().top<=pageTop())
	        {
			    var src2=$(this).attr("src2");
			    if(src2)
			    {
				    $(this).attr("src",src2).removeAttr("src2")
			    }
			}
	});
};


//圖片切換
(function(){


    var $ = function (id) {
	    return "string" == typeof id ? document.getElementById(id) : id;
    };

    var Extend = function(destination, source) {
	    for (var property in source) {
		    destination[property] = source[property];
	    }
	    return destination;
    }

    var CurrentStyle = function(element){
	    return element.currentStyle || document.defaultView.getComputedStyle(element, null);
    }

    var Bind = function(object, fun) {
	    var args = Array.prototype.slice.call(arguments).slice(2);
	    return function() {
		    return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	    }
    }

    var Tween = {
	    Quart: {
		    easeOut: function(t,b,c,d){
			    return -c * ((t=t/d-1)*t*t*t - 1) + b;
		    }
	    },
	    Back: {
		    easeOut: function(t,b,c,d,s){
			    if (s == undefined) s = 1.70158;
			    return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		    }
	    },
	    Bounce: {
		    easeOut: function(t,b,c,d){
			    if ((t/=d) < (1/2.75)) {
				    return c*(7.5625*t*t) + b;
			    } else if (t < (2/2.75)) {
				    return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			    } else if (t < (2.5/2.75)) {
				    return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			    } else {
				    return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			    }
		    }
	    }
    }


//容器?象,滑??象,切??量
SlideTrans = function(container, slider, count, options) {
	this._slider = $(slider);
	this._container = $(container);//容器?象
	this._timer = null;//定?器
	this._count = Math.abs(count);//切??量
	this._target = 0;//目?值
	this._t = this._b = this._c = 0;//tween??
	
	this.Index = 0;//?前索引
	
	this.SetOptions(options);
	
	this.Auto = !!this.options.Auto;
	this.Duration = Math.abs(this.options.Duration);
	this.Time = Math.abs(this.options.Time);
	this.Pause = Math.abs(this.options.Pause);
	this.Tween = this.options.Tween;
	this.onStart = this.options.onStart;
	this.onFinish = this.options.onFinish;
	
	var bVertical = !!this.options.Vertical;
	this._css = bVertical ? "top" : "left";//方向
	
	//?式?置
	var p = CurrentStyle(this._container).position;
	p == "relative" || p == "absolute" || (this._container.style.position = "relative");
	this._container.style.overflow = "hidden";
	this._slider.style.position = "absolute";
	
	this.Change = this.options.Change ? this.options.Change :
		this._slider[bVertical ? "offsetHeight" : "offsetWidth"] / this._count;
};
SlideTrans.prototype = {
  //?置默??性
  SetOptions: function(options) {
	this.options = {//默?值
		Vertical:	true,//是否垂直方向（方向不能改）
		Auto:		true,//是否自?
		Change:		0,//改?量
		Duration:	50,//滑?持???
		Time:		10,//滑?延?
		Pause:		2000,//停???(Auto?true?有效)
		onStart:	function(){},//?始????行
		onFinish:	function(){},//完成????行
		Tween:		Tween.Quart.easeOut//tween算子
	};
	Extend(this.options, options || {});
  },
  //?始切?
  Run: function(index) {
	//修正index
	index == undefined && (index = this.Index);
	index < 0 && (index = this._count - 1) || index >= this._count && (index = 0);
	//?置??
	this._target = -Math.abs(this.Change) * (this.Index = index);
	this._t = 0;
	this._b = parseInt(CurrentStyle(this._slider)[this.options.Vertical ? "top" : "left"]);
	this._c = this._target - this._b;
	
	this.onStart();
	this.Move();
  },
  //移?
  Move: function() {
	clearTimeout(this._timer);
	//未到?目???移?否??行下一次滑?
	if (this._c && this._t < this.Duration) {
		this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
		this._timer = setTimeout(Bind(this, this.Move), this.Time);
	}else{
		this.MoveTo(this._target);
		this.Auto && (this._timer = setTimeout(Bind(this, this.Next), this.Pause));
	}
  },
  //移?到
  MoveTo: function(i) {
	this._slider.style[this._css] = i + "px";
  },
  //下一?
  Next: function() {
	this.Run(++this.Index);
  },
  //上一?
  Previous: function() {
	this.Run(--this.Index);
  },

  //停止
  Stop: function() {
	clearTimeout(this._timer); this.MoveTo(this._target);
  }
};



})();






qpea.timebuy = qpea.create();
qpea.timebuy.prototype = {
	init:function(option){
		qpea.extend(this,option);
		this.time = Number(this.time);
		if(typeof this.time != 'number'){
			throw new Error("参数必须包括一个以秒为单位的时间值");
		}
		this.timer = null;
		this.time_stp = this.time_stp || 1000;
		this.iHour = 0;
		this.iMinute = 0;
		this.iSecond = 0;
	},
	start:function(){
		this.timeStartDoing();
		this.timer = setInterval(qpea.bind(this,this.doTime),this.time_stp);
	},
	doTime:function(){
			this.iHour = parseInt(this.time/3600);
			this.iMinute = parseInt(this.time/60%60);
			this.iSecond = this.time%60;
			
			this.timeDoing();
			
			if(this.time == 0){
				this.timeEndDoing();
				clearInterval(this.timer);
			}
			this.time = this.time <= 0 ? 0 : this.time - 1;
	},
	setSws:function(num){
		if(num < 10){
			num = '0' + num;
		}
		return num;
	},
	getHour:function(){
		return this.setSws(this.iHour);
	},
	getMinute:function(){
		return this.setSws(this.iMinute);
	},
	getSecond:function(){
		return this.setSws(this.iSecond);
	},
	timeStartDoing:function(){
		alert("开始了，同志们");
	},
	timeDoing:function(){
		alert("Doing...");
		//qpea.$('test').innerHTML = this.getHour()+':'+this.getMinute()+':'+this.getSecond();
	},
	timeEndDoing:function(){
		alert("Game over");
	}
};

//60*60*1.5 == 1.5小时
//new qpea.timebuy({time:60*0.5}).start();



document.onkeydown = function(e) {
        var e = e || window.event;
        if (document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord")) {
            var txtsearch = "ctl00_FH_TopMenu_11_txtSearchWord";
            var act = document.activeElement.id;
            if (txtsearch == act) {
                if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
                    var btnload = document.getElementById("ctl00_FH_TopMenu_11_btnSearch");
                    btnload.focus();
                    btnload.click();
                }
            }
        }
    } 
    
    
function validatevalue(){
    if(document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord")!=null){
        if(document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord").value=="请输入您要搜索的商品名称"){
            document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord").focus();
            return false;
        }
        if(document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord").value==""){
            document.getElementById("ctl00_FH_TopMenu_11_txtSearchWord").focus();
            return false;
        }
    }
}


/** 头部我的乐购小菜单 **/
function initTopContMinimenu(){
    var dom = qpea.$('cont_minimenu');
    dom.onmouseover = function(){this.className = this.className + ' cont_minimenu_curr';};
    dom.onmouseout = function(){this.className = this.className.replace(/\scont_minimenu_curr/g,'');};
}

/** 高亮显示头部菜单 **/
function initHighLightTopMenu(){
    var fileName = qpea.getUrlFileName().replace('.'+qpea.getUrlFileType(),'');
    if(fileName == '' && (location.href == 'http://'+location.hostname+'/' || location.href == 'http://'+location.hostname )){
        fileName = 'Index';
    }
    var staticFileName = window.staticFileName || '';
    if(qpea.$('topMenu_'+fileName)){
        qpea.$('topMenu_'+fileName).className = 'curr';
    }else if(qpea.$('topMenu_'+staticFileName)){
        qpea.$('topMenu_'+staticFileName).className = 'curr';
    }
}

function initAllProductsMenu(){
    function over(){
        this.className = this.className + ' curr';
    }
    function out(){
        this.className = this.className.replace(/\scurr/g,'');
    }
    var lis = qpea.$('items').getElementsByTagName('li');
    for(var i=0,len = lis.length;i<len;i++){
        if(!!lis[i].tagName && lis[i].className.indexOf('par') != -1){
            lis[i].onmouseover = over;
            lis[i].onmouseout = out;
        }
   }
}

function initIndexProductOrder(n){
    var currDom = qpea.$('tabC_order_'+n).getElementsByTagName('li')[0];
    function over(){
        out.call(currDom);
        this.className = this.className + ' curr';
        currDom = this;
    }
    function out(){
        this.className = this.className.replace(/curr/g,'');
    }
    var lis = qpea.$('tabC_order_'+n).getElementsByTagName('li');
    for(var i=0,len = lis.length;i<len;i++){
        lis[i].onmouseover = over;
            if(i == 0){
                lis[i].className = 'curr';
            }
        }
}
function initIndexProductOrderRandom(){
    var i=1,len = 3,currIndex = Math.floor(Math.random()*len)+1;
    for(;i<4;i++){
        qpea.$('tabT_order_'+i).className = '';
        qpea.$('tabC_order_'+i).className = 'hidden';
    }
        qpea.$('tabT_order_' + currIndex).className = 'curr';
        qpea.$('tabC_order_' + currIndex).className = 'show';
}

function initIndexFocusImg(){
    var st = new SlideTrans("focusImg_c", "focusImg_img", 5);
        st.Run();
        st.nums = document.getElementById('focusImg_num').getElementsByTagName('a');
        for(var i=0,len=st.nums.length;i<len;i++){
            st.nums[i].onmouseover = (function(o,j){
                return function(){
                    o.className = 'curr';
                    st.Auto = false;
                    st.Run(j);
                };
           })(st.nums[i],i);
                st.nums[i].onmouseout = function(){this.className = '';st.Auto = true;st.Run()};
         }
         st.onStart = function(){
            for(var i=0,len=this.nums.length;i<len;i++){
                this.nums[i].className = '';
            }
            this.nums[this.Index].className = 'curr';
        }
}

function initIndexLimitTime(){
    
    var pDom = qpea.$('limitBuying_conatiner'),divs = pDom.getElementsByTagName('div');
    var timeStartDoing = function(){};
    var timeDoing = function(){
        this.timeDom.innerHTML = '剩余<strong>'+this.getHour()+'</strong>小时<strong>'+this.getMinute()+'</strong>分<strong>'+this.getSecond()+'</strong>秒';
    };
    var timeEndDoing = function(){
        var d = this.timeDom.parentNode;
            d.parentNode.removeChild(d);
    };

    for(var i = 0,len = divs.length; i < len;i++){
        var el = divs[i];
        if(el.nodeType == 1 && el.getAttribute('datatime')){
            var nums = Number(el.getAttribute('datatime'));
            
            new qpea.timebuy({
                time:nums,
                timeDom:el,
                timeStartDoing:timeStartDoing,
                timeDoing:timeDoing,
                timeEndDoing:timeEndDoing
            }).start();
            
        }
    }
 

}


/** 首页问卷调查开始 **/
function question_btnSendClick(){
    var cont = document.getElementById('question_content'),inputs = cont.getElementsByTagName('input'),values = [];
    var result = '';
    for(var i=0,len=inputs.length;i<len;i++){
        if(inputs[i].checked == true){
            if(inputs[i].type == 'radio'){
                values.push(inputs[i].value);
                break;
            }else if(inputs[i].type == 'checkbox'){
                values.push(inputs[i].value);
            }
        }
    }
    result = values.join(',');  
    if(result == ''){
        document.getElementById("lblResult").innerHTML = '选项不能为空';
        return false;
    }else{
        CallServer(result);
    }
  
}

function question_btnViewClick(){   
    var titleID = document.getElementById("question_hiddenId").getElementsByTagName('input')[0].value;   
    window.open('/pages/Marketing/DiaoChaJieGuo.aspx?titleID='+ titleID);
}
function question_ReceiveServerData(result){
    document.getElementById("lblResult").innerHTML = result;
}
/** 首页问卷调查结束 **/



if(qpea.isIE6){
    try{
        document.execCommand("BackgroundImageCache", false, true);
   }catch(e){
   }
} 

function initFocusImgs(id,c,pause,domNum,currClass){
    if(!qpea.$(id)){
        return false;
    }
    var dom = qpea.$(id),domc = qpea.$(c),asNum = qpea.$(domNum);
    var num = domc.getElementsByTagName('a').length;
    if(num == 1){
        return false;
    }
    if(num < 1){
        qpea.$(id).style.display = 'none';
        return false;
    }
    var _asStr = '';
    for(var i=1;i<=num;i++){
        _asStr = _asStr.concat('<a href="#">'+i+'</a>');
    }
    asNum.innerHTML = _asStr;
    var st = new SlideTrans(id,c,num,{Pause:pause});
        st.Index = 0;
        st.nums = asNum.getElementsByTagName('a');
	    for(var i=0,len=st.nums.length;i<len;i++){
		    st.nums[i].onmouseover = (function(o,j){
		        return function(){
				   o.className = currClass;
				   st.Auto = false;
				   st.Run(j);
			    };
		     })(st.nums[i],i);
		   st.nums[i].onmouseout = function(){this.className = '';st.Auto = true;st.Run()};
	    }
	    st.onStart = function(){
	        for(var i = 0,len = st.nums.length;i<len;i++){
	            st.nums[i].className = '';
	        }
	        st.nums[st.Index].className = currClass;
	    }
	    st.Run();
}


function domToggle(dom,fn){
    var dom = qpea.$(dom);
    if(!dom){
        return false;
    }
    var dis = dom.style.display;
        dis = dis == 'none' ? '' : 'none';
    dom.style.display = dis;
    if(fn){
        fn.call(dom,dis);
    }
}


function randomTabs(asid,divsid){
    var as = document.getElementById(asid).getElementsByTagName('a'),divs = document.getElementById(divsid).childNodes,dlen = divs.length,_arr = [];
    for(var i=0;i<dlen;i++){
       if(divs[i].tagName && divs[i].tagName.toLowerCase() == 'div'){
         _arr.push(divs[i]);
       }
    }
    var len = as.length,num = Math.floor(Math.random()*len)+1;
    as[num-1].className = 'curr';
    _arr[num-1].className = 'show';
}

/** input focus **/
function inputTxtBlur(o) {
    var obj = o;
    if (obj.value == "") {
        obj.value = obj.defaultValue;
        obj.style.color = "#ccc";
    }
}
function inputTxtFocus(o) {
    var obj = o;
    if (obj.value == obj.defaultValue) {
        obj.value = "";
        obj.style.color = "#000000";
    }
}


