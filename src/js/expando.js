/**
* Expando is a Widget.
* @name Expando
* @class Expando
* @augments ch.Widget
* @standalone
* @memberOf ch
* @param {Object} [conf] Object with configuration properties.
* @param {Boolean} [conf.open] Shows the expando open when component was loaded. By default, the value is false.
* @param {Boolean} [conf.icon] Shows the expando arrows icon. By default, the value is true.
* @param {Boolean} [conf.fx] Enable or disable UI effects. By default, the effects are disable.
* @param {String} [conf.classes] Custom Class Name
* @returns itself
* @example
* // Create a new expando with configuration.
* var me = $(".example").expando({
*     "open": true,
*     "fx": true
* });
* @example
* // Create a new expando without configuration.
* var me = $(".example").expando();
*/

/**
* Expando Class
*/
ch.Expando = function (conf) {

	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Expando#that
	* @type object
	*/
	var that = this,
		parent,
		conf = clone(conf) || {};

	conf.icon = hasOwn(conf, "icon") ? conf.icon : true;
	conf.open = conf.open || false;

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
		* @name ch.Expando#$toggle
		* @returns itself
		*/
		toggle = function () {
			that.$trigger.toggleClass("ch-" + that["type"] + "-trigger-on");
			that.$content.toggleClass("ch-hide");

			// Arrows icons
			/*if (conf.icon) { }*/

			return that;
		};

/**
*  Protected Members
*/

	/**
	* The component's trigger.
	* @protected
	* @name ch.Expando#$trigger
	* @type jQuery
	*/
	that.trigger = el.firstElementChild;
	that.$trigger = $(that.trigger);
	
	/**
	* The component's content.
	* @protected
	* @name ch.Expando#$content
	* @type DOMElement
	*/
	that.content = el.lastElementChild;
	that.$content = $(that.content);

	/**
	* Shows component's content.
	* @protected
	* @function
	* @name ch.Expando#innerShow
	* @returns itself
	*/
	that.innerShow = function (event) {

		if (that.active) { return that.innerHide(event); }

		that.active = true;

		toggle();

		// ARIA attr
		that.trigger.setAttribute("aria-expanded", "true");
		that.content.setAttribute("aria-hidden", "false");

		return that;
	};

	/**
	* Hides component's content.
	* @protected
	* @function
	* @name ch.Expando#innerHide
	* @returns itself
	*/
	that.innerHide = function (event) {

		if (!that.active) { return; }

		that.active = false;

		toggle();

		// ARIA attr
		that.trigger.setAttribute("aria-expanded", "false");
		that.content.setAttribute("aria-hidden", "true");

		return that;
	};

	/**
	* Create component's layout and add behaivor
	* @protected
	* @function
	* @name ch.Expando#configBehavior
	*/
	that.configBehavior = function () {

		$el.addClass("ch-" + that.type);

		// ARIA
		el.setAttribute("role", "presentation");

		that.trigger.setAttribute("aria-expanded", false);
		that.trigger.setAttribute("aria-controls", "ch-" + that["type"] + "-" + that.uid);

		that.content.setAttribute("id", "ch-" + that["type"] + "-" + that.uid);
		that.content.setAttribute("aria-hidden", true);

		// Trigger behaivor
		// ClassNames
		
		that.$trigger.addClass("ch-" + that.type + "-trigger");


		/*if (conf.icon) { }*/

		// Events
		that.trigger.addEventListener("click", function (event) { event.preventDefault(); that.innerShow(event); });

		// Content behaivor

		// ClassNames
		that.$content.addClass("ch-" + that.type + "-content ch-hide " + conf.classes);

		// Visual configuration
		if (conf.open) { that.innerShow(); }

	};


/**
*  Public Members
*/
 
	/**
	* The component's instance unique identifier.
	* @public
	* @name ch.Expando#uid
	* @type number
	*/
	
	/**
	* The element reference.
	* @public
	* @name ch.Expando#element
	* @type HTMLElement
	*/
	
	/**
	* The component's type.
	* @public
	* @name ch.Expando#type
	* @type string
	*/
	
	/**
	* Shows component's content.
	* @public
	* @function
	* @name ch.Expando#show
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
	* @name ch.Expando#hide
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
ch.factory("Expando");