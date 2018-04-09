/*
Title: Simple Fader
Author: Khanh Vu
Date: 4/24/2016
*/

(function($){
	$.fn.simpleFader=function(action){
		var element=this;
		if($(element).length==0) return;
		
		if(action===undefined||action==null||typeof(action)=='object'){
			$(element).data({
				setting: {
					curIndex:0,
					totalSlide:0,
					iTimer:null,
					delay:7000,
					speed:500,
					element:null,
					isPending:false,
					onWinLoaded:action?action.onWinLoaded?action.onWinLoaded:null:null,
					init:function(){
						var o=this;

						o.totalSlide=$(o.element).children('.slide').length;
						$(o.element).children('.slide:gt(0)').hide().css({opacity:0,'position':'absolute'});
						$(o.element).css({'position':'relative'});
						$(o.element).children('.slide').css({width:'100%',display:'block'})
						$(o.element).children('.slide').children('img').css({width:'100%',display:'block',height:'auto'})

						//pager
						for(var i=0;i<$(o.element).children('.slide').length;i++){
							$(o.element).find('.simpleFader_pager').append('<span />')
						}
						$(o.element).find('.simpleFader_pager').find('span').click(function(){
							$(this).addClass('active').siblings().removeClass('active')
							o.gotoPlay($(this).index())
						}).eq(0).addClass('active')

						//other images preloader
						var otherImages=$(o.element).children('.slide:gt(0)').find('img');
						var otherImagesTotal=otherImages.length;
						var curLoaded=0;
						otherImages.each(function(id,el){
							$(el).attr('data-src',$(this).attr('src'))
							$(el).attr('src','');
							$(window).load(function(){
								$(el).attr('src',$(el).attr('data-src')).load(function(){
									curLoaded++;
									if(curLoaded==otherImagesTotal){
										o.play();
										if(action) if(o.onWinLoaded) o.onWinLoaded();
									}
								});
							});
						});
					},
					play:function(){
						var o=this;
						if($(o.element).children('.slide').length<=1) return;
						if(o.isPending) return;						
						o.isPending=true
						$(o.element).children('.slide').stop().css({'position':'absolute',top:0,left:0,zIndex:1}).animate({opacity:0},o.speed,function(){ $(o).hide(); })
						$(o.element).children('.slide').eq(o.curIndex%o.totalSlide).stop().show().css({'position':'relative',zIndex:2}).animate({opacity:1},o.speed,function(){
							o.isPending=false;																																											 
							//autoplay
							clearTimeout(o.iTimer)
							o.iTimer=setTimeout(function(){ o.next() },o.delay);																																					 
						});
						
						//pager
						$(o.element).find('.simpleFader_pager').find('span').eq(o.curIndex).addClass('active').siblings().removeClass('active')
					},
					next:function(){ if(this.isPending==false) this.curIndex++, this.play(); },
					prev:function(){ if(this.isPending==false) this.curIndex--, this.play(); },
					gotoPlay:function(num){
						this.curIndex=num;
						this.play();
					},
					destroy:function(){}
				}
			})
			//init
			$(element).data('setting').element=element;
			$(element).data('setting').init();			
		}else{
			switch(action){
				case 'next':$(element).data('setting').next();break;
				case 'prev':$(element).data('setting').prev();break;
			}
		}
	}
	
	$(function(){
		$('.simpleFader_next,.simpleFader_prev').hide();
		$('.simpleFader').simpleFader({onWinLoaded:function(){ $('.simpleFader_next,.simpleFader_prev').fadeIn(); } });
		$('.simpleFader_next').click(function(){ $('.simpleFader').simpleFader('next'); });
		$('.simpleFader_prev').click(function(){ $('.simpleFader').simpleFader('prev'); });		   
	});
})(jQuery)