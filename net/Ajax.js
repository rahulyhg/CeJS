
(function (){

	/**
	 * 本 library / module 之 id
	 */
	var lib_name = 'HTA';

	//	若 CeL 尚未 loaded 或本 library 已經 loaded 則跳出。
	if(typeof CeL !== 'function' || CeL.Class !== 'CeL' || CeL.is_loaded(lib_name))
		return;


/**
 * compatibility/相容性 test
 * @memberOf	CeL
 * @param	msg	msg
 */
CeL.HTA = function(msg){
	alert(msg);
};



//CeL.extend(lib_name, {});

})();




//	XMLHttp set	ajax通信処理ライブラリ	==================



/*
to use: include in front:
way1(good: 以reg代替functionPath!):
//	[function.js]_iF
//	[function.js]End

way2(old):
//	[function.js]getU,functionPath,'eval(getU(functionPath));'
//	[function.js]End

old:
function getU(p){var o;try{o=new ActiveXObject('Microsoft.XMLHTTP');}catch(e){o=new XMLHttpRequest();}if(o)with(o){open('GET',p,false),send(null);return responseText;}}
*/



/*	JScript or .wsh only, 能 encode
	http://neural.cs.nthu.edu.tw/jang/books/asp/getWebPage.asp?title=10-1%20%E6%8A%93%E5%8F%96%E7%B6%B2%E9%A0%81%E8%B3%87%E6%96%99
*/
function getPage(p,enc,t){	//	page url, encode, POST text
try{
 var X=new ActiveXObject('Microsoft.XMLHTTP'),AS;	//	may error
 X.open(t?'POST':'GET',p,false);
 X.setRequestHeader("Content-Type","application/x-www-form-urlencoded");	//	POST need this
 X.send(t||null);	//	Download the file
 with(AS=new ActiveXObject("ADODB.Stream")){
  Mode=3,	//	可同時進行讀寫
  Type=1,	//	以二進位方式操作
  Open(),	//	開啟物件
  Write(X.responseBody),	//	將 binary 的資料寫入物件內	may error
  Position=0,
  Type=2;	//	以文字模式操作
  if(enc)Charset=enc;	//	設定編碼方式
  X=ReadText();	//	將物件內的文字讀出
 }
 AS=0;//AS=null;	//	free
 return X;
}catch(e){
 //sl('getPage: '+e.message);
}}



/*	set a new XMLHttp
	Ajax程式應該考慮到server沒有回應時之處置

return new XMLHttpRequest(for Ajax, Asynchronous JavaScript and XML) controller
	http://www.xulplanet.com/references/objref/XMLHttpRequest.html
	http://zh.wikipedia.org/wiki/AJAX
	http://jpspan.sourceforge.net/wiki/doku.php?id=javascript:xmlhttprequest:behaviour
	http://www.scss.com.au/family/andrew/webdesign/xmlhttprequest/
	http://developer.apple.com/internet/webcontent/xmlhttpreq.html
	http://www.klstudio.com/catalog.asp?cate=4
	http://wiki.moztw.org/index.php/AJAX_%E4%B8%8A%E6%89%8B%E7%AF%87
	http://www.15seconds.com/issue/991125.htm
	http://www.xmlhttp.cn/manual/xmlhttprequest.members.html
	http://www.blogjava.net/eamoi/archive/2005/10/31/17489.html
	http://www.kawa.net/works/js/jkl/parsexml.html
	http://www.twilightuniverse.com/

	XMLHttp.readyState 所有可能的值如下：
	0 還沒開始
	1 讀取中 Sending Data
	2 已讀取 Data Sent
	3 資訊交換中 interactive: getting data
	4 一切完成 Completed

	XMLHttp.responseText	會把傳回值當字串用
	XMLHttp.responseXML	會把傳回值視為 XMLDocument 物件，而後可用 JavaScript DOM 相關函式處理
	IE only(?):
	XMLHttp.responseBody	以unsigned array格式表示binary data
				try{responseBody=(new VBArray(XMLHttp.responseBody)).toArray();}catch(e){}
				http://aspdotnet.cnblogs.com/archive/2005/11/30/287481.html
	XMLHttp.responseStream	return AdoStream
*/
function newXMLHttp(enc,isText){
 //if(typeof XMLHttp=='object')XMLHttp=null;
 var _new_obj_XMLHttp;
 if(typeof newXMLHttp.objId=='string')_new_obj_XMLHttp=new ActiveXObject(newXMLHttp.objId);	//	speedy
 //	jQuery: Microsoft failed to properly implement the XMLHttpRequest in IE7, so we use the ActiveXObject when it is available.
 else if(typeof ActiveXObject!='undefined')for(var i=0,a=['Msxml2.XMLHTTP','Microsoft.XMLHTTP','Msxml2.XMLHTTP.4.0'];i<a.length;i++)
  try{_new_obj_XMLHttp=new ActiveXObject(a[i]);newXMLHttp.objId=a[i];break;}catch(e){}//'Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0','Msxml2.XMLHTTP.4.0','Msxml2.XMLHTTP.3.0',["MSXML2", "Microsoft", "MSXML"].['XMLHTTP','DOMDocument'][".6.0", ".4.0", ".3.0", ""]
  //	或直接設定：	XMLHttpRequest=function(){return new ActiveXObject(newXMLHttp.objId);}
 //	皆無：use XMLDocument. The document.all().XMLDocument is a Microsoft IE subset of JavaScript.	http://www.bindows.net/	http://www.java2s.com/Code/JavaScriptReference/Javascript-Properties/XMLDocument.htm
 else if(typeof window=='object'&&window.XMLHttpRequest/* && !window.ActiveXObject*/){//typeof XMLHttpRequest!='undefined'
  _new_obj_XMLHttp=new XMLHttpRequest();
  //	有些版本的 Mozilla 瀏覽器在伺服器送回的資料未含 XML mime-type 檔頭（header）時會出錯。為了避免這個問題，你可以用下列方法覆寫伺服器傳回的檔頭，以免傳回的不是 text/xml。
  //	http://squio.nl/blog/2006/06/27/xmlhttprequest-and-character-encoding/
  //	http://www.w3.org/TR/XMLHttpRequest/	search encoding
  if(_new_obj_XMLHttp.overrideMimeType)
   _new_obj_XMLHttp.overrideMimeType('text/'+(isText?'plain':'xml')+(enc?'; charset='+enc:''));//oXML
 }
 return _new_obj_XMLHttp;
}

/*	讀取URL by XMLHttpRequest
	http://jck11.pixnet.net/blog/post/11630232

* 若有多行程或為各URL設定個別XMLHttp之必要，請在一開始便設定getURL.multi_request，並且別再更改。
** 在此情況下，單一URL仍只能有單一個request!
** 設定 dealFunction 須注意程式在等待回應時若無執行其他程式碼將自動中止！
	可設定：
	while(getURL.doing)WScript.Sleep(1);	//||timeout

arguments f:{
	URL:'',	//	The same origin policy prevents document or script loaded from one origin, from getting or setting properties from a of a document from a different origin.(http://www.mozilla.org/projects/security/components/jssec.html#sameorigin)
	enc:'UTF-8',	//	encoding: big5, euc-jp,..
	fn:(dealFunction),	//	onLoad:function(){},
	method:'GET',	//	POST,..
	sendDoc:'text send in POST,..'
	async:ture/false,	//	true if want to asynchronous(非同期), false if synchronous(同期的,會直到readyState==4才return)	http://jpspan.sourceforge.net/wiki/doku.php?id=javascript:xmlhttprequest:behaviour
	user:'userName',
	passwd:'****',	//	password

 //TODO:
	parameters:'~=~&~=~', // {a:1,b:2}
	header:{contentType:'text/xml'},
	contentType:'text/xml',
	run:true/false,	//	do eval
	update:DOMDocument,	//	use onLoad/onFailed to 加工 return text. onFailed(){throw;} will about change.
	interval:\d,
	decay:\d,	//	wait decay*interval when no change
	maxInterval::\d,
	//insertion:top/bottom,..
	onFailed:function(error){this.status;},	//	onFailed.apply(XMLHttp,[XMLHttp.status])
	onStateChange:function(){},
 }


dealFunction:
自行處理	typeof dealFunction=='function':
function dealFunction(error){..}
代為處理	dealFunction=[d_func,0: responseText,1: responseXML]:
	responseXML:	http://msdn2.microsoft.com/en-us/library/ms757878.aspx
function d_func(content,head[,XMLHttp,URL]){
 if(head){
  //	content,head各為XMLHttp.responseText內容及XMLHttp.getAllResponseHeaders()，其他皆可由XMLHttp取得。
 }else{
  //	content為error
 }
}
e.g., the simplest: [function(c,h){h&&alert(c);}]

)
*/
getURL[generateCode.dLK]='newXMLHttp';
function getURL(f){	//	(URL,fn) or flag			URL,dealFunction,method,sendDoc,asyncFlag,userName,password
 var _f=arguments.callee;
 if(typeof _f.XMLHttp=='object'){
  //try{_f.XMLHttp.abort();}catch(e){}
  _f.XMLHttp=null;	//	此時可能衝突或lose?!
 }
 //	處理 arguments
 if(!(f instanceof Object))a=arguments,f={URL:f,fn:a[1],method:a[2],sendDoc:a[3]};

 if(!f.URL||!(_f.XMLHttp=newXMLHttp(f.enc,!/\.x(ht)?ml$/i.test(f.URL))))return;//throw
 //try{_f.XMLHttp.overrideMimeType('text/xml');}catch(e){}
 if(typeof f.async!='boolean')
  //	設定f.async
  f.async=f.fn?true:false;
 else if(!f.async)f.fn=null;
 else if(!f.fn)
  if(typeof _f.HandleStateChange!='function'||typeof _f.HandleContent!='function')
   // 沒有能處理的function
   return;//throw
  else
   f.fn=_f.HandleContent;//null;
 if(/*typeof _f.multi_request!='undefined'&&*/_f.multi_request){
  if(!_f.q)_f.i={},_f.q=[];	//	queue
  _f.i[f.URL]=_f.q.length;	//	** 沒有考慮到 POST 時 URL 相同的情況!
  _f.q.push({uri:f.URL,XMLHttp:_f.XMLHttp,func:f.fn,start:_f.startTime=new Date})
 }else if(_f.q&&typeof _f.clean=='function')_f.clean();

 //	for Gecko Error: uncaught exception: Permission denied to call method XMLHttpRequest.open
 if(f.URL.indexOf('://')!=-1&&typeof netscape=='object')
  if(_f.asked>2){_f.clean(f.URL);return;}
  else try{
   if(typeof _f.asked=='undefined')
    _f.asked=0,alert('我們需要一點權限來使用 XMLHttpRequest.open。\n* 請勾選記住這項設定的方格。');
   netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
  }catch(e){_f.asked++;_f.clean(f.URL);return;}//UniversalBrowserAccess

 //if(isNaN(_f.timeout))_f.timeout=300000;//5*60*1000;
 with(_f.XMLHttp)try{	//	IE:404會throw error, timeout除了throw error, 還會readystatechange; Gecko亦會throw error
  try{setRequestHeader("Accept-Encoding","gzip,deflate");}catch(e){}
  //	Set header so the called script knows that it's an XMLHttpRequest
  //setRequestHeader("X-Requested-With","XMLHttpRequest");
  //	Set the If-Modified-Since header, if ifModified mode.
  //setRequestHeader("If-Modified-Since","Thu, 01 Jan 1970 00:00:00 GMT");
  if(f.method=='POST'){//&&_f.XMLHttp.setRequestHeader
   //setRequestHeader("Content-Length",f.sendDoc.length);	//	use .getAttribute('method') to get	長度不一定如此
   //	有些CGI會用Content-Type測試是XMLHttp或是regular form
   //	It may be necessary to specify "application/x-www-form-urlencoded" or "multipart/form-data" for posted XML data to be interpreted on the server.
   setRequestHeader('Content-Type',f.fn instanceof Array&&f.fn[1]?'text/xml':'application/x-www-form-urlencoded');	//	application/x-www-form-urlencoded;charset=utf-8
  }
  abort();
  open(f.method||'GET',f.URL,f.async,f.user||null,f.passwd||null);
  //alert((f.method||'GET')+','+f.URL+','+f.async);
  //	 根據 W3C的 XMLHttpRequest 規格書上說，①在呼叫 open 時，如果readyState是4(Loaded) ②呼叫abort之後 ③發生其他錯誤，如網路問題，無窮迴圈等等，則會重設所有的值。使用全域的情況就只有第一次可以執行，因為之後的readyState是4，所以onreadystatechange 放在open之前會被清空，因此，onreadystatechange 必須放在open之後就可以避免這個問題。	http://www.javaworld.com.tw/jute/post/view?bid=49&id=170177&sty=3&age=0&tpg=1&ppg=1
  //	每使用一次XMLHttpRequest，不管成功或失敗，都要重設onreadystatechange一次。onreadystatechange 的初始值是 null
  //	After the initial response, all event listeners will be cleared. Call open() before setting new event listeners.	http://www.xulplanet.com/references/objref/XMLHttpRequest.html
  if(f.async)
	_f.doing=(_f.doing||0)+1,
	onreadystatechange=typeof f.fn=='function'?f.fn:function(e){_f.HandleStateChange(e,f.URL,f.fn);},//||null
	//	應加 clearTimeout( )
	setTimeout('try{getURL.'+(_f.multi_request?'q['+_f.i[f.URL]+']':'XMLHttp')+'.onreadystatechange();}catch(e){}',_f.timeout||3e5);//5*60*1000;
  send(f.sendDoc||null);
  if(!f.fn)return responseText;//responseXML: responseXML.loadXML(text)	//	非async(異步的)能在此就得到response。Safari and Konqueror cannot understand the encoding of text files!	http://www.kawa.net/works/js/jkl/parsexml.html
 }catch(e){if(typeof f.fn=='function')f.fn(e);else if(typeof window=='object')window.status=e.message;return e;}
}
getURL.timeoutCode=-7732147;

//	agent handle function
getURL.HandleStateChange=function(e,URL,dealFunction){	//	e: object Error, dealFunction: function(return text, heads, XMLHttpRequest object, URL) | [ function, (default|NULL:responseText, others:responseXML) ]
 var _t=0,isOKc,m=getURL.multi_request,_oXMLH;
 if(m)m=getURL.q[isNaN(URL)?getURL.i[URL]:URL],_oXMLH=m.XMLHttp,dealFunction=m.func,URL=m.uri;else _oXMLH=getURL.XMLHttp;
 if(dealFunction instanceof Array)_t=dealFunction[1],dealFunction=dealFunction[0];
 if(!dealFunction || typeof dealFunction!='function'){getURL.doing--;getURL.clean(URL);return;}
 //	http://big5.chinaz.com:88/book.chinaz.com/others/web/web/xml/index1/21.htm
 if(!e)
  if(typeof _oXMLH=='object'&&_oXMLH){
   if(_oXMLH.parseError&&_oXMLH/*.responseXML*/.parseError.errorCode!=0)
    e=_oXMLH.parseError,e=new Error(e.errorCode,e.reason);
   else if(_oXMLH.readyState==4){	//	only if XMLHttp shows "loaded"
    isOKc=_oXMLH.status;	//	condition is OK?
    isOKc=isOKc>=200&&isOKc<300||isOKc==304||!isOKc&&(location.protocol=="file:"||location.protocol=="chrome:");
    if(dealFunction==getURL.HandleContent)dealFunction(0,isOKc,_oXMLH,URL);//dealFunction.apply()
    else dealFunction(
	isOKc?_t?_oXMLH.responseXML:
		//	JKL.ParseXML: Safari and Konqueror cannot understand the encoding of text files.
		typeof window=='object'&&window.navigator.appVersion.indexOf("KHTML")!=-1&&!(e=escape(_oXMLH.responseText)).indexOf("%u")!=-1?e:_oXMLH.responseText
	:0
	,isOKc?_oXMLH.getAllResponseHeaders():0,_oXMLH,URL);//dealFunction.apply()
    //	URL之protocol==file: 可能需要重新.loadXML((.responseText+'').replace(/<\?xml[^?]*\?>/,""))
    //	用 .responseXML.documentElement 可調用
    getURL.doing--;getURL.clean(URL);
    return;
   }
  }else if(new Date-(m?m.start:getURL.startTime)>getURL.timeout)
   //	timeout & timeout function	http://www.stylusstudio.com/xmldev/199912/post40380.html
   e=new Error(getURL.timeoutCode,'Timeout!');//_oXMLH.abort();
 //alert(URL+'\n'+_t+'\n'+e+'\n'+_oXMLH.readyState+'\n'+dealFunction);
 if(e){dealFunction(e,0,_oXMLH,URL);getURL.doing--;getURL.clean(URL);}//dealFunction.apply(e,URL);
};

/*	agent content handle function
有head時content包含回應，否則content表error
*/
getURL.HandleContent=function(content,head,_oXMLHttp,URL){
 if(head){
  // _oXMLHttp.getResponseHeader("Content-Length")
  alert("URL:	"+URL+"\nHead:\n"+_oXMLHttp.getAllResponseHeaders()+"\n------------------------\nLastModified: "+_oXMLHttp.getResponseHeader("Last-Modified")+"\nResult:\n"+_oXMLHttp.responseText.slice(0,200));//_oXMLHttp.responseXML.xml
 }else{
  //	error	test時，可用getURL.XMLHttp.open("HEAD","_URL_",true);，getURL(url,dealResult,'HEAD',true)。
  if(content instanceof Error)alert('Error occured!\n'+(typeof e=='object'&&e.number?e.number+':'+e.message:e||''));
  else if(typeof _oXMLHttp=='object'&&_oXMLHttp)alert((_oXMLHttp.status==404?"URL doesn't exist!":'Error occured!')+'\n\nStatus: '+_oXMLHttp.status+'\n'+_oXMLHttp.statusText);
 }
};

//	在MP模式下清乾淨queue
getURL.clean=function(i,force){
 if(force||getURL.multi_request)
  if(!i&&isNaN(i)){
   if(getURL.q)
    for(i in getURL.i)
     try{
      getURL.q[getURL.i[i]].XMLHttp.abort();
      //getURL.q[getURL.i[i]].XMLHttp=null;
     }catch(e){}
   getURL.q=getURL.i=0;//null
  }else if(!isNaN(i)||!isNaN(i=getURL.i[typeof i=='object'?i.uri:i])){
   try{getURL.q[i].XMLHttp.abort();}catch(e){};
   //getURL.q[i].XMLHttp=0;
   delete getURL.i[getURL.q[i].uri];getURL.q[i]=0;
  }
};

//	↑XMLHttp set	==================


