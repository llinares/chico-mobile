/**
* Chico Helpers: References and commons functions.
*/
var win = exports,
	browser = exports.navigator,
	doc = exports.document,
	qs = function (selector) {
		return doc.querySelector(selector);
	},
	qsa = function (selector) {
		return doc.querySelectorAll(selector);
	},
	body = qs("body"),
	html = qs("html"),
	clone = function (o) {
		var obj = {},
			x;
		for (x in o) {
			obj[x] = o[x];
		}
		return obj;
	},
	/**
	* Extend is a method that allows you to extend Chico or other objects with new members.
	* @name extend
	* @function
	* @memberOf ch
	* @param {Object} [obj] The object that have new members.
	* @param {Object} [destination] The destination object. If this object is undefined, ch will be the destination object.
	* @returns Object
	* @example
	* var Gizmo = {"name": "foo"};
	* ch.extend({
	*     "sayName": function () { console.log(this.name); },
	*     "foobar": "Some string"
	* }, Gizmo);
	*
	* // Returns Gizmo
	* console.dir(gizmo);
	*
	* // Gizmo Object
	* // foobar: "Some string"
	* // name: "foo"
	* // sayName: function () {}
	* @example
	* // Add new funcionality to CH
	* ch.extend({
	*     "foobar": "Some string"
	* });
	*
	* // Returns ch
	* console.dir(ch);
	*
	* // ch Object
	* // foobar: "Some string"
	*/
	extend = function(o, destination) {
		var x,
			d = destination || this;
		for (x in o) {
			d[x] = o[x];
		}
		return d;
	},
	hasOwn = function (o, property) {
		return Object.prototype.hasOwnProperty.call(o, property);
	},
	isTag = function (string) {
		return (/<([\w:]+)/).test(string);
	},
	isSelector = function (selector) {
		if (typeof selector !== "string") { return false; }
		var regex;
		for (regex in $.expr.match) {
			if ($.expr.match[ regex ].test(selector) && !isTag(selector)) {
				return true;
			};
		};
		return false;
	},
	inDom = function (selector, context) {
		if (typeof selector !== "string") { return false; }
		// jQuery: If you wish to use any of the meta-characters ( such as !"#$%&'()*+,./:;<=>?@[\]^`{|}~ ) as a literal part of a name, you must escape the character with two backslashes: \\.
		var selector = selector.replace(/(\!|\"|\$|\%|\&|\'|\(|\)|\*|\+|\,|\/|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\`|\{|\||\}|\~)/gi, function (str, $1) {
			return "\\\\" + $1;
		});
		return qsa(selector, context).length > 0;
	},
	isUrl = function (url) {
		return ((/^((http(s)?|ftp|file):\/{2}(www)?|www.|((\/|\.{1,2})([\w]|\.{1,2})*\/)+|(\.\/|\/|\:\d))([\w\-]*)?(((\.|\/)[\w\-]+)+)?([\/?]\S*)?/).test(url));
	},
	avoidTextSelection = function () {
		$.each(arguments, function(e){
			if ($.browser.msie) {
				$(e).attr('unselectable', 'on');
			} else if ($.browser.opera) {
				$(e).bind("mousedown", function(){ return false; });
			} else { 
				$(e).addClass("ch-user-no-select");
			};
		});
		return;
	},
	// Based on: http://www.quirksmode.org/dom/getstyles.html
	getStyles = function (element, style) {
			return getComputedStyle(element, "").getPropertyValue(style);
	},
	zIndex = 1000,
	index = 0; // global instantiation index