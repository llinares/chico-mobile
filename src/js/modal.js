/**
* Modal is a Widget.
* @name Modal
* @class Modal
* @augments ch.Floats
* @standalone
* @memberOf ch
* @param {Object} [conf] Object with configuration properties.
* @param {String} [conf.content] Sets content by: static content, DOM selector or URL. By default, the content is the href attribute value  or form's action attribute.
* @param {Number || String} [conf.width] Sets width property of the component's layout. By default, the width is "500px".
* @param {Number || String} [conf.height] Sets height property of the component's layout. By default, the height is elastic.
* @param {Boolean} [conf.fx] Enable or disable UI effects. By default, the effects are enable.
* @param {Boolean} [conf.cache] Enable or disable the content cache. By default, the cache is enable.
* @param {String} [conf.closable] Sets the way (true, "button" or false) the Modal close. By default, the modal close true.
* @returns itself
* @see ch.Tooltip
* @see ch.Layer
* @see ch.Zoom
* @example
* // Create a new modal window with configuration.
* var me = $("a.example").modal({
*     "content": "Some content here!",
*     "width": "500px",
*     "height": 350,
*     "cache": false,
*     "fx": false
* });
* @example
* // Create a new modal window triggered by an anchor with a class name 'example'.
* var me = $("a.example").modal();
* @example
* // Now 'me' is a reference to the modal instance controller.
* // You can set a new content by using 'me' like this:
* me.content("http://content.com/new/content");
*/
ch.Modal = function (conf) {

	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Modal#that
	* @type object
	*/
	var that = this,
		parent,
		conf = clone(conf) || {};

	that.conf = conf;

	// Inherits
	// Borrow a constructor and return a parent
	parent = ch.inherit(ch.Widget, that);

/**
*  Private Members
*/
	var el = that.el,

		$el = that.$el,

		/**
		* The component's toggle.
		* @privated
		* @function
		* @name ch.Modal#$toggle
		* @returns itself
		*/
		toggle = function () {

			return that;
		},

		$index = $("div[data-page=index]"),

		lastScroll,

		$close = $("<a class=\"ch-btn-action ch-btn-small\" data-action=\"close\">Cancelar</a>"),

		hash = conf.hash || el.href.split("#")[1] || that["type"] + "-" + that.uid,

		routes = {};


/**
*  Protected Members
*/


	that.source = $(conf.content).removeClass("ch-hide");

	/**
	* The component's content.
	* @protected
	* @name ch.Modal#$content
	* @type DOMElement
	*/
	that.$content = $("<div class=\"ch-modal-content\">").append(that.source);

	/**
	* The component's container
	* @protected
	* @name ch.Modal#$container
	* @type DOMElement
	*/
	that.$container = (function () {
		var $container = $("<div aria-hidden=\"true\" class=\"ch-modal ch-hide\" id=\"ch-" + that["type"] + "-" + that.uid +"\" role=\"dialog\" data-page=\"ch-modal\">");

		$container.append(that.$content);

		return $container;
	}())

	/**
	* Shows component's content.
	* @protected
	* @function
	* @name ch.Modal#innerShow
	* @returns itself
	*/
	that.innerShow = function (event) {

		if (that.active) { return; }

		ch.navigation.go(hash);

		that.active = true;

		$index.addClass("ch-hide");

		that.$container.removeClass("ch-hide");

		// ARIA attr

		return that;
	};

	/**
	* Hides component's content.
	* @protected
	* @function
	* @name ch.Modal#innerHide
	* @returns itself
	*/
	that.innerHide = function (event) {

		if (!that.active) { return; }

		ch.navigation.go("");

		that.active = false;
		
		that.$container.addClass("ch-hide");

		$index.removeClass("ch-hide");


		// ARIA attr

		return that;
	};

	/**
	* Create component's layout and add behaivor
	* @protected
	* @function
	* @name ch.Modal#configBehavior
	*/
	that.configBehavior = function () {

		// ARIA
		el.setAttribute("aria-label", "ch-" + that["type"] + "-" + that.uid);

		// Trigger behaivor
		// ClassNames


		// Events
		el.addEventListener("click", function (event) {
			event.preventDefault();
			that.innerShow();
		});

		// Content behaivor

		// ClassNames
		that.$content
			.addClass("ch-" + that.type + "-content")
			.removeClass("ch-hide");

		$index.after(that.$container);

		// Visual configuration
		if (conf.open) { that.innerShow(); }
		
		// Hash navigation
		routes[""] = that.innerHide;
		routes[hash] = that.innerShow;
		ch.navigation.add(routes);
	};


/**
*  Public Members
*/
 
	/**
	* The component's instance unique identifier.
	* @public
	* @name ch.Modal#uid
	* @type number
	*/
	
	/**
	* The element reference.
	* @public
	* @name ch.Modal#element
	* @type HTMLElement
	*/
	
	/**
	* The component's type.
	* @public
	* @name ch.Modal#type
	* @type string
	*/
	
	/**
	* Shows component's content.
	* @public
	* @function
	* @name ch.Modal#show
	* @returns itself
	*/
	that["public"].show = function(){
		that.innerShow();
		return that["public"];
	};

	/**
	* Hides component's content.
	* @public
	* @function
	* @name ch.Modal#hide
	* @returns itself
	*/	
	that["public"].hide = function(){
		that.innerHide();
		return that["public"];
	};

/**
*  Default behaivor
*/
	
	that.configBehavior();

	/**
	* Emit when the component is ready to use.
	* @name ch.Modal#ready
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
ch.factory("Modal");