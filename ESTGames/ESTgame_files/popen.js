/**********************************
Title: Popen
Author: Khanh Vu
Desc: jQuery Inline Popup
***********************************/

function popen4(option){
	this.init(option);
}
popen4.prototype={
	isInit:false,curWidth:0,curHeight:0,isFullscreen:false,
	init:function(option){
		var o=this;
		$(function(){
			
			o.setting={
				elemContainer:option.elemContainer||'.popen',
				styleClass:option.elemContainer||'.popen_style',
				width:option.width||600,
				height:option.height||338,
				heightType:option.heightType||"fixed",//fixed(same height),ratio(w/h base),dynamic(content base)
				speed:option.speed||500,
				onLoad:option.onLoad||function(){},
				onClose:option.onClose||function($elemContainer){},
				onDestroy:option.onDestroy||function(){},
				onBefore:option.onBefore||function(){},
				onComplete:option.onComplete||function(){},
				startFrom:option.startFrom||"center",//origin,center
				isDefaultFullscreen:option.isDefaultFullscreen||false
				/*
				heightType:option.heightType:
					fixed - keep width/height always same as defined width/height (width will change when window is smaller, but height remain fixed)
					ratio - resize ratio as defined width/height
					dynamic - resize based on content height
				*/
			};
			
			
			o.build();
			o.setSize();
			o.setEvent();			
			if(o.setting.isDefaultFullscreen){
				o.isFullscreen=true;
				o.setSize();
			}	
			o.setting.onLoad(o);
		});
		
	},
	build:function(){
		var o=this;
		$('.popen_content,.popen_overlay').remove();
		$('body').append('<div class="popen_overlay"></div><div class="popen_content"><div class="popen_close"></div><div class="popen_fullscreen"></div></div>');
		
		//size:default
		$('body').css({'position':'relative'});
		$('.popen_overlay').css({'position':'fixed','top':'0','left':'0','z-index':'1000','background-color':'#000','opacity':'.7','cursor':'pointer','-ms-filter':'"progid:DXImageTransform.Microsoft.Alpha(Opacity=75)"'});
		$('.popen_content').css({'position':'absolute','top':'50%','left':'50%','z-index':'1001','background-color':'#fff'});
		$('.popen_close').css({width:30,height:30,'position':'absolute','top':'0','right':'0','z-index':'10','background-color':'red','cursor':'pointer'});
		$('.popen_fullscreen').css({width:30,height:30,'position':'absolute','top':'0','right':'30px','z-index':'10','background-color':'green','cursor':'pointer'});
		
		o.curWidth=o.setting.width;
		o.curHeight=o.setting.height;
		o.ratioX=o.setting.width/o.setting.height;
		o.ratioY=o.setting.height/o.setting.width;
		
		$(o.setting.elemContainer).after('<div class="popen_content_placement"  style="display:none;"/>');
		$(o.setting.elemContainer).appendTo('.popen_content');
		
		$('body').addClass('plugin_' + o.setting.styleClass.replace('.','').replace('#',''));
	},
	setSize:function(preventComplete){
		var o=this;

		if(o.isFullscreen) $('body').css({'position':'fixed'});


		//size:adjust - CONTENT.HEIGHT>WINDOW.HEIGHT
		var setPos=function(){
			o.startY = $(window).scrollTop();
			o.startX = $(window).scrollLeft();
			o.viewWidth = $(window).width();//(typeof window.innerWidth != 'undefined' ? window.innerWidth : document.body.offsetWidth);
			o.viewHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		}()
		
		if(o.isInit==false){
			o.isInit=true;	
			if(o.setting.startFrom=="origin"){
				o.initY=$('.popen_content_placement').offset().top;
				o.initX=$('.popen_content_placement').offset().left;
			}else if(o.setting.startFrom=='zero'){
				o.initY=0;
				o.initX=0;
			}else{
				o.initY=o.startY+(o.viewHeight/2);
				o.initX=o.startX+(o.viewWidth/2);
			}
			$('.popen_content').css({width:0,height:0,top:o.initY,left:o.initX})
		}
		
		//size:adjust to window
		var adjustPos=function(){
			if(o.curWidth>$(window).width()||o.setting.width>=$(window).width()){
				o.curWidth=$(window).width();
			}else{
				o.curWidth=o.setting.width;
			}	
		}();
		
		switch(o.setting.heightType){
			case "fixed":
			break;
			case "ratio":
				o.curHeight=o.curWidth*o.ratioY;
			break;	
			case "dynamic":
				var tempWidth=$(o.setting.elemContainer).outerWidth(true);//curWidth
				var tempHeight=$(o.setting.elemContainer).outerHeight(true);//curHeight
				$('.popen_content').css({width:o.curWidth});//change width to get newHeight
				o.curHeight=$(o.setting.elemContainer).outerHeight(true); //set newHeight
				$('.popen_content').css({width:tempWidth,height:tempHeight,'overflow':'visible'}); //reset to curWidth,curHeight
			break;
		}
		
		o.left=(o.viewWidth/2)-(o.curWidth/2)+ o.startX;
		o.top=(o.viewHeight/2)-(o.curHeight/2) + o.startY;
		if(Math.abs(o.curHeight/2)>o.viewHeight/2) { o.top=0+o.startY;}
		o.setting.onBefore();
		//apply
		$('.popen_overlay').css({width:$(window).width(),height:$(window).height()});		
		if(o.isFullscreen){
			$('body').css({width:'100%'}).addClass('popen_isFullscreen');
			$('.popen_content').stop().animate({width:o.viewWidth,height:o.viewHeight,top:0,left:0},o.setting.speed,function(){ if(!preventComplete) o.onComplete(); });	
		}else{
			$('body').removeClass('popen_isFullscreen');
			$('.popen_content').stop().animate({width:o.curWidth,height:o.curHeight,top:o.top,left:o.left},o.setting.speed,function(){ if(!preventComplete) o.onComplete(); });
		}
	},
	onComplete:function(){
		var o=this;
		if(!o.isFullscreen){
			$('body').css({'position':'relative'});
			o.setSize(true);
		}
		o.setting.onComplete();
	},
	closePop: function() {
        var o = this;
        $('.popen_overlay').remove();
        if(o.setting.startFrom=="origin"){
        	$('.popen_content').stop().animate({width:0,height:0,top:o.initY,left:o.initX},o.setting.speed,function(){
	        	o.setting.onClose($(o.setting.elemContainer));
	        	o.destroy();
	        });
        }else{
        	o.setting.onClose($(o.setting.elemContainer));
	        o.destroy();
        }
    },
	setEvent:function(){
		var o=this, noDelay=(o.setting.heightType=='dynamic')?true:false;
		o.iResize;
		
		o.eWinResize=function(){
			if(noDelay){
				o.setSize();
			}else{
				clearTimeout(o.iResize);
				o.iResize=setTimeout(function(){ o.setSize(); }, 100);
			}
		}
		o.eFullscreen=function(){
			o.isFullscreen=!o.isFullscreen;
			o.setSize();
		}
		o.eCloseClick = function() { o.closePop(); }
		o.eKeyCloseClick = function(e) { if (e.keyCode == 27) { o.closePop(); } }
		
		$(window).bind('resize',o.eWinResize).trigger('resize');
		$('.popen_fullscreen').bind('click',o.eFullscreen);
		$('.popen_close,.popen_overlay').bind('click', o.eCloseClick);
		$(document).bind('keyup', o.eKeyCloseClick);
	},
	destroy: function() {
        var o = this;
        $(window).unbind('resize', o.eWinResize);
		$(document).unbind('keyup', o.eKeyCloseClick);
		$('.popen_fullscreen').unbind('click',o.eFullscreen);
        $('.popen_close,.popen_overlay').unbind('click', o.eCloseClick).remove();
 		clearTimeout(o.iResize);
		
 		$('.popen_content_placement').after($(o.setting.elemContainer)).remove();
		$('.popen_content').remove();
		$('.popen_overlay').remove();

        $('body').css({ "position": "relative" });
        $('body').removeClass('plugin_' + o.setting.styleClass.replace('.','').replace('#',''));
		o.setting.onDestroy();
		//o=null;
		
        //for(var i in this) delete this[i];
        //not fully removed - check
    }
}
popen4.getImage=function(elemImg){
	var _elemImg = $(elemImg);
	var _img = new Image();
	_img.src = _elemImg.attr("src");
	return {width:_img.width,height:_img.height,ratioX:(_img.width/_img.height),ratioY:(_img.height/_img.width),src:_img.src}
}
popen4.imagePopup=function(elemStr,option){
	$(function(){
		$(elemStr).each(function(idx,elem){
			$(elem).click(function(e){
				e.preventDefault();

				var src="";
				switch($(this).prop("tagName").toLowerCase()){
					case 'img': src = $(this).attr('src'); break;
					case 'a': src = $(this).attr('href'); break;
					default: src = $(this).attr('popen-src');
				}
				var elStr=elemStr.replace('.','').replace('#','');
				$('body').append('<div class="'+elStr+'_wrap" style="display:none;"><div class="'+elStr+'_popenContent"><img src="'+src+'" class="'+elStr+'_image" style="width:100%;height:auto;display:block;"/></div></div>');
				
				var nW=popen4.getImage('.'+elStr+'_image').width;
				var nH=popen4.getImage('.'+elStr+'_image').height;
				var ratioH=nH/nW;
				if(option.maxWidth&&option.maxWidth<nW){
					nW=option.maxWidth;
					nH=nW*ratioH;
				}
				$('.'+elStr+'_image').load(function(){
					var s = new popen4({
						elemContainer:'.'+elStr+'_popenContent',
						heightType:'dynamic',
						width:nW,
						height:nH,
						onClose:function(){
							$('.'+elStr+'_wrap').remove();
						}
					});
				});
			});
		});
	});
}
popen4.htmlPopup = function(elStr, html, w, h, heightType, onComplete, onClose) {
    $(function() {
        var tempElem = $('<div style="position:absolute;" class="' + elStr.replace('.', '') + '_popen" />');
        tempElem.appendTo('body');
        tempElem.empty().append(html);
        var s = new popen4({
            elemContainer: '.' + elStr.replace('.', '') + '_popen',
            heightType: heightType || 'dynamic',
            width: w || 1000,
            height: h || 700,
            speed: 400,
            startFrom: 'center',
            onClose: function() {
                if (onClose) onClose();
                $('.' + elStr.replace('.', '') + '_popen').remove();
            },
            onBefore: function() {
            //$(elStr+'_popen').hide();
            },
            onComplete: onComplete || function() {

            }
        });
    });

}