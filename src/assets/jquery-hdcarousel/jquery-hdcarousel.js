;(function($) {
	$.fn.hdcarousel = function(options) {
		//设置默认值
		var defaults = {
				imglist: [],
				height: 480,
				autoPlay: true,
				showButton: true,
				showSmall: false,
				page: 'center', //分页默认在中间
				duration: 3000,
				index: 0,
				type: 'vertical' //轮播方向 淡入淡出fade vertical
			}
			//扩展默认值
		var opt = $.extend({}, defaults, options);
		return this.each(function() {
			var $self = $(this);

			var len = opt.imglist.length;
			//初始化
			init();

			function init() {
				//添加专有样式
				$self.addClass('hdcarousel');
				//生成背景图结构
				var imghtml = opt.imglist.map(function(url, idx) {
					return '<li><img src="' + url + '"/></li>';
				}).join('');
				
				var $bannerWarp = $('<div/>').addClass('bannerWarp');
				var $banner = $('<ul/>').addClass('banner').html(imghtml).appendTo($self);
				
				$bannerWarp.append($banner).appendTo($self);

				//生成小图
				if(opt.showSmall) {
					var $small = $banner.clone().attr('class', 'small').appendTo($self);

					//点击小图切换
					$small.on('click', 'li', function() {
						opt.index = $(this).index();
						showPic();
					});
				}

				//生成左右按钮
				if(opt.showButton) {
					var $btnprev = $('<div/>').addClass('btn-prev').appendTo($bannerWarp);
					var $btnnext = $('<div/>').addClass('btn-next').appendTo($bannerWarp);
					//当点击了上下按钮的时候
					$btnprev.on('click', function() {
						opt.index--;
						showPic();
					});
					$btnnext.on('click', function() {
						opt.index++;
						showPic();
					});
				}
				//生成分页按钮
				if(opt.page) {
					var $page = $('<div/>').addClass('page').html(opt.imglist.map(function(url, idx) {
						return '<span>' + (idx + 1) + '</span>';
					}).join('\n')); //join拼接

					//点击分页切换
					$page.appendTo($banner).on('click', 'span', function() {
						opt.index = $(this).index();
						showPic();
					});
					if(opt.page == 'center') {
						$page.addClass('page-center');
					}
				}
				//设置样式
				$self.css({
					height: opt.height,
					width: opt.width
				});
				//轮播    垂直
				if(opt.autoPlay) {
					//鼠标移入移出
					$self.on('mouseenter', function() {
						clearInterval($self.timer)
					}).on('mouseleave', function() {
						$self.timer = setInterval(function() {
							opt.index++;
							showPic();
						}, opt.duration);
					}).trigger('mouseleave');
				}

				//刷新页面 高亮当前小图
				showPic();
				//显示图片
				function showPic() {
					//当轮播到最后一张的时候图片没有了
					//判断
					if(opt.index >= len) {
						opt.index = 0;
					} else if(opt.index < 0) {
						opt.index = len - 1;
					}
					$banner.css({ //动画
						top: -opt.height * opt.index,
					});
					//小图高亮
					if(opt.showSmall) {
						$small.children().eq(opt.index).animate({
							opacity: 1
						}).siblings('li').animate({
							opacity: 0.5
						});
					}
					//分页高亮
					if(opt.page) {
						$page.children().removeClass('active').eq(opt.index).addClass('active');
					}
				}

			}
		});
	}
	//鼠标放上去的时候显示下拉菜单
	$('menu').on('mousemove',function(){
	
	});
	
})(jQuery);