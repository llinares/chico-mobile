/**
* Is a contextual Widget.
* @name Layer
* @class Layer
* @augments ch.Widget
* @standalone
* @memberOf ch
* @param {Object} [conf] Object with configuration properties.
* @param {String} [conf.content] Sets content by: static content, DOM selector or URL. By default, the content is empty.
* @param {Number || String} [conf.width] Sets width property of the component's layout. By default, the width is "500px".
* @param {Number || String} [conf.height] Sets height property of the component's layout. By default, the height is elastic.
* @param {Boolean} [conf.fx] Enable or disable UI effects. By default, the effects are enable.
* @param {String} [conf.event] Sets the event ("click" or "hover") that trigger show method. By default, the event is "hover".
* @param {String} [conf.points] Sets the points where component will be positioned, specified by configuration or centered by default: "cm cm".
* @param {String} [conf.offset] Sets the offset in pixels that component will be displaced from original position determined by points. It's specified by configuration or zero by default: "0 0".
* @param {Boolean} [conf.cache] Enable or disable the content cache. By default, the cache is enable.
* @param {String} [conf.closable] Sets the way (true, "button" or false) the Layer close when conf.event is set as "click". By default, the layer close true.
* @returns itself
* @example
* // Create a new contextual layer with configuration.
* var me = $(".some-element").layer({
*     "content": "Some content here!",
*     "width": "200px",
*     "height": 50,
*     "event": "click",
      "closable": "button",
*     "offset": "10 -10",
*     "cache": false,
*     "points": "lt rt"
* });
* @example
* // Create a simple contextual layer
* var me = $(".some-element").layer("<tag>Some content.</tag>");
* @example
* // Now 'me' is a reference to the layer instance controller.
* // You can set a new content by using 'me' like this: 
* me.content("http://content.com/new/content");
*/
/**
* Layer Class
*/
ch.Layer = function (conf) {

	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Expando#that
	* @type object
	*/
	var that = this,
		parent,
		conf = clone(conf) || {};

	conf.icon = false;

	conf.aria = {};
	conf.aria.role = "tooltip";
	conf.aria.identifier = "aria-describedby";


	that.conf = conf;
	that.type = "layer"

	// Inherits
	// Borrow a constructor and return a parent
	parent = ch.inherit(ch.Expando, that);


	/**
	* Emit when the component is ready to use.
	* @name ch.Layer#ready
	* @event
	* @public
	* @example
	* // Following the first example, using 'me' as layer's instance controller:
	* me.on("ready",function () {
	*	this.show();
	* });
	*/
	setTimeout(function(){ that.emit("ready")}, 50);

	return that;
};
ch.factory("Layer");