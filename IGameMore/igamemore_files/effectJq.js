// JavaScript Document
$(document).ready(function() {
  //NAV
  $(".nav_juegos,.TB_massage").mouseenter(function(e) {
	  $(this).find(".gameBox_nav").show().addClass("css3_bounceIn");
	  $(this).find("a:first").addClass("cur");
  });
  $(".nav_juegos,.TB_massage").mouseleave(function(e) {
	  $(this).find(".gameBox_nav").hide().removeClass("css3_bounceIn");
	  $(this).find("a:first").removeClass("cur");
  });
  
  //JUEGOS HOT
  $(".hot-game a").mouseenter(function(e) {
      $(".hot-game a").css({"opacity":"0.7"});
	  $(this).stop().animate({"opacity":"1"});
	  $(this).find(".txt").stop().animate({"left":"290px"});
	  $(this).find(".btn").stop().animate({"left":"0"}); 
  });
  $(".hot-game a").mouseleave(function(e) {
      $(".hot-game a").stop().css({"opacity":"1"});
	  $(this).find(".txt").stop().animate({"left":"0"});
	  $(this).find(".btn").stop().animate({"left":"-195px"});
	  
  });
  
  //JUEGOS DE NAVEGADOR
  $(".juegos-list a").mouseenter(function(e) {
	  $(this).find(".txt").stop().fadeOut();
	  $(this).find(".p-hover").stop().animate({"top":0,"opacity":1},200);
  });
  $(".juegos-list a").mouseleave(function(e) {
	  $(this).find(".txt").stop().css({"opacity":1}).fadeIn();
	  $(this).find(".p-hover").stop().animate({"top":"-157px","opacity":0},200);	  
  });
  
  //google iframe dispayNone
  $("iframe[name='google_conversion_frame']").css({"position":"absolute","top":"0"});
  
  //Soporte
  //侧边栏下拉效果
  function ShowDropdown (BtnA,dropdown){
	  $(".subMenu2 .list").find(".current").find(dropdown).slideDown();
	  $(BtnA).click(function(e) {
		  var $parentLi = $(this).parent();
		  var thisDropdown = $parentLi.find(dropdown);
		  if(thisDropdown.is(dropdown)){
			  if(thisDropdown.css("display")=="none"){
			      $parentLi.siblings().find(dropdown).slideUp("fast");
			      $parentLi.siblings().removeClass("current");
			      $parentLi.addClass("current").find(dropdown).slideDown();}
		      else{
			      $parentLi.removeClass("current");
				  thisDropdown.slideUp("fast");
			  }
		  }
		  return false;
	  });
  }
  ShowDropdown(".btn_showHide",".dropdown_list");

    $(".QA_list li a").click(function(e) {
        $(this).parent().siblings().find(".qWen").slideUp();
        $(this).next().slideDown();
    });
    $(".QA_list li a").first().click();
  
});