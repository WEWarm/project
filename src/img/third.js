// 3阶页面
(function($){
$(document).ready(function(){	
		
		//手机通讯分类
            $("#sortlist h3").bind("click",function(){
	            var element=$(this).parent();
	            if (element.hasClass("mycurrent")){
		            element.removeClass("mycurrent");
	            }else{
		            element.addClass("mycurrent");
	            }
            });
			 $("#sortlist h4").bind("click",function(){
	            var element=$(this).parent();
	            if (element.hasClass("mycurrent")){
		            element.removeClass("mycurrent");
	            }else{
		            element.addClass("mycurrent");
	            }
            });
			$('.sl_item li a').bind("click",function(){
				var element=$(this);
				$('.sl_item li a').each(function(){
					if($(this).hasClass("fontbackcolor")){
						$(this).removeClass("fontbackcolor");
					}
					element.addClass("fontbackcolor");
				});
			});
		$(".third_proFloor_subnav").each(function(){
			$(this).find("li:eq(0)").css('background','none');
		});
		
		$("#sortlist").find("li").find(".fontbackcolor").parent().parent().parent().addClass("mycurrent");

	   //返回顶部
		var obackTop=BackTop.play({obj:"#JbackTop"});		
		
		$(".third_attent_ul li").hover(function(){
				var othis=$(this);
				othis.parent().children().removeClass("curr");
				othis.addClass("curr");
		});
 });
})(jQuery);

function setTab(name,cursel,n)
{
for(i=1;i<=n;i++)
{
var menu=document.getElementById(name+i);
var con=document.getElementById("cont"+i);
menu.className=i==cursel?"hover1":"";
con.style.display=i==cursel?"block":"none";
}
}