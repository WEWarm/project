/* ----------------------------------------------
@ BackTop :返回顶部
------------------------------------------------- */
function BackTop(o){
	BackTop.$newNum++;
	this.$id=BackTop.$newNum;
	this.$namespace=".BackTop"+this.$id;
	
	if(o==undefined){
			return false;
	}
	if(o.obj){
		this.obj=$(o.obj);	
	}
}
BackTop.$newNum=0;

BackTop.prototype.init=function(){
	var othis=this;	
	othis.obj.click(function(event){
		$(window).scrollTop(0);
		try{
			event.preventDefault();
		}catch(e){}
		return false;
	});
}
BackTop.prototype.show=function(){
	var othis=this;
	
	$(window).bind("scroll"+othis.$namespace,{othis:othis},function(event){
			var othis=event.data.othis;
			var winH=parseInt($(window).height());
			var scrollTop=parseInt($(window).scrollTop());	
			
			var isIE6=!!($.browser.msie && Number($.browser.version) <= 6);		
			if(isIE6){
				othis.obj.css({"top":scrollTop+winH});
			}
			
			if(scrollTop<Math.floor(winH/2)){
				othis.obj.fadeOut();
			}else{
				othis.obj.fadeIn();
			}
		});
}
BackTop.prototype.hide=function(){
	var othis=this;
	$(window).unbind("scroll"+othis.$namespace);
}
BackTop.play=function(o){
	var obankTop=new BackTop(o);
	obankTop.init();
	obankTop.show();
	return obankTop;	
}

/* ---------------------------------------------------
@ MinWin :迷你窗口
------------------------------------------------------ */
function MinWin(o){
		var othis=this;
		othis.spaceName=".minwin";
		if(!o){ return false;}
		
		if(o.obj){
            othis.obj=$(o.obj);
        }
		if(o.objWin){
            othis.objWin=$(o.objWin);
        }else{
            othis.objWin=othis.obj.children();
        }
		if(o.oclose){
            othis.oclose=othis.obj.find(o.oclose);
        }else{
            othis.oclose=othis.obj.find(".ui_minWin_close");
        }			
		if(o.spaceName){
            othis.spaceName="."+o.spaceName;
        }
		if(o.closeTime){
            othis.closeTime=parseInt(o.closeTime);
        }
		if(o.afterClose && jQuery.isFunction(o.afterClose)){
            othis.afterClose = o.afterClose;
        }
        else{
            othis.afterClose = function(){};
        }
	}
MinWin.prototype.closeTime=0;
MinWin.prototype.show=function(speed,callback){
		var othis=this;		
		othis.obj.show(speed,callback);
		
		var objH=parseInt(othis.objWin.outerHeight());
		
		if($.browser.msie && Number($.browser.version) <= 6){			
			othis.obj.css({"height":$(document).height()});					
			othis.posIE6();	
					
			var owin=$(window);				
			owin.bind("scroll"+othis.spaceName,{ominwin:othis},function(event){
					var ominwin=event.data.ominwin;
			    	ominwin.posIE6();
				});			
			owin.bind("resize"+othis.spaceName,{ominwin:othis},function(event){
					var ominwin=event.data.ominwin;
			    	ominwin.posIE6();
				});				
		}else{
			othis.objWin.css({"marginTop":-parseInt(objH/2)});
		}
		
		othis.oclose.bind("click"+othis.spaceName,{ominwin:othis},function(event){
				var ominwin=event.data.ominwin;
			    ominwin.hide();
			    return false;
			});
		if(othis.closeTime){
				setTimeout(function(){othis.hide();},othis.closeTime);
			}
	}
MinWin.prototype.hide=function(){
	var othis=this;
	othis.obj.hide();
	othis.oclose.unbind("click"+othis.spaceName);
    $("select").show();
    othis.afterClose(othis);
	
	if($.browser.msie && Number($.browser.version) <= 6){
		var owin=$(window);	
		owin.unbind("scroll"+othis.spaceName);
		owin.unbind("resize"+othis.spaceName);
	}
}
MinWin.prototype.setContent=function(content){
	var othis=this;
    $("select").hide();
    othis.obj.find(".content").html(content);
}
MinWin.prototype.posIE6=function(){	
		var othis=this;
		var objH=parseInt(othis.objWin.outerHeight());
		
		var owin=$(window);
		var winH=parseInt(owin.height());
		var scrollTop=parseInt(owin.scrollTop());
		
		othis.objWin.css({"top":scrollTop+parseInt((winH-objH)/2)});
}