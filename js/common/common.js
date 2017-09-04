/*//移动端控制台
(function () { 
var script = document.createElement('script'); 
script.src="http://eruda.liriliri.io/eruda.min.js";
 document.body.appendChild(script); 
 script.onload = function () { eruda.init() }
})();
*/
 var urlPrefix = getUrlPrefix(); //配置路径

//适配屏幕 字体单位rem
var deviceWidth = document.documentElement.clientWidth;
if(deviceWidth < 750) {
//  deviceWidth = 375; 以iPhone6为标准:font-size:50px
    document.documentElement.style.fontSize = deviceWidth / 7.5 + "px";
}

 //判断ios/android
 var u = navigator.userAgent;
 var isAndroid = u.indexOf("Android") > -1 || u.indexOf('Adr') > -1; //android终端
 var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
 if(!isiOS){
     document.body.classList.add("notIOS");
 }

//禁止微信调整字体大小 影响布局
 (function(){
     if(typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function"){
         handleFontSize();
     }else{
         if(document.addEventListener){
             document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
         }else if(document.attachEvent){
             document.addEventListener("WeixinJSBridgeReady", handleFontSize);
             document.addEventListener("onWeixinJSBridgeReady", handleFontSize);
         }
     }
    
     function handleFontSize(){
         //设置网页字体默认大小
         WeixinJSBridge.invoke("setFontSizeCallback", {"fontSize" : 0 });
         //重写设置网页字体大小的事件
         WeixinJSBridge.on("menu:setfont", function(){
             WeixinJSBridge.invoke("setFontSizeCallback", {"fontSize" : 0});
         });
     }
 })();

// //项目名前缀
 function getUrlPrefix(){  
 	var curWwwPath = window.document.location.href;  
 	var pathName =  window.document.location.pathname;  
 	var pos = curWwwPath.indexOf(pathName);  
 	var localhostPaht = curWwwPath.substring(0, pos);  
 	var projectName = pathName.substring(0,pathName.substr(1).indexOf('/') + 1);  
 	return (localhostPaht + projectName);  
 }

 //remove url of alert/confirm
 var wAlert = window.alert;
 window.alert = function (message) {
     try {
         var iframe = document.createElement("IFRAME");
         iframe.style.display = "none";
         iframe.setAttribute("src", 'data:text/plain,');
         document.documentElement.appendChild(iframe);
         var alertFrame = window.frames[0];
         var iwindow = alertFrame.window;
         if (iwindow == undefined) {
             iwindow = alertFrame.contentWindow;
         }
         iwindow.alert(message);
         iframe.parentNode.removeChild(iframe);
     }
     catch (exc) {
         return wAlert(message);
     }
 }

 var wConfirm = window.confirm;
 window.confirm = function (message) {
     try {
         var iframe = document.createElement("IFRAME");
         iframe.style.display = "none";
         iframe.setAttribute("src", 'data:text/plain,');
         document.documentElement.appendChild(iframe);
         var alertFrame = window.frames[0];
         var iwindow = alertFrame.window;
         if (iwindow == undefined) {
             iwindow = alertFrame.contentWindow;
         }
         var result = iwindow.confirm(message);
         iframe.parentNode.removeChild(iframe);
         return result;
     }
     catch (exc) {
         return wConfirm(message);
     }
 }

/*
 *1. msg: 	       弹出的提示消息
 *2. btndata:  数组格式，每个元素对应的是底部按钮的文字，例如“取消”，“确定”，“继续”等；
 *3. btnoper:  数组格式，每个元是与btndata里面的元素一一对应的函数名称
 */
function alertW(msg,btndata,btnoper){
	//div class="alertW"><div><p>'+msg+'</p><div><span>取消</span><span>确定</span></div></div></div>
	var item = '<div class="alertW"><div><p>'+msg+'</p><div>';
	var length = btndata.length;
	var width = 100 / length;
	for(var i=0;i<length;i++){
		item += '<span style="width:'+width+'%">'+btndata[i]+'</span>';
	}
	item += '</div></div></div>';
	$(".wrapper").append(item);
	var span = $('.alertW span');
	for(var i=0;i<span.length;i++){
		span[i].onclick = (function(i){
			return function (){btnoper[i]();};
		})(i);
	}
}


//缓存值
function storage(obj, val){
    return sessionStorage.setItem(obj, val? val : "");
}

function getStorage(obj){
    return sessionStorage.getItem(obj)? 
            sessionStorage.getItem(obj) : "";
}

function removeStorage(obj){
    //有参数则删除指定的，没有则清空
    if(obj){
        sessionStorage.removeItem(obj);
    }else{
        sessionStorage.clear();
    }
}


//数组删除指定元素
Array.prototype.removeByValue = function(val) {
	  for(var i=0; i<this.length; i++) {
	    if(this[i] == val) {
	      this.splice(i, 1);
	      break;
	    }
	  }
	};
	
	
function Trim(str){ 
     return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

