//kSELECT
    var kSelector=new kSelect({elemContainer:'.select_lang',styleClass:'.select_lang_style',onChange:function(oInfo){ try{ var saVal = oInfo.value; if(saVal != ''){ /*location.href=location.href+"?lang="+saVal;//should work*/ }}catch(e){} },onLoad:function(){} });


    //HERO AUTOHEIGHT
    $(function(){
        var autoheight=function(){
            $('.autoheight').each(function(idx,elem){
                var height=parseFloat($(elem).attr('data-auto-height')) || 100;
                var winWidth = window.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth;
                var winHeight = window.innerHeight|| d.documentElement.clientHeight|| d.getElementsByTagName('body')[0].clientHeight;
                if(winWidth<=670&$(elem).hasClass('hero')){
                    height=100;
                }
                $(this).height(winHeight*height/100)
            }); 
        }
        $(window).resize(autoheight);
        autoheight();
        
        
        //$(window).load(function(){
            //kImage.containerStretcher({elemContainer:'.hero_video'});    
        //})

        var heroHeightAdjusted=function(){
            var winWidth = window.innerWidth || d.documentElement.clientWidth || d.getElementsByTagName('body')[0].clientWidth;
            var winHeight = window.innerHeight|| d.documentElement.clientHeight|| d.getElementsByTagName('body')[0].clientHeight;

            $('.heroHeightAdjusted').each(function(idx,elem){
                var height=100;
                if(winWidth<=670&$(elem).hasClass('hero')){
                    $(this).height(winHeight)  
                }else{
                    $(this).height(winHeight-$('.optionlist').outerHeight(true)-$('#gbn').outerHeight(true))
                }
                if(heroSlider) heroSlider.setSize();
            }); 
        }
        $(window).resize(heroHeightAdjusted);
        $(window).load(function(){
            heroHeightAdjusted();    
        })
        heroHeightAdjusted();
        
        
        //$(window).load(function(){
            //kImage.containerStretcher({elemContainer:'.hero_video'});    
        //})

    });

    //HERO SLIDER W/ PARALLAX
    var heroSlider;
    $(function(){
        var heroW=$('.page_home').length?1920:1920; //home hero : interior hero
        var heroH=$('.page_home').length?1920:320; //home hero : interior hero
         heroSlider=new kSlider({elemContainer:'#hero .sliderWrap',elemNext:'#hero .sliderWrap_next',elemPrevious:'#hero .sliderWrap_previous',width:heroW,height:heroH,type:'fade',heightBase:'parent',isLoop:true,onLoad:function(){
                if(heroSlider.totalSet>1){
                    for(var i=0;i<heroSlider.totalSet;i++){
                        $('.hero_pager').append('<span />');
                    } 
                    $('.hero_pager>span').click(function(){
                        if(heroSlider.isPending==false){
                            $(this).addClass('active').siblings().removeClass('active');
                            heroSlider.play($(this).index())
                        }
                    }).eq(0).addClass('active')
                }
            },onBefore:function(slide){
                $('.hero_pager>span').removeClass('active').eq(slide).addClass('active');
            },onAfter:function(slide){}
        });
        

        
        $('.heroParallax').css({ 'width': '100%', 'height': '100%', 'position': 'absolute', 'top': 0, 'left': 0, '-webkit-transform': 'translateZ(1)' })
        $('.heroParallax').parent().css({ 'overflow': 'hidden' })
        $(window).scroll(function () { updateHeroParallax() });
        $(window).mousewheel(function(event, delta, deltaX, deltaY){ updateHeroParallax() });
        function updateHeroParallax(){
            if (isIphone() || isIpad()) return;
            if ($(window).width()<768) return;

            var speed=$(window).width()>768?.3:.01;
            var elHeight = $('.heroParallax').height();
            var perY = Math.round($(window).scrollTop() / elHeight * 1000) / 1000
            var amtY = elHeight * perY * speed;
            $('.heroParallax').stop().css({ top: amtY, opacity: (1 - perY) * 1.4 })
        }
        function isIphone(){ return ((navigator.platform.indexOf("iPhone") != -1) ||(navigator.platform.indexOf("iPod") != -1)); }
        function isIpad(){ return navigator.userAgent.match(/iPad/i) != null;  }
    });


    /*FOOTER*/
    $(function(){
        $('.select_service>li').click(function(){
            $(this).addClass('active').siblings().removeClass('active')
            $('.select_language').hide();
            $('.select_language[data-link-content="'+$(this).attr('data-link')+'"]').show();
        })
        $('.select_service>li[data-link="'+currentService+'"]').trigger('click');
        $('.btn_lang').click(function(){
            $('#lang .options').toggle();
        })
        $('#lang .options').mouseleave(function(){
          $('#lang .options').toggle();  
        })
    });

    $(function(){
        $('#mainFooter .nav_lang>.title').click(function(){
            $('#mainFooter .nav_lang>.inner').toggle();
            $('#mainFooter').toggleClass('active_lang');
        })
        $('body').click(function(e){
            if($(e.target).closest('.nav_lang').length!=1){
                $('#mainFooter .nav_lang>.inner').hide();
                $('#mainFooter').removeClass('active_lang');
            }
        })
    })
    
//MOBILE NAV NEW
$(function(){
    $('.mobile_nav_btn').click(function(){
        $('html').toggleClass('mobile_nav_active');
    })
    $('.droplist>span').click(function(){
        $(this).parent('.droplist').toggleClass('active')
    })
})