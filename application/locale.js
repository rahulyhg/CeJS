
/**
 * @name	CeL function for locale / i18n (Internationalization) 系列
 * @fileoverview
 * 本檔案包含了地區語系/文化設定的 functions。
 * @since	
 */

/*
http://blog.miniasp.com/post/2010/12/24/Search-and-Download-International-Terminology-Microsoft-Language-Portal.aspx
http://www.microsoft.com/language/zh-tw/default.aspx
Microsoft | 語言入口網站
*/

if (typeof CeL === 'function')
CeL.setup_module('application.locale',
function(library_namespace, load_arguments) {
'use strict';

//	nothing required



/**
 * null module constructor
 * @class	locale 的 functions
 */
var _// JSDT:_module_
= function() {
	//	null module constructor
};

/**
 * for JSDT: 有 prototype 才會將之當作 Class
 */
_// JSDT:_module_
.prototype = {
};



/*
http://www.whatwg.org/specs/web-apps/current-work/#the-lang-and-xml:lang-attributes
The lang attribute (in no namespace) specifies the primary language for the element's contents and for any of the element's attributes that contain text. Its value must be a valid BCP 47 language tag, or the empty string.
<a href="http://www.ietf.org/rfc/bcp/bcp47.txt" accessdate="2012/8/22 15:23">BCP 47: Tags for Identifying Languages</a>

<a href="http://en.wikipedia.org/wiki/IETF_language_tag" accessdate="2012/8/22 15:25">IETF language tag</a>

*/
function language_tag(tag) {
	language_tag.parse.call(this, tag);
}

//	3_language[-3_extlang][-3_extlang][-4_script][-2w|3d_region]
language_tag.language_RegExp = /^(?:(?:([a-z]{2,3})((?:-[a-z]{3}){0,2})))(?:-([a-z]{4}))?(?:-([a-z]{2}|\d{3}))?((?:-(?:[a-z\d]{2,8}))*)$/;
//	x-fragment[-fragment]..
language_tag.privateuse_RegExp = /^x((?:-(?:[a-z\d]{1,8}))+)$/;
// 片段
language_tag.privateuse_fragment_RegExp = /-([a-z\d]{1,8})/g;
language_tag.parse = function(tag) {
	this.tag = tag;
	// language tags and their subtags, including private use and
	// extensions, are to be treated as case insensitive
	tag = ('' + tag).toLowerCase();
	var i = 1, match = language_tag.language_RegExp.exec(tag);
	if (match) {
		library_namespace.debug(match.join('<br />'), 3, 'language_tag.parse');

		//	3_language[-3_extlang][-3_extlang][-4_script][-2w|3d_region]
		this.language = match[i++];
		// TODO: 查表對照轉換, fill this.language
		this.extlang = match[i++];

		this.script = match[i++];
		this.region = match[i++];

		// TODO: variant, extension, privateuse
		this.external = match[i++];

		if (library_namespace.is_debug(2)) {
			for (i in this) {
				library_namespace.debug(i + ' : ' + this[i], 2, 'language_tag.parse');
			}
		}

	} else if (match = language_tag.privateuse_RegExp.exec(tag)) {

		//	x-fragment[-fragment]..
		library_namespace.debug('parse privateuse [' + tag + ']', 2, 'language_tag.parse');
		tag = match[1];
		this.privateuse = i = [];
		// reset 'g' flag
		language_tag.privateuse_fragment_RegExp.exec('');
		while (match = language_tag.privateuse_fragment_RegExp.exec(tag)) {
			i.push(match[1]);
		}
		library_namespace.debug('privateuse: ' + i, 2, 'language_tag.parse');

	} else if (library_namespace.is_debug()) {
		library_namespace.warn('unrecognized language tag: [' + tag + ']');
	}

	return this;
};

// 查表對照轉換
language_tag.convert = function() {
	throw 'TODO';
};

/*
new language_tag('cmn-Hant-TW');
new language_tag('zh-cmn-Hant-TW');
new language_tag('zh-Hant-TW');
new language_tag('zh-TW');
new language_tag('cmn-Hant');
new language_tag('zh-Hant');
new language_tag('x-CJK').language;
new language_tag('zh-Hant').language;
*/

_// JSDT:_module_
.
language_tag = language_tag;



// ----------------------------------------------------------------------------------------------------------------- //
//	中文數字(Chinese numerals)

//	將漢字中文數字轉換為阿拉伯數字表示法(0-99999)
function from_Chinese_numerals_Low_count(num) {
	if (!num) return 0;
	if (!isNaN(num)) return num;
	var i = 0, l, m, n = '〇一二三四五六七八九'.split(''), d = '萬千百十'.split(''), r = 0,
	//	Ｏ, ○=[〇]
	//	<a href="http://zh.wikipedia.org/wiki/%E6%97%A5%E8%AA%9E%E6%95%B8%E5%AD%97" accessdate="2012/9/10 21:0">日語數字</a>
	p = ('' + num).replace(/\s/g, '').replace(/[Ｏ○]/g, '〇');
	for (; i < n.length; i++)
		n[n[i]] = i;
	for (i = 0; i < d.length; i++) {
		if (p && (m = d[i] ? p.indexOf(d[i]) : p.length) !== -1)
			if (!m && d[i] === '十')
				r += 1, p = p.slice(1);
			else if (isNaN(l = n[p.slice(0, m).replace(/^〇+/, '')]))
				return num;
			else
				r += l, p = p.slice(m + 1);
		if (d[i])
			r *= 10;
	}
	return r;
}
//alert(from_Chinese_numerals_Low_count('四萬〇三百七十九'));
//alert(from_Chinese_numerals_Low_count('十'));



var
//	小寫數字
Chinese_numerals_Normal_digit = '〇一二三四五六七八九'.split(''),
//	大寫數字	叄
Chinese_numerals_Financial_digit = '零壹貳參肆伍陸柒捌玖'.split(''),

//	denomination, 萬進系統單位
//	http://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%87%E6%95%B0%E5%AD%97	http://zh.wikipedia.org/wiki/%E5%8D%81%E8%BF%9B%E5%88%B6	http://zh.wikipedia.org/wiki/%E4%B8%AD%E6%96%87%E6%95%B0%E5%AD%97	http://lists.w3.org/Archives/Public/www-style/2003Apr/0063.html	http://forum.moztw.org/viewtopic.php?t=3043	http://www.moroo.com/uzokusou/misc/suumei/suumei.html	http://espero.51.net/qishng/zhao.htm	http://www.nchu.edu.tw/~material/nano/newsbook1.htm
//	http://www.moroo.com/uzokusou/misc/suumei/suumei1.html
//	十億（吉）,兆（萬億）,千兆（拍）,百京（艾）,十垓（澤）,秭（堯）,秭:禾予;溝(土旁);,無量大數→,無量,大數;[載]之後的[極]有的用[報]	異體：阿僧[禾氏],For Korean:阿僧祗;秭:禾予,抒,杼,For Korean:枾	For Korean:不可思議(不:U+4E0D→U+F967)
//	Espana應該是梵文所譯 因為根據「大方廣佛華嚴經卷第四十五卷」中在「無量」這個數位以後還有無邊、無等、不可數、不可稱、不可思、不可量、不可說、不可說不可說，Espana應該是指上面其中一個..因為如果你有心查查Espana其實應該是解作西班牙文的「西班牙」
Chinese_numerals_Denomination = ',萬,億,兆,京,垓,秭,穰,溝,澗,正,載,極,恒河沙,阿僧祇,那由他,不可思議,無量,大數,Espana',
//	http://zh.wikipedia.org/wiki/%E5%8D%81%E9%80%80%E4%BD%8D
//	比漠微細的，是自天竺的佛經上的數字。而這些「佛經數字」已成為「古代用法」了。
//	小數單位(十退位)：分,釐(厘),毫(毛),絲,忽,微,纖,沙,塵（納）,埃,渺,漠(皮),模糊,逡巡,須臾（飛）,瞬息,彈指,剎那（阿）,六德(德),虛,空,清,淨	or:,虛,空,清,淨→,空虛,清淨（仄）,阿賴耶,阿摩羅,涅槃寂靜（攸）

//	下數系統單位
Chinese_numerals_Normal_base_denomination = (',十,百,千' + Chinese_numerals_Denomination).split(','),
Chinese_numerals_Financial_base_denomination = (',拾,佰,仟' + Chinese_numerals_Denomination).split(',');
Chinese_numerals_Denomination = Chinese_numerals_Denomination.split(',');

//	將阿拉伯數字轉為中文數字<b>下數系統</b>大寫、小寫兩種表示法/讀法
//	處理1-99999的數,尚有bug
function to_Chinese_numerals_Low_count(numStr, kind) {
	// 用r=[]約多花一倍時間!
	var i = 0, r = '', l = numStr.length - 1, d,
	tnum = kind ? Chinese_numerals_Financial_digit : Chinese_numerals_Normal_digit,
	zero = tnum[0],
	tbd = kind ? Chinese_numerals_Financial_base_denomination : Chinese_numerals_Normal_base_denomination;

	for (; i <= l; i++)
		// if(d=parseInt(numStr.charAt(i)))比較慢
		if ((d = numStr.charAt(i)) != '0')
			// '〇一二三四五六七八'.charAt(d) 比較慢
			r += tnum[d] + tbd[l - i];
		else if (r.slice(-1) != zero)
			if (Math.floor(numStr.substr(i + 1)))
				r += zero;
			else
				break;
	return r;
}
//2.016,2.297,2.016
//{var d=new Date,v='12345236',i=0,a;for(;i<10000;i++)a=to_Chinese_numerals(v);alert(v+'\n→'+a+'\ntime:'+gDate(new Date-d));}


/**
 * 將數字轉為萬進中文數字表示法。
 * num>1京時僅會取概數，此時得轉成string再輸入！
 * TODO:
 * 統整:尚有bug。
 * 廿卅
 * 小數
 * @param num
 * @param kind
 * @returns
 */
function to_Chinese_numerals(num, kind) {
	// num=parseFloat(num);
	if (typeof num === 'number')
		num = num.toString(10);
	num = ('' + num).replace(/[,\s]/g, '');
	if (isNaN(num))
		return '(非數值)';

	if (num.match(/(-?[\d.]+)/))
		num = RegExp.$1;

	var j,
	//	i:integer,整數;
	i,
	//	d:decimal,小數
	d = num.indexOf('.'), k, l, m, addZero = false,
	tnum = kind? Chinese_numerals_Financial_digit : Chinese_numerals_Normal_digit, zero = tnum[0];
	if (d === -1)
		d = 0;
	else
		for (num = num.replace(/0+$/, ''), i = num.substr(d + 1), num = num
				.slice(0, d), d = '', j = 0; j < i.length; j++)
			// 小數
			d += tnum[i.charAt(j)];

	// 至此num為整數
	if (num.charAt(0) === '-')
		i = '負', num = num.substr(1);
	else
		i = '';
	num = num.replace(/^0+/, '');

	m = num.length % 4, j = m - 4, l = (num.length - (m || 4)) / 4;
	// addZero=false, l=Math.floor((num.length-1)/4)
	for (; j < num.length; m = 0, l--)
		// 這邊得用 parseInt( ,10): parseInt('0~')會用八進位，其他也有奇怪的效果。
		if (Math.floor(m = m ? num.slice(0, m) : num.substr(j += 4, 4))) {
			m = to_Chinese_numerals_Low_count(m, kind);
			if (addZero = addZero && m.charAt(0) != zero)
				i += zero + m + Chinese_numerals_Denomination[l], addZero = false;
			else
				i += m + Chinese_numerals_Denomination[l];
		} else
			addZero = true;

	return (i ? i.slice(0, 2) === '一十' || i.slice(0, 2) === '一拾' ? i.substr(1) : i : zero)
			+ (d ? '點' + d : '');
}


_.from_Chinese_numerals = from_Chinese_numerals_Low_count;
_.to_Chinese_numerals = to_Chinese_numerals;



/**
 * 各區文化特色 - 貨幣轉換:<br />
 * 轉換成新臺幣金額中文大寫表示法。<br />
 * Converted into money notation.
 * 
 * @param {Number|String}amount
 *            貨幣數量。
 * @returns {String} 新臺幣金額中文大寫表示法。
 * @requires to_Chinese_numerals()
 */
function to_TWD(amount) {
	if (typeof amount === 'string')
		amount = amount.replace(/[\s,$]+/g, '');

	var i = (amount = to_Chinese_numerals(amount, 1)).indexOf('點');

	// 銀行習慣用法，零可以不用寫。
	amount = amount.replace(/([仟萬億兆京垓秭穰溝澗正載極])零/g, '$1');

	return '新臺幣'
			+ (i === -1 ? amount + '圓整' : amount.slice(0, i) + '圓'
					+ amount.charAt(++i) + '角'
					+ (++i == amount.length ? '' : amount.charAt(i++) + '分')
					+ amount.substr(i));
}

_// JSDT:_module_
.
to_TWD = to_TWD;


// ----------------------------------------------------------------------------------------------------------------- //





// ----------------------------------------------------------------------------------------------------------------- //
//	JavaScript i18n (internationalization) / l10n (localization).


/**
 * 為各種不同 domain，如為不同語系轉換文字(句子)。<br>
 * 需要確認系統相應 domain resource 已載入時，請利用 gettext.set_domain(domain, callback)。
 * TODO:
 * using localStorage.
 * 
 * @example <code>

CeL.gettext.set_domain('TW');
CeL.assert([ '載入中…', CeL.gettext('Loading..') ]);
CeL.assert([ '已載入 20%…', CeL.gettext('Loading %1%..', 20) ]);



CeL.gettext.set_text({
	'%n1 smart ways to spend %c2' : '%n1個花%c2的聰明方法'
}, 'Traditional Chinese');

CeL.assert([ '十個花新臺幣柒萬圓整的聰明方法',
		CeL.gettext('%n1 smart ways to spend %c2', 10, 70000) ]);

CeL.assert([ '二十五個花新臺幣捌拾億捌萬圓整的聰明方法',
		CeL.gettext('%n1 smart ways to spend %c2', 25, 8000080000) ]);

CeL.assert([ '四萬〇三十五個花新臺幣伍佰玖拾捌萬陸仟玖佰貳拾捌圓整的聰明方法',
		CeL.gettext('%n1 smart ways to spend %c2', 40035, 5986928) ]);



CeL.gettext.conversion['smart way'] = [ 'no %n', '1 %n', '%d %ns' ];
// You can also use this:
CeL.gettext.conversion['smart way'] = function(count) {
	var pattern = [ 'no %n', '1 %n', '%d %ns' ];
	return pattern[count < pattern.length ? count : pattern.length - 1]
			.replace(/%n/, 'smart way').replace(/%d/, count);
};

CeL.gettext.set_text({
	'%smart way@1 to spend %c2' : '%n1個花%c2的聰明方法'
}, 'TW');

CeL.gettext.set_domain('正體中文');
CeL.assert([ '十個花新臺幣柒萬圓整的聰明方法',
		CeL.gettext('%smart way@1 to spend %c2', 10, 70000) ]);
CeL.assert([ '二十五個花新臺幣捌拾億捌萬圓整的聰明方法',
		CeL.gettext('%smart way@1 to spend %c2', 25, 8000080000) ]);
CeL.assert([ '四萬〇三十五個花新臺幣伍佰玖拾捌萬陸仟玖佰貳拾捌圓整的聰明方法',
		CeL.gettext('%smart way@1 to spend %c2', 40035, 5986928) ]);

CeL.gettext.set_domain('en-US', true);
CeL.assert([ '10 smart ways to spend US$70,000',
		CeL.gettext('%smart way@1 to spend %c2', 10, 70000) ]);

 * </code>
 * 
 * @param {String|Function|Object}text_id
 *            欲呼叫之 text id。<br> ** 若未能取得，將直接使用此值。因此即使使用簡單的代號，也建議使用 msg#12,
 *            msg[12] 之類的表示法，而非直接以整數序號代替。<br>
 *            嵌入式的一次性使用，不建議如此作法: { domain : text id }
 * @param {String|Function}
 *            other arguments to include
 * 
 * @returns {String}轉換過的文字。
 * 
 * @since 2012/9/9 00:53:52
 * 
 * @see <a
 *      href="http://stackoverflow.com/questions/48726/best-javascript-i18n-techniques-ajax-dates-times-numbers-currency"
 *      accessdate="2012/9/9 0:13">Best JavaScript i18n techniques / Ajax -
 *      dates, times, numbers, currency - Stack Overflow</a>,<br>
 *      <a
 *      href="http://stackoverflow.com/questions/3084675/internationalization-in-javascript"
 *      accessdate="2012/9/9 0:13">Internationalization in Javascript - Stack
 *      Overflow</a>,<br>
 *      <a
 *      href="http://stackoverflow.com/questions/9640630/javascript-i18n-internationalization-frameworks-libraries-for-clientside-use"
 *      accessdate="2012/9/9 0:13">javascript i18n (internationalization)
 *      frameworks/libraries for clientside use - Stack Overflow</a>
 */
function gettext(text_id) {
	var arg = arguments, length = arg.length,
	domain_name = gettext_domain_name,
	domain = gettext_domain,

	// 轉換 / convert function.
	convert = function(t) {
		if (typeof t !== 'function' && t in domain)
			t = domain[t];

		return typeof t === 'function' ? t(domain_name) : t;
	},

	text = convert(library_namespace.is_Object(text_id) ?
			text_id[domain_name] : text_id);

	if (length > 1)
		text = text.replace(/%(?:(%)|(?:([\S]{1,3})|([^@]+)@)?([1-9][0-9]?))/g,
			function(whole_sequence, is_escaped, conversion, object_name, NO) {
				if (is_escaped)
					return is_escaped;
	
				//NO = NO - 0;
				if (NO < length
						&& (!(conversion || (conversion = object_name))
								|| conversion in gettext.conversion)) {
					whole_sequence = convert(arg[NO]);
					if (conversion)
						whole_sequence = library_namespace.is_Array(object_name = gettext.conversion[conversion]) ?
								gettext_conversion_Array(whole_sequence, object_name)
								: object_name(whole_sequence, domain_name);
				} else
					library_namespace.warn('gettext: ' +
							(NO < length ? 'Unknown conversion [' + conversion + ']' : 'given too few arguments: ' + length + ' <= no ' + NO));
				return whole_sequence;
			}
		);

	return '' + text;
}


/**
* 檢查指定資源是否已載入，若已完成，則執行 callback 序列。
* 
* @param {String}[domain_name]
*            設定當前使用之 domain name。
* @param {Function}[callback]
*            回撥函式。
* @param {Integer}[type]
*            欲設定已載入/未載入之資源類型。
* @param {Boolean}[yet_done]
*            是否尚未載入之資源類型。
*/
function gettext_check_callback(domain_name, callback, type, yet_done) {
	if (!domain_name)
		domain_name = gettext_domain_name;
	if (!(domain_name in gettext_callback))
		gettext_callback[domain_name] = {
			callback : []
		};

	var domain = gettext_callback[domain_name];

	if (typeof callback === 'function')
		domain.callback.push(callback);

	// 登記已經載入之資源。
	if (type && (type = [ , 'system', 'user' ][type]))
		domain[type] = !yet_done;

	if (domain.system && domain.user) {
		while (callback = domain.callback.shift())
			callback(domain_name);
	}
}


/**
 * 當設定 conversion 為 Array 時，將預設採用此 function。<br>
 * 可用在 plural 上。
 * 
 * @param {Integer}amount
 *            數量
 * @param {Array}conversion
 *            用來轉換的 Array
 * @returns {String} 轉換過的文字/句子。
 */
function gettext_conversion_Array(amount, conversion_Array) {
	var text,
	// index used. TODO: check if amount < 0 or amount is not integer.
	index = amount < conversion_Array.length ? amount
			: conversion_Array.length - 1;
	while (!(text = conversion_Array[index]))
		index--;
	return text.replace(/%n/, 'smart way').replace(/%d/, amount);
}


/**
 * 設定如何載入指定 domain resource，如語系檔。
 * 
 * @param {String|Function}path
 *            (String) prefix of path to load.<br>
 *            function(domain){return path to load;}
 */
gettext.set_domain_location = function(path) {
	if (path) {
		gettext_location = path;
		//	重設 user domain resource。
		gettext_check_callback('', null, 2, true);
	}
	return gettext_location;
};
/**
 * 取得當前使用之 domain name。
 * 
 * @returns 當前使用之 domain name。
 */
gettext.get_domain_name = function() {
	return gettext_domain_name;
};
/**
 * 取得/設定當前使用之 domain。
 * 
 * @param {String}[domain]
 *            設定當前使用之 domain name。
 * @param {Function}[callback]
 *            回撥函式。
 * @param {Boolean}[force]
 *            即使不存在此 domain，亦設定之。
 * @returns 當前使用之 domain。
 */
gettext.set_domain = function(domain, callback, force) {
	if(arguments.length === 2 && typeof callback !== 'function') {
		//	shift 掉 callback。
		force = callback;
		callback = undefined;
	}

	if ((force || domain)
			&& ((domain in gettext_texts || (domain = gettext.to_norm(domain)) in gettext_texts) || force)) {
		if (!domain)
			//	default domain name
			domain = '';
		else
			library_namespace.debug('Using domain / locale [' + gettext.get_alias(domain) + '] (' + domain + ').', 1, 'gettext');

		gettext_domain_name = domain;
		if (!(domain in gettext_texts))
			gettext_texts[domain] = {};
		gettext_domain = gettext_texts[domain];

		//	initialization 時，gettext 可能還沒 loaded。
		if (gettext_is_loaded ||
				(gettext_is_loaded = library_namespace.is_loaded(load_arguments.module_name))) {
			//	載入系統相應  domain resource。
			library_namespace.include_module_resource(
					domain + '.js',
					load_arguments.module_name + '.resource.',
					function () {
						gettext_check_callback(domain, callback, 1);
					}
			);

			if (gettext_location) {
				//	載入指定 domain resource，如語系檔。
				library_namespace.include_resource(
					typeof gettext_location === 'string' ? gettext_location+ domain + '.js' : gettext_location(domain),
					function () {
						gettext_check_callback(domain, callback, 2);
					}
				);
			} else
				//	直接設定 user domain resource 了。
				gettext_check_callback(domain, callback, 2);
		}

	} else if (callback) {
		gettext_check_callback(domain, callback);
	}

	return gettext_domain;
};


/**
 * 設定欲轉換的文字格式。
 * 
 * @param {Object}text_Object
 *            文字格式。 {<br>
 *            text id : text for this domain }<br>
 *            函數以回傳文字格式。 {<br>
 *            text id : function(domain name){ return text for this domain } }
 * @param {String}[domain]
 *            指定存入之 domain。
 * @param {Boolean}[replace]
 *            是否直接覆蓋掉原先之 domain。
 */
gettext.set_text = function(text_Object, domain, replace) {
	if (!library_namespace.is_Object(text_Object))
		return;

	if (!domain)
		domain = gettext_domain_name;

	if (!(domain in gettext_texts))
		domain = gettext.to_norm(domain);

	if (replace)
		gettext_texts[domain] = text_Object;
	else {
		if (!(domain in gettext_texts))
			// specify a new domain.
			gettext_texts[domain] = {};
		domain = gettext_texts[domain];
		for ( var text_id in text_Object) {
			domain[text_id] = text_Object[text_id];
		}
	}
};

// ------------------------------------

/**
 * 取得 domain 別名。
 * 
 * @param {String}[alias]
 *            指定之正規名稱。
 * @returns {String} 主要使用之別名。
 * @returns {Object} { 正規名稱 : 別名 }
 */
gettext.get_alias = function(norm) {
	return arguments.length > 0 ? gettext_main_alias[norm] : gettext_main_alias;
};

/**
 * 設定 domain 別名。<br>
 * 本函數會改變 {Object}list!
 * 
 * @param {Object}list
 *            full alias list / 別名。 = {<br>
 *            norm/criterion (IANA language tag) : [<br>
 *            main alias (e.g., local name),<br>
 *            IETF language tag,<br>
 *            other aliases ] }
 */
gettext.set_alias = function(list) {
	if (!library_namespace.is_Object(list))
		return;

	var norm, alias, alias_list, index, i, l;
	for (norm in list) {
		alias_list = list[norm];
		if (typeof alias_list === 'string')
			alias_list = alias_list.split(',');
		else if (!library_namespace.is_Array(alias_list)) {
			library_namespace.warn('gettext.set_alias: Illegal alias list: [' + alias_list + ']');
			continue;
		}

		// 加入 norm 本身。
		alias_list.push(norm);

		for (i = 0, l = alias_list.length; i < l; i++)
			if (alias = alias_list[i]) {
				//library_namespace.debug('Adding [' + alias + '] → [' + norm + ']', 1, 'gettext.set_alias');
				if (!(norm in gettext_main_alias))
					gettext_main_alias[norm] = alias;

				// 正規化: 不分大小寫, _ → -
				alias = alias.toLowerCase().replace(/_/g, '-');
				// for fallback
				for (;;) {
					gettext_aliases[alias] = norm;

					index = alias.lastIndexOf('-');
					if (index < 1)
						break;
					alias = alias.slice(0, index);
				}
			}
	}
};

/**
 * 將 domain 別名正規化，轉為正規名稱。
 * 
 * @param {String}alias
 *            指定之別名。
 * @returns {String} 正規名稱。
 * @returns undefined : can't found.
 */
gettext.to_norm = function(alias) {
	if (typeof alias !== 'string')
		return;

	// 正規化: 不分大小寫, _ → -
	alias = alias.toLowerCase().replace(/_/g, '-');
	var index;
	// for fallback
	for (;;) {
		//library_namespace.debug('test [' + alias + ']', 3, 'gettext.to_norm');
		if (alias in gettext_aliases)
			return gettext_aliases[alias];

		index = alias.lastIndexOf('-');
		if (index < 1)
			return;
		alias = alias.slice(0, index);
	}
};

//------------------------------------
//	conversion specifications (轉換規格). e.g., 各區文化特色 - 數字、貨幣、時間、日期格式。

//	TODO:日期
gettext.date = function(attribute, domain) {
	var now = new Date();
	switch (domain) {
	case 'cmn-Hant-TW':
		;

	default:
		return attribute;
	}
};

//	TODO:時間
gettext.time = function(attribute, domain) {
	var now = new Date();
	switch (domain) {
	case 'cmn-Hant-TW':
		;

	default:
		return attribute;
	}
};

//	TODO:時間+日期
gettext.datetime = function(attribute, domain) {
	var now = new Date();
	switch (domain) {
	case 'cmn-Hant-TW':
		;

	default:
		return attribute;
	}
};


//	數字。numeral system
gettext.numeral = function(attribute, domain) {
	switch (domain || gettext_domain_name) {
	case 'cmn-Hant-TW':
		return to_Chinese_numerals(attribute);

	//	TODO: others

	default:
		return attribute;
	}
};

//	貨幣
gettext.currency = function(attribute, domain) {
	switch (domain || gettext_domain_name) {
	case 'cmn-Hant-TW':
		return to_TWD(attribute);

	case 'eng-Latn-US':
		//	try: '-34235678908765456789098765423545.34678908765'
		var add_comma = function(v) {
			//	使用
			//	return v.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
			//	可能會比較快，但小數也被置換了。
			return v.replace(/(\d+)(\d{3}(?:[.,]|$))/, function($0, $1, $2) {
				return add_comma($1) + ',' + $2;
			});
		};
		return add_comma('US$' + attribute);

	//	TODO: others

	default:
		return attribute;
	}
};



gettext.conversion = {
		d : gettext.date,
		t : gettext.time,
		T : gettext.datetime,
		n : gettext.numeral,
		c : gettext.currency
};


//------------------------------------
//	initialization

var gettext_is_loaded,
gettext_main_alias = {}, gettext_aliases = {},
gettext_texts = {},
gettext_domain_name, gettext_domain = {},
gettext_location,
gettext_callback = {};


//TODO: lazy evaluation
gettext.set_alias({
	'jpn-Jpan-JP' : '日本語,ja-JP,Japanese',
	'eng-Latn-US' : 'English,en-US',
	'cmn-Hans-CN' : '简体中文,zh-CN,简体,zh-cmn-Hans-CN,CN,Simplified Chinese',
	'cmn-Hant-TW' : '正體中文,zh-TW,中文,zh-cmn-Hant-TW,TW,Chinese,正體,繁體,繁體中文,國語,漢語,Traditional Chinese,Mandarin Chinese'
});

//	setup default/current domain
gettext.set_domain(library_namespace.is_WWW()
		// http://stackoverflow.com/questions/1043339/javascript-for-detecting-browser-language-preference
		&& gettext.to_norm(navigator.userLanguage || navigator.language), true);


_// JSDT:_module_
.
gettext = gettext;




return (
	_// JSDT:_module_
);
}


);

