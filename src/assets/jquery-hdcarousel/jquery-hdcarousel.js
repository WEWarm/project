;(function($){
	$.fn.hdcarousel = function(options){
		//设置默认值
		var defaults = {
			imglist:[],
			width:1350,
			height:480,
			autoPlay:true,
			showButton:true,
			page:'center',   //分页默认在中间
			duration:3000,
			index:0,
			type:'vertical'   //轮播方向 淡入淡出fade
		}
		//扩展默认值
		var opt = $.extend({},defaults,options);
		return this.each(function(){
			var $self = $(this);
			
			var len = opt.imglist.length;
			//初始化
			init();
			function init(){
				//添加专有样式
				$self.addClass('hdcarousel');
				//生成背景图结构
				var imghtml = opt.imglist.map(function(url,idx){
					return '<li><img src="'+url+'"/></li>';
				}).join('');
				var $banner = $('<ul/>').addClass('banner').html(imghtml).appendTo($self);
			
				//设置样式
				$self.css({
					height:opt.height,
					width:opt.width
				});
				//轮播    垂直
				if(opt.autoPlay){
					$self.timer = setInterval(function(){
						opt.index++;
						showPic();
					},opt.duration);
				}
				
				//显示图片
				function showPic(){
					//当轮播到最后一张的时候图片没有了
					//判断
					if(opt.index >= len){
						opt.index = 0;
					}else if(opt.index <0){
						opt.index = len-1;
					}
					$banner.css({//动画
						top:-opt.height*opt.index,
					});
				}
			}
		});
	}
})(jQuery);
