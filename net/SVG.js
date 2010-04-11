
/**
 * @name	CeL SVG function
 * @fileoverview
 * 本檔案包含了 SVG 的 functions。
 * @since	
 */


/*
TODO
對無顯示 SVG 的多一項警告。
*/

if (typeof CeL === 'function'){

/**
 * 本 module 之 name(id)，<span style="text-decoration:line-through;">不設定時會從呼叫時之 path 取得</span>。
 * @type	String
 * @constant
 * @inner
 * @ignore
 */
var module_name = 'net.SVG';

//===================================================
/**
 * 若欲 include 整個 module 時，需囊括之 code。
 * @type	Function
 * @param	{Function} library_namespace	namespace of library
 * @param	load_arguments	呼叫時之 argument(s)
 * @return
 * @_name	_module_
 * @constant
 * @inner
 * @ignore
 */
var code_for_including = function(library_namespace, load_arguments) {

//	requires
if (eval(library_namespace.use_function(
		'net.web.XML_node,net.web.set_attribute,net.web.remove_all_child,net.web.set_class,data.split_String_to_Object')))
	return;


// ============================================================================
//	definition of module SVG

/*

TODO:
animation
.add_image
*/

//	in 運算子會檢查物件是否有名稱為 property 的屬性。它也會檢查物件的原型，查看 property 是否屬於原型鏈結的一部分。如果 property 是在物件或原型鏈結中，則 in 運算子會傳回 true，否則會傳回 false。	http://msdn2.microsoft.com/zh-tw/library/11e33275(VS.80).aspx

//g_SVG[generateCode.dLK]='set_attribute,XML_node,remove_all_child';//removeNode

/**
 * module SVG 物件之 constructor。<br/>
 * 設定 SVG document fragment 並將之插入網頁中。

 * @class	generation of Scalable Vector Graphics<br/>
 * 輔助繪圖的基本功能物件，生成 SVG 操作函數。
 * @since	2006/12/7,10-12
 * @deprecated	Use toolkit listed below instead:<br/>
 * <a href="http://code.google.com/p/svgweb/" accessdate="2009/11/15 16:34" title="svgweb - Project Hosting on Google Code">svgweb</a><br/>
 * <a href="https://launchpad.net/scour" accessdate="2009/11/15 16:35" title="Scour - Cleaning SVG Files in Launchpad">Scour</a>

 * @constructor
 * @param	{int} _width	width of the canvas
 * @param	{int} _height	height of the canvas
 * @param	{color string} [_backgroundColor]	background color of the canvas (UNDO)
 * @requires	set_attribute,XML_node,remove_all_child//removeNode
 * @_type	_module_
 * @_return	{_module_} _module_ object created

 * @see	<a href="http://www.w3.org/TR/SVG/" accessdate="2009/11/15 16:31">Scalable Vector Graphics (SVG) 1.1 Specification</a><br/>
 * <a href="http://zvon.org/xxl/svgReference/Output/" accessdate="2009/11/15 16:31">SVG 1.1 reference with examples</a><br/>
 * <a href="http://www.permadi.com/tutorial/jsFunc/index.html" accessdate="2009/11/15 16:31" title="Introduction and Features of JavaScript &quot;Function&quot; Objects">Introduction and Features of JavaScript &quot;Function&quot; Objects</a><br/>
 * <a href="http://volity.org/wiki/index.cgi?SVG_Script_Tricks" accessdate="2009/11/15 16:31">Volity Wiki: SVG Script Tricks</a><br/>
 * <a href="http://pilat.free.fr/english/routines/js_dom.htm" accessdate="2009/11/15 16:31">Javascript SVG et DOM</a>
 */
var _// JSDT:_module_
= function(_width, _height, _backgroundColor){
 var _f = _, _s;
/*
 if(!_f.createENS()){
  //alert('Your browser doesn't support SVG!');
  return;
 }
*/

 /**
  * SVG document fragment
  * @property
  * @see	<a href="http://www.w3.org/TR/SVG/struct.html#NewDocument" accessdate="2009/11/15 16:53">Defining an SVG document fragment: the 'svg' element</a>
  */
 this.svg=_s=	//	raw
	arguments.length===1 && arguments[0] && typeof arguments[0]==='object' && arguments[0].tagName.toLowerCase()==='svg'
	?arguments[0]
	:_f.createNode('svg')
	;
 if(!_s)return;	//	error!

 //	http://www.w3.org/TR/SVG/struct.html#DefsElement	http://www.svgbasics.com/defs.html
 _s.appendChild(this.defs=_f.createNode('defs'));	//	raw

 //	調整大小
 this.setSize(_width,_height);
 //	set_attribute(_s,{xmlns:_f.NS.SVG});
 set_attribute(_s,{xmlns:'http://www.w3.org/2000/svg'});
 //	may cause error! should use .setAttributeNS()??
 _s.setAttribute('xmlns:xlink','http://www.w3.org/1999/xlink');
 //viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"

 /**
  * 包含了插入元件的原始資訊。<br/>
  * Use {@link #addContain} to add contains.
  * @property
  * @type	Array
  */
 this.contains = [];
 /**
  * 所插入之網頁元素
  * @property
  */
 this.div = null;

 //document.body.appendChild(this.svg);
 return this;//return this.createNode(_nodeN);
};
//_.NS={SVG:'http://www.w3.org/2000/svg',XLink:'http://www.w3.org/1999/xlink'};
_.defaultColor = '#222';

_// JSDT:_module_
.
/**
 * default stroke width. 單位: px
 * 
 * @unit px
 * @type Number
 * @_memberOf _module_
 */
defaultStrokeWidth = .5;	

//_.defaultColor='#444';_.defaultStrokeWidth=1;

_// JSDT:_module_
.
/**
 * 所有造出 id 之 prefix
 * @type	string
 * @_memberOf	_module_
 */
idPrefix =
	// +'_SVG_';
	library_namespace.to_module_name(module_name) + '.';

// _.bout closure.
//_.createENS=document.createElementNS?function(){return document.createElementNS(arguments[0],arguments[1]);}:null;
_// JSDT:_module_
.
/**
 * create SVG document fragment (only for .createNode)
 * @param _ns	namespaceURI
 * @param _qn	qualifiedName
 * @param _a	propertyA
 * @param _i	innerObj
 * @return
 * @_memberOf	_module_
 * @function
 * @private
 */
createENS = function(_ns, _qn, _a, _i) {
	return (
		// document.createElementNS?XML_node(_ns+':'+_qn,_a,0,_i):null;
		XML_node(_ns + ':' + _qn, _a, 0, _i));
};

_// JSDT:_module_
.
/**
 * create SVG document fragment 元件(component)。<br/>
 * SVG 之 document fragment 與 HTML 不同 namespace，因此我們需要使用到 <a href="http://www.w3.org/2000/svg">http://www.w3.org/2000/svg</a> 來作為 XML elements 的 namespace。為了未來的兼容性，我們將這個功能獨立出來。
 * @param _nodeN	node/tag name
 * @param {hash|string}_a	attribute/property
 * @param _i	inner object
 * @return	node created or null
 * @_memberOf	_module_
 * @private
 * @function
 */
createNode = function(_nodeN,_a,_i){
 //return this.createENS?this.createENS('svg',_nodeN||'svg'):null;
 return _.createENS('svg', _nodeN || 'svg', _a, _i);

 //	Error: uncaught exception: [Exception... "Illegal operation on WrappedNative prototype object"  nsresult: "0x8057000c (NS_ERROR_XPC_BAD_OP_ON_WN_PROTO)"  location: "JS frame :: file:///C:/kanashimi/www/cgi-bin/program/tmp/JavaScript%20Framework/dojo/dojo-0.4.0-ajax/a.htm :: anonymous :: line 29"  data: no]
 //	http://www.codingforums.com/archive/index.php?t-94573.html	When you do var x = document.getElementById and then x('hello') you are executing the function x in the context of the window object instead of the document object. Gecko probably utilizes the scoping of the document object to access some internal methods to execute getElementById, which the window object doesn't have.
 //	http://developer.mozilla.org/en/docs/Safely_accessing_content_DOM_from_chrome	http://developer.mozilla.org/en/docs/Working_around_the_Firefox_1.0.3_DHTML_regression	http://www.codingforums.com/archive/index.php?t-68554.html
 // OK?
 //return this.createENS?this.createENS.call(document,'svg',_nodeN||'svg'):null;
 // fault:
 //return this.createENS===document.createElementNS?document.createElementNS('svg',_nodeN||'svg'):this.createENS?this.createENS('svg',_nodeN||'svg'):null;
 //return this.createENS?(alert(this.createENS===document.createElementNS),Function.apply(this.createENS,['svg',(_nodeN||'svg')])):null;
 //return this.createENS?(alert(this.createENS===document.createElementNS),this.createENS.apply(document.createElementNS,['svg',(_nodeN||'svg')])):null;
};
/*
_.createLink=function(_ref){
 return this.createENS('xLink','xlink:href');
};
*/

_// JSDT:_module_
.
/**
 * 從 id 獲得 node
 * @param id	id
 * @return	node
 * @_memberOf	_module_
 * @private
 */
getNodeById = function(id) {
	// return this.svg.getElementById(_i);//useless?

	// lookupPrefix()
	return document.getElementById(id);
};

_// JSDT:_module_
.
/**
 * get a random ID to use.
 * @param tag	tag name(nodeType)
 * @return	a random ID
 * @_memberOf	_module_
 * @private
 */
getRandomID = function(tag) {
	if (typeof tag === 'object')
		tag = tag.tagName/* nodeType */;
	var _j;
	while (_.getNodeById(_j = _.idPrefix + tag + '_'
			+ ('' + Math.random()).slice(2, 6)))
		;
	return _j;
};
_// JSDT:_module_
.
/**
 * give a random ID to the specified node.
 * @param _n	node
 * @return	id of the specified node
 * @_memberOf	_module_
 * @private
 */
setRandomID = function(_n) {
	if (_n && typeof _n === 'object') {
		/**
		 * id of the specified node
		 * @inner
		 * @ignore
		 */
		var _i = set_attribute(_n, 'id');
		if (!_i)
			set_attribute(_n, {
				id : _i = _.getRandomID(_n)
			});
		return _i;
	}
};

_// JSDT:_module_
.
/**
 * 改變 text
 * @param text_node	text object
 * @param text	change to this text
 * @return
 * @_memberOf	_module_
 * @see
 * <a href="http://www.w3.org/TR/SVG/text.html" accessdate="2009/12/15 0:2">Text - SVG 1.1 - 20030114</a>
 * <tref xlink:href="#ReferencedText"/>
 */
changeText = function(text_node, text) {
	//if (typeof remove_all_child === 'function')
	//	remove_all_child(text_node);
	//else throw new Error(1, 'changeText: function remove_all_child is not included!');
	remove_all_child(text_node);

	if (text)
		text_node.appendChild(document.createTextNode(text));
	//else removeNode(_textO);
};

_// JSDT:_module_
.
addTitle = function(_o, _t_d) {
	if (_t)
		_o.appendChild(this.createNode('title', 0, _t));
	// A more descriptive label should be put in a <desc> child element
	if (_t)
		_o.appendChild(this.createNode('desc', 0, _t));
};


/*	transform	http://www.w3.org/TR/SVG/coords.html#TransformAttribute	http://archive.dojotoolkit.org/nightly/tests/gfx/test_image.html
recommend for performance reasons to use transformation matrices whenever possible.	http://www.mecxpert.de/svg/transform.html
 * @memberOf	module SVG
 */
_// JSDT:_module_
.
setTransform = function(_o, _t) {
	//	TODO
	throw new Error(1, 'setTransform: yet implement!');
	set_attribute(_o, {
				transform : _t
			});
};

// ============================================================================
//	definition of module SVG object

_.prototype={

/**
 * 顯現 this module SVG object
 * @param _v	visible
 * @return	this module SVG object
 * @_memberOf	_module_
 */
show : function(_v) {
	var _d = this.div;
	if (this.svg)
		if (_d) {// _s.parentNode
			_d.style.display = typeof _v == 'undefined' ? _d.style.display === 'none' ? 'block'
					: 'none'
						: _v ? 'block' : 'none'; // block怪怪的
		} else if (_v || typeof _v == 'undefined')
			this.div = XML_node('div', 0, [ document.body ],
					this.svg);
	return this;
},
setAttribute : function() {
	this.svg && this.svg.setAttribute(arguments);
	return this;
},
//setDimensions
/**
 * 調整 canvas 大小
 * @unit	px
 * @param {Integer} _width	width in px
 * @param {Integer} _height	height in px
 * @return	this module SVG object
 * @_memberOf	_module_
 */
setSize : function(_width, _height) {
	_width = parseInt(_width) || 0;
	_height = parseInt(_height) || 0;

	if (_width > 0 && _height > 0)
		set_attribute(this.svg, {
			width : _width,
			height : _height
		});

	return this;
},
getSize : function() {
	return set_attribute(this.svg, 'width,height');
},

/**
 * 將本 Object 附在 _n 上(attach to node)
 * @param _n	HTML/SVG object
 * @return
 */
attach : function(_n) {
	if (typeof _n === 'string')
		_n = _.getNodeById(_n);

	if (!_n)
		return this;

	var _t = _n.tagName.toLowerCase();
	if (_t === 'svg')
		//	TODO: 若不想創建新 node..
		return new _(_n);

	if (_t === 'div') {
		//if(this.div){TODO: 原先已經 attach}
		this.div = _n;
		_n.appendChild(this.svg);
	}

	return this;
},

get_XML : function() {
	var _t = document.createElement('div'), _x, _s = this.svg;

	if (!_s)
		// error!
		return;

	//	TODO: 效率不高!
	_t.appendChild(_s = _s.cloneNode(true));
	_x = _t.innerHTML;
	_t.removeChild(_s);
	// 確保在此環境下 create 出來的會被 destory
	_t = null;
	// ugly hack
	// &lt;?xml version="1.0" encoding="UTF-8" standalone="no"?&gt;
	_x = _x.replace(/(\s)(href=['"])/g, '$1xlink:$2');

	return _x;
},

/**
 * 清除 canvas<br/>
 * 很可能會出問題!
 * @return	this SVG
 * @_memberOf	_module_
 * @since	2009/12/18 21:17:09
 */
clean : function() {
	var s = this.svg;
	//	[0]: <defs>
	while (s.childNodes.length > 1)
		//library_namespace.debug(s.childNodes.length + ',' + s.lastChild),
		s.removeChild(s.lastChild);

	// remove childrens of <defs>
	//remove_all_child(s.lastChild, 1);
	s = s.lastChild;
	while (s.hasChildNodes())
		//library_namespace.debug(s.childNodes.length + ',' + s.lastChild),
		s.removeChild(s.lastChild);

	return this;
},

/**
 * 創建本物件之 SVG 群組。<br/>
 * 利用 SVG 群組我們可以同時操作多個 SVG elements。
 * @param {hash|string}_a	attribute/property
 * @param _i	inner object
 * @return	this SVG
 * @_memberOf	_module_
 */
createGroup : function(_a, _i) {
	var _g = _.createNode('g', _a, _i);
	this.group = _g;
	return this;
},
/**
 * 綁定 SVG elements 至本物件群組。<br/>
 * 這函數將已存在的 SVG elements 綁定至本物件之群組中。若群組不存在，則創建出一個。
 * @param _n	node
 * @return	this module SVG object
 * @_memberOf	_module_
 */
attachGroup : function(_n) {
	if (!this.group)
		this.createGroup();
	this.group.appendChild(_n);
	return this;
},

createSymbol : function(_a, _i) {
	var _s = _.createNode('symbol', _a, _i);
	this.symbol = _s;
	return this;
},
attachSymbol : function(_n) {
	if (!this.symbol)
		this.createSymbol();
	this.symbol.appendChild(_n);
	return this;
},

//	TODO
setFill:function(){throw new Error(1,'setFill: yet implement!');},
setStroke:function(){throw new Error(1,'setStroke: yet implement!');},
setShape:function(){throw new Error(1,'setShape: yet implement!');},
setTransform:function(){throw new Error(1,'setTransform: yet implement!');},

//<animateMotion>,<animateColor>

/**
 * 最後一個增加的 instance
 * @_memberOf	_module_
 */
lastAdd: null,
/**
 * 最後一個增加的 definition
 * @_memberOf	_module_
 */
lastAddDefs: null,
/**
 * 增加 SVG element。<br/>
 * 結合 .prototype.addDefs 與 .prototype.addUse，作完定義後隨即使用之。
 * @param _n	tagName(nodeType)
 * @param {hash|string} _a	attribute/property
 * @param _i	inner object
 * @return
 * @_memberOf	_module_
 */
addNode : function(_n, _a, _i) {
	if (typeof _n == 'string')
		_n = _.createNode(_n, _a, _i);
	if (_n) {
		this.addDefs(_n);
		this.addUse(_n);
	}
	return this;
},

/**
 * 增加 SVG 定義。<br/>
 * SVG 規範中聲明，SVG 的 &lt;use&gt; element 不能引用外部文件或其 elements。因此我們在創建實例之前，需要先在本物件中作定義。
 * @param _n	node
 * @return
 * @_memberOf	_module_
 */
addDefs : function(_n) {
	// var _d=this.defs;
	if (_n) {
		_.setRandomID(_n);
		this.defs.appendChild(this.lastAddDefs = _n);
	}
	return this;
},
/**
 * 增加 SVG 實例。<br/>
 * 利用本物件中之定義創建實例並增添至本物件中。<br/>
 * 在裝載 b.svg 時，將 a.svg 中的 defs 中的圖元裝載到 b.svg 中（文件上是兩者是保持獨立的，但在內存中將二者合二為一），這樣就可以在b.svg中直接引用這些圖元了。<br/>
 * SVG 規範中聲明，SVG 的 &lt;use&gt; element 不能引用外部文件或其 elements。因此我們在創建實例之前，需要先在本物件中作定義。
 * @param _i	id
 * @param _a
 * @return
 * @_memberOf	_module_
 */
addUse : function(_i, _a) {
	var _s = this.svg, _o = _.createNode('use', _a);
	if (_o && _s && _i) {
		if (typeof _i == 'object')
			_i = _.setRandomID(_i);
		set_attribute(_o, {
			'xlink:href' : '#' + _i
		});
		_s.appendChild(this.lastAdd = _o);
	}
	return this;
},

/**
 * 增加插入的元件。<br/>
 * 應該用 <a href="http://www.w3.org/TR/SVG/struct.html#SymbolElement">symbol</a>
 * @param _o	object reference
 * @param _type	type of this component
 * @param [propertyO]	other properties
 * @return
 * @requires	split_String_to_Object
 * @_memberOf	_module_
 */
addContain : function(_o, _type, propertyO) {
	if (_type && this.contains) {
		if (typeof propertyO === 'string')
			propertyO = split_String_to_Object(propertyO);
		if (propertyO.o || propertyO.t)
			this.contains.push( {
				o : _o,
				t : _type,
				p : propertyO
			});
		else
			propertyO.o = _o, propertyO.t = _type, this.contains
			.push(propertyO);
	}
	return this;
},


/**
 * 繪製直線。<br/>
 * 此函數利用 _.eNode 造出直線元件之後，再用 .prototype.addNode 將之插入本物件中。
 * @param _left
 * @param _top
 * @param _width
 * @param _height
 * @param _color
 * @param _strokeWidth
 * @return
 * @_memberOf	_module_
 */
addLine : function(_left, _top, _width, _height, _color,
		_strokeWidth) {
	var _l = _.createNode('line', {
		x1 : _top,
		y1 : _left,
		x2 : _top + _width,
		y2 : _left + _height,
		stroke : _color || this.addLine.defaultColor,
		'stroke-width' : _strokeWidth || _.defaultStrokeWidth
	});
	if (_l && this.svg) {
		//this.svg.appendChild(_l);
		this.addNode(_l);
	}
	return this;
},


/**
 * 繪製曲線路徑。<br/>
 * 此函數利用 _.eNode 造出路徑元件之後再用 .prototype.addNode 將之插入本物件中。
 * @param _d
 * @param _color
 * @param _strokeWidth
 * @param _fill
 * @return
 * @_memberOf	_module_
 */
addPath : function(_d, _color, _strokeWidth, _fill) {
	var _p = _.createNode('path', {
		d : _d,
		stroke : _color || this.addLine.defaultColor,
		'stroke-width' : _strokeWidth || _.defaultStrokeWidth,
		fill : _fill || 'none'
	});
	if (_p && this.svg)
		this.addNode(_p);
	return this;
},


//xml:space="default|preserve"
/**
 * 添加文字。<br/>
 * 此函數利用 _.eNode 造出文字元件之後再用 .prototype.addNode 將之插入本物件中。
 * @param _text
 * @param _left
 * @param _baseLine
 * @param _color
 * @param _font
 * @return
 * @_memberOf	_module_
 */
addText : function(_text,_left,_baseLine,_color,_font){
	if (_color)
		this.addText.defaultColor = _color;
	else
		_color = this.addText.defaultColor;

	if (_font)
		this.addText.defaultFont = _font;
	else
		_font = this.addText.defaultFont;

 //	http://www.w3.org/TR/SVG/text.html	<tref xlink:href="#ReferencedText"/>
 //var _o=document.createTextNode(_text);
 //var _o=_.createNode('tspan',{x:_left,y:_baseLine,stroke:_color||this.addText.defaultColor,style:_font?'font-family:"'+_font+'"':null},_text);
 //this.addNode(_.createNode('text',{x:_left,y:_baseLine,stroke:_color||this.addText.defaultColor,style:_font?'font-family:"'+_font+'"':null},_o));
 //this.lastAdd=_o;

	// ugly hack: 說是_baseLine，其實還是會再往下一點點。
	_baseLine -= 2;
	this.addNode(_.createNode('text', {
		x : _left,
		y : _baseLine,
		stroke : _color || this.addText.defaultColor,
		style : _font ? 'font-family:"' + _font + '"' : null
	}, _text));
	//(text|g).pointer-events="none": Make text unselectable

/*	本法為標準，但FF尚未支援。
 var _s=this.svg,_i=_.getRandomID('text')_.SVG.createNode('text',{id:_i},_text);
 this.addDefs(this.lastAddDefs=_o);
 _o=_.createNode('text',{x:_left,y:_baseLine,stroke:_color||this.addText.defaultColor,style:_font?'font-family:"'+_font+'"':null},0,_t=_.createNode('tref'));
 _t.setAttributeNS('xLink','xlink:href','#'+_i);
 _o.appendChild(_t);
 _s.appendChild(this.lastAdd=_o);
*/

	return this;
},

/**
 * add numbers
 * @param _text
 * @param _left
 * @param _baseLine
 * @param _tW
 * @param _color
 * @param _font
 * @return
 * @see
 * _left: http://www.w3.org/TR/SVG/text.html#TSpanElementXAttribute
 */
addNum : function(_text, _left, _baseLine, _tW, _color, _font) {
	if (!isNaN(_text)) {
		//	說是_baseLine，其實還是會再往下一點點。
		_baseLine -= 2;
		//_text=''+_text;
		_text += '';

		var _o = [], _i = 0, _s = this.svg;
		for (; _i < _text.length; _i++)
			// _text.split('')
			_o.push(_.createNode('tspan', {
				x : _left + _i * _tW
				//, y:_baseLine
			}, _text.charAt(_i)));

		if (_s)
			_s.appendChild(this.lastAdd = _.createNode('text', {
				y : _baseLine,
				stroke : _color || this.addText.defaultColor,
				style : _font ? 'font-family:"' + _font + '"'
						: null
			}, _o));
	}
	return this;
},


/**
 * add parallel graph
 * @param _ds
 * @param _h
 * @param _d
 * @param _us
 * @param tramA
 * @return
 * @since	2006/12/18 0:35
 */
addParallelG : function(_ds, _h, _d, _us, tramA) {
	if (_ds && _h) {
		if (isNaN(_us) || _us === '')
			_us = _ds;
		set_attribute(this
				.addPath('M' + _ds + ',' + _h + ' H0 L' + (_d || 0)
						+ ',0' + (_us ? ' h' + _us : '') + ' z'), {
			transform : tramA
		}); //	0==''
	}
	return this;
},

lastQuadrilateral : null,
lastQuadrilateralDefs : null,
/**
 * 畫簡單長方形或平行四邊形、梯形
 * @param _ds
 * @param _h
 * @param _d
 * @param _us
 * @param tramA
 * @return
 * @see	<a href="http://zh.wikipedia.org/wiki/%E5%B9%B3%E8%A1%8C%E5%9B%9B%E8%BE%B9%E5%BD%A2">平行四邊形</a>
 * @_memberOf	_module_
 */
addQuadrilateral:function(_ds,_h,_d,_us,tramA){	//	down side,height,upper distance,upper side
 this.addParallelG(_ds,_h,_d,_us,tramA).addContain(this.lastQuadrilateralDefs=this.lastAddDefs,'quadrilateral',{down_side:_ds,hight:_h,distance:_d,upper_side:_us});
 this.lastQuadrilateral=this.lastAdd;	//	set_attribute(s.lastQuadrilateral,'fill=none');
 return this;
},

lastTriangle : null,
lastTriangleDefs : null,
/**
 * 畫簡單三角形
 * @since	2006/12/17 12:38
 * @param _ds
 * @param _h
 * @param _d
 * @param tramA
 * @return
 * @_memberOf	_module_
 */
addTriangle : function(_ds, _h, _d, tramA) {
	this.addParallelG(_ds, _h, _d, 0, tramA).addContain(
			this.lastTriangleDefs = this.lastAddDefs, 'triangle', {
				down_side : _ds,
				hight : _h,
				distance : _d
			});
	this.lastTriangle = this.lastAdd;
	return this;
},


/**
 * 繪製橢圓曲線。<br/>
 * 此函數利用 _.eNode 造出橢圓曲線元件之後，再用 .prototype.addNode 將之插入本物件中。
 * @param _rx
 * @param _ry
 * @param _cx
 * @param _cy
 * @param _color
 * @param _strokeWidth
 * @param _fill
 * @param tramA
 * @return
 * @_memberOf	_module_
 */
addEllipsePath : function(_rx, _ry, _cx, _cy, _color, _strokeWidth,
		_fill, tramA) {
	if (_rx) {
		var _e, _p = {
				rx : _rx,
				ry : _ry,
				cx : _cx,
				cy : _cy,
				stroke : _color || this.addEllipsePath.defaultColor,
				'stroke-width' : _strokeWidth || _.defaultStrokeWidth,
				fill : _fill || 'none',
				transform : tramA
		};

		if (!_ry)
			_e = 'circle', _p.r = _rx;
		else
			_e = 'ellipse', _p.rx = _rx, _p.ry = _ry;

		_e = _.createNode(_e, _p);

		if (_e && this.svg)
			this.addNode(_e);
	}
	return this;
},


lastCircle : null,
lastCircleDefs : null,
/**
 * 繪製圓形。<br/>
 * 此函數利用 _.type.addEllipsePath 來畫簡單圓形。
 * @param _r
 * @param _cx
 * @param _cy
 * @return
 * @_memberOf	_module_
 */
addCircle : function(_r, _cx, _cy) {
	if (_r)
		this.addEllipsePath(_r, '', _cx, _cy).addContain(
				this.lastCircleDefs = this.lastAddDefs, 'circle', {
					r : _r
				});
	return this;
},

lastEllipse : null,
lastEllipseDefs : null,
/**
 * 繪製簡單圓形/橢圓。<br/>
 * 此函數利用 .prototype.addEllipsePath 來畫簡單橢圓。
 * @param _rx
 * @param _ry
 * @param _cx
 * @param _cy
 * @return
 * @_memberOf	_module_
 */
addEllipse : function(_rx, _ry, _cx, _cy) {
	if (_rx) {
		this.addEllipsePath(_rx, _ry, _cx, _cy).addContain(
				this.lastEllipseDefs = this.lastAddDefs, 'ellipse',
				{
					rx : _rx,
					ry : _ry
				});
		this.lastEllipse = this.lastAdd;
	}
	return this;
},


/**
 * 繪製矩形。<br/>
 * 此函數利用 _.eNode 造出矩形路徑元件之後，再用 .prototype.addNode 將之插入本物件中。
 * @param _w
 * @param _h
 * @param _x
 * @param _y
 * @param _color
 * @param _strokeWidth
 * @param _fill
 * @param tramA
 * @return
 * @_memberOf	_module_
 */
addRect : function(_w, _h, _x, _y, _color, _strokeWidth, _fill,
		tramA) {
	this.addNode(_.createNode('rect', {
		width : _w,
		height : _h,
		x : _x,
		y : _y,
		stroke : _color || this.addRect.defaultColor,
		'stroke-width' : _strokeWidth || _.defaultStrokeWidth,
		fill : _fill || 'none',
		transform : tramA
	}));
	return this;
},


/**
 * 繪製多邊形。<br/>
 * 此函數利用 _.eNode 造出多邊形路徑元件之後再用 .prototype.addNode 將之插入本物件中。
 * @param {int array} _pA	[x1,y1,x2,y2,x3,y3,..]
 * @param _color
 * @param _strokeWidth
 * @param _fill
 * @param tramA
 * @return
 * @_memberOf	_module_
 */
addPolyline : function(_pA, _color, _strokeWidth, _fill, tramA) {
	var _i = 0, _p = [];
	while (_i < _pA.length)
		_p.push(_pA[_i++] + ',' + _pA[_i++]);
	this.addNode(_.createNode('polyline', {
		points : _p.join(' '),
		stroke : _color || this.addRect.defaultColor,
		'stroke-width' : _strokeWidth || _.defaultStrokeWidth,
		fill : _fill || 'none',
		transform : tramA
	}));
	return this;
},


addImage : function() {
	//	TODO
	throw new Error(1, 'addImage: yet implement!');
},

/**
 * 功能正常嗎？
 * @return	{Boolean} 功能正常
 */
status_OK : function() {
	// !!: dual-unary operator
	return !!this.svg;
}

};	//	_.prototype={


//	other manual setting
with (_.prototype) {
	addLine.defaultColor = _.defaultColor;
	addPath.defaultColor = _.defaultColor;
	addText.defaultColor = _.defaultColor;
	addText.defaultFont = null;
	addEllipsePath.defaultColor = _.defaultColor;
	addRect.defaultColor = _.defaultColor;
	addPolyline.defaultColor = _.defaultColor;

}

//	↑definition of module SVG object

//	↑definition of module SVG
// ============================================================================


/**#@+
 * @_description	use {@link _module_} to draw:
 */

/*
draw_circle[generateCode.dLK]
	=draw_ellipse[generateCode.dLK]
	=draw_triangle[generateCode.dLK]
	=draw_quadrilateral[generateCode.dLK]
	='g_SVG';
*/

_// JSDT:_module_
.
/**
 * 繪製圓形。
 * @since	2006/12/19 18:05
 * @param _r
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_circle = function(_r, svgO, _color, _fill) {
	var g_SVG = library_namespace.net.SVG;
	if (_r
			&& (svgO || (svgO = new g_SVG(
					(_r + g_SVG.defaultStrokeWidth) * 2,
					(_r + g_SVG.defaultStrokeWidth) * 2).show()))
					&& svgO.status_OK()) {
		svgO.addCircle(_r, _r + g_SVG.defaultStrokeWidth, _r
				+ g_SVG.defaultStrokeWidth);
		return svgO;
	}
};
_// JSDT:_module_
.
/**
 * 繪製橢圓。
 * @param _rx
 * @param _ry
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_ellipse = function(_rx, _ry, svgO, _color, _fill) {
	var g_SVG = library_namespace.net.SVG;
	if (_rx
			&& _ry
			&& (svgO || (svgO = new g_SVG(
					(_rx + g_SVG.defaultStrokeWidth) * 2,
					(_ry + g_SVG.defaultStrokeWidth) * 2).show()))
					&& svgO.status_OK()) {
		svgO.addEllipse(_rx, _ry, _rx + g_SVG.defaultStrokeWidth, _ry
				+ g_SVG.defaultStrokeWidth);
		return svgO;
	}
};


_// JSDT:_module_
.
/**
 * 畫簡單梯形。
 * @since	2006/12/17 12:38
 * @requires	split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_quadrilateral
 * @param _ds
 * @param _h
 * @param _d
 * @param _us
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_quadrilateral = function(_ds, _h, _d, _us, svgO, _color, _fill) {
	var g_SVG = library_namespace.net.SVG;
	if (isNaN(_us) || _us === '')
		_us = _ds;
	if (_ds
			&& _h
			&& (svgO || (svgO = new g_SVG((_ds > _d + _us ? _ds : _d
					+ _us)
					+ g_SVG.defaultStrokeWidth, _h
					+ g_SVG.defaultStrokeWidth).show()))
					&& svgO.status_OK()) {
		set_attribute(svgO.addQuadrilateral(_ds, _h, _d, _us).lastQuadrilateral,
				{
			stroke : _color,
			fill : _fill
				});
		return svgO;
	}
};

_// JSDT:_module_
.
/**
 * 畫簡單三角形。
 * @since	2006/12/17 12:38
 * @requires	split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_triangle
 * @param _ds
 * @param _h
 * @param _d
 * @param svgO
 * @param _color
 * @param _fill
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_triangle = function(_ds, _h, _d, svgO, _color, _fill) {
	var g_SVG = library_namespace.net.SVG;
	if (_ds
			&& _h
			&& (svgO || (svgO = new g_SVG((_ds > _d ? _ds : _d)
					+ g_SVG.defaultStrokeWidth, _h
					+ g_SVG.defaultStrokeWidth).show()))
					&& svgO.status_OK()) {
		set_attribute(svgO.addTriangle(_ds, _h, _d).lastTriangleDefs, {
			stroke : _color,
			fill : _fill
		});
		return svgO;
	}
};

/*
draw_addition[generateCode.dLK]
	=draw_multiplication[generateCode.dLK]
	=draw_long_division[generateCode.dLK]
	='g_SVG,draw_scale';
*/

/**
 * default 畫筆。
 * @inner
 * @private
 */
var draw_scale = {
		/**
		 * text width
		 * @inner
		 * @private
		 */
		tW : 10,
		/**
		 * text height
		 * @inner
		 * @private
		 */
		tH : 2 * (10/* tW */- 2),
		/**
		 * decimal separator, 小數點
		 * @see
		 * <a href="http://en.wikipedia.org/wiki/Decimal_separator" accessdate="2010/1/20 18:29">Decimal separator</a>
		 */
		ds : '.',
		/**
		 * width of decimal separator
		 */
		dsw : 4,
		/**
		 * line height
		 * @inner
		 * @private
		 */
		lH : 4,
		/**
		 * margin left
		 * @inner
		 * @private
		 */
		mL : 0,
		/**
		 * margin top
		 * @inner
		 * @private
		 */
		mT : 0,
		/**
		 * 根號寬, squire width
		 * @inner
		 * @private
		 */
		sW : 10
};
//draw_scale.tH=22,draw_scale.tW=12;	//	for print
_// JSDT:_module_
.
/**
 * 利用 module SVG 物件來演示直式加法。
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_addition=function(num1, num2, svgO, _color, _font) {
	if (!num1 && !num2)
		return;
	var g_SVG = library_namespace.net.SVG;
	var _op = '+';
	if (num2 < 0)
		_op = '-', num2 = -num2;

	var _a = _op == '+' ? (num1 - 0) + (num2 - 0) : num1 - num2,
	_h = 3,
	_w = (num2 += '').length + 2,
	tW = draw_scale.tW,
	tH = draw_scale.tH,
	lH = draw_scale.lH,
	mL = draw_scale.mL,
	mT = draw_scale.mT;

	if ((_a += '').length + 1 > _w)
		_w = _a.length + 1;
	if ((num1 += '').length + 1 > _w)
		_w = num1.length + 1;
	_h = _h * tH + 2 * lH + 2 * mT;
	_w = (2 + _w) * tW + 2 * mL;

	if (svgO && svgO.status_OK())
		svgO.clean();
	else if (!(svgO = new g_SVG).show().status_OK())
		return null;

	svgO.setSize(_w, _h);

	_w -= mL + tW;

	//	TODO: 讓 IE8 顯示起來像 111+111=222, 而非 +111111222
	svgO
		.addNum(num1, _w - num1.length * tW, mT + tH, tW, _color, _font)
		.addNum(num2, _w - num2.length * tW, mT + 2 * tH, tW, _color, _font)
		.addText(_op, mL + tW, mT + 2 * tH, _color, _font)
		.addPath('M' + mL + ',' + (mT + 2 * tH + lH / 2) + ' H' + (_w + tW))
		.addNum(_a, _w - _a.length * tW, mT + 3 * tH + lH, tW, _color, _font);

	return svgO;
};
//draw_subtraction[generateCode.dLK]='draw_addition';
_// JSDT:_module_
.
/**
 * 呼叫 draw_subtraction 來演示直式減法。因為直式加減法的運算與機制過程非常相似，因此我們以 draw_addition 來一併的處理這兩個相似的運算過程。
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @_memberOf	_module_
 */
draw_subtraction = function(num1, num2, svgO, _color, _font) {
	return _.draw_addition.call(this, num1, -num2, svgO, _color, _font);
};

_// JSDT:_module_
.
/**
 * 利用 module SVG 物件來演示直式乘法。<br/>
 * TODO: 小數的乘法
 * @since	2006/12/26 17:47
 * @param num1
 * @param num2
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @_memberOf	_module_
 * @see
 * <a href="http://203.71.239.19/math/courses/cs04/M4_6.php" accessdate="2010/1/20 18:5">小數篇：小數的乘法</a>
 */
draw_multiplication=function(num1, num2, svgO, _color, _font) {
	if (!num1 && !num2)
		return;

	var g_SVG = library_namespace.net.SVG;
	var _op = '×', _j, _C = 1, _a = num1 * num2, _h = 0, _w = (num2 += '').length + 2, tW = draw_scale.tW, tH = draw_scale.tH, lH = draw_scale.lH, mL = draw_scale.mL, mT = draw_scale.mT;
	if ((_a += '').length > _w)
		_w = _a.length;
	if ((num1 += '').length > _w)
		_w = num1.length;
	for (_j = 0; _j < num2.length; _j++)
		if (num2.charAt(_j) - 0)
			_h++;
	if (_h == 1)
		_h = 0, _C = 0;
	_h = (3 + _h) * tH + 2 * lH + 2 * mT;
	_w = (2 + _w) * tW + 2 * mL;

	if (svgO && svgO.status_OK())
		svgO.clean();
	else if (!(svgO = new g_SVG).show().status_OK())
		return null;

	svgO.setSize(_w, _h);

	_w -= mL + tW;

	svgO
		.addNum(num1, _w - num1.length * tW, mT + tH, tW, _color, _font)
		.addNum(num2, _w - num2.length * tW, mT + 2 * tH, tW, _color, _font)
		.addText(_op, mL + tW, mT + 2 * tH, _color, _font)
		.addPath('M' + mL + ',' + (_h = mT + 2 * tH + lH / 2) + ' H' + (_w + tW));

	_op = '';
	_h += lH / 2;
	var _w2 = _w, _n;
	if (_C) {
		for (_j = num2.length - 1; _j >= 0; _j--)
			if (_n = num2.charAt(_j) - 0)
				svgO.addNum(_n = (num1 * _n) + _op, _w2 - _n.length
						* tW, _h += tH, tW, _color, _font), _w2 -= tW
						* (_op.length + 1), _op = '';
			else
				_op += '0';
		svgO
		.addPath('M' + mL + ',' + (_h += lH / 2) + ' H'
				+ (_w + tW));
	}

	svgO.addNum(_a, _w - _a.length * tW, _h + lH / 2 + tH, tW, _color, _font);

	return svgO;
};

/*
TODO:
小數
換基底
*/
//draw_long_division[generateCode.dLK]='g_SVG,set_class';//split_String_to_Object,set_attribute,XML_node,removeNode,remove_all_child,g_SVG,draw_long_division
_// JSDT:_module_
.
/**
 * 利用 module SVG 物件來展示<a href="http://en.wikipedia.org/wiki/Long_division" title="long division">直式除法</a>。<br/>
 * !! 尚有許多 bug<br/>
 * @since	2006/12/11-12 11:36
 * @param dividend
 * @param divisor
 * @param	digits_after	TODO: 小數直式除法: 小數點後位數, how many digits after the decimal separator
 * @param svgO
 * @param _color
 * @param _font
 * @return	module SVG object
 * @example
 * // include module
 * CeL.use('net.SVG');
 * 
 * //	way 1
 * var SVG_object = new CeL.SVG;
 * SVG_object.attach('panel_for_SVG').show(1);
 * CeL.draw_long_division(452, 34, SVG_object);
 * // You can also put here.
 * //SVG_object.attach('panel_for_SVG').show(1);
 * 
 * //	way 2
 * var SVG_object = CeL.draw_long_division(100000, 7);
 * SVG_object.attach('panel_for_SVG').show(1);
 * 
 * // 另一次顯示
 * CeL.draw_long_division(100, 7, SVG_object);
 * @_memberOf	_module_
 */
draw_long_division = function(dividend, divisor, svgO, _color, _font) {
	if (isNaN(dividend) || isNaN(divisor) || !divisor)
		return;

	var g_SVG = library_namespace.net.SVG;
	/**
	 * 餘數 remainder
	 * @inner
	 * @ignore
	 */
	var remainder;
	/**
	 * 商 quotient
	 * @inner
	 * @ignore
	 */
	var quotient = '' + Math.floor(dividend / divisor),
		tW = draw_scale.tW,
		tH = draw_scale.tH,
		lH = draw_scale.lH,
		mL = draw_scale.mL,
		mT = draw_scale.mT,
		sW = draw_scale.sW,
		bx = mL + ('' + divisor).length * tW + sW,
		by = mT + lH + 2 * tH;

	dividend += '';
	if (svgO && svgO.status_OK())
		svgO.clean();
	else if (!(svgO = new g_SVG).show().status_OK())
		return null;

	svgO
	//.show(1)
	// 調整大小
	.setSize(
			2
			* mL
			+ (('' + divisor).length + dividend.length + 2)
			* tW + sW,
			2 * mT + by + quotient.length * (tH * 2 + lH))
	// 除數 divisor
	.addNum(divisor, mL, by, tW, _color, _font)
	// 商 quotient
	.addNum(quotient,
			bx + (dividend.length - quotient.length) * tW,
			mT + tH, tW, _color, _font)
	// 被除數 dividend
	.addNum(dividend, bx, by, tW, _color, _font)
	// .addNode('path',{d:'M'+(bx+(dividend.length+1)*tW)+','+(by-lH/2-tH)+'
	// H'+(bx-tW)+' a'+tW/2+','+(lH+tH)+' 0 0,1
	// -'+tW/2+','+(lH+tH),stroke:'#000',style:'fill:none;'})
	.addPath(
			'M' + (bx - (tW + sW) / 2) + ',' + (by + lH / 2)
			+ ' a' + tW / 2 + ',' + (lH + tH)
			+ ' 0 0,0 ' + tW / 2 + ',-' + (lH + tH)
			+ ' h' + (dividend.length + 2) * tW);

	svgO.addDefs(g_SVG.createNode('line', {
		x1 : 0,
		y1 : 0,
		x2 : (dividend.length + 1) * tW,
		y2 : 0,
		// 'stroke-width':'1px',
		stroke : svgO.addLine.defaultColor
	}));

	if (svgO.div)
		// svgO.div.className='long_division';
		set_class(svgO.div, 'long_division');

	// 用 symbol??
	svgO.addContain(0, 'long_division', {
		dividend : dividend,
		divisor : divisor
	});

	var _k = 0, a, b, l = svgO.lastAddDefs,
	/**
	 * 被除數處理到第幾位
	 * @inner
	 * @ignore
	 */
	dt = 1;
	remainder = dividend.charAt(0);
	for (; _k < quotient.length;) {
		a = quotient.charAt(_k);
		// if(!a)continue;
		a = '' + a * divisor, b = dividend.length
		- quotient.length + _k + 1;

		svgO.addUse(l, {
			x : bx,
			y : (by + tH + lH / 2)
		}).addNum(a, bx + (b - a.length) * tW, by + tH, tW, _color,
				_font);

		// 以下..ugly hack
		// 先算出餘數
		while ((a == 0 || remainder - a < 0) && dt < dividend.length)
			remainder += dividend.charAt(dt++);
		remainder -= a;
		if (!remainder)
			remainder = '';
		//alert(remainder+','+quotient.charAt(_k+1)+'\n'+(i<quotient.length))
		// 再添加到夠減的位數
		while (quotient.charAt(++_k) == 0 && _k < quotient.length) {
			b++;
			if (remainder || dividend.charAt(dt) > 0)
				remainder += dividend.charAt(dt);
			dt++;
		}
		// 顯示位數微調
		if (dt < dividend.length) {
			b++;
			// 加一位
			remainder += dividend.charAt(dt++);
		} else if (!remainder)
			b--;
		//alert(remainder+','+a+','+dt+'\n'+(remainder<a));
		svgO.addNum(remainder || 0, bx + (b - ('' + remainder).length)
				* tW, by += 2 * tH + lH, tW, _color, _font);
	}

	return svgO;
};


/**#@-*/
//	↑@memberOf	module SVG




return (
	_// JSDT:_module_
);
};

//===================================================

CeL.setup_module(module_name, code_for_including);

};
