// 弹窗
function prompt(win){
	var _this = this;
	this.win = win || window;
	this.init = function(content, callback){
		// 开始初始化
		if(!content){
			throw new Error('Argument is invaild');
			return;
		}
		this.callback = callback;
		var content = content,
			getTop = this.win.document.body || this.win.documentElement,
			// 获取容器
			container = typeof content == 'string' ? $(content).hide().appendTo(getTop) :
				(content instanceof jQuery ? content : $(content)).clone(true).hide().appendTo(getTop);
		// 检测容器是否存在。
		if(!container.length) {
			throw new Error('Empty object');
			return;
		}
		// 绑定给对象
		this.container = container;
		return this;
	}
	this.layout = function(callback) {
		if(!this.container){
			throw new Error('Must be init');
			return;
		}
		typeof callback === "function" && callback(this);
		return this;
	}
	this.show = function() {
		// 布局这个浮层的位置。
		var ofs = this.getOffset();
		this.container.css({
			position:'absolute',
			left: ofs.left,
			top: ofs.top,
			display:'block',
			zIndex:1000000
		});
		this.backgroundObj = background({opacity:0.5}).show();
		typeof this.callback === 'function' && this.callback(this);
	}
	this.hide = function(){
		this.container.hide();
		background().hide();
	}
	this.remove = function(){
		this.container && this.container.remove();
		this.container = null;
	}
	
	// 获取浮动层的偏移量
	this.getOffset = function() {
		var ofs = {}, win = $(_this.win);
		ofs.docWidth = $(_this.win.document.body).width();
		ofs.docHeight = $(_this.win).height();
		ofs.winHeight = win.height();
		ofs.winWidth = win.width();
		ofs.conWidth = $(_this.container).width();
		ofs.conHeight = $(_this.container).height();
		
		ofs.left = Math.max(0, win.scrollLeft() + (ofs.winWidth - ofs.conWidth ) / 2),
		ofs.top = Math.max(0, win.scrollTop() + (ofs.winHeight - ofs.conHeight)/2 );
		
		var top2 = Math.min(ofs.docHeight - ofs.conHeight - 10, ofs.top);
		/*if(top2 > 0){
			ofs.top = top2;
		}*/
		return ofs;
	}
	
	// 监控 window 对象的 resize 事件
	$(this.win).resize(function() {
		var ofs = _this.getOffset();

		$(_this.backgroundObj).css({"width":ofs.docWidth+"px", "height":ofs.docHeight+"px"});
		$(_this.container).css({"left": ofs.left+"px", "top": ofs.top+"px"});
	}).scroll(function() {
		var ofs = _this.getOffset();
		$(_this.container).css({"top": ofs.top+"px"});
	});
}

//德法域名跳转
(function(){
    var url = window.location.href;
    if(url.indexOf(".gtarcade.de") >= 0 ){
        $.ajax({
            url:'http://www.gtarcade.com/site/GtaLang?lang=de-de',
            type:"GET",
            dataType: 'jsonp',//here
            jsonp:'callback',
            success: function (data) {
            }
        });
        setTimeout(function() { window.location.href = url.replace(".gtarcade.de", ".gtarcade.com"); }, 1000);

    }
    if(url.indexOf(".gtarcade.fr") >= 0 ){
        $.ajax({
            url:'http://www.gtarcade.com/site/GtaLang?lang=fr-fr',
            type:"GET",
            dataType: 'jsonp',//here
            jsonp:'callback',
            success: function (data) {
            }
        });
        setTimeout(function() { window.location.href = url.replace(".gtarcade.fr", ".gtarcade.com"); }, 1000);
    }




})();