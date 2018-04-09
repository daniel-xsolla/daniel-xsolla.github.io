// 包装的等待载入效果。
var isFF = navigator.userAgent.indexOf("Firefox")!=-1;
var getLoad = {
    setUrl : function(url,config){
        return function(fn){return typeof url!=='string' || !url ? alert('url参数缺失') : jQuery.ajax({
                url:url,
                type:config.type || "POST",
                dataType:config.process || "JSON",
                timeout:50000,
                data:config.data || {},
                beforeSend:function() {
                    loadBoard.open();
                },
                error:function() {
                    return loadBoard.close(),alert('数据异常');
                },
                success:function(data) {
                    loadBoard.close();
                    jQuery.isFunction(fn) && fn(data,config);
                }
            });
        }
    }
}
var dom = {
    byId:function(s){
        return com.isString(s) ? document.getElementById(s) : null;
    }
    ,byTag:function(s){
        return com.isString(s) ? document.getElementsByTagName(s) : null;
    }
    ,byClass:function(s){
        return com.isString(s) ? function(o){
            if(document.getElementsClassName)return document.getElementsClassName(o);
            var ele = dom.byTag('*'),bk=[];
            for(var i=0,l=ele.length;i<l;i++){
                ele[i].className == o && bk.push(ele[i]);
            }
            return bk;
        }(s) : null; 
    }
    ,domArr:function(o,cbk){
        if(!o)return [];
        if(!cbk || !com.isFunction(cbk))return Array.prototype.slice.call(o);
        var temp = [];
        for(var i=0,l=o.length;i<l;i++){
            temp.push(cbk.call(null,o[i]));
        }
        return temp;
    }
    // 判断加载完毕，except:css。
    ,ifrIsReady:function(iframe,cbck,arg){
        if(!com.isFunction(cbck) || !iframe)return;
        var arg = com.isArray(arg) ? arg : Array.prototype.slice.call(arguments,2);
        if (window.attachEvent){
            iframe.onreadystatechange=function(){
                if(iframe.readyState == 'loaded' || iframe.readyState == 'complete'){cbck.apply(null,arg)}
            }
        } else {
            iframe.onload = function(){cbck.apply(null,arg)};
        }
    }
    ,loadJs:function(url,cbk){
        if(!com.isString(url))return;
        var server = document.createElement('script');
        server.src = url;
        server.type = 'text/javascript';
        document.body.appendChild(server);
        dom.ifrIsReady(server,cbk);
    }
    // 模拟绑定监听事件。
    ,bindLister : function(el,type,handle,arg){
        if(!el || !type ||!com.isFunction(handle))return;
        var arg = com.isArray(arg) ? arg : Array.prototype.slice.call(arguments,3);
        if(window.attachEvent){
            el.attachEvent('on'+type,function(){
                handle.apply(null,arg);
            })
        }else if(window.addEventListerner){
            el.addEventListerner(type,function(){
                handle.apply(null,arg);
            },false);
        }else{
            el['on'+type] = function(){
                handle.apply(null,arg);
            };
        }
    }
    ,stopPargation:function(){
        var e = window.event || arguments.callee.caller.arguments[0];
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble=true;
        }
    }
}
// \u4E00-\u9FA5  中文正则
var com = {
    // 验证函数中的实参和形参是否匹配，如果必须一一对应方可使用
    ckArguments : function(){
        var undefined = void 0,o = arguments.callee.caller.arguments,f = arguments.callee.caller;
        if(o === undefined || f===undefined || o.length!=f.length)return false;
        for(var i=0,l=o.length;i<l;i++){
            if(!o[i])return false;
        }
        return true;    
    }
    ,getType : function(o){
        return Object.prototype.toString.call(o).slice(8,-1);
    }
    // 把数组按照p在前n在后的顺序拼接成一个字符串。
    ,warpSh:function(o,p,n){
        if(!top.com.isArray(o))return '';
        var p = top.com.isString(p) ? p : '',n = top.com.isString(n) ? n : '';
        return p+o.join(n+p)+n;
    }
    ,isArray : function(o){
        return this.getType(o)==='Array';
    }
    ,isString : function(o){
        return typeof o === 'string';
    }
    ,isFunction : function(o){
        return this.getType(o)==='Function';
    }
    ,isNumber:function(o){
        return typeof o === 'number';
    }
    // 刷新某个帧
    ,frameFresh:function(i){
        window.frames[i].location.reload(1);
    }
    // 模拟继承，k默认是可覆盖，如果不需要覆盖设置为true的表达式
    ,extend : function(o,b,k){
        if(!o || !b)return;
        var k = k === void 0 || !k;
        for(var s in b){
            if(b.hasOwnProperty(s)){
                if(o[s]!=void 0)
                {
                    if(k){o[s] = b[s];}else{continue;}
                }
                o[s] = b[s];
            }
        }
    }
    // 把对象解析成url参数
    ,parseParam : function(o){
        if(!o)return '';
        var s=[];
        for(var k in o){
            o.hasOwnProperty(k) && s.push(k+'='+o[k]);
        }
        return s.join('&');
    }
    // 克隆对象。数组和对象都可以。
    ,cloneObject : function(o){
        if(!o)return o;
        switch(Object.prototype.toString.call(o)){
            case '[object Array]':
            var t = [];
            for(var i=0,l=o.length;i<l;i++){
                t.push(arguments.callee(o[i]));
            }
            return t;
            case '[object Object]':
            var t = {};
            for(var k in o){
                if(o.hasOwnProperty(k)){
                    t[k]= arguments.callee(o[k]);
                }
            }
            return t;
            default:
                return o;
        }
    }
    // 得到url参数的某个值，默认是取当前的window
    ,getParam : function(k,w,str){
        if(!com.isString(k))return;
        var w = w || window;
        return new RegExp('[&\\?]\\??'+k+'=([^&]*)').test(com.isString(str) ? str : w.location.search) ? RegExp.$1 : null;
    }
    // 去掉形如url参数中的某个键值。
    ,delParam : function(str,k){
        if(!com.isString(str))return;
        return str.replace(new RegExp('[&\\?]\\??'+k+'=[^&]*','img'),'');
    }
    // 设置形如url参数的字符串。
    ,setParam : function(str,k,v){
        if(com.getParam(k,null,str)){
            str = com.delParam(str,k);
        }
        return str+='&'+k+'='+v;
    }
    // 把url参数中的get值转化成object。
    ,parseParam:function(w){
        var w = w || window,search = w.location.search,o={};
        search.replace(/(?:[?&])\w+=[^&]+/g,function(a){
            var t = a.slice(1).split('=');        
            o[t[0]]=t[1];
        })
        return o;
    }
    ,objLen:function(o){
        // 启用一个闭包函数
        var d = function(o,s){
            if(Object.prototype.toString.call(o)!='[object Object]')return 0;
            // 初始化这个id
            (s===void 0 || s) && (arguments.callee.id=0);
            for(var k in o){
                if(o.hasOwnProperty(k)){
                    // 自增加
                    ++arguments.callee.id;
                    if(Object.prototype.toString.call(o)=='[object Object]'){
                        // 递归调用。
                        arguments.callee(o[k],0)
                    }
                }
            }
        }
        d(o);
        return d.id;
    }
    ,backNum:function(o){
        if(o===void 0)return 0;
        switch(typeof o){
            case 'number':
                return o;
            case 'string':
                return o.charAt() == '-' ? -o.replace(/[^.\d]/g,'') :  +o.replace(/[^.\d]/g,'');
            default:
                return +!!o;
        }
    }
    // 把秒转换成小时：分：秒
    ,showTime : function(t){
        if(!com.isNumber(t))return "00:00:00";
        var t = t .toString().charAt() == '-' ? t .toString().slice(1) : t;
        h = t>=3600 ? Math.floor(t/3600) : 0,
        m = (t - h * 60) >60 ? Math.floor((t - h * 3600)/60) : 0,
        s = t - h * 3600 - m*60;
        return (h ===0 ? "00" : (h<10?("0"+h):h)) +":"+(m === 0 ? "00" : (m<10?("0"+m):m))+":"+ (s === 0 ? "00" : (s<10?("0"+s):s)) ;
    }
    // 把时间戳转化成特定的字符串
    ,microToDate : function(m,d){
        if(typeof m !== 'number' || m .toString().length!=13)return m;
        var date = new Date(m),
            ret,
            config;
        if(typeof d !== 'string')return date.toLocaleString();
        config = {'y':date.getFullYear(), 'm':date.getMonth()+1, 'd':date.getDate(), 'h':date.getHours(), 'i':date.getMinutes(), 's':date.getSeconds()};
        return d.replace(/[ymdhis]/ig, function(k){
            k = k.toLowerCase();
            return config[k] || k;
        });
    }
    // 包装JQ对象，失败无对象均为false
    ,warpJq : function(f){
        if(!f)return false;
        var form = f instanceof jQuery ? f : $(f);
        return form.length ? form : false;
    }
}
var tabSelect = function(tab,cont,opts){
    if(!tab || !cont || !opts)return;
    var self = this;
    this.content = null;
    this.tab = com.warpJq(tab);
    this.cont = com.warpJq(cont);
    this.pTab = this.tab.eq(0);
    // this.pCont = null;
    this.opts = opts || {};
    this.tab[opts.mouseType || 'mouseenter'](function(){
        var temp = $(this);
        self.pTab && com.isString(self.opts.outStyle) && self.pTab.removeClass(self.opts.inStyle).addClass(self.opts.outStyle); 
        self.opts.inStyle && temp.addClass(self.opts.inStyle); 
        // 如果有多个容器，就直接显隐藏
        if(self.cont.length>1){
            self.cont.hide();
            self.cont.eq(temp.index()).show();
            // self.pCont = self.cont.eq(temp.index());
        }else{
            // 如果只有一个就通过opts.stillContent去拉数据
            self.opts.cont.html(self.content[temp.index()] || (self.content[temp.index()] = self.opts.stillContent(temp.index())));
        } 
        self.pTab = temp;

    })
}
var marquee = function(board,eles,config){
    if(!board || !eles || !config || !config.prevBtn || !config.nextBtn){
        throw new Error('Arguments is missed');
        return;  
    }
    var self = this, board = com.warpJq(board) , eles = com.warpJq(eles),
        config = $.extend({
            disLine:"inline",
            showMax:3
        },config),
        recordNum = eles.length - com.backNum(config.showMax),
        recordEle = eles.eq(0),
        maxSize=0,allWidth=0,
        driect= config.disLine === "inline" ? "outerWidth" : "outerHeight" ,
        scroll = config.disLine === "inline" ? "left" : "top",
        prevBtn = com.warpJq(config.prevBtn.btn),nextBtn = com.warpJq(config.nextBtn.btn),
        // 上一个按钮的活动样式
        prevActive = config.prevBtn.active,
        // 上一个到头了的样式
        prevDisable =config.prevBtn.disable,
        // 下一个按钮的活动样式
        nextActive = config.nextBtn.active,
        // 下一个到头了的样式
        nextDisable = config.nextBtn.disable;
    
    if(!eles.length || !board.length){
        throw new Error('Arguments is invaild');
        return;  
    }
    eles.each(function(){
        var self = $(this);
        allWidth+=com.backNum(self[driect]())+(config.offset || 0);
        if(self.index()<recordNum){
            maxSize+=com.backNum(self[driect]())+(config.offset || 0);
        }
    });
    board[config.disLine==='inline' ? 'width' : 'height'](100000000);
    // 初始化容器
    board.css(scroll,0);
    if(eles.length <= config.showMax) return function(){
        prevBtn.removeClass(prevActive).addClass(prevDisable);
        nextBtn.removeClass(nextActive).addClass(nextDisable);
    }();
    com.isFunction(config.initFun) && config.initFun(board,eles); 
    // 上一个按钮
    prevBtn && prevBtn.length && prevBtn.removeClass(prevActive).addClass(prevDisable).die().live("click",function(){
        var self = $(this);
        nextBtn.removeClass(nextDisable).addClass(nextActive);
        if(com.backNum(board.css(scroll))==0){
            self.removeClass(prevActive).addClass(prevDisable);
            return false
        }
        board.css(scroll,com.backNum(board.css(scroll))+com.backNum(recordEle.prev()[driect]())+(config.offset || 0));
        com.isFunction(config.clickFun) && config.clickFun();
        return false;
    });
    // 下一个按钮
    nextBtn && nextBtn.length && nextBtn.removeClass(nextDisable).addClass(nextActive).die().live("click",function(){
        prevBtn.removeClass(prevDisable).addClass(prevActive);
        var self = $(this);

        if(com.backNum(board.css(scroll)) == -maxSize){
            self.removeClass(nextActive).addClass(nextDisable);
            return false;
        }
        board.css(scroll,com.backNum(board.css(scroll))-com.backNum(recordEle.next()[driect]())-(config.offset || 0));
        recordEle = recordEle.next();
        return false;
    }); 
}

// 表单验证插件
// 定义表单类
function setForms(f){
    this.f = com.warpJq(f);
    this.sign = true;
};
// 扩展这个类.
setForms.prototype = {
    // 得到可以放入文本值的元素
    getInputData : function(){
        var form , self = this;
        if(!(form = self.f))return false;
        return form.find("select[name],textarea[name],"+(function(){
            var temp = '',
                res = [],
                types = [':checkbox[checked]',':radio[checked]',':text',':hidden',':password'];
            while(temp = types.pop()){
                res.push('input[name]'+temp); 
            }
            return res.join(',');    
        })());
    }
    // 绑定事件。
    ,bindFromEvent : function(fn){
        var form , self = this , db;
        if(!(form = self.f) || !(db=self.getInputData()) || !Object.prototype.toString.call(fn)=='[Object Function]')return false;
        db.filter(function(){
            var s = $(this);
            if(this.tagName != 'INPUT' || (this.type && /^text|password$/.test(this.type)))return s;
        }).each(function(){
             var s = this;
             s['on'+(s.tagName=="SELECT" ? "change" : "blur")] = function(){
                fn(s);
             }
        }); 
    }
    // 把表单里的元素全部转化为json
    ,getDataJson : function(){
        var form , self = this , db;
        if(!(form = self.f) || !(db=self.getInputData()))return false;
        var val ={};
        db.each(function(){
             val[this.getAttribute('name')]=this.value;
        }); 
        return val;
    }
    // 验证表单里的值的合法性，只需要在表单元素上加入一个regexp的自定义属性即可,如果要提示信息，就在info里设置。
    ,checkKindsDb : function(fn){
        var form, self = this, db, sign = true;
        self.sign=true;
        if(!(form = self.f) || !(db=self.getInputData(form)))return false;
        db.each(function(){
            var sel = this;
            if(sel.getAttribute("regexp") && !new RegExp(sel.getAttribute("regexp")).test(sel.value)){
                self.sign = false;
                return Object.prototype.toString.call(fn) =='[object Function]' && fn(sel),false;
               
            }
        })
        return self.sign;
    }
}


// 操作cookie
var cookie = {
    // 设置cookie
    setCookie:function(a,b,o){
        if(typeof a !=='string' || typeof b !=='string')return false;
        var str = '';
        if(o){
            for(var k in o){
                if(o.hasOwnProperty(k))str+=';'+k+'='+o[k]+'=';
            }
            str = str.slice(0,-1);
        }
        document.cookie = a+'='+encodeURIComponent(b)+str;
    }
    // 得到cookie
    ,getCookie:function(b){
        if(typeof b !=='string')return '';
        var c = new RegExp('(?:^|;\\s?)'+b+'=([^;]*)');
        return c.test(document.cookie) ? decodeURIComponent(RegExp.$1) : '';
    }
    // 删除cookie
    ,delCookie:function(b){
        if(typeof b !== 'string')return false;
        document.cookie = b+'=;expires=-1';
    }
}
// 等待装载中效果.
var loadBoard = {
    board : null
    ,open : function(){
        if(this.board)return;
        var body            = top.document.documentElement || top.document.body,
        width               = body.clientWidth,
        height              = body.clientHeight,
        offset              = top.document.documentElement.scrollTop
        div                 = top.document.createElement('div');
        div.style.position  = 'absolute';
        div.style.width     = '40px';
        div.style.height    = '40px';
        div.style.zIndex    = 100000;
        div.style.left      = (width - 40) / 2 + 'px';
        div.style.top       = (height - 40) / 2 + offset + 'px';
        div.innerHTML       = '<img src="__TMPL__Public/images/load.gif">';
        top.document.body.appendChild(div);
        this.board = div;
    }
    ,close:function(){
        if(!this.board)return;
        top.document.body.removeChild(this.board);
        this.board = null;
    }
};


var loadSreen = {
    handle:null
    ,host:null
    ,open:function(id,opt){
        if(!id || !opt)return;
        this.close(1);
        isFF || (top.document.documentElement.style.overflow = 'hidden');
        var frame = document.createElement('iframe');
        for(var k in opt){
            frame.style[k]=opt[k];
        }
        // frame.style.display="none";
        frame.frameBorder = 0;
        frame.scrolling = 'no';
        frame.src='';
        document.body.appendChild(frame);
        dom.ifrIsReady(frame,function(f){
            f.contentWindow.showroll();
        },frame);
        this.handle = frame;
    }
    ,close:function(s){
        this.handle && document.body.removeChild(this.handle);
        isFF || (s || (top.document.documentElement.style.overflow = 'auto'));
        this.handle = null;
    }
        
}

// 复制n份字符串
String.prototype.c=function(n,fn){
    return new Array(++n).join(Object.prototype.toString.call(fn)=='[object Function]' ? fn(this.toString()) : this.toString());
}
// 替换字符串
String.prototype.s=function(r,v){
    return this.toString().replace(new RegExp('%='+r+'%','img'),v);
}
String.prototype.include = function(o){
    if(!o)return false;
    var self = this.toString();
    switch(Object.prototype.toString.call(o).slice(8,-1)){
        case 'Array':
            return new RegExp('(^|_)'+self+'(_|$)').test(o.join('_'));
        case 'String':
            return self.indexOf(o)>-1;
        case 'Object':
            return o[self]!=void 0;
        default:
            return false;
    }
}
String.prototype.limitLeft = function(n,add){
  var str = this.toString();
  if(typeof n != 'number')return ;
  var temp = str.slice(0,n),old = str,rl;
  if((rl=temp.replace(/[\u4E00-\u9FA5]/g,11).length) < n) return str;
  temp.replace(/[\u4E00-\u9FA5]/g,function(){
    rl-=1.5;
  });
  return str.slice(0,Math.ceil(rl))+(add || '');
}
// 遍历数组
Array.prototype.m=function(fn,i){
    for(var i=0,l=this.length;i<l;i++){
       com.isFunction(fn) && (this[i] = fn(this[i],i));
    }
}
// 连续推送数据到数组
Array.prototype.spush=function(s){
    this.push(s);
    return this;
}
Array.prototype.fliter = function(o){
    var gt = com.getType(o);
    for(var i=0,l=this.length;i<l;i++){
        switch(gt){
            case 'String':
                this[i]==o && this.splice(i,1);
            break;
            case 'Number':
                i==o && this.splice(i,1);
            break;
            case 'Array':
                for(var k=0,n=o.length;k<n;k++){
                    this[i]==o[k] && this.splice(i,1);
                }
            break;
            default:
                continue;
        }
    }
    return this;
}
function require(){
    var ar = com.isArray(argument[0]) ? argument[0] : Array.prototype.slice.call(arguments),
        s = ar.pop(),jsFrame;
    if(!com.isString(s))return;
    jsFrame = document.createElement('script');
    jsFrame.src = s;
    jsFrame.type='text/javascript';
    (document.body || document.documentElement).append(jsFrame);
    com.ifrIsReady(jsFrame,require,ar);
}
function require_once(){
    // 得到参数，并转化成array
    var far = com.isArray(argument[0]) ? argument[0] : Array.prototype.slice.call(arguments),
    // 过滤掉已经存在的的script标签
        ar = far.fliter(dom.domArr(document.getElementsByTagName('script'),function(o){return o.src;}));
    require(ar);
}
$.fn.extend({
    roll:function(board,drag,offset,button,direct){
        
        if(!this instanceof jQuery || this.length!=1 || !board || !drag)return;
        var self = this , board = $(board) , drag = $(drag),
        line,padding,ipadding,moveDirect;
        drag.attr('drag',false).css('position','absolute');
        direct=="inline" ? function(){
            line = "outerWidth",ipadding = "width" , moveDirect = "left";
        }() : function(){
            line = "outerHeight",ipadding = "height" , moveDirect = "top";
        }(),
        record = null; 
        var margin = com.backNum(drag[ipadding]())/2;
        if(!drag.length || !board.length)return;
        drag.mousedown(function(e){
            // 捕获焦点
            if(this.setCapture){
                this.setCapture();
            }else if(window.captureEvents){
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }
            // 绑定拖拽
            $(this).bind('mousemove',function(e){
                // 单击后触发绑定事件
                var record = moveDirect == "left" ? e.pageX :  e.pageY,
                    val = record-offset.min-margin;
                if(val<offset.min || val>offset.max)return;
                drag.css(moveDirect,val);
                var ratio = (val-offset.min)/(offset.max-offset.min);
                board.css(moveDirect,-ratio * (com.backNum(board[line]()) - $(self)[ipadding]()));
            });
        }).mouseup(function(e){
            // 释放焦点。
            if(this.releaseCapture){
                this.releaseCapture();
            }else if(window.captureEvents){
              window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
            }
            // 解除绑定
            $(this).unbind('mousemove');
        });
        // 点击向上，上移
        function setTop(s){
            if(com.backNum(drag.css(moveDirect))<=offset.min){
                window.recordTimer && window.clearInterval(window.recordTimer);
                return false;
            }
            var temp = com.backNum(drag.css(moveDirect))-s,
                val = temp >= offset.min ? temp : offset.min, 
                ratio = (val - offset.min)/(offset.max-offset.min);
            drag.css(moveDirect,val);
            board.css(moveDirect,-ratio * (com.backNum(board[line]()) - $(self)[ipadding]()));
            return false;
        }
        function setBom(s){
            if(com.backNum(drag.css(moveDirect))>=offset.max){
                window.recordTimer && window.clearInterval(window.recordTimer);
                return false;
            }
            console.log(s);
            var temp = com.backNum(drag.css(moveDirect))+s,
                val = temp <= offset.max ? temp : offset.max,
                ratio = (val-offset.min)/(offset.max-offset.min);
            drag.css(moveDirect,val);
            board.css(moveDirect,-ratio * (com.backNum(board[line]()) - $(self)[ipadding]()));
            return false;
        }
        isFF || new mousewheel(board[0]).bindEvent(function(){
            setTop(30);
        },function(){
            setBom(30);
        }).init();
        button && button.top && $(button.top).mousedown(function(){
            window.recordTimer = window.setInterval(setTop,100);
            return false;
        }).mouseup(function(){
            window.clearInterval(window.recordTimer);
            return false;
        });
        // 点击向下，下移
        button && button.bottom && $(button.bottom).mousedown(function(){
            window.recordTimer = window.setInterval(function(){setBom(1)},100);
        }).mouseup(function(){
            window.clearInterval(window.recordTimer);
        });
    }
    // 加减按钮
    ,numberAddReduce : function(board,add,reduce,config){
        if(!this instanceof jQuery || this.length!=1)return false;
        var self = this , board = $(board,self),add = $(add,self), reduce = $(reduce,self);
        if(board.length<0 || add.length<0 || reduce.length<0)return false;
        var sck = /^input|textarea$/i.test(board[0].tagName) ? "val":"html";
        function ckBorder(m,v,s){
            if(typeof v!="number")return 0;
            var s = s===void 0 || s;
            return s ? m ? v>m ? 0 : 1 : 1 : m ? v<m ? 0 : 1 : 1;
        }
        add.unbind("click").click(function(){
            ckBorder((config && config.max),com.backNum(+board[sck?"val":"html"]())+1) && (board[sck](com.backNum(+board[sck?"val":"html"]())+1),$.isFunction(config.callBack) && config.callBack(board,"add"));
            return false;
        });
        reduce.unbind("click").click(function(){
            ckBorder((config && config.min),com.backNum(+board[sck?"val":"html"]())-1,0) && (board[sck](com.backNum(+board[sck?"val":"html"]())-1),$.isFunction(config.callBack) && config.callBack(board,"reduce"));
            return false;   
        })
    }
});

function SWFObject(swf,fid,width,height){
    var self = this;
    var isie = document.all;
    this.attr = {"allowScriptAccess":"always","quality":"high","movie":swf};
    self.addParam = function(key,val){
        self.attr[key] = val;
        return self;
    }
    self.write = function(concatiner){
        var attrStr = '';
        $.each(self.attr,function(n,v){
            attrStr+='<param name="'+n+'" value="'+v+'" />';
        });
        if(isie){
            attrStr+='<embed allowScriptAccess="always" src="'+swf+'"  quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"  width="'+width+'" height="'+height+'" name="'+fid+'"></embed>';
            var html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+width+'" height="'+height+'" id="'+fid+'">'+attrStr+'</object>';
        }else{
            var html = '<object type="application/x-shockwave-flash" data="'+swf+'?v=111" width="'+width+'" height="'+height+'" id="'+fid+'" name="'+fid+'">'+attrStr+'</object>';
        }
        $(concatiner).html(html);
    }
    return self;
}
function backFrame(o){
    var o = com.warpJq(o);
    if(!o.length)return;
    var leftOffset = o.offset().left+'px',
        topOffset = o.offset().top+'px',
        zIndex = o.css('zIndex')-1,
        width = o.outerWidth() + 'px',
        height = o.outerHeight() + 'px',
        iframe = $('<iframe frameborder="0" \
                    style="overflow:hidden; \
                        position:absolute; \
                        background:#fff; \
                        z-index:'+zIndex+'; \
                        width:'+width+'; \
                        height:'+height+'; \
                        left:'+leftOffset+'; \
                        top:'+topOffset+'; \
                        display:none" src="about:blank"></iframe>').appendTo(top.document.body || top.document.documentElement);
    return iframe;
}
function background(o){
    var o = o || {},
        zIndex = o.zindex || 999999,
        width = Math.max(document.body.clientWidth || document.documentElement.clientWidth) + 'px',
        height = Math.max(document.body.clientHeight,document.documentElement.clientHeight) + 'px',
        iframe = !$('#backgroundBoardId').length ? $('<iframe id="backgroundBoardId" scrolling="no" frameborder="0" \
                    style="overflow:hidden; \
                        position:fixed; \
                        background:#000; \
                        z-index:'+zIndex+'; \
                        width:'+width+'; \
                        left:0; \
                        top:0; \
                        height:'+height+'; \
                        display:none></iframe>').appendTo(document.body || document.documentElement).css('opacity',(o.opacity || .7))
                    : $('#backgroundBoardId').css({width:width,height:height});
    return iframe;
}

/*function autoMarquee(container,movetag,opts){
    if(!container || !movetag || !(this.container = com.warpJq(container)).length){
        // 抛出异常。
        throw new Error('autoMarquee参数不全');
    };
    
    this.recordIndexRule = {};                         //来存储每次要移动多少个像素点.
    (this.container = com.warpJq(container)).css('position')=='static' && this.container.css('position','absolute');        //初始化
    this.movetag = $(movetag,this.container);
    this.timer = true;
    this.opts = opts || {};
    var self = this,
        per = this.opts.per || 1,
        index = 0,                                    //移动的指针
        getx = 0,                                     //对象的指针
        max = Math.ceil(this.movetag.length / per),   //计算要滚动几次.
        rmax = max,                                   //总的次数.
        getHeight = 0,                                //临时变量,主要是来计算每次要滚动多少个像素的.
        initTop = this.container.css('top');          //记录初始位置.
    for(var i=0;i<max;i++){
      getHeight = 0;
      // 初始化每次需要滚动多少像素。
      this.movetag.slice(index*per,(index+1)*per).each(function(){
          getHeight+=+$(this).outerHeight();   
      });
      self.recordIndexRule[i] = getHeight;
    }
    this.run = function(){
        if(self.movetag.length<=per)return;
        // 倒数第二帧开始补数据，以免最后那帧空白
        if(getx >= max -2){
        // 克隆一份数据丢到后面
            self.container.append(self.movetag.clone(true));
        }
        // 如果到头了
        if(getx>=max-1){
        // 追加最大滚动数
            rmax+=max;
        // 初始化需要记录滚动数据的指针
            getx=0;
        }
        // 开始滚动
        self.container.animate({top:com.backNum(self.container.css('top')) - self.recordIndexRule[getx]},(self.opts.hps || 1) * 1000,function(){
            ++index;
            ++getx;
            // 递归。
            self.timer && window.setTimeout(function(){
                self.run();
            },(self.opts.fps || 1)*1000);
        });
    };
    this.start = function(){
        this.timer = true;
        this.run();
    }
    this.stop = function(){
        this.timer = false;
    }
}*/
function autoMarquee(container,movetag,opts){
    if(!container || !movetag || !(this.container = com.warpJq(container)).length){
        // 抛出异常。
        throw new Error('autoMarquee参数不全');
    };
    
    this.recordIndexRule = {};                         //来存储每次要移动多少个像素点.
    (this.container = com.warpJq(container)).css('position')=='static' && this.container.css('position','absolute');        //初始化
    this.movetag = $(movetag,this.container);
    this.timer = true;
    this.turn = true;
    this.opts = opts || {};
    var self = this,
        per = this.opts.per || 1,
        index = 0,                                    //移动的指针
        max = Math.ceil(this.movetag.length / per),   //计算要滚动几次.
        getHeight = 0,                                //临时变量,主要是来计算每次要滚动多少个像素的.
        initTop = this.container.css('top');          //记录初始位置.
    for(var i=0;i<max;i++){
      getHeight = 0;
      // 初始化每次需要滚动多少像素。
      this.movetag.slice(index*per,(index+1)*per).each(function(){
          getHeight+=+$(this).outerHeight();   
      });
      self.recordIndexRule[i] = getHeight;
    }
    this.run = function(){
        if(self.movetag.length<=per)return;
        // 如果到头了
        if(index>=max-1){
        // 初始化需要记录滚动数据的指针
            index=0;
            self.container.css('top',initTop);
        }
        // 开始滚动
        self.container.animate({top:com.backNum(self.container.css('top')) - self.recordIndexRule[index]},(self.opts.hps || 1) * 1000,function(){
          ++index;
          self.turn && self.start();
        });
    };
    this.start = function(){
        var self = this;
        self.turn =true;
        self.timer = setTimeout(function(){
          self.run();
        },(self.opts.fps || 1) * 1000);
        // this.run();
    }
    this.stop = function(){
        this.turn =false;
        this.timer && clearInterval(this.timer);
    }
}
Date.prototype.getDaysInMonth = function(){
    return (new Date(this.getFullYear(),+this.getMonth()+1,0,0,0,0,0) - new Date(this.getFullYear(),this.getMonth(),0,0,0,0,0))/(24*60*60*1000);
}
Date.prototype.getWeekDays = function(){
    return this.getWeekDay ? this.getWeekDay() : '日一二三四五六'.charAt(this.getDay());
}



// 鼠标滚轮事件

/*EX：
    new mousewheel(board).bindEvent(function(){
        console.log('up');
    },function(){
        console.log('down');
    }).init();
*/
function mousewheel(dom){
    if(!dom){
        throw new Error('arguments is invalid');
        return;
    }
    var self = this;
    self.dom = dom;
    // 绑定上下移动事件
    self.bindEvent = function(up,down){
        com.isFunction(up) && (self.up = up);
        com.isFunction(down) && (self.down = down);
        return this;
    }
    // 滚轮事件触发后发生动作。
    function selfEvent(){
        var eve = window.event || arguments[0];
            mov = (eve.wheelDelta || eve.detail) > 0 ? 'up' : 'down'; 
        self[mov] && self[mov](self.dom);
    } 
    // 初始化。
    self.init = function(){
        var rollEve = navigator.userAgent.indexOf("Firefox")==-1 ? 'mousewheel' : 'DOMMouseScroll';
        self.dom.addEventListener ? 
            self.dom.addEventListener(rollEve,selfEvent,false) : 
                (self.dom.onmousewheel = selfEvent);
    }
}
var fade = {
    record:null,
    index:0,
    timer : null,
    ftimer : 3000,
    init : function(pic,tab,opts){
        if(!pic || !tab)return;
        this.pic = $(pic);
        this.tab = $(tab);
        this.count = this.tab.length;
        this.opts = opts || {};
        opts.ftimer && (this.ftimer = opts.ftimer);
        com.isFunction(opts.ready) && opts.ready(this);
        this.tab[opts.type || 'mouseenter'](function(){
          var self = $(this);
          fade.index = self.index();
          fade.pic.stop(true);
          fade.selecte(self);
          fade.timer && clearInterval(fade.timer);
        }).mouseleave(function(){
            fade.autoPlay();
        });
        return this;
    },
    selecte: function(o){
        if(!o)return;
        fade.record && $.isFunction(this.opts.out) && this.opts.out(fade.record,this);
        $.isFunction(this.opts.over) && this.opts.over(o,this);
        fade.record = o;
    },
    play:function(){
        if(fade.index>=fade.count) fade.index = 0;
        this.selecte(fade.tab.eq(fade.index));
    },
    autoPlay:function(){
        fade.timer = setInterval(function(){
            ++fade.index;
            fade.play();                    
        },fade.ftimer);
    }
}
// ele图片的标签，size就是用来锁定图片的尺寸。如果只控制宽就用{width:123},高就用{height:130},宽高就用{width:123,height:130}
function autoSizePic(ele,size,cbk){
    if(!ele || !com.isString(ele.src) || !size){
        throw new Error('arguments is invalid');
        return;
    }
    var src = ele.src;
        img = new Image();
    img.onload = function(){
        var hold,other;
        if(size.width && size.height){
            hold = this.width>this.height ? 'width' : 'height';
        }else if(size.width){
            hold = 'width';
        }else{
            hold = 'height';
        }
        other = hold == 'width' ? 'height' : 'width';
        if(+size[hold]<+this[hold] || (size[other] && +size[other]<+this[other])){
            var otherSize = size[hold] * this[other] / this[hold],one = size[hold],image = this;
            size[other] && otherSize > size[other] && -function(){
                otherSize = size[other];
                one = image[hold] * otherSize / image[other];
            }()
            ele.style[hold] = one + 'px';
            ele.style[other] = otherSize + 'px';
            com.isFunction(cbk) && cbk(ele);
        }
    }
    img.onerror = function(){
        throw new Error('图片'+src+'加载失败');
    }
    img.src = src;
}

// 验证身份证号码正确性。
function checkIdCardNo(idcard) {
  if(idcard.length!=15 && idcard.length!=18) return false;
  var area = [11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65];
  var areaCode = idcard.substr(0,2);
  var areaok = false;
  for(i=0;i<area.length;i++){
    if(areaCode==area[i]){
      areaok = true;
      break;
    }
  }
  if(!areaok) return false;
  var now = new Date();
  var nowYear = now.getFullYear();
  //身份号码位数及格式检验 
  switch(idcard.length){ 
    case 15: 
      var birthYear = 1900+parseInt(idcard.substr(6,2));
      var birthDay = idcard.substr(8,4);      
      break; 
    case 18:
      var birthYear = parseInt(idcard.substr(6,4));
      var birthDay = idcard.substr(10,4);   
      //计算校验位 
      S = (parseInt(idcard.substr(0,1)) + parseInt(idcard.substr(10,1))) * 7 
      + (parseInt(idcard.substr(1,1)) + parseInt(idcard.substr(11,1))) * 9 
      + (parseInt(idcard.substr(2,1)) + parseInt(idcard.substr(12,1))) * 10 
      + (parseInt(idcard.substr(3,1)) + parseInt(idcard.substr(13,1))) * 5 
      + (parseInt(idcard.substr(4,1)) + parseInt(idcard.substr(14,1))) * 8 
      + (parseInt(idcard.substr(5,1)) + parseInt(idcard.substr(15,1))) * 4 
      + (parseInt(idcard.substr(6,1)) + parseInt(idcard.substr(16,1))) * 2 
      + parseInt(idcard.substr(7,1)) * 1 
      + parseInt(idcard.substr(8,1)) * 6 
      + parseInt(idcard.substr(9,1)) * 3 ;
      Y = S % 11;
      M = "F";
      JYM = "10X98765432";
      M = JYM.substr(Y,1);//判断校验位
      if(M.toLowerCase() != idcard.substr(17,1).toLowerCase()) return false; //检测ID的校验位 
      break;
    default: 
      return false; 
  }
  if(birthYear>nowYear || birthYear<nowYear-120) return false;
  if((birthYear % 4 == 0 && birthYear % 100!=0) || (birthYear % 100==0 && birthYear % 4 == 0 )){
    ereg=/^((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))$/;//测试出生日期的合法性 
  } else { 
    ereg=/^((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))$/;//测试出生日期的合法性 
  }
  if(ereg.test(birthDay)) return true; 
  else return false; 
}

//引入的下雪的代码
//;(function(){function k(a,b,c){if(a.addEventListener)a.addEventListener(b,c,false);else a.attachEvent&&a.attachEvent("on"+b,c)}function g(a){if(typeof window.onload!="function")window.onload=a;else{var b=window.onload;window.onload=function(){b();a()}}}function h(){var a={};for(var type in{Top:"",Left:""}){var b=type=="Top"?"Y":"X";if(typeof window["page"+b+"Offset"]!="undefined")a[type.toLowerCase()]=window["page"+b+"Offset"];else{b=document.documentElement.clientHeight?document.documentElement:document.body;a[type.toLowerCase()]=b["scroll"+type]}}return a}function l(){var a=document.body,b;if(window.innerHeight)b=window.innerHeight;else if(a.parentElement.clientHeight)b=a.parentElement.clientHeight;else if(a&&a.clientHeight)b=a.clientHeight;return b-10}function i(a){this.parent=document.body;this.createEl(this.parent,a);this.size=Math.random()*5+5;this.el.style.width=Math.round(this.size)+"px";this.el.style.height=Math.round(this.size)+"px";this.maxLeft=document.body.offsetWidth-this.size;this.maxTop=document.body.offsetHeight-this.size-50;this.left=Math.random()*this.maxLeft;this.top=h().top+1;this.angle=1.4+0.2*Math.random();this.minAngle=1.4;this.maxAngle=1.6;this.angleDelta=0.01*Math.random();this.speed=2+Math.random()}var j=false;g(function(){j=true});var f=true;window.createSnow=function(a,b){if(j){var c=[],m=setInterval(function(){f&&b>c.length&&Math.random()<b*0.0025&&c.push(new i(a));!f&&!c.length&&clearInterval(m);for(var e=h().top,n=l(),d=c.length-1;d>=0;d--)if(c[d])if(c[d].top<e||c[d].top+c[d].size+1>e+n){c[d].remove();c[d]=null;c.splice(d,1)}else{c[d].move();c[d].draw()}},100);k(window,"scroll",function(){for(var e=c.length-1;e>=0;e--)c[e].draw()})}else g(function(){createSnow(a,b)})};window.removeSnow=function(){f=false};i.prototype={createEl:function(a,b){this.el=document.createElement("img");this.el.setAttribute("src",b+"snow"+Math.floor(Math.random()*4)+".gif");this.el.style.position="absolute";this.el.style.display="block";this.el.style.zIndex="99999";this.parent.appendChild(this.el)},move:function(){if(this.angle<this.minAngle||this.angle>this.maxAngle)this.angleDelta=-this.angleDelta;this.angle+=this.angleDelta;this.left+=this.speed*Math.cos(this.angle*Math.PI);this.top-=this.speed*Math.sin(this.angle*Math.PI);if(this.left<0)this.left=this.maxLeft;else if(this.left>this.maxLeft)this.left=0},draw:function(){this.el.style.top=Math.round(this.top)+"px";this.el.style.left=Math.round(this.left)+"px"},remove:function(){this.parent.removeChild(this.el);this.parent=this.el=null}}})();
// 在下雪网站
//var snow = ['angel.gtarcade.com','www.gtarcade.com','community.gtarcade.com','accounts.gtarcade.com','support.gtarcade.com'];
//$.inArray(window.location.host,snow)>-1 && createSnow('http://static.gtarcade.net/common/js/', 30);
