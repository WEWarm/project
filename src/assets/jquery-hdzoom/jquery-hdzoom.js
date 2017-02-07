;(function(){
	$.fn.hdzoom = function(options){
		var defaluts = {
			width:300px,
			height:300px,
			gap:30, //间隙 距离
			position:'right',
		}
		//拓展默认值
		var opt = $.extend({},defaluts,options);
		
		return this.each(function(){
			var $self = $(this);
			var $smallImg = $self.find('img');
			
			//初始化
			init();
			function init(){
				//获取大图的路径
				var bigUrl = $smallImg.data('big');
				
				//添加默认样式
				$self.addClass('hdzoom');
				
				//生成html结构
				var $lens = $('<span/>').addClass('lens').hide().appendTo($self);
				var $bigLens = $('<div/>').addClass('hdzoom').append('<img src="'+bigUrl+'"/>').hide().appendTo('body');
				
				//设置样式
				var bigLeft,bigTop;
				
				//大图显示位置
				if(opt.Position === 'right'){
					bigTop = $smallImg.offset().top;
					bigLeft = $smallImg.offset().left + $smallImg.outerWidth() + opt.gap;
				}
				
				$bigLens.css({
					width:opt.width,
					height:opt.height,
					left:bigLeft,
					top:bigTop
				});
				
				//大图图片
				var $bigImag = $bigLens.find('img');
				//计算大图和小图的比例
				var ratio;
				
				//鼠标移入，显示大图和镜头
				$self.on('mouseenter',function(){
					$lens.show();
					$bigLens.show();
					ratio = $smallImg.outerWidth()/$bigImag.outerWidth();
					
				})
				//鼠标移出 ， 移除大图和镜头
				.on('mouseleave',function(){
					$lens.hide();
					$bigLens.hide();
				})
				//鼠标移动的效果
				.on('mousemove',function(e){
					var _left = e.clientX - $lens.outerWidth()/2 - $self.offset().left;
					var _top = e.clientY - $lens.outerHeight()/2 - $self.offset().top;
					
					//防止移出边界 
					if(_left <= 0){
						_left = 0;
					}else if(_left >= $smallImg.outerWidth()-$lens.outerWidth()){
						_left = $smallImg.outerWidth()-$lens.outerWidth();
					}
					
					if(_top <= 0){
						_top = 0;
					}else if(_top >= $smallImg.outerHeight()-$lens.outerHeight()){
						_top = $smallImg.outerHeight()-$lens.outerHeight();
					}
					
					$lens.css({
						top:_top,
						left:_left
					});
					
					//大图显示
					$bigImag.css({
						top:-_top/ratio,
						left:-_left/ratio
					})
				})
			}
		});
	}
}(jQuery));
