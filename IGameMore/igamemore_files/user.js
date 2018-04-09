var pop = {
	picProp : new prompt(),
	loginCallBack:null,
	logoutCallBack:null,
	init:function(o){
		this.loginCallBack = o.loginCallBack;
		this.logoutCallBack = o.logoutCallBack;
	},
	delDiv : function(obj){
		var div = document.getElementById(obj);
		if (div != null){
			div.parentNode.removeChild(div);
		}
	},
	
	closeX : function (obj){
		//$(obj).remove();
		this.delDiv(obj);
		background().remove();
		return;
	},

	showLogin: function() {
		//改版后登陆
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.passportUrl = 'http://www.igamemore.com';
		}

		var html = '<div class="popUp_sign pop_sign" id="loginG" style="position:absolute; left:200px; top:60px;">\
		<div class="allBoxG">\
		<div class="popUp_head">\
		<a href="javascript:;" class="btn_close" id="loginCloseBtn" title="Close">x</a>\
		<div class="title title_loginG"><p>'+langArr["Log In"]+'</p></div>\
		<div class="title title_SignUpG"><p>'+langArr["Sign up"]+'</p></div>\
		</div>\
		<div class="popUp_main clearfix">\
		<div class="box_loginG" id="loginArea">\
		<form class="form_login">\
		<p class="Glogo"><img src="'+urls.staticUrl+'/common/images/layout/logo2.jpg" /></p>\
		<div class="dd"><input name="email" id="email" type="text" placeholder="'+langArr["Email"]+'" class="input_login login_email" /><div class="wrong_tip username_warn" id="error_email"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="password" id="password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip password_warn" id="error_pwd"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd clearfix show_login_verify_code" style="display:none;">\
		<input type="text" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" id="login_code" name="login_code" />\
		<div class="wrong_tip code_warn" id="error_code"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(1);" id="logVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="" id="rememberMe" type="checkbox" checked="false" value=""/>'+langArr["Remember me"]+'</label>\
		<div class="btn_forgotPasw"><a href="'+urls.passportUrl+'/user/login/forgot_password">'+langArr["Forgot Password?"]+'</a></div>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="loginBtn">'+langArr["Log In"]+'</a></div>\
		<div class="noAccount">'+langArr["Don't have a Platform account?"]+' <a href="javascript:;" id="btnGoSign">'+langArr["Sign up now!"]+' </a></div>\
		</form>\
		</div>\
		<div class="box_SignUpG" id="signUpArea">\
		<form class="form_login" action="/user/Register/do_register" method="get">\
		<p class="Glogo"><img src="'+urls.staticUrl+'/common/images/layout/logo2.jpg"/></p>\
		<div class="dd"><input name="user_email" id="user_email" type="text" placeholder="'+langArr["Email"]+'" class="input_login" /><div class="wrong_tip" id="email_error"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="reg_password" id="reg_password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip" id="password_error"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd"><input name="reg_password_re" id="reg_password_re" type="password" placeholder="'+langArr["Confirm Password"]+'" class="input_login" /><div class="wrong_tip" id="password_re_error"><span class="tip_sj">▲</span>'+langArr["Passwords don't match"]+'</div></div>\
		<div class="dd clearfix show_reg_verify_code" style="display:none;">\
		<input type="text" id="reg_code" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" name="reg_code" />\
		<div class="wrong_tip code_warn" id="code_error"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(2);" id="regVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="policy0" type="checkbox" checked="false" value=""/>'+langArr["I have read and agree to the"]+'<a href="/guide/index/detail/id/168.html" target="_blank">'+langArr["Terms of Service and Privacy Policy."]+'</a></label>\
		<label class="label_checkbox" ><input name="policy1" type="checkbox" checked="false" value=""/>'+langArr["I would like Platform to keep me informed of their newest games and promotions."]+'</label>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="signBtn" class="btn_lg_a">'+langArr["Sign up"]+'</a></div>\
		<div class="noAccount">'+langArr["Allready have an account"]+'? <a href="javascript:;" id="btnGoLogin">'+langArr["Log in here"]+'! </a></div>\
		</form>\
		</div>\
		<div class="other_account">\
		<a href="/index.php?g=api&m=oauth&a=login&type=facebook" class="btn_fbLogin" ></a>\
		<a href="/index.php?g=api&m=oauth&a=login&type=google" class="btn_gLogin" ></a>\
		<a href="/index.php?g=api&m=oauth&a=login&type=twitter" class="btn_tLogin" ></a></li>\
		</div>\
		<div class="line"><p>Or</p></div>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#loginCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
			var cookie_email = $.cookie("login_email");
			if(cookie_email) o.container.find("input[name=email]").val(cookie_email);
		}).show();
		$("input[name^='policy']").click(function(){
			$("input[name^='policy']").each(function(i){
				if(!$("input[name='policy"+i+"']").attr('checked')){
					$('#signBtn').css({'background':'#c7c7c7'});
					$("#signBtn").attr("id",'signBtn1');
					return false;
				}else{
					$('#signBtn1').css({'background':'url(__TMPL__Public/images/layout/buttom-sign-up.png) no-repeat;'});
					$("#signBtn1").attr("id",'signBtn');
				}
			});
		});
	},



	codeRefresh: function () {
		var img = new Image;
		img.onload=function(){
			$('#yw0').trigger('click');
		}
		img.src = $('#yw0').attr('src');
	},

	showThirdSignUp: function(account,from,email) {
		pop.closeX('loginG');
		pop.closeX('signUpG');
		var img;
		var platFrom = '';
		
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		
		switch(from){
			case 'facebook': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_facebook.jpg';
			platFrom = 'Facebook';
			break;
			case 'google': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_google.jpg';
			platFrom = 'Google';
			break;
			case 'twitter': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_twitter.jpg';
			platFrom = 'Twitter';
			break;
			case 'yahoo': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_yahoo.jpg';
			platFrom = 'Yahoo!';
			break;
			case 'livespace': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_live.jpg';
			platFrom = 'Windows Live';
			break;
		}
		var html = '<div class="GTpopBar" id="fbloginID">\
		<div class="RegGroup">\
		<div class="planbt"><span class="lantz">'+langArr["Join  Platform"]+' </span> <a href="javascript:;"  id="fbloginColse" class="p_close">'+langArr["close"]+'</a></div>\
		<!--login neirong Start-->\
		<div class="LogKuang">\
		<div class="logqu_a">\
		<div class="disanfangQu">\
		<p class="san_shangbiao">'+langArr["Connect"]+' '+platFrom+' '+langArr["Account"]+'   </p>\
		<p class="san_tubiao"><img src="'+img+'" width="98" height="98"></p>\
		<p class="san_hi">'+langArr["Hi"]+', '+account+'<br>\
		'+langArr["We pre-populated some fields from your"]+' <br>\
		'+platFrom+' '+langArr["account"]+'.</p> \
		<p class="san_Already">'+langArr["Already have a Platform account?"]+' <br>\
		<a href="javascript:;" class="txt_zhus" onclick="pop.closeX(\'fbloginID\');pop.showLogin();">'+langArr["Log in here"]+'</a>！</p>\
		</div>\
		</div>\
		<div class="logqu_b">\
		<div class="regBox" id="regBox">\
		<p class="san_shangbiao">'+langArr["Create a Platform account"]+'</p>\
		<p class="log_jie">'+langArr["Email"]+'</p>\
		<p class="log_in">\
		<input name="email" type="text" class="in_lr nor" id="email" value="'+email+'">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="email_error"></span></p>\
		<p class="log_jie">'+langArr["Password"]+'</p>\
		<p class="log_in">\
		<input name="password" type="password" class="in_lr nor" id="password">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="password_error"></span></p>\
		<p class="log_jie">'+langArr["Confirm Password"]+'</p>\
		<p class="log_in">\
		<input name="password_re" type="password" class="in_lr nor" id="password_re">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="password_re_error"></span></p>\
		<p class="log_jie">'+langArr["Verification Code"]+'</p>\
		<p class="log_in logvercode">\
		<input name="code" type="text" class="in_lr nor" id="code">\
		<span class="vercodema"><img id="captchaCodeImg" src="'+urls.passportUrl+'/site/captcha?'+Math.random()+'" width="100" height="37"></span>\
		<a href="javascript:;" class="refreshTxt" id="refreshCode">'+langArr["Refresh"]+'</a>\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="code_error"></span></p>\
		<input name="signUpFrom" type="hidden" id="signUpFrom" value="third"/>\
		<p class="log_btn"><a href="javascript:;" class="btn_lg_a" id="fbloginBtn">'+langArr["Sign up"]+'</a> </p>\
		<p class="log_iup">By clicking &quot;Sign Up&quot;, you are inidicating that you have read and agreed to the <a href="/guide/index/detail/id/168.html" target="_blank" class="ls_up">Terms of Service and Privacy Policy</a></p>\
		</div>\
		</div>\
		<div class="clear"></div>\
		</div>\
		<!--login neirong  End--> \
		</div>\
		</div>\
		';
		this.picProp.init(html, function(o){
			o.container.find('#fbloginColse').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},

	showThirdSignUpBinded: function(account,from,email) {
		pop.closeX('loginG');
		pop.closeX('signUpG');
		var img;
		var platFrom = '';
		var fromIcon = from.replace(/(^|\s+)\w/g,function(s){
			return s.toUpperCase();
		});
		if('livespace' == from) fromIcon = 'Windows';
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		
		switch(from){
			case 'facebook': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_facebook.jpg';
			platFrom = 'Facebook';
			break;
			case 'google': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_google.jpg';
			platFrom = 'Google';
			break;
			case 'twitter': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_twitter.jpg';
			platFrom = 'Twitter';
			break;
			case 'yahoo': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_yahoo.jpg';
			platFrom = 'Yahoo!';
			break;
			case 'livespace': 
			img = urls.staticUrl+'/Platform/images/public/quickly_tu_live.jpg';
			platFrom = 'Windows Live';
			break;
		}
		var html = '<div class="popUp_sign pop_sign" id="loginG" style="position:absolute; left:200px; top:60px;">\
		<div class="allBoxG">\
		<div class="popUp_head">\
		<a href="javascript:;" id="fbloginColse" class="btn_close" title="Close">x</a>\
		<div class="title title_loginG"><p>'+langArr["Log In"]+'</p></div>\
		<div class="title title_SignUpG"><p>'+langArr["Sign up"]+'</p></div>\
		</div>\
		<div class="popUp_main clearfix">\
		<div class="box_loginG" id="loginArea">\
		<form class="form_login">\
		<h3 class="existingH">'+langArr["existing User"]+'</h3>\
		<div class="dd"><input name="email" readonly="readonly" id="email" value="'+email+'" placeholder="'+langArr["Email"]+'" class="input_login login_email" /><div class="wrong_tip username_warn" id="error_email"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="password" id="password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip password_warn" id="error_pwd"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd clearfix show_login_verify_code" style="display:none;">\
		<input type="text" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" id="login_code" name="login_code" />\
		<div class="wrong_tip code_warn" id="error_code"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(1);" id="logVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="" id="rememberMe" type="checkbox" checked="false" value=""/>'+langArr["Remember me"]+'</label>\
		<div class="btn_forgotPasw"><a href="'+urls.passportUrl+'/user/login/forgot_password">'+langArr["Forgot Password?"]+'</a></div>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="loginBtnBind">'+langArr["Log In"]+'</a></div>\
		<div class="noAccount">'+langArr["Don't have a Platform account?"]+' <a href="javascript:;" id="btnGoSign">'+langArr["Sign up now!"]+' </a></div>\
		</form>\
		</div>\
		<div class="box_SignUpG" id="signUpArea">\
		<form class="form_login" action="/user/Register/do_register" method="get">\
		<p class="Glogo"><img src="'+urls.staticUrl+'/common/images/layout/logo2.jpg"/></p>\
		<div class="dd"><input name="user_email" id="user_email" type="text" placeholder="'+langArr["Email"]+'" class="input_login" /><div class="wrong_tip" id="email_error"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="reg_password" id="reg_password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip" id="password_error"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd"><input name="reg_password_re" id="reg_password_re" type="password" placeholder="'+langArr["Confirm Password"]+'" class="input_login" /><div class="wrong_tip" id="password_re_error"><span class="tip_sj">▲</span>'+langArr["Passwords don't match"]+'</div></div>\
		<div class="dd clearfix show_reg_verify_code" style="display:none;">\
		<input type="text" id="reg_code" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" name="reg_code" />\
		<div class="wrong_tip code_warn" id="code_error"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(2);" id="regVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="policy0" type="checkbox" checked="false" value=""/>'+langArr["I have read and agree to the"]+'<a href="/guide/index/detail/id/168.html" target="_blank">'+langArr["Terms of Service and Privacy Policy."]+'</a></label>\
		<label class="label_checkbox" ><input name="policy1" type="checkbox" checked="false" value=""/>'+langArr["I would like Platform to keep me informed of their newest games and promotions."]+'</label>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="signBtn" class="btn_lg_a">'+langArr["Sign up"]+'</a></div>\
		<div class="noAccount">'+langArr["Allready have an account"]+'? <a href="javascript:;" id="btnGoLogin">'+langArr["Log in here"]+'! </a></div>\
		</form>\
		</div>\
		<div class="other_account existingL" style=" padding-top:36px;">\
		<p class="title">Conecta a Windows Live Account</p>\
		<ul class="list clearfix" style=" padding-top:14px;">\
		<li><a href="#"><h3 class="Windows"></h3>Windows</a></li>\
		</ul>\
		<p class="tip_singS"><em>'+langArr["hello"]+', '+account+'</em>'+langArr["The address of this mail had been registered!"]+'</p>\
		</div>\
		<div class="line"><p>Or</p></div>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#fbloginColse').click(function() {
				o.container.remove();
				background().hide();
				if($("#advertisement").val()=="Platform"){
					return false;
				}
				pop.showLogin();
				return false;
			});
		}).show();
	},
	
	showSignUp1: function() {//原来注册
		var html = '<div class="GTpopBar  GTpopBar3" id="signUpArea">\
		<div class="RegGroup">\
		<div class="planbt">\
		<p class="lantxt">Join  Platform </p>\
		<p class="lantxt pop_reg_subTit">Already have a Platform account? <a href="javascript:;" id="switchLogin">'+langArr["Log in here"]+' </a> </p>\
		<a href="#" class="p_close">'+langArr["close"]+'</a>\
		</div>\
		<!--login neirong Start-->\
		<div class="LogKuang clearfix">\
		<div class="regBox" id="regBox">\
		<p class="san_shangbiao">Create a Platform Account</p>\
		<p class="log_in">\
		<input name="email" type="text" placeholder="Email" class="in_lr nor" id="email">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="email_error">'+langArr["Please enter a valid email address!"]+'</span></p>\
		<p class="log_in">\
		<input name="password" type="password" placeholder="Password" class="in_lr cur" id="password">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="password_error">'+langArr["Password must be at least 6 characters!"]+' </span></p>\
		<p class="log_in">\
		<input name="password_re" type="password" placeholder="Confirm Password" class="in_lr nor" id="password_re">\
		</p>\
		<p class="log_ti"><span class="ti_warn" id="password_re_error"><span class="tip_sj">▲</span>'+langArr["Passwords don't match"]+'</span></p>\
		<p class="form_check_tips">\
		<input type="checkbox" id="signup_checked" checked>\
		'+langArr["Sign me up to receive special offers, updates, and early access to new Platform games."]+'</p>\
		</div>\
		<div class="reg_grid_b clearfix">\
		<p class="log_btn fl"><a href="javascript:;" id="signBtn" class="btn_lg_a">'+langArr["Sign up"]+'</a></p>\
		<p class="log_iup">By clicking &quot;Sign Up&quot;, you are inidicating that you have read and agreed to the <a href="/guide/index/detail/id/168.html" target="_blank" class="ls_up">Terms of Service and Privacy Policy</a></p>\
		</div>\
		</div>\
		<!--login neirong  End-->\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('.p_close').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
		$("#signup_checked").click(function(){
			if ($(this+':checked').length == 0)
			{
				$(this).parent().css('color', 'red');
			}else{
				$(this).parent().css('color', '');
			}
		});
		$(".log_ti .ti_warn").html('');
	},

	showSignUp: function() {//改版后注册
		var html = '<div class="popUp_sign pop_sign" id="SignUpG" style="position:absolute; left:200px; top:60px;">\
		<div class="allBoxG">\
		<div class="popUp_head">\
		<a href="javascript:;" class="btn_close p_close" title="Close">x</a>\
		<div class="title title_loginG"><p>'+langArr["Log In"]+'</p></div>\
		<div class="title title_SignUpG"><p>'+langArr["Sign up"]+'</p></div>\
		</div>\
		<div class="popUp_main clearfix">\
		<div class="box_loginG" id="loginArea">\
		<form class="form_login">\
		<p class="Glogo">Login</p>\
		<div class="dd"><input name="email" id="email" type="text" placeholder="'+langArr["Email"]+'" class="input_login login_email" /><div class="wrong_tip" id="error_email"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="password" id="password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip" id="error_password"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd clearfix show_login_verify_code" style="display:none;">\
		<input type="text" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" id="login_code" name="login_code" />\
		<div class="wrong_tip code_warn" id="error_code"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(1);" id="logVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="" type="checkbox" checked="false" value=""/>'+langArr["Remember me"]+'</label>\
		<div class="btn_forgotPasw"><a href="'+urls.passportUrl+'/user/login/forgot_password">'+langArr["Forgot Password?"]+'</a></div>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="loginBtn">'+langArr["Log In"]+'</a></div>\
		<div class="noAccount">'+langArr["Don't have a Platform account?"]+' <a href="javascript:;" id="btnGoSign">'+langArr["Sign up now!"]+' </a></div>\
		</form>\
		</div>\
		<div class="box_SignUpG" id="signUpArea">\
		<form class="form_login" action="/user/Register/do_register" method="get">\
		<p class="Glogo">Register</p>\
		<div class="dd"><input name="user_email" id="user_email" type="text" placeholder="'+langArr["Email"]+'" class="input_login" /><div class="wrong_tip" id="email_error"><span class="tip_sj">▲</span>'+langArr["Please enter a valid email address!"]+'</div></div>\
		<div class="dd"><input name="reg_password" id="reg_password" type="password" placeholder="'+langArr["Password"]+'" class="input_login" /><div class="wrong_tip" id="password_error"><span class="tip_sj">▲</span>'+langArr["Password must be at least 6 characters!"]+'</div></div>\
		<div class="dd"><input name="reg_password_re" id="reg_password_re" type="password" placeholder="'+langArr["Confirm Password"]+'" class="input_login" /><div class="wrong_tip" id="password_re_error"><span class="tip_sj">▲</span>'+langArr["Passwords don't match"]+'</div></div>\
		<div class="dd clearfix show_reg_verify_code" style="display:none;">\
		<input type="text" id="reg_code" class="input_login fl" placeholder="'+langArr["Verification Code"]+'" style="width:230px;" name="reg_code" />\
		<div class="wrong_tip code_warn" id="code_error"><span class="tip_sj">▲</span>'+langArr["Verification Code don\'t match"]+'</div>\
		<span class="yzm fr"><img onclick="pop.changeVerifyCode(2);" id="regVerifyCode" align="middle" src="" valign="absmiddle" style="cursor:pointer"></span>\
		</div>\
		<div class="dd">\
		<label class="label_checkbox" ><input name="policy0" type="checkbox" checked="false" value=""/>'+langArr["I have read and agree to the"]+'<a href="/guide/index/detail/id/168.html" target="_blank">'+langArr["Terms of Service and Privacy Policy."]+'</a></label>\
		</div>\
		<div class="btn_sign"><a href="javascript:;" id="signBtn" class="btn_lg_a">'+langArr["Sign up"]+'</a></div>\
		<div class="noAccount">'+langArr["Allready have an account"]+'? <a href="javascript:;" id="btnGoLogin">'+langArr["Log in here"]+'! </a></div>\
		</form>\
		</div>\
		<div class="other_account">\
		<a href="/index.php?g=api&m=oauth&a=login&type=facebook" class="btn_fbLogin"></a>\
		<a href="/index.php?g=api&m=oauth&a=login&type=google" class="btn_gLogin" ></a>\
		<a href="/index.php?g=api&m=oauth&a=login&type=twitter" class="btn_tLogin"></a>\
		</div>\
		<div class="line"><p>Or</p></div>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('.p_close').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
		/*$("#signup_checked").click(function(){
			if ($(this+':checked').length == 0)
			{
				$(this).parent().css('color', 'red');
			}else{
				$(this).parent().css('color', '');
			}
		});*/
		$("input[name^='policy']").click(function(){
			$("input[name^='policy']").each(function(i){
				if(!$("input[name='policy"+i+"']").attr('checked')){
					$('#signBtn').css({'background':'#c7c7c7'});
					$("#signBtn").attr("id",'signBtn1');
					return false;
				}else{
					$('#signBtn1').css({'background':'url(__TMPL__Public/images/layout/buttom-sign-up.png) no-repeat;'});
					$("#signBtn1").attr("id",'signBtn');
				}
			});
		});
		$(".log_ti .ti_warn").html('');
	},
	
	
	showSelectSever: function(){
		var html = '<div class="GTpopBar tipsbox">\
		<div class="planbt">\
		<a href="javascript:;" class="p_close">close</a>\
		</div>\
		<div class="warn_cont">\
		<p class="mailbox_ok">Please enter the game to receive the reward !</p>\
		</div>\
		</div>';

		this.picProp.init(html, function(o){
			o.container.find('.p_close').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},


	showSignUpSuccess: function() {
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		var html = '<div class="popWrap">\
		<h2 class="popUp_head">\
		<a href="javascript:;" class="btn_close p_close" title="Close">x</a>\
		</h2>\
		<div class="pop-newsBox">\
		<p class="succes-icon">'+langArr["Successful registration"]+'</p>\
		<p class="tt3">'+langArr["Go to"]+' <a href="'+urls.passportUrl+'">'+langArr["My Account"]+'</a>, '+langArr["to change account information"]+'</p>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#signUpSuccessColseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
		setTimeout(
			function(){
				pop.closeX('SignUpSuccessArea');
				window.location.reload();
			},5000	
			);
	},

	showSendMailSucess:function(){
		var show_mail = user_secure_email.substr(0,3)+"****"+user_secure_email.substr(user_secure_email.indexOf("@"));
		var link_mail = "http://mail."+user_secure_email.substr(user_secure_email.indexOf("@")+1);
		var html = '<div class="popWrap">\
		<div class="popUp_head">\
		<a href="javascript:;" class="btn_close close_btn" title="Close">x</a>\
		<div class="title"><p>'+langArr["Email Security"]+'</p></div>\
		</div>\
		<div class="pop-f">\
		<p class="succes-iconS">'+langArr["Your email is set up successfully!"]+'</p>\
		<p class="txtTit">'+langArr["We send you an email with a link to the specified address in your account"]+':'+show_mail+'</p>\
		<p class="tt2">'+langArr["Click on the link as soon as you get the mail, please note that the link is only active for 24 hours."]+'</p>\
		<p class="pop-btn f-cb">\
		<a href="'+link_mail+'" class="btn-Ocen" target="_blank">'+langArr["Login Mailbox"]+'</a>\
		</p>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('.close_btn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},

	showSecurityBox:function(account){
		var _self = this;
		if(!user_secure_email || '' === user_secure_email) user_secure_email = 'Enter the text';
		var mail_preg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var html = '<div class="popWrap">\
		<h2 class="popUp_head">\
		<a href="javascript:;" id="securityCloseBtn" class="btn_close" title="Close">x</a>\
		<div class="title"><p>'+langArr["Set security email"]+'</p></div>\
		</h2>\
		<div class="pop-f">\
		<p class="tt">'+langArr["Please set one of your frequently used e-mail as secret mailbox, when you forget your password, can through the secret password reset email fast."]+'</p>\
		<p class="p-ipt">\
		<label for="" class="lb">'+langArr["Security Email"]+':</label>\
		<input type="text" name="" value="'+account+'" id="securityMail" class="pInput">\
		<div id="email_error"></div>\
		</p>\
		<p class="pop-btn f-cb">\
		<a href="javascript:;" class="btn-ok btn_submit">OK</a>\
		</p>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#securityCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
			o.container.find("#securityMail").focus(function(){

				if('Email' === jQuery(this).val()){
					jQuery(this).val("");
				}
			});
			o.container.find("#securityMail").blur(function(){
				var pre_input = jQuery(this).val();
				if('' === jQuery(this).val()){
					jQuery(this).val("Email");
				}else{
					jQuery(this).val(pre_input);
				}
				if(!mail_preg.test(jQuery.trim(jQuery(this).val()))){
					jQuery("#email_error").html("<font color='red'>"+langArr["Malformed e-mail"]+"</font>");
				}else{
					jQuery("#email_error").html('');
				}

			});

                        /*o.container.find("#user_password").focus(function(){
                            if('Enter Platform account password…' === jQuery(this).val()){
                                jQuery(this).val("");
                            }
                        });
                        
                        o.container.find("#user_password").blur(function(){
                            jQuery.ajax({
                                    url:'/password/checkpwd',
                                    type:'post',
                                    data:'pwd='+jQuery(this).val(),
                                    dataType:'json',
                                    success:function(_res){
                                        if(0 == _res.status){
                                            jQuery("#password_error").html("");
                                            password_pass = true;
                                        }else{
                                            jQuery("#password_error").html("Password is incorrect");
                                            password_pass = false;
                                        }
                                    }
                            });
                        });*/
                        
                        o.container.find(".btn_submit").click(function(){
                        	var input_email = o.container.find("#securityMail").val();
                        	if(!mail_preg.test(jQuery.trim(input_email))){
                        		return false;
                        	}

                        	jQuery.ajax({
                        		url:'/password/security',
                        		type:'post',
                        		data:'secure_email='+jQuery("#securityMail").val(),
                        		dataType:'json',
                        		success:function(_res){
                        			user_secure_email = jQuery("#securityMail").val();
                        			if(0 == _res.status){
                        				o.container.remove();
                        				background().hide();
                        				_self.showSendMailSucess();
                        			}else{
                        				alert(langArr["set fail,please try again later!"]);
                        			}
                        		}
                        	});

                        });
                    }).show();  
	},

	showModifyMailConfirmBox:function(){
		var _self = this;
		var show_mail = user_secure_email.substr(0,3)+"****"+user_secure_email.substr(user_secure_email.indexOf("@"));
		var html = '<div class="popUp_warning">\
		<div class="popUp_head">\
		<a href="javascript:;" class="btn_close close_btn" title="Close">x</a>\
		<div class="title"><p>'+langArr["Changing email"]+'</p></div>\
		</div>\
		<div class="popUp_main">\
		<p class="warning_main">'+langArr["It is e-mailed to the address"]+': '+show_mail+'<br>'+langArr["Check your inbox please and follow the instructions to complete the confirmation"]+'</p>\
		<div class="btn_warning">\
		<a href="javascript:;" class="btn_submit modify_confirm">'+langArr["Send a confirmation email"]+'</a>\
		<a href="javascript:;" class="btn_blue btn_submit close_btn">'+langArr["cancel"]+'</a>\
		</div>\
		</div>\
		</div>';          

		this.picProp.init(html, function(o){
			o.container.find('.close_btn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});

			o.container.find('.modify_confirm').click(function() {
				jQuery(this).addClass("disabled");
				jQuery(this).unbind("click");
				jQuery.ajax({
					url:'/password/sendconfirmmail',
					type:'post',
					data:'curent_mail='+user_secure_email,
					dataType:'json',
					success:function(_res){
						if(0 == _res.status){
							jQuery(".btn_modify").removeClass("btn_show_modify");
							jQuery(".btn_modify").addClass("disabled");
							var dis_able_timeout = setTimeout(function(){
								jQuery(".btn_modify").removeClass("disabled");
								jQuery(".btn_modify").addClass("btn_show_modify");
								clearTimeout(dis_able_timeout);
							},120000);
							o.container.remove();
							background().hide();
							_self.showSendMailSucess();
						}else{
							alert(langArr["send fail,please try again later!"]);
						}
					}
				});
			});
		}).show();
	},

	showModifyMailBox:function(){
		var _self = this;
		var mail_preg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		var html = '<div class="popWrap">\
		<h2 class="popUp_head">\
		<a href="javascript:;" class="btn_close close_btn" title="Close">x</a>\
		<div class="title"><p>'+langArr["Changing email"]+'</p></div>\
		</h2>\
		<div class="pop-f" style=" padding: 0 50px;">\
		<p class="tt">'+langArr["Please update your secondary email, so you can recover the password if necessary."]+'</p>\
		<p class="tt">'+langArr["We will send a confirmation email to the new address Email recovery. Please check your inbox and follow the instructions to complete the confirmation."]+'</p>\
		<p class="p-ipt">\
		<label for="" class="lb" style="font-weight:bold; margin-bottom: 10px;">'+langArr["New Email recovery"]+':</label>\
		</p><p style="text-align:center">\
		<input type="text" name="" id="modify_mail" class="pInput" value="'+langArr["Enter the new address..."] +'" style=" width: 380px;"></p>\
		<p id="modify_mail_error"></p>\
		<p class="pop-btn f-cb">\
		<a href="" class="btn-ok modify_confirm">'+langArr["OK"]+'</a>\
		</p>\
		</div>\
		</div>';

		this.picProp.init(html, function(o){
			o.container.find('.close_btn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});

			o.container.find("#modify_mail").focus(function(){
				if(langArr["Enter the new address..."] === $(this).val()){
					$(this).val("");
				}
			});

			o.container.find("#modify_mail").blur(function(){
				var pre_input = $(this).val();
				if('' === $(this).val()){
					$(this).val(langArr["Enter the new address..."]);
				}else{
					$(this).val(pre_input);
				}
				if(!mail_preg.test($.trim($(this).val()))){
					$("#modify_mail_error").html(langArr["Email format is incorrect"]);
				}else{
					$("#modify_mail_error").html('');
				}

			});

			o.container.find('.modify_confirm').click(function() {
				var input_email = o.container.find("#modify_mail").val();
				if(!mail_preg.test($.trim(input_email))){
					return false;
				}
				$(this).addClass("disabled");
				$(this).unbind("click");
				var $modify_mail = $("#modify_mail").val();
				$.ajax({
					url:'/password/sendconfirmmail',
					type:'post',
					data:'curent_mail='+$modify_mail+"&mtype=modifyconfirm&code="+modify_code,
					dataType:'json',
					success:function(_res){
						if(0 == _res.status){
							$(".btn_modify").removeClass("btn_show_modify");
							$(".btn_modify").addClass("disabled");
							var dis_able_timeout = setTimeout(function(){
								$(".btn_modify").removeClass("disabled");
								$(".btn_modify").addClass("btn_show_modify");
								clearTimeout(dis_able_timeout);
							},120000);
                                    //user_secure_email = jQuery("#modify_mail").val();
                                    //alert("邮件发送成功!");
                                    //window.location.href = "/password/security";
                                    o.container.remove();
                                    background().hide();
                                    _self.showSendMailSucess();
                                }else{
                                	alert(langArr["send fail,please try again later!"]);
                                }
                            }
                        });
			});
		}).show();
	},

	showSetSecuryTips:function(){
		var html = '<div class="GTpopBar tipsbox">\
		<div class="planbt">\
		<p class="lantxt">'+langArr["Account Security"]+'</p>\
		<a href="javascript:" class="p_close close_btn">'+langArr["close"]+'</a>\
		</div>\
		<div class="warn_cont">\
		<p class="">'+langArr["Link your recovery Email and mobile phone number, and connect your social network account for additional account security and easy access. Set them now to get Bonus Rewards!"]+'</p>\
		<p class="button_warn"><a href="http://www.igamemore.com/password/security" class="btn btn_submit">'+langArr["Set Now"]+'</a></p>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			$.cookie("show_email_tips", "true",{ path: '/', expires: 30,domain:'.igamemore.com' });
			o.container.find('.close_btn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},
	
	connect:function(from){
		document.domain = window.urls.domain;
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://accounts.igamemore.com';
		}
		var win = window.open('http://accounts.igamemore.com/openid/connect/plat/pt_en/name/'+from+'/callbackUrl/'+'igamemore.com',"_blank","height=500, width=700"); //urls.passportUrl+
		tt=setInterval((function(win){return function(){
			if(win.closed){
				if($.cookie('loginsucceed') != null){ 
					pop.showSignUpSuccess();
					$.cookie('loginsucceed',null,{path: '/',domain: '.igamemore.com'});
					clearInterval(tt);
				}else if($.cookie('emailRegisted') != null){
					pop.showThirdSignUpBinded($.cookie('emailRegisted'),from,$.cookie(from+'email'));
					$.cookie('emailRegisted',null,{path: '/',domain: '.igamemore.com'});
					clearInterval(tt);
				}else if($.cookie('connecterror') != null){
					$.cookie('connecterror',null,{path: '/',domain: '.igamemore.com'});
					clearInterval(tt);
				}else{
					window.location.reload(); 
					clearInterval(tt);
				}

			}  
		};})(win),1000);
		
	},

	syncCookies:function(keys,cookies){
		var lens = 	keys.length;
		for(var i=0;i <lens;i++){
			options = {};
			var decode = decodeURIComponent;
			var value = (result = new RegExp('(?:^|; )' + encodeURIComponent(keys[i]) + '=([^;]*)').exec(cookies)) ? decode(result[1]) : null;
			$.cookie(keys[i],value,{path: '/',domain: '.igamemore.com'});
		}
	},
	
	goAccount:function(){
		
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		pop.loginCallBack = pop.goAccount;
		if($.cookie("thinkcmf_auth")){
			window.location = urls.passportUrl;
		}else{ 
			pop.showLogin();
		}
	},
	
	goReg:function(){
		alert(urls.passportUrl+"/site/ureg/");
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		//pop.loginCallBack = pop.goAccount;
		window.location = urls.passportUrl+"/site/ureg/";
	},

	goRecharge:function(){
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		pop.loginCallBack = pop.goAccount;
		if($.cookie("thinkcmf_auth")){
			window.location = urls.passportUrl+"/payment/";
		}else{
			window.urls.RechargeUrl = urls.passportUrl+"/payment/";
			pop.showLogin();
		}
	},
	
	showPasswordError:function(info){
		var html = ' <div class="popWrap">\
		<h2 class="popUp_head">\
		<a href="javascript:;" class="btn_close p_close" title="Close">x</a>\
		</h2>\
		<div class="pop-newsBox">\
		<p class="tt3">'+info+'</p>\
		</div>\
		</div>';
		this.picProp.init(html, function (o) {
			o.container.find('.p_close').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},

	showMobileBox:function(isModify){
		var _self = this;
		var title = langArr["Mobile Phone Number:"];
		if(isModify == 1){
			var title = langArr["Modify Mobile Phone Number:"];
		}

		var html = '<div class="GTpopBar mailbox">\
		<div class="planbt">\
		<p class="lantxt">'+title+'</p>\
		<a href="javascript:" id="mobileCloseBtn" class="p_close">'+langArr["close"]+'</a>\
		</div>\
		<div class="warn_cont">\
		<p class="tips_text">'+langArr["By confirming your phone number, you can retrieve your password via text message."]+'</p>\
		<form action="" class="form-security-mail">\
		<fieldset id="test_belen">\
		<legend>'+langArr["Mobile Phone Number:"]+'</legend>\
		<p class="clearfix">\
		<label for="">'+langArr["Country/Region"]+'</label>\
		<select name="" id="countryCode" class="form_select form_select2">\
		<option value="">'+langArr["Country/Region"]+'</option>\
		<option value="355">Albania</option>\<option value="213">Algeria</option>\<option value="376">Andorra</option>\<option value="244">Angola</option>\<option value="1264">Anguilla</option>\<option value="1268">Antigua and Barbuda</option>\<option value="54">Argentina</option>\<option value="374">Armenia</option>\<option value="247">Ascension</option>\<option value="61">Australia</option>\<option value="43">Austria</option>\<option value="994">Azerbaijan</option>\<option value="1242">Bahamas</option>\<option value="973">Bahrain</option>\<option value="880">Bangladesh</option>\<option value="1246">Barbados</option>\<option value="375">Belarus</option>\<option value="32">Belgium</option>\<option value="501">Belize</option>\<option value="229">Benin</option>\<option value="1441">Bermuda Is.</option>\<option value="591">Bolivia</option>\<option value="267">Botswana</option>\<option value="55">Brazil</option>\<option value="673">Brunei</option>\<option value="359">Bulgaria</option>\<option value="226">Burkina-faso</option>\<option value="95">Burma</option>\<option value="257">Burundi</option>\<option value="237">Cameroon</option>\<option value="1">Canada</option>\<option value="1345">Cayman Is.</option>\<option value="236">Central African Republic</option>\<option value="235">Chad</option>\<option value="56">Chile</option>\<option value="86">China</option>\<option value="57">Colombia</option>\<option value="242">Congo</option>\<option value="682">Cook Is.</option>\<option value="506">Costa Rica</option>\<option value="53">Cuba</option>\<option value="357">Cyprus</option>\<option value="420">Czech</option>\<option value="420">Czech Republic</option>\<option value="45">Denmark</option>\<option value="253">Djibouti</option>\<option value="1890">Dominica Rep.</option>\<option value="593">Ecuador</option>\<option value="20">Egypt</option>\<option value="503">EI Salvador</option>\<option value="372">Estonia</option>\<option value="251">Ethiopia</option>\<option value="679">Fiji</option>\<option value="358">Finland</option>\<option value="33">France</option>\<option value="594">French Guiana</option>\<option value="689">French Polynesia</option>\<option value="241">Gabon</option>\<option value="220">Gambia</option>\<option value="995">Georgia</option>\<option value="49">Germany</option>\<option value="233">Ghana</option>\<option value="350">Gibraltar</option>\<option value="30">Greece</option>\<option value="1809">Grenada</option>\<option value="1671">Guam</option>\<option value="502">Guatemala</option>\<option value="224">Guinea</option>\<option value="592">Guyana</option>\<option value="509">Haiti</option>\<option value="504">Honduras</option>\<option value="852">Hongkong</option>\<option value="36">Hungary</option>\<option value="354">Iceland</option>\<option value="91">India</option>\<option value="62">Indonesia</option>\<option value="98">Iran</option>\<option value="964">Iraq</option>\<option value="353">Ireland</option>\<option value="972">Israel</option>\<option value="39">Italy</option>\<option value="225">Ivory Coast</option>\<option value="1876">Jamaica</option>\<option value="81">Japan</option>\<option value="962">Jordan</option>\<option value="855">Kampuchea (Cambodia )</option>\<option value="327">Kazakstan</option>\<option value="254">Kenya</option>\<option value="82">Korea</option>\<option value="965">Kuwait</option>\<option value="331">Kyrgyzstan</option>\<option value="856">Laos</option>\<option value="371">Latvia</option>\<option value="961">Lebanon</option>\<option value="266">Lesotho</option>\<option value="231">Liberia</option>\<option value="218">Libya</option>\<option value="423">Liechtenstein</option>\<option value="370">Lithuania</option>\<option value="352">Luxembourg</option>\<option value="853">Macao</option>\<option value="261">Madagascar</option>\<option value="265">Malawi</option>\<option value="60">Malaysia</option>\<option value="960">Maldives</option>\<option value="223">Mali</option>\<option value="356">Malta</option>\<option value="1670">Mariana Is</option>\<option value="596">Martinique</option>\<option value="230">Mauritius</option>\<option value="52">Mexico</option>\<option value="373">Moldova, Republic of</option>\<option value="377">Monaco</option>\<option value="976">Mongolia</option>\<option value="1664">Montserrat Is</option>\<option value="212">Morocco</option>\<option value="258">Mozambique</option>\<option value="264">Namibia</option>\<option value="674">Nauru</option>\<option value="977">Nepal</option>\<option value="599">Netheriands Antilles</option>\<option value="31">Netherlands</option>\<option value="64">New Zealand</option>\<option value="505">Nicaragua</option>\<option value="977">Niger</option>\<option value="234">Nigeria</option>\<option value="850">North Korea</option>\<option value="47">Norway</option>\<option value="968">Oman</option>\<option value="92">Pakistan</option>\<option value="970">Palestine</option>\<option value="507">Panama</option>\<option value="675">Papua New Cuinea</option>\<option value="595">Paraguay</option>\<option value="51">Peru</option>\<option value="63">Philippines</option>\<option value="48">Poland</option>\<option value="351">Portugal</option>\<option value="1787">Puerto Rico</option>\<option value="974">Qatar</option>\<option value="225">Republic of Ivory Coast</option>\<option value="262">Reunion</option>\<option value="40">Romania</option>\<option value="7">Russia</option>\<option value="1784">Saint Vincent</option>\<option value="684">Samoa Eastern</option>\<option value="378">San Marino</option>\<option value="685">San Marino</option>\<option value="239">Sao Tome and Principe</option>\<option value="966">Saudi Arabia</option>\<option value="221">Senegal</option>\<option value="248">Seychelles</option>\<option value="232">Sierra Leone</option>\<option value="65">Singapore</option>\<option value="421">Slovakia</option>\<option value="386">Slovenia</option>\<option value="677">Solomon Is</option>\<option value="252">Somali</option>\<option value="27">South Africa</option>\<option value="34">Spain</option>\<option value="94">Sri Lanka</option>\<option value="1758">St.Lucia</option>\<option value="249">Sudan</option>\<option value="597">Suriname</option>\<option value="268">Swaziland</option>\<option value="46">Sweden</option>\<option value="41">Switzerland</option>\<option value="963">Syria</option>\<option value="886">Taiwan</option>\<option value="992">Tajikstan</option>\<option value="255">Tanzania</option>\<option value="66">Thailand</option>\<option value="228">Togo</option>\<option value="676">Tonga</option>\<option value="1809">Trinidad and Tobago</option>\<option value="216">Tunisia</option>\<option value="90">Turkey</option>\<option value="993">Turkmenistan</option>\<option value="256">Uganda</option>\<option value="380">Ukraine</option>\<option value="971">United Arab Emirates</option>\<option value="44">United Kiongdom</option>\<option value="1">United States of America</option>\<option value="598">Uruguay</option>\<option value="233">Uzbekistan</option>\<option value="58">Venezuela</option>\<option value="84">Vietnam</option>\<option value="967">Yemen</option>\<option value="381">Yugoslavia</option>\<option value="243">Zaire</option>\<option value="260">Zambia</option>\<option value="263">Zimbabwe</option>\
		</select>\
		</p>\
		<p class="warn_info c_red" id="countryCode_error"></p>\
		<p class="">\
		<label for="">'+langArr["Mobile Phone Number:"]+'</label>\
		<input type="text" name="" value="Enter mobile phone number…" id="mobileNum" class="input_mail">\
		</p>\
		<p class="warn_info c_red"><a href="javascript:;" class="btn_confircode">'+langArr["Send Confirmation Code"]+'</a></p>\
		<p class="">\
		<label for="">'+langArr["Confirmation Code:"]+'</label>\
		<input type="text" name="" value="Enter confirmation code…" id="confirmationCode" class="input_mail">\
		</p>\
		<p class="warn_info c_red" id="code_error"></p>\
		<p class="button_warn"><input type="button" value="Submit" class="btn btn_submit"></p>\
		</fieldset>\
		</form>\
		</div>\
		</div>';

		this.picProp.init(html, function(o){
			o.container.find('#mobileCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
			o.container.find("#mobileNum").focus(function(){
				if('Enter mobile phone number…' === jQuery(this).val()){
					jQuery(this).val("");
				}
			});
			o.container.find("#mobileNum").blur(function(){
				var pre_input = jQuery(this).val();
				if('' === jQuery(this).val()){
					jQuery(this).val("Enter mobile phone number…");
				}else{
					jQuery(this).val(pre_input);
				}

			});

			o.container.find("#confirmationCode").focus(function(){
				if('Enter confirmation code…' === jQuery(this).val()){
					jQuery(this).val("");
				}
			});
			o.container.find("#confirmationCode").blur(function(){
				var pre_input = jQuery(this).val();
				if('' === jQuery(this).val()){
					jQuery(this).val("Enter confirmation code…");
				}else{
					jQuery(this).val(pre_input);
				}
				if('' == jQuery.trim(jQuery(this).val()) || 'Enter confirmation code…' === jQuery.trim(jQuery(this).val())){
					jQuery("#code_error").html('Confirmation Code is incorrect');
				}else{
					jQuery("#code_error").html('');
				}

			});

			o.container.find("#countryCode").blur(function(){
				var countryCode = jQuery(this).val();
				if('' === countryCode){
					jQuery("#countryCode_error").html('Please select your country/region.');
				}else{
					jQuery("#countryCode_error").html('');
				}
			});

            //发送验证码
            o.container.find(".btn_confircode").click(function(){
            	var mobileNum = jQuery("#mobileNum").val();
            	var countryCode = jQuery("#countryCode").val();
            	if('' === countryCode){
            		alert('Please select your country/region.');
            		return false;
            	}
            	if('' === mobileNum || 'Enter mobile phone number…' == mobileNum){
            		alert('Please enter your phone num.');
            		return false;
            	}
            	if(!/^[0-9]+$/.test(mobileNum)){
            		alert('Please enter your right phone num.');
            		return false;
            	}


            	jQuery.ajax({
            		url:'/profile/mobile',
            		type:'post',
            		data:'user_mobile=' + mobileNum + '&countryCode=' + countryCode + '&isModify=' + isModify,
            		dataType:'json',
            		success:function(_res){
            			user_secure_email = jQuery("#mobileNum").val();
            			if(0 == _res.status){
            				jQuery("#code_error").html(langArr["Confirmation code had been sent."]);
            			}else{
            				alert("set fail,please try again later!");
            			}
            		}
            	});

            });

            o.container.find(".btn_submit").click(function(){

            	jQuery.ajax({
            		url:'/profile/MobileCodeCheck',
            		type:'POST',
            		data:'verification_code='+jQuery("#confirmationCode").val(),
            		dataType:'json',
            		success:function(_res){
            			if(0 == _res.status){
                            //window.location.reload();
                            document.location.reload();
                        }else{
                        	alert("set fail,please try again later!");
                        }
                    }
                });

            });
        }).show();
	},

	showConfimMobileBox:function(){
		var _self = this;

		var html = '<div class="GTpopBar mailbox">\
		<div class="planbt">\
		<p class="lantxt">Mobile Phone Number:</p>\
		<a href="javascript:" id="mobileCloseBtn" class="p_close">close</a>\
		</div>\
		<div class="warn_cont">\
		<p class="tips_text">By confirming your phone number, you can retrieve your password via text message.</p>\
		<form action="" class="form-security-mail">\
		<fieldset id="test_belen">\
		<legend>Mobile Phone Number:</legend>\
		<p class="warn_info c_red" id="countryCode_error"></p>\
		<p class="">\
		<label for="">Mobile Phone Number:</label>\
		<p>'+format_secure_phone+'</p>\
		</p>\
		<p class="warn_info c_red"><a href="javascript:;" class="btn_confircode">Send Confirmation Code</a></p>\
		<p class="">\
		<label for="">Confirmation Code:</label>\
		<input type="text" name="" value="Enter confirmation code…" id="confirmationCode" class="input_mail">\
		</p>\
		<p class="warn_info c_red" id="code_error"></p>\
		<p class="button_warn"><input type="button" value="Submit" class="btn btn_submit"></p>\
		</fieldset>\
		</form>\
		</div>\
		</div>';

		this.picProp.init(html, function(o){
			o.container.find('#mobileCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
			o.container.find("#mobileNum").focus(function(){
				if('Enter mobile phone number…' === jQuery(this).val()){
					jQuery(this).val("");
				}
			});
			o.container.find("#mobileNum").blur(function(){
				var pre_input = jQuery(this).val();
				if('' === jQuery(this).val()){
					jQuery(this).val("Enter mobile phone number…");
				}else{
					jQuery(this).val(pre_input);
				}

			});
			o.container.find("#confirmationCode").focus(function(){
				if('Enter confirmation code…' === jQuery(this).val()){
					jQuery(this).val("");
				}
			});
			o.container.find("#confirmationCode").blur(function(){
				var pre_input = jQuery(this).val();
				if('' === jQuery(this).val()){
					jQuery(this).val("Enter confirmation code…");
				}else{
					jQuery(this).val(pre_input);
				}
				if('' == jQuery.trim(jQuery(this).val()) || 'Enter confirmation code…' === jQuery.trim(jQuery(this).val())){
					jQuery("#code_error").html('Confirmation Code is incorrect');
				}else{
					jQuery("#code_error").html('');
				}

			});

			o.container.find("#countryCode").blur(function(){
				var countryCode = jQuery(this).val();
				if('' === countryCode){
					jQuery("#countryCode_error").html(langArr["Please select your country/region."]);
				}else{
					jQuery("#countryCode_error").html('');
				}
			});

            //发送验证码
            o.container.find(".btn_confircode").click(function(){
            	var mobileNum = jQuery("#mobileNum").val();
            	var countryCode = jQuery("#countryCode").val();
            	if('' === countryCode){
            		alert('Please select your country/region.');
            	}
            	if('' === mobileNum || 'Enter mobile phone number…' == mobileNum){
            		alert('Please enter your phone num.');
            	}

            	jQuery.ajax({
            		url:'/profile/mobile',
            		type:'post',
            		data:'full_secure_phone=' + user_secure_phone,
            		dataType:'json',
            		success:function(_res){
            			if(0 == _res.status){
            				jQuery("#code_error").html(langArr["Confirmation code had been sent."]);
            			}else{
            				alert(langArr["set fail,please try again later!"]);
            			}
            		}
            	});

            });

            o.container.find(".btn_submit").click(function(){

            	jQuery.ajax({
            		url:'/profile/MobileCodeCheck',
            		type:'POST',
            		data:'verification_code='+jQuery("#confirmationCode").val(),
            		dataType:'json',
            		success:function(_res){
            			if(0 == _res.status){
            				document.location.reload();
            			}else{
            				alert(langArr["set fail,please try again later!"]);
            			}
            		}
            	});

            });
        }).show();
	}

}


var userAction = {
	init:function(){
		if($.cookie("thinkcmf_auth")){
			$("#header-login").hide();
			$("#header-out").show();
			var nickname = $.cookie("my_name");
			if(nickname.length > 20){
				nickname = nickname.substring(0,20)+'..';
			}
			$("#header-out").find(".header-username").html(nickname);	
		}else{
			$("#header-out").hide();
			$("#header-login").show();			
		}
	},
	login:function(uid,pwd,remember,from,code){
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		
		if(!uid || uid === 'undefined' ||!pwd || pwd === 'undefined') return;
		$.ajax({
			url:'/user/login/ajaxLogin',
			type:'POST',
			data:'username='+encodeURIComponent(uid)+'&password='+encodeURIComponent(pwd),
			dataType:'json',
			success:function(rst){
				console.log(rst);
               // alert(rst.script);
                //执行同步登陆代码
                // var script=rst.script;
                // var regDetectJs = /<script(.|\n)*?>(.|\n|\r\n)*?<\/script>/ig;
                // var jsContained = script.match(regDetectJs);
                // console.log(jsContained);
                // if(jsContained) {
                //     // 分段取出js正则
                //     var regGetJS = /<script(.|\n)*?>((.|\n|\r\n)*)?<\/script>/im;
                //     // 按顺序分段执行js
                //     var jsNums = jsContained.length;
                //     for (var i=0; i<jsNums; i++) {
                //         var jsSection = jsContained[i].match(regGetJS);
                //         console.log(jsSection[0]);
                //         if(jsSection[0]) {
                //             $('body').append( jsSection[0] );
                //         }
                //     }
                // }
				if(rst.status == 1){
					var rurl = window.urls.RechargeUrl == 'undefined' ? userAction.getUrlParam('rurl') : window.urls.RechargeUrl;
					pop.closeX('loginG');
					pop.closeX('fbloginID');
					userAction.init();
					window.location.reload();
					if(rurl){
						rurl = decodeURIComponent(rurl);
						window.location.href = rurl;
						return;
					}
					if(typeof(pop.loginCallBack)!='undefined' && typeof(pop.loginCallBack)=='function')
						pop.loginCallBack();
				}else{
					alert(rst.msg);
					return;
				}
			}
		});
	},
	showLogout:function(){
		userAction.init();
		if(typeof(pop.loginCallBack)!='undefined' && typeof(pop.loginCallBack)=='function') pop.loginCallBack();
	},
	getUrlParam:function(name)
	{
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg); 
		if (r!=null) return unescape(r[2]); return null; 
	},
	logout:function(){
		$.ajax({
			url:'/user/index/logout',
			type:'post',
			data:'',
			dataType:'json',
			success:function(data){
				window.location.reload();
			}
		});
		userAction.init();
		$('#header-login').find('#login_email_header').val('');
		$('#header-login').find('#login_password_header').val('');

        //pop.thirdLogout();

        if(typeof(pop.logoutCallBack)!='undefined' && typeof(pop.logoutCallBack)=='function') pop.logoutCallBack();
    },
    /*thirdLogout:function(){
        $.ajax({
            url:'http://accounts.igamemore.com/site/logout',
            type:'GET',
            dataType:'json',
            success:function(rst){

            }
        });
    },*/
    signUp:function(uid,pwd,pwd_re,birthYear,birthMonth,birthDay,subscription,from,code){
    	if(!$.trim(uid) || !$.trim(pwd) || !$.trim(pwd_re) ) return;
    	var getUrl = urls.passportUrl+'/site/reg';
    	$.ajax({
    		url:'/user/Register/do_register',
    		type:'POST',
    		data:'user_email='+encodeURIComponent(uid)+'&reg_password='+encodeURIComponent(pwd)+'&reg_password_re='+encodeURIComponent(pwd_re),
    		dataType:'json',
    		success:function(rst){
				//console.log(rst);
				if(rst.status == 1){
					pop.closeX('loginG');
					pop.closeX('fbloginID');
					userAction.init();
					pop.showSignUpSuccess();
					window.location.reload();
					var rurl = userAction.getUrlParam('rurl');
					if(rurl){
						rurl = decodeURIComponent(rurl);
						window.location.href = rurl;
						return;
					}
					if(typeof(pop.loginCallBack)!='undefined' && typeof(pop.loginCallBack)=='function')
						pop.loginCallBack();
					pop.showSignUpSuccess();
					
				}else{
					alert(rst.msg);
					return;
				}
			}
		});
    }
};

function submitKey (bind, submitKey) {
	$(function () {
		$(bind).live('click', function(){
			$(submitKey).submit();
		});
	});
}

//游戏官网顶通登陆注册
function game_login_header(){
	var email = $("#game_header_login_email").val();
	var password = $("#game_header_login_password").val();
	var code=$("#game_header_login_code").val();

	if(email === 'undefined' || $.trim(email) == ''){
		$("#game_header_login_email_error").html('\<span class="tip_sj"\>▲\<\/span\>'+langArr["Please enter a valid email address!"]).show();
		return;
	}else{
		$("#game_header_login_email_error").hide();
	}
	if(password === 'undefined' || $.trim(password) == ''){
		//$("#errorArea").html('Password must be at least 6 characters');
		$("#game_header_login_password_error").html('\<span class="tip_sj"\>▲\<\/span\>'+langArr["Password must be at least 6 characters!"]).show();
		return;
	}else{
		$("#game_header_login_password_error").hide();
	}
	userAction.login(email, password, 0, 'gameHeader',code);
}

function login_header(){
	var email = $("#login_email_header").val();
	var password = $("#login_password_header").val();

	if(email === 'undefined' || $.trim(email) == ''){
		$("#email_login_header_error").html('+langArr["Please enter a valid email address!"]+').show();
		return;
	}else{
		$("#email_login_header_error").hide();
	}
	if(password === 'undefined' || $.trim(password) == ''){
		//$("#errorArea").html('Password must be at least 6 characters');
		$("#password_login_header_error").html('+langArr["Password must be at least 6 characters!"]+').show();
		return;
	}else{
		$("#password_login_header_error").hide();
	}
	userAction.login(email, password, 0, 'header');
}

function login_show($_this){
        //console.log($("#email"));
        //var $email = $("#email").val();
        var $email = $("#loginArea input[name='email']").val();
        if($email === 'undefined' || $.trim($email) == ''){
        	$email = $("#fbloginID input[name='email']").val();
        }
        //var $password = $("#password").val();
        var $password = $("#loginArea input[name='password']").val();
        if($password === 'undefined' || $.trim($password) == ''){
        	$password = $("#fbloginID input[name='password']").val();
        }
        var code=$("#login_code").val();
        var $rememberMe = 0;
        var $from = '';
        if($_this.attr("id") == 'loginBtnBind' || $_this.attr('id') == 'loginBtnRegBind'){
        	$from = 'third';
        }else{
        	var $rememberMe = $("#rememberMe").is(":checked")?1:0;
        }
        if($email === 'undefined' || $.trim($email) == ''){
        	$("#error_email").show();
        	return;
        }else{
        	$("#error_email").hide();
        }
        if($password === 'undefined' || $.trim($password) == ''){
			//$("#errorArea").html('Password must be at least 6 characters');
			$("#error_pwd").show();
			return;
		}else{
			$("#error_pwd").hide();
		}
		userAction.login($email,$password,$rememberMe,$from,code);
	}

	function header_login_show(){
		var email = $("input[name='header_login_email']").val();
		var password = $("input[name='header_login_password']").val();
		var code=$("#header_login_code").val();
		var rememberMe = 0;
		var from = 'headerLogin';
		var rememberMe = $("#headerRememberMe").is(":checked")?1:0;
		if(email === 'undefined' || $.trim(email) == ''){
			$("#header_login_email_error").show();
			return;
		}else{
			$("#header_login_email_error").hide();
		}
		if(password === 'undefined' || $.trim(password) == ''){
			$("#header_login_password_error").show();
			return;
		}else{
			$("#header_login_password_error").hide();
		}
		userAction.login(email,password,rememberMe,from,code);
	}

	function show_header_verify_code(){
		var username=$('#header_login_email').val();
		if(username==''){
			$('.show_header_verify_code').hide();
			return false;
		}
		$('.show_header_verify_code').hide();
		return;
	}

function show_game_header_verify_code(){//游戏官网顶通新版登陆验证码
	var username=$('#game_header_login_email').val();
	if(username==''){
		$('.show_game_header_verify_code').hide();
		return false;
	}
	$('.show_game_header_verify_code').hide();
	return;
}

function show_verify_code(){
	var username=$('.login_email').val();
	if (typeof(username) == "undefined"){
		username=$('#email').val();
	}
	if(username==''){
		$('.show_login_verify_code').hide();
		return false;
	}
	$('.show_login_verify_code').hide();
	return;
}

function show_reg_verify_code(){
	$('.show_reg_verify_code').hide();
	return;
}

function window_resize(){
	if($(window).width()>1260){
		$("#login_header_form").show();
		$("#login_button_header").unbind('click');
		$("#login_button_header").click(login_header);
		$("#login_email_header").click(function(){
			$("#email_login_header_error").hide();
		});
		$("#login_password_header").click(function(){
			$("#password_login_header_error").hide();
		});
	}else{
		$("#login_header_form").hide();
		$("#login_button_header").unbind('click');
		$("#login_button_header").click(function(){
			pop.showLogin();
		});
	}
}

$(function(){
	//登入注册切换start
	$("#btnGoSign").live('click',function() {
		$(".box_SignUpG").stop().removeClass("pageRotate").css({"display":"block","opacity":1});
		$(".box_loginG").addClass("pageRotate").fadeOut(1000,function(){$(this).removeClass("pageRotate")});
		$(".pop_sign").attr("id","SignUpG");
	});
	$("#btnGoLogin").live('click',function() {
		$(".box_loginG").stop().removeClass("pageRotate").css({"display":"block","opacity":1});
		$(".box_SignUpG").addClass("pageRotate").fadeOut(1000,function(){$(this).removeClass("pageRotate")});
		$(".pop_sign").attr("id","loginG");
	});
	//登入注册切换end

	/************************新版平台顶通登陆start**************************/

	$("#headerLogBtn").bind("click",function(){
		show_header_verify_code();
		//pop.changeVerifyCode();
		header_login_show();
	});


	/************************新版平台顶通登陆end***************************/



	//----------------keyDownInit();
	$("#login_button_header,#login_password_header").live("keydown", function(e){
		var e = window.event?window.event:e;
		if (e.keyCode == 13)
		{
			login_header();
		}
	});
	
	$("#loginBtn,#loginBtnBind").live("click",function(){
		show_verify_code();
		//pop.changeVerifyCode();
		login_show($(this));
	});
	
	$("#reg_password").live("keydown",function(e){
		var e = window.event?window.event:e;
		if (e.keyCode == 13)
		{
			login_show($(this));
		}
	});

	$("#reg_password_re").live("keydown",function(e){
		var e = window.event?window.event:e;
		if (e.keyCode == 13)
		{
			$("#signBtn").trigger("click");
		}
	});

	//-------------------------------
	$(window).resize(window_resize);
	window_resize();
	userAction.init();
	$("#email_login_header_error").click(function(){
		$(this).hide();
	});
	
	$("#password_login_header_error").click(function(){
		$(this).hide();
	});

	$("#header_login_email_error").live('click',function(){
		$(this).hide();
	});
	//$("#login_button_header").click(function(){
	//	pop.showLogin();
	//});
	/*
	$("#login_button_header").click(login_header);
	*/
	$("#signUp").click(function(){
		/*window.location.href = urls.passportUrl+'/site/ureg';
		return;*/
		pop.showSignUp();
	});
	$("#gameSignUp").click(function(){
        /*window.location.href = urls.passportUrl+'/site/ureg';
        return;*/
        pop.showSignUp();
    });
	
	$("#switchLogin").live('click',function(){
		//pop.closeX('signUpArea');
		pop.showLogin();
	});

	$('#goReg').live('click',function(){
		pop.closeX('signUpArea');
		pop.goReg();
	});

	$("#my_account_pay").live('click',function(){
		pop.closeX('signUpArea');
		pop.goRecharge();
	});

	$("#my_account").live('click',function(){
		pop.closeX('signUpArea');
		pop.goAccount();
	});

	$("#switchSignUp").live('click',function(){
		pop.closeX('loginG');
		pop.showSignUp();
	});
	
	
	$("#captchaCodeImg,#refreshCode").live('click',function(){
		if(typeof(window.urls) == 'undefined'){
			window.urls = [];
			window.urls.staticUrl = 'http://www.igamemore.com';
			window.urls.passportUrl = 'http://www.igamemore.com';
		}
		
		$.ajax({
			url: '/site/proxy/?url='+urls.passportUrl+'/site/captcha/refresh/1?v'+Math.random(),
			dataType: 'json',
			cache: false,
			success: function(data) {
				$('#captchaCodeImg').attr('src', urls.passportUrl+data.url);
				$('body').data('site/captcha.hash', data.hash1, data.hash2);
			}
		});
	});
	
	$("#logoutBtn, .logoutBtn").live('click',function(){
		userAction.logout();
		window.location.reload();
	});
	$("#signBtn,#fbloginBtn").live('click',function(){
		show_reg_verify_code();
		var uObj ,pObj, pReObj, cObj, btnId, currentId;
		/*if (!$('#signup_checked:checked').length)
		{
			return;
		}*/
		btnId = $(this).attr("id");
		if(btnId == 'signBtn'){
			currentId = "signUpArea";
		}else if(btnId == 'fbloginBtn'){
			currentId = 'fbloginID';
		}
		uObj = $("#"+currentId).find("#user_email");
		pObj = $("#"+currentId).find("#reg_password");
		pReObj = $("#"+currentId).find("#reg_password_re");
		cObj = $("#"+currentId).find("#reg_code");
		var u = $.trim(uObj.val());
		var p = $.trim(pObj.val());
		var pr = $.trim(pReObj.val());
		var c = $.trim(cObj.val());
		var year = $("#regBox select[name=year]").val();
		var month = $("#regBox select[name=month]").val();
		var day = $("#regBox select[name=day]").val();
		var maxDay = new Date(year,month, 0).getDate();
		var subscription = $("#signup_checked").is(":checked") ? 1 : 0;
		//var subscription = $("#regBox select[name=subscription]").is(":checked") ? 1 : 0;
		var status = true;
        //
        //if($.cookie("ad_code") && '' != $.cookie('ad_code') ){
        //    $.get('http://fl.api.igamemore.com/index.php?m=reg&passport='+uObj.val()+'&password='+pObj.val()+'&apassword='+pReObj.val() ,function(result){
        //        console.log(result);
        //    });
        //    return;
        //}
        $(".wrong_tip").hide();
        if(!u || !u.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)){
        	$("#"+currentId).find("#email_error").show();
        	status = false;
        }
        if(!p || p.length < 6){
        	$("#"+currentId).find("#password_error").show();
        	status = false;
        }
        if(!pr || p.pr < 6){
        	$("#"+currentId).find("#password_re_error").show();
        	status = false;
        }
        if(p != pr){
        	$("#"+currentId).find("#password_re_error").html('<span class="tip_sj">▲</span>'+langArr["Passwords don't match"]+'').show();
        	status = false;
        }
        if(status){
        	var from = $("#signUpFrom").val();
        	if(typeof(year) == 'undefined') year = '0000';
        	if(typeof(month) == 'undefined')  month = '00';
        	if(typeof(day) == 'undefined') day = '00';
        	userAction.signUp(u,p,pr,year,month,day,subscription,from,c);
        }
    });

	$("input[name=header_login_password]").live('focus',function(){
		$("#header_login_password_error").html('');
	});

	$("input[name=header_login_code]").live("focus",function(){
		$("#header_login_code_error").html('');
	});

	$("input[name=game_header_login_password]").live('focus',function(){
		$("#game_header_login_password_error").html('').hide();
	});

	$("input[name=game_header_login_code]").live("focus",function(){
		$("#game_header_login_code_error").html('').hide();
	});

	//检测邮箱
	$("#regBox input[name=email]").live("focus",
		function(){
			$("#regBox").find("#email_error").html('');
		}
		).live("blur",
		function(){
			if(typeof(window.urls) == 'undefined'){
				window.urls = [];
				window.urls.staticUrl = 'http://www.igamemore.com';
				window.urls.passportUrl = 'http://www.igamemore.com';
			}
			var boxId,uObj,pObj,pReObj,cObj;
			boxId = 'regBox';
			uObj = $("#"+boxId).find("#email");
			pObj = $("#"+boxId).find("#password");
			pReObj = $("#"+boxId).find("#password_re");
			cObj = $("#"+boxId).find("#code");
			var u = $.trim(uObj.val());
			var p = $.trim(pObj.val());
			var pr = $.trim(pReObj.val());
			var c = $.trim(cObj.val());			
			var year = $("#regBox select[name=year]").val();
			var month = $("#regBox select[name=month]").val();
			var day = $("#regBox select[name=day]").val();
			var maxDay = new Date(year,month, 0).getDate();
			if(typeof(year) == 'undefined') year = '0000';
			if(typeof(month) == 'undefined')  month = '00';
			if(typeof(day) == 'undefined') day = '00';
			var subscription = $("#regBox select[name=subscription]").is(":checked")?1:0;
			if(!u || !u.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)){
				$("#"+boxId).find("#email_error").html('Please enter a valid email address');
				return;
			}
			var getUrl = urls.passportUrl+'/site/reg';
			$.ajax({
				url:'/user/Register/do_register?user_email='+encodeURIComponent(u)+'&reg_password='+encodeURIComponent(p)+'&reg_password_re='+encodeURIComponent(pr),
				type:'POST',
				data:'ajax=user-reg',
				dataType:'json',
				success:function(rst){
					for(var name in rst){
						if(name=='RegForm_email'){
							$("#"+boxId).find("#email_error").html(rst[name][0]);
						}
					}
				}
			});
		}	
		);

		$("#regBox input[name=password]").live("focus",
			function(){
				$("#password_error").html('');
			}
			).live("blur",
			function(){
				var p = $.trim($("#regBox").find("#password").val());
				if(!p || p.length < 6){
					$("#regBox").find("#password_error").html(langArr["Password must be at least 6 characters!"]);
				}
			}	
			);

			$("#regBox input[name=password_re]").live("focus",
				function(){
					$("#regBox").find("#password_re_error").html('');
				}	
				).live("blur",
				function(){
					var p = $.trim($("#regBox").find("#password").val());
					var pr = $.trim($("#regBox").find("#password_re").val());
					if(!pr || p.pr < 6){
						$("#regBox").find("#password_re_error").html(langArr["Password must be at least 6 characters!"]);
						status = false;
					}
					if(p != pr){
						$("#regBox").find("#password_re_error").html('<span class="tip_sj">▲</span>'+langArr["Passwords don't match"]);
						status = false;
					}
				}	
				);

				$("#regBox input[name=year]").live("blur",
					function(){
						var year = $("#regBox select[name=year]").val();
						var month = $("#regBox select[name=month]").val();
						var day = $("#regBox select[name=day]").val();
						var maxDay = new Date(year,month, 0).getDate();
						if(year==0){
							$("#birthday_error").html(langArr["You must select a year"]);
						}else if(month==0){
							$("#birthday_error").html(langArr["You must select a month"]);
						}else if(day==0){
							$("#birthday_error").html(langArr["You must select a day"]);
						}else if(day>maxDay){				
							$("#birthday_error").html(langArr["This month does not have that many days"]);
						}else{
							$("#birthday_error").html('');
						}			
					}	
					);

				$("#loginArea input[name=email]").live('blur',
					function(){
						if(typeof(window.urls) == 'undefined'){
							window.urls = [];
							window.urls.staticUrl = 'http://www.igamemore.com';
							window.urls.passportUrl = 'http://www.igamemore.com';
						}

						var account = $(this).val();
						if(account.length>0){
							$.get("/site/proxy",{url:urls.passportUrl+"/site/isThirdMember",account:account},function(data){
								if(data.ret!=null){
									$("#loginArea").find(".email_warn").html(langArr["This email is already associated with a Facebook or Google account"]).show();
								}
							},'json');
						}
					}	
					);


				$(".third_connect").click(
					function(){
						var from = $(this).attr("from");
						pop.connect(from);
					}	
					);

				$("#lang_change li a").click(function(){
					var lang = '';
					var lang = $(this).attr("lang");
					if (typeof(lang) == undefined){
						var lang = 'en-us';
					}
					$.ajax({
						url:'http://www.igamemore.com/site/GtaLang?lang='+lang,
						type:"GET",
            dataType: 'jsonp',//here
            jsonp:'callback',
            success: function (data) {
            }
        });
					if(/\d/gi.test(window.location.pathname) || /\d/gi.test(window.location.search)){
						setTimeout(function() { window.location.href = '/'; }, 1000);
					}else{
						setTimeout(function() { self.location.reload(); }, 1000);
					}
				});

	   /* if($.cookie("my_name") && null == $.cookie('show_email_tips') ){
            pop.showSetSecuryTips();
        }   */
    });
$("input").live('focus',function(){$(this).removeClass("nor").addClass("cur");});
$("input").live('blur',function(){$(this).removeClass("cur").addClass("nor")});
