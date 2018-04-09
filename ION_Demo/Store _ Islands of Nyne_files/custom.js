$(function() {


    // Top menu 
		    // Top menu line change on hover
					$(".header nav ul li.current_page_item").prev().addClass('pre_current');
					$(".header nav ul li a").on('mouseover', function(){
						$(this).parent().prev().addClass('hide_line');
					});
					$(".header nav ul li a").on('mouseout', function(){
						$(this).parent().prev().removeClass('hide_line');
					});
			
			
			// Top menu make small on scroll
					$(window).on('scroll load', function () {
						if ($(this).scrollTop() > 150) {
							$('.header').addClass('header_small');
						} else {
							$('.header').removeClass('header_small');
						}
					});


		    // Mobile social icons
				    var socialicons = $(".header .widget").clone();
					$(".header nav").append(socialicons);


		    // Responsive menu trigger
					$(".menu_trigger, .close_mobile_menu").on('click', function(){
						$('.menu_trigger, .header nav, .close_mobile_menu').toggleClass('active');
					});

			
			
			
    // Data background cover
			$('*[data-cover]').each(function(){
				var coverTarget = $(this).attr('data-cover');
				var coverimage = $(this).find(coverTarget).attr('src');
				$(this).css('background-image','url('+ coverimage +')');
			});




    // Data slide
			$('*[data-slide]').on('click', function(){
				var slideTarget = $(this).attr('data-slide');
			    $('html, body').animate({
			        scrollTop: $(slideTarget).offset().top
			    }, 1000);
				return false;
			});
			$('*[data-slide-store]').on('click', function(){
				var slideTarget = $(this).attr('data-slide-store');
			    $('html, body').animate({
			        scrollTop: $(slideTarget).offset().top - 150
			    }, 1000);
				return false;
			});




    // Fancybox
			$(".fancybox, .various").fancybox();




    // Media load more
			$('.media_list li:lt(19)').addClass('show');
			$(".media_list + p .button").on('click', function(){
				$('.media_list li').addClass('show');
				$(this).hide();
				return false;
			});




    // FAQ accordion
			$(".faq_list li:first-child dl dt:first-of-type").addClass('active');
			$(".faq_list dl dt").on('click', function(){
				$(this).toggleClass('active').next('dd').slideToggle();
			});

			
			
			
    // News load more
			$('.news_list li:lt(18)').addClass('show');
			$(".news_list > p .button").on('click', function(){
				$('.news_list li').addClass('show');
				$(this).hide();
				return false;
			});




    // Stream list slider
			$('.stream_list .streams-container').bxSlider({
				minSlides: 1,
				maxSlides: 4,
				moveSlides: 1,
				slideWidth: 282,
				slideMargin: 23,
				shrinkItems: true,
				pager: false
			});




    // Featured content slider
			$('.featured_content ul').bxSlider({
				minSlides: 1,
				maxSlides: 2,
				moveSlides: 1,
				slideWidth: 578,
				slideMargin: 45,
				shrinkItems: true,
				pager: false
			});




    // Quote slider
			$('.quote_slider ul').bxSlider({
				auto:true,
				mode: 'fade',
				pager: false,
				onSliderLoad: function(){
			        $(".quote_slider").css("visibility", "visible");
			    }
			});




    // Info slider
		    var slider = $('.info_slider section:first-of-type .wrapper div > ul');
				slider.bxSlider({
				auto: true,
				mode: 'fade',
				adaptiveHeight: true,
				pause: 4000,
				controls: false,
				onSlideAfter: function() {
			        slider.stopAuto();
			        slider.startAuto();
		        }
			});
		    var slider2 = $('.info_slider section:nth-of-type(2) .wrapper div > ul');
				slider2.bxSlider({
				auto: true,
				mode: 'fade',
				adaptiveHeight: true,
				pause: 4000,
				controls: false,
				onSlideAfter: function() {
			        slider2.stopAuto();
			        slider2.startAuto();
		        }
			});
		    var slider3 = $('.info_slider section:nth-of-type(3) .wrapper div > ul');
				slider3.bxSlider({
				auto: true,
				mode: 'fade',
				adaptiveHeight: true,
				pause: 4000,
				controls: false,
				onSlideAfter: function() {
			        slider3.stopAuto();
			        slider3.startAuto();
		        }
			});
		    var slider4 = $('.info_slider section:nth-of-type(4) .wrapper div > ul');
				slider4.bxSlider({
				auto: true,
				mode: 'fade',
				adaptiveHeight: true,
				pause: 4000,
				controls: false,
				onSlideAfter: function() {
			        slider4.stopAuto();
			        slider4.startAuto();
		        }
			});

			$(window).on('resize load', function () {
			$('.info_slider section').each(function(){
				var slidesnum = $(this).find('.bx-pager .bx-pager-item');
				for (i = 0; i <= slidesnum.length - 1; i++) {
				    var slidetitle = $(this).find('li:nth-child('+[i+1]+')').find('.title').html();
					$(this).find('.bx-pager .bx-pager-item:nth-child('+[i+1]+') .bx-pager-link').html('<span>' + slidetitle + '</span>');
				};
			});
			});




    // Show/hide input value
			$('input[type="text"], input[type="password"], input[type="email"]').each(function(){
				var valtxt = $(this).attr('value');
				$(this).focus(function() { if ($(this).val() == valtxt) {$(this).val('');} });
				$(this).blur(function() { if ($(this).val() == '') {$(this).val(valtxt);} });
			});
			$("textarea").focus(function() {if (this.value === this.defaultValue) {this.value = '';}}).blur(function() {if (this.value === '') {this.value = this.defaultValue;}});



			
    // Responsive video
			var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
		    $fluidEl = $(".video_wrap");
			$allVideos.each(function() {
			  $(this)
			    .attr('data-aspectRatio', this.height / this.width)
			    .removeAttr('height')
			    .removeAttr('width');
			});
			$(window).resize(function() {
			  var newWidth = $fluidEl.width();
			  $allVideos.each(function() {
			    var $el = $(this);
			    $el
			        .width(newWidth)
			        .height(newWidth * $el.attr('data-aspectRatio'));
			  });
			}).resize();	




	// Sidemenu active state
			var section = $('section'), links = $('.sidemenu ul li');
			$(window).scroll(function() {
				var currentPosition = $(this).scrollTop();
				links.removeClass('current');
	        	section.removeClass('currentsection');
				section.each(function() {
			        var top = $(this).offset().top - 200,
			            bottom = top + $(this).height();
			        if (currentPosition >= top && currentPosition <= bottom) {
			        	$('a[data-slide=".' + this.className + '"]').parent().addClass('current');
			        	$(this).addClass('currentsection');
			    	}
				}); 
			});

			var sidemenuicon = $('.sidemenu .icon');
			$(window).on('load scroll resize', function () {
		        var topPos = $('.sidemenu ul li.current').position().top;
		        sidemenuicon.stop().animate({
		            top: topPos
		        }, 50);
			});


}); 