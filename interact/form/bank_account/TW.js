
/**
 * @name	CeL bank account function
 * @fileoverview
 * 本檔案包含了輸入 bank account 的 functions。
 * @since	
 */


'use strict';
if (typeof CeL === 'function')
CeL.run({
name:'interact.form.bank_account.TW',
require : 'interact.form.select_input.|data.CSV.parse_CSV',
code : function(library_namespace) {

//	requiring
var parse_CSV = this.r('parse_CSV');



//	===================================================
/*
	used for bank account & bank id input form

TODO:


HISTORY:
2008/7/26 14:46:14	create
*/


var

//	class private	-----------------------------------

module_name = this.id,

//	存放 data 的 path
path = library_namespace.get_module_path(this.id, 'bank_id/'),


//	總單位帳號長度
mainLen=3,
//	支單位帳號長度
branchLen=7,

/*

//	and, select_input 用
bank[Number(id)]={
	id:'\d'			//	通匯金融代號, 郵局或是銀行代碼
	name:'',		//	總單位名稱
	digital:\d || [\d,..],	//	帳號長度之描述
	maxD:\d,		//	max 長度
	minD:\d,		//	min 長度
	branch:{		//	分行
		通匯金融代號:支單位名稱,..
	}
}

*/

bank=[],
bankNow,bankIdNow,

getBankID=function(id,force){
 var o=bank[id=Math.floor(id)],l,d,i;
 if(!o)return;
 if(!force&&('branch' in o))return o.branch;

 library_namespace.debug('load ['+path+'id'+(id>99?'':id>9?'0':'00')+id+'.csv]',2, module_name+'.getBankID');
 try{
  d=library_namespace.get_file(path+'id'+(id>99?'':id>9?'0':'00')+id+'.csv');
 }catch(e){
  library_namespace.warn(module_name+'getBankID: <em>Cannot load data: ['+url+']!</em> '+e.message);
  return;
 }
 if(!d||!(d=parse_CSV(d))||!d.length){
  library_namespace.warn(module_name+'getBankID: Cannot read data from ['+url+']!');
  return;
 }


 library_namespace.debug(d.length+' data',2, module_name+'.getBankID');
 for(i=0,l=o.branch={};i<d.length;i++){
  library_namespace.debug('data ['+d[i][0]+'] '+d[i][1],4, module_name+'.getBankID');
  if(!isNaN(d[i][0])){
   library_namespace.debug('branch ['+d[i][0]+'] '+d[i][1],3, module_name+'.getBankID');
   l[d[i][0]]=d[i][1];
  }else if(library_namespace.is_debug()){
   library_namespace.debug('unknown data ['+d[i][0]+'] '+d[i][1],2, module_name+'.getBankID');
  }
 }

 return l;
},

//	將帳號長度之描述轉成帳號長度， return max digital
getDigital=function(id){
 var o=bank[id=Math.floor(id)],d,a,i=0,m,max=0,min=Number.MAX_VALUE;
 if(!o)return;	//	error
 if('maxD' in o)return o.maxD;	//	作過了

 library_namespace.debug('get id '+id+', parse ['+o.digital+']', 2, module_name+'.getDigital');
 d=o.digital,a=d.replace(/\n/g,'').match(/\d{1,2}位/g);

 if(a)	//	有可能資料錯誤，無法取得。
  for(d=[];i<a.length;i++)
   if(m=a[i].match(/\d{1,2}/)){
    d.push(m=Math.floor(m[0]));
    if(min>m)min=m;
    if(max<m)max=m;
   }

 if(!d.length)d=max=min=0;
 else if(d.length===1)d=max=min=d[0];

 library_namespace.debug(o.name+' '+min+'-'+max, 2, module_name+'.getDigital');
 o.maxD=max;
 o.minD=min;

 return max;
},

/**
 * inherit select_input
 * @class	輸入 bank account 的 functions
 */
_ = function() {
	// applies the parent's constructor.
	library_namespace.select_input.apply(this, arguments);
	if (!this.loaded)
		return;

	this.setClassName('bank_account_input');
	this.setSearch(function(i,k){
	 if(k)library_namespace.debug('['+k+'], ['+(typeof i)+']'+i, 5, module_name+'.compare function');
	 return typeof i=='object'?
	  //	bank
	  i.id.slice(0,k.length)==k||i.name.indexOf(k)!=-1
	  //	bank.branch
	  :i.length<k.length?0/*i==k.slice(0,i.length)*/:i.slice(0,k.length)==k;
	});
	this.setInputType(1);
	var _t=this,i=this.onInput;
	(this.onInput=function(k){
	if(k)
	 library_namespace.debug('input ['+k+'] - '+k.slice(0,3), 2, module_name+'.onInput');
	 if(_t.inputAs!=2&&k&&k.length>=mainLen){
	  var id=Math.floor(k.slice(0,mainLen)),l;
	  if((bank[id])&&(l=getBankID(id))&&l!==_t.setAllList())
	   bankNow=bank[bankIdNow=id].name,_t.setInputType(0,id),_t.setAllList(l);
	 }else if(bank!==_t.setAllList()){
		 bankNow=0;
		 bankIdNow=-1;
		 _t.setInputType(0,-1);
		 _t.setAllList(bank);
		}
		// 執行主要功能。
		i.apply(_t, arguments);
	 //	若達到標標準，則 triggerToInput。
	 if(!_t.clickNow&&k&&(_t.inputAs==2&&k.length==mainLen||_t.inputAs==3&&k.length==branchLen||k.length==getDigital(bankIdNow)))
	  _t.triggerToInput(0);
	 else _t.focus();
	})();

	//	show arrow.
	this.triggerToInput(1);
	this.focus(0);
},
_p = _.prototype;

//	class public interface	---------------------------


//	初始設定並讀取 bank id data
//	這應該在所有 new 之前先作！
_.readData = function(url) {
	if (!url)
		return;
	path = url.match(/^(.+\/)?([^\/]+)$/)[1];

	var data, i = 0, a, b;
	try {
		a = library_namespace.get_file(url);
	} catch (e) {
		library_namespace.warn( [ module_name+'.readData: Cannot load data: [', url,
		                  		']! ', {
		                  			em : [ '本 module [', module_name, '] 須以 Ajax 載入資料！ ' ]
		                  		}, e.message ]);
		return;
	}
	if (!a || !(data = parse_CSV(a))
			|| data.length < 9
			|| data[0].length < 3) {
		library_namespace.warn(module_name+'.TW.readData: Cannot read data from [' + url + ']!');
		return;
	}
	library_namespace.debug('Read ' + data.length + ' items from [' + url + ']', 1, module_name+'.readData');

	//	reset
	bank = [];

	for (; i < data.length; i++) {
		a = data[i];
		bank[Math.floor(a[0])] = {
				//	通匯金融代號。
				id : a[0],
				//	總單位名稱。
				name : a[1],
				//	帳號長度之描述。
				digital : a[2]
		};
	}

};


//	class constructor	---------------------------

_.readData(path + 'id.csv');


//	不再使繼承。
delete _.clone;


//	instance public interface	-------------------

//	1: all, 2: 到總單位, 3: 到支單位
_p.setInputType=function(t,i){	//	(type,id)
 var _t=this;
 if(t)_t.inputAs=t,i=i||-1;
 t=_t.inputAs;
 //	mainLen+getDigital(i): 看來似乎得加上原來銀行代號 mainLen 碼。最起碼郵局是這樣。
 if(i)_t.setMaxLength(t==2?mainLen:t==3?branchLen:i<0?20:getDigital(i)?mainLen+getDigital(i):20);
 return t;
};

//	input: (list, index), return [value, title[, key=title||value]]
_p.onList=function(l,i){
 if(bankNow)return [l[i],i+' '+bankNow];
 else if(i in l)return [l[i].name,l[i].id];
};

//	input: (list, index), return value to set as input key
_p.onSelect=function(l,i){
 return bankNow?i:l[i].id;
};

_p.verify = function(k) {
	library_namespace.debug('verify ['+k+']', 2, module_name+'.verify');
	var m;

	if (!k && k !== 0)
		return 1;

	if (!library_namespace.is_digits(k))
		return 2;

	if (k.length >= mainLen)
		if (!bank[m = Math.floor(k.slice(0, mainLen))]
				|| k.length >= branchLen
				&& (m = bank[m].branch)
				&& !(k.slice(0, branchLen) in m)
				//	為郵局(branch length:10)特設
				&& (k.slice(0, 3) !== '700' || !((k.slice(0, 10) in m))))
			return 1;
};


library_namespace.inherit(_, 'interact.form.select_input');




return _;
},

// this is a sub module.
no_extend : '*,this'

});
