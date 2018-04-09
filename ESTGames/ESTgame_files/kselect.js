/**********************************
Khanhsgoodies.com
Title: kSelect
Author: Khanh Vu
Desc: Custom Select Dropdown
***********************************/

var kSelect=function(option){
    this.init(option);
    return this;
}
kSelect.zIndex=100;
kSelect.prototype={
	init:function(option){
		var o=this;
		$(function(){
			o.setting=$.extend({
				elemContainer:'select',
				styleClass:'.select_style1',
				onLoad:function(){},
				onChange:function(oInfo){}
			},option);
			o.c=$(o.setting.elemContainer);
			o.build();
			o.setEvent();
			o.checkDefaultValue();
			o.setting.onLoad();
		})
	},
	checkDefaultValue:function(){
		var o=this;
		o.c.each(function(id,el){
			//console.log($(el).children('option').filter(':selected').text())
			
			$(el).children('option').each(function(idx,elem){
				if($(elem).is(':selected')){
					$(el).parent('.kSelect').children('.kSelect_label').html($(elem).text());	
					o.c.trigger('change')
				}				
			});	
		})
		
	},
	build:function(){
		var o=this;
		o.c.each(function(idx,elem){
			$(elem).wrap('<div class="kSelect" style="position:relative;cursor:pointer;"/>').hide();
			var p=$(elem).closest('.kSelect');
			p.addClass(o.setting.styleClass.replace('.',''));
			p.append('<div class="kSelect_label" />');
			p.append('<div class="kSelect_option" style="width:100%;position:absolute;top:100%;left:0"/>');
			p.children('.kSelect_option').append('<ul />');
			p.children('.kSelect_option').hide();
			var t=p.children('.kSelect_label');
			for (var i = 0; i < $(elem).children('option').length; i++) {
				var val=$(elem).children('option').eq(i).val();
				var txt=$(elem).children('option').eq(i).text();
	            p.children('.kSelect_option').children('ul').append('<li data-value="' + val + '">' + txt + '</li>');
	            if(o.c.val()==o.c.children('option').eq(i).val()){
	            	t.html(txt);
					$(elem).val(o.c.val());
	            }
	        }
	        p.children('.kSelect_option').children('ul').children('li').eq(0).addClass('active');
	       	p.data('on',false).removeClass('active');
		})
	},
	setEvent:function(){
		var o=this;
		o.eClick=function(e){
			if($(e.target).is('select')) return;
			if($(this).data('on')==false){
				$(this).data('on',true).addClass('active').children('.kSelect_option').show();
				$(this).closest('.field').addClass('active').css('z-index',++kSelect.zIndex);
			}else{
				$(this).data('on',false).removeClass('active').children('.kSelect_option').hide();
				$(this).closest('.field').removeClass('active').css('z-index',1);
			}

			if($(e.target).is('li')){
				$(this).children('.kSelect_label').html($(e.target).html());
				$(this).children('select').val($(e.target).attr('data-value')).trigger('change');

				$(e.target).siblings('li').removeClass('active')
				$(e.target).addClass('active');
			}
			o.eWinSizeChange();
		}
		o.eChange=function(e){
			var p=$(this).parent('.kSelect');
			var selectText=p.children('select').children('option').filter(':selected').text();
			p.children('.kSelect_label').html(selectText);
			p.val(p.children('select').children('option').filter(':selected').attr('value'));
			p.children('.kSelect_option').children('ul').children('li').removeClass('active').eq(p.children('select').children('option').filter(':selected').index()).addClass('active');
		}

		o.c.each(function(idx,elem){
			$(elem).closest('.kSelect').bind('click',o.eClick);
			$(elem).bind('change',o.eChange);
		});
		
		o.eWinSizeChange = function(){
			o.c.each(function(idx,elem){
				var elemCon=$(elem).closest('.kSelect');
				var elemTitle=elemCon.children('.kSelect_label');
				var elemOption=elemCon.children('.kSelect_option');
				var listHeight=elemTitle.height()+elemCon.children('.kSelect_option').height();
				var offsetBottom=$(window).scrollTop()+$(window).height()-(elemTitle.offset().top);

				if(offsetBottom>=0&&offsetBottom<listHeight){
					elemCon.addClass('reverse');
					elemOption.css({top:'auto',bottom:'100%'});
				}else{
					elemCon.removeClass('reverse');
					elemOption.css({bottom:'auto',top:'100%'});
				}

				if($(window).width()>640){
					o.c.parent().addClass('select_desktop');

				}else{
					o.c.parent().removeClass('select_desktop');	
				}
			});
		}
		o.eOnChange=function(){
			var sLi=$(this).closest('.kSelect').find('.kSelect_option>ul>li')
			for(var i=0;i<sLi.length;i++){
				if(sLi.eq(i).attr('data-value')==$(this).val()){
					o.setting.onChange({idx:i,text:sLi.eq(i).text(),value:$(this).val()})		
				}
			}
		}
		o.eWinClick=function(e){ //toggle close on all active kSelect
			if(
				o.c.parent('.kSelect').is('.active') && 
				!$(e.target).is('.kSelect_label') &&
				!$(e.target).is('.kSelect_option>ul>li')
			){
				o.c.each(function(idx,elem){ //apply to all custom kSelects
					$(elem).closest('.kSelect').data('on',false).removeClass('active').children('.kSelect_option').hide();
					$(elem).closest('.kSelect').closest('.field').removeClass('active').css('z-index',1);
				})
			}
		}
		o.eWinSizeChange();
		$(window).bind('resize',o.eWinSizeChange);
		$(window).bind('scroll',o.eWinSizeChange);
		$(window).bind('click',o.eWinClick);
		o.c.bind('change',o.eOnChange)
	},
	destroy:function(){
		var o=this;
		$(window).unbind('resize',o.eWinSizeChange);
		$(window).unbind('scroll',o.eWinSizeChange);
		$(window).unbind('click',o.eWinClick);
		o.c.unbind('change',o.eOnChange)
		o.c.siblings('.kSelect_label').remove();
		o.c.siblings('.kSelect_option').remove();
		o.c.unwrap();
	}
}