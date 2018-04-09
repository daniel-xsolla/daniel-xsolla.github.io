var payment = {
	picProp : new prompt(),
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
	noRoleInfo: function() {
		var html = '<div class="popUp_warning" id="noRoleInfoArea">\
		<div class="popUp_head">\
		<a href="javascript:;" id="noRoleInfoCloseBtn" class="btn_close" title="Close">x</a>\
		<div class="title"><p>'+langArr["warning"]+'</p></div>\
		</div>\
		<div class="popUp_main">\
		<p class="warning_main" style="text-align:center;">'+langArr["Do not have a character on this server!"]+'</p>\
		<div class="btn_warning">\
		<a href="javascript:;" onclick="payment.closeX(\'noRoleInfoArea\');" class="btn_ok">OK</a>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#noRoleInfoCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},
	channelError: function(msg) {
		var html = '<div class="popUp_warning" id="channelErrorArea">\
		<div class="popUp_head">\
		<a href="javascript:;" id="channelErrorCloseBtn" class="btn_close" title="Close">x</a>\
		<div class="title"><p>'+langArr["warning"]+'</p></div>\
		</div>\
		<div class="popUp_main">\
		<p class="warning_main" style="text-align:center;">'+msg+'</p>\
		<div class="btn_warning">\
		<a href="javascript:;" onclick="payment.closeX(\'channelErrorArea\');" class="btn_ok">OK</a>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#channelErrorCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},
	vipError: function() {
		var html = '<div class="GTpopBar GTpopBar2" id="vipErrorArea" >\
		<div class="planbt">\
		<p class="lantxt t_warning">Warning!</p>\
		<a href="javascript:;" class="p_close" id="vipErrorCloseBtn">close</a>\
		</div>\
		<div class="warn_cont">\
		<p class="t_warn01">VIP already activated on this server!</p>\
		<p class="button_warn"><a href="javascript:;" class="btn" id="closeOk" onclick="payment.closeX(\'vipErrorArea\');">OK</a></p>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#vipErrorCloseBtn').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},
	afterSubmitForm:function(){
		var html = '<div class="popUp_warning">\
		<div class="popUp_head">\
		<a href="javascript:;" class="btn_close" id="afterSubmitFormPopX" title="Close">x</a>\
		<div class="title"><p>'+langArr["warning"]+'</p></div>\
		</div>\
		<div class="popUp_main">\
		<p class="warning_main">'+langArr["Recharge finish payment in the new payment page open please. Please do not close the window before making payment or refresher"]+'</p>\
		<div class="btn_warning">\
		<a href="'+'/chargeV3/history">'+langArr["Results recharging"]+'</a>\
		<a href="'+'/payment/" class="btn_blue">'+langArr["Re-recharged"]+'</a>\
		</div>\
		</div>\
		</div>';
		this.picProp.init(html, function(o){
			o.container.find('#afterSubmitFormPopX').click(function() {
				o.container.remove();
				background().hide();
				return false;
			});
		}).show();
	},
	getServer:function(gameId,sid){
		$.ajax({
			url:'/pay/index/getserver',
			type:'GET',
			data:{"gid":gameId,"sid":sid},
			cache:false,
			dataType:'json',
			success:function(rst){
				if(rst.status == 1){
					$("#server_id").html(rst.options);
				}
			}
		});
	},
	checkRole:function(uid,gameId,serverId){
		$.ajax({
			url:'/pay/index/checkRole',
			type:'GET',
			data:'uid='+uid+'&gid='+gameId+'&sid='+serverId,
			cache:false,
			dataType:'json',
			async:false,
			success:function(rst){
				if(rst.status == 1){
					return true;
				}else{
					return false;
				}
			}
		});
	},
	calculateMoney:function(gameId){
		var money = $("#money").val();
		var ratio = $("#channelRatio").val();
		var unit = allCurrency[gameId];
		var html = money * ratio * allGameRatio[gameId];
		var show = html + ' '+unit;
		$("#show_money").html(show);
	},
	paymentRes:function(rst, payType){
		if(rst.status == 1){
			if(payType == 'VIP'){
				if(rst.vipStatus == 0){
					payment.channelCheck();
				}else{
					payment.vipError();
				}
			}else{
				payment.channelCheck();
			}
		}else{
			payment.noRoleInfo();
		}
	},
	checkRoleExistServer:function (rst){
		if(rst.status == 0){
			$('#role_game').hide();
			$('.form_pay .role_wrong_tip').show();
		}else{
			$('.form_pay .role_wrong_tip').hide();
			$('#role_game').find('.searching').hide();
			$('#role_game').find('span').html(rst.role_name);
		}
	},
	resOrCheck:function(checke){
		var _this = this;
		var gid = $("#game_id option:selected").val();
		var sid = $("#server_id option:selected").val();
		var uid = $("#account").val();
		var payType = $("#payType").val();
		if(gid != '' && sid != '' && uid != ''){
			$.ajax({
				url:'/pay/index/checkRole',
				type:'GET',
				data:'uid='+uid+'&gid='+gid+'&sid='+sid,
				cache:false,
				dataType:'json',
				async:false,
				success: function(rst){
					if (checke) {
						_this.checkRoleExistServer(rst);
					}else{
						_this.paymentRes(rst, payType);
					}
				}
			});
		}
	},
	channelCheck:function(){
		var game_id = $("#game_id option:selected").val();
		var server_id = $('#server_id option:selected').val();
		var money = $('.item_list li.selected').attr('npayvalue');
		var account = $("#account").val();
		var channel_id = $("#channel_id").val();
		// 额外的参数
		var payment_method = $("#payment_method").val();

		var item_id = $('.item_list li.selected').attr('itemid');
		var order = $("#order").val();
		var ps_code = $('.channel_list li.selected').attr('ps_code');
		var submit_url = $(".form_pay").attr("action");
		
		if(ps_code==""){
			alert('please choose pay type');
		}
		if(money==""){
			alert('please choose pay money');
		}
		
		if(ps_code=="Xsolla"){
			$.ajax({
				url:'/pay/index/xsolla',
				type:'POST',
				data:{game_id:game_id,server_id:server_id,money:money,item_id:item_id,account:account,channel_id:channel_id,ps_code:ps_code,order:order,payment_method:payment_method},
				cache:false,
				dataType:'json',
				success:function(rst){
					if(rst.status == 1){
						var options = {
         							access_token: rst.token, //TODO 备忘录 使用上一步接收到的访问令牌
         							//sandbox: true //TODO 备忘录 上线时请不要忘记移除此设置
         						};
         						var s = document.createElement('script');
         						s.type = "text/javascript";
         						s.async = true;
         						s.src = "https://static.xsolla.com/embed/paystation/1.0.5/widget.min.js";
         						var head = document.getElementsByTagName('head')[0];
         						head.appendChild(s);
         						s.addEventListener('load', function (e) {
         							XPayStationWidget.init(options);
         							$("#btnCheck").trigger('click');
         						}, false);
         						
         					}else if(rst.status == 3){
         						alert('The order number is existence,please Refresh the page ');
         						location.reload();
         					}else{
         						alert('error,please Binding email ');
         					}
         				}
         			});
		}else{
			$("#submitForm").trigger('click');
		}

//
// if(channel_id != ''){
	// 	$.ajax({
		// 		url:'/payment/default/checkChannel',
		// 		type:'POST',
		// 		data:{cid:channel_id,submit_url:submit_url,item_id:item_id,game_id:gameId,server_id:serverId},
		// 		cache:false,
		// 		dataType:'json',
		// 		async:false,
		// 		success: function(rst){
			// 			if (rst.status==1) {
				// 				//$("#payForm").submit();
				// 				payment.afterSubmitForm();
				// 			}else{
					// 				payment.channelError(rst.msg);
					// 			}
					// 		}
					// 	});
					// }
				},
				reloadPage:function (gameId,serverId){
					//先解除click事件绑定
					$("#payBtn").unbind('click', payClick);
					if(160==gameId){
						var param='gameId='+gameId+'&serverId='+serverId;
					}else{
						var param='gameId='+gameId;
					}
					$.ajax({
						url:'/payment/default/reloadPage',
						type:'GET',
						data:param,
						cache:false,
						dataType:'json',
						success:function(rst){
							if(rst.status == 1){
								$("#payBtn").bind('click', payClick);
								$("#pay").html(rst.content);
								var money = $('.item_list li.selected').attr('npayvalue');
								var item_desc = $('.item_list li.selected').attr('npaydesc');
								var item_name=$('.item_list li.selected').attr('npayname');
								var item_id = $('.item_list li.selected').attr('itemid');
								var amount = $('.item_list li.selected').attr('npayamount');
								var gameId = $("#game_id option:selected").val();
								var tax = 0;
								var tax_desc = '';
								if(gameId!=125&&gameId!=57&&gameId!=62){
									tax = $('.channel_list li.selected').attr('npaytax');
									tax_desc = $('.channel_list li.selected').attr('tax_desc');
								}
								if(tax_desc==''){
									$('.tip_method').hide();
								}else{
									$('.tip_method').html(tax_desc);
									$('.tip_method').show();
								}
								$('#money').val(money);
								$('#item_id').val(item_id);
								$('#item_diamonds').html(amount+' '+item_name);

								if(item_desc==''){
									$('#item_gold').html('--');
								}else{
									$('#item_gold').html(item_desc);
								}
								/*if(160==gameId){
									var flag = $("#server_id option:selected").attr('t');
									if(1==flag){
										$('#item_price i').html('€ ');
										var o = parseFloat(money)-parseFloat(Math.ceil(money)*0.2);
										$('#item_price span').html((o+parseFloat(Math.ceil(o)*tax)).toFixed(2));
									}else{
										$('#item_price i').html('$ ');
										$('#item_price span').html((parseFloat(money)+parseFloat(Math.ceil(money)*tax)).toFixed(2));
									}
								}else{
									$('#item_price i').html('$ ');
									$('#item_price span').html((parseFloat(money)+parseFloat(Math.ceil(money)*tax)).toFixed(2));
								}*/
								$('#item_price i').html('$ ');
								$('#item_price span').html((parseFloat(money)+parseFloat(Math.ceil(money)*tax)).toFixed(2));
							}
						}
					});
				},
				//点击左侧支付类型,重置右侧支付渠道
				reloadChannel:function (){
					//先解除click事件绑定
					$("#payBtn").unbind('click', payClick);
					$.ajax({
						url:'/payment/default/reloadChannel',
						type:'GET',
						data:'methodId='+$("#method_id").val(),
						cache:false,
						dataType:'json',
						success:function(rst){
							if(rst.status == 1){
								$("#payBtn").bind('click', payClick);
								$("#manner").html(rst.content);
								var gameId = $('#game_id').val();
								var submitUrl = $('.channel_list li.selected').attr('submit_url');
								var channelId = $('.channel_list li.selected').attr('channel_id');
								var mannerId = $('.channel_list li.selected').attr('mannerId');
								var ps_code = $('.channel_list li.selected').attr('ps_code');
								var country_code = $('.channel_list li.selected').attr('country_code');
								var money=$('.item_list li.selected').attr('npayvalue');
								$("#channel_id").val(channelId);
								$('#manner_id').val(mannerId);
								$('#ps_code').val(ps_code);
								$('#country_code').val(country_code);
								var tax = 0;
								var tax_desc = '';
								if(gameId!=125&&gameId!=57&&gameId!=62){
									tax = $('.channel_list li.selected').attr('npaytax');
									tax_desc = $('.channel_list li.selected').attr('tax_desc');
								}
								if(tax_desc==''){
									$('.tip_method').hide();
								}else{
									$('.tip_method').html(tax_desc);
									$('.tip_method').show();
								}
								$('#item_price i').html('$ ');
								$('#item_price span').html((parseFloat(money)+parseFloat(Math.ceil(money)*tax)).toFixed(2));
								$(".form_pay").attr("action",submitUrl);
							}
						}
					});
				},

				worldPayCycle: function() {
					var html = '<div class="popWrap" id="worldPayArea">\
					<div class="popUp_head">\
					<a href="javascript:;" id="worldPayCycleCloseBtn" class="btn_close" title="Close">x</a>\
					<div class="title"><p>WorldPay</p></div>\
					</div>\
					<div class="pop-f">\
					<p class="tt">'+langArr["Your payment will be processed via credit card has on file WorldPay"]+' (<span id="worldPayCycleCardNum"></span>).</p>\
					<p class="pop-btn f-cb">\
					<a href="javascript:;" onclick="checkWorldPayCycle(1)" class="btn-ok">'+langArr["next"]+'</a>\
					</p>\
					<p class="n-txt1"><a href="javascript:;" onclick="checkWorldPayCycle(0)">'+langArr["Use another card"]+'</a></p>\
					</div>\
					</div>';

					this.picProp.init(html, function(o){
						o.container.find('#worldPayCycleCloseBtn').click(function() {
							o.container.remove();
							background().hide();
							return false;
						});
					}).show();
				},

			};

			function checkWorldPayCycle(val){
				$("#worldPayCycle").attr('value',val);
				payment.closeX('worldPayArea');
				payment.resOrCheck(0);
			}

			$(function(){
				var gameId = $("#game_id option:selected").val();
				var sid = $(".default_server").val();
				if(gameId == 'undefined' || 0 >= gameId) gameId = $("#game_id option:eq(1)").val();
				if(gameId == 'undefined' || 0 >= gameId) gameId = 69;
				var default_server_id = $("#default_server_id").val();
	if(gameId && (default_server_id == '' || default_server_id == null || default_server_id == 0)){//have default gameid need to get server
		payment.getServer(gameId,sid);
	}
	inputMoney = $("#input_money_text").val();
	if(inputMoney != 'undefined' && inputMoney > 0){
		$("#money").val($("#input_money_text").val());
	}
	inputListMoney = $("#input_money_list option:selected").val();
	if(inputListMoney != 'undefined' && inputListMoney > 0){
		$("#money").val($("#input_money_list option:selected").val());
	}
	if(gameId && $("#money").val() > 0){//have gameid and money -> calculate money
		payment.calculateMoney(gameId);
	}
	$("#game_id").change(function(){
		gameId = $("#game_id option:selected").val();

		/* 检测2.99元充值是否充值过 pzb <peizebin@foxmail.com> */
		var account = $("#account").val();
		$.ajax({
			url:"/pay/index/payFirst",
			type:'GET',
			data:{gameId:gameId,account:account},
			cache:true,
			dataType:'json',
			success:function(rst){
				if(rst.status == 1){
					$('li[itemid="43"]').remove();
				}else{
					$('li[itemid="43"]').attr('style','');
				}
			}
		});

		/* 切换游戏时，切换金币卡片 pzb <peizebin@foxmail.com> 2016-11-29 */
		$(".right_side ul li").removeClass('selected');

		$("#game"+gameId+" li").first().addClass("selected");
		var money = $('.item_list li.selected').attr('npayvalue');
		
		var item_name=$('.item_list li.selected').attr('npayname');
		var item_id = $('.item_list li.selected').attr('itemid');
		var amount = $('.item_list li.selected').attr('npayamount');
		var npaydescs = $('.item_list li.selected').attr('npaydesc');
		$('#money').val(money);
		$('#item_id').val(item_id);


		if(typeof(npaydescs)=='undefined' || npaydescs=='' ){
			$('#item_gold').html('--');
		}else{
			$('#item_gold').html(npaydescs);
		}

		if(typeof(money)=='undefined' || money==''){
			$("#item_price em span").html('--');
		}else{
			$("#item_price em span").html(money);
		}

		if(typeof(amount)=='undefined' || amount==''){
			$('#item_diamonds').html('--');
		}else{
			$('#item_diamonds').html(amount+' '+item_name);
		}
		
		$('#item_price em i span').html(money);
		$("#item_gold").html(npaydescs);
		$('#item_diamonds').html(amount+' '+item_name);



		$('#role_game').find('span').html('');
		$('#role_game').hide();
		if(gameId){
			payment.getServer(gameId);
		}


		if(gameId && $("#money").val()){
			payment.calculateMoney(gameId);
		}
	});

	$('.payment_list li').click(function(){
		var methodId = $(this).attr('method_id');
		$("#method_id").val(methodId);
		$('.payment_list a').removeClass('current');
		$(this).find('a').addClass('current');
		payment.reloadChannel();
	});

	$("#input_money_list").change(function(){
		var value = $("#input_money_list option:selected").val();
		$("#money").val(value);
		var gameId = $("#game_id option:selected").val();
		if(gameId){
			payment.calculateMoney(gameId);
		}
	});
	$("#input_money_text").keyup(function(){
		var value = $(this).val();
		$("#money").val(value);
		var gameId = $("#game_id option:selected").val();
		if(gameId){
			payment.calculateMoney(gameId);
		}
	});


	//vip充值radio
    /*var channelId = $(".payment_list a.current").parent().attr('channel_id');//$("input[name='channels_radio']:checked").val();
    //console.log(channelId);
    $("#channel_id").val(channelId);
	$(".form_pay").attr("action",actionUrl[channelId]);
	$("input[name='channels_radio']").click(function(){
		var channelId = $("input[name='channels_radio']:checked").val();
		$("#channel_id").val(channelId);
		$("#payForm").attr("action",actionUrl[channelId]);
	});*/

	//vip充值radio end
	payClick = function(){
        if((4 == $("#channel_id").val()) && (1 == $("#hadWorldPay").val())){//线上是4 测试是1
        	payment.worldPayCycle();
        	$("#worldPayCycleCardNum").text($("#WorldPayCard").val());
        }else{
        	payment.resOrCheck(0);
        }
    }

    $("#payBtn").click(payClick);

    $("#server_id").change(function(){
    	$('#role_game').show();
    	$('#role_game').find('.searching').show();
    	$game_id = $('#game_id').val();
    	$server_id = $("#server_id").val();
    	$('.product_list li:eq(0) a').attr("href", "http://user.gtarcade.com/payment/default?payType=Games&gameId="+$game_id+"&serverId="+$server_id);
    	$('.product_list li:eq(1) a').attr("href", "http://user.gtarcade.com/payment/default?payType=VIP&gameId="+$game_id+"&serverId="+$server_id);
    	payment.resOrCheck(1);
    });

});