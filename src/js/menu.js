/**
* Menu is a Widget.
* @name Menu
* @class Menu
* @augments ch.Widget
* @requires ch.Expando
* @memberOf ch
* @param {Object} [conf] Object with configuration properties.
* @param {Number} [conf.selected] Selects a child that will be open when component was loaded.
* @param {Boolean} [conf.fx] Enable or disable UI effects. By default, the effects are disable.
* @returns itself
* @example
* // Create a new menu with configuration.
* var me = $(".example").menu({
*     "selected": 2,
*     "fx": true
* });
* @example
* // Create a new menu without configuration.
* var me = $(".example").menu();
*/

/**
* Menu Class
*/
ch.Menu = function (conf) {

	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Menu#that
	* @type object
	*/
	var that = this,
		parent,
		conf = clone(conf) || {};

	conf.icon = hasOwn(conf, "icon") ? conf.icon : true;

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
		* Indicates witch child is opened
		* @private
		* @name ch.Menu#selected
		* @type number
		*/
		selected = conf.selected - 1,

		/**
		* Opens specific Expando child and optionally grandson
		* @private
		* @function
		* @name ch.Menu#select
		*/
		select = function (child) {
			var child = child - 1,
				c = that.children[child];

			if (child > that.children.length) { return; }

			if (c.nodeType) {

				if (c.firstElementChild.tagName === "A") {
					win.location.href = c.firstElementChild.href;
				}

				return;
			}

			that.children[child].show();
		};

/**
*  Protected Members
*/

	/**
	* The component's trigger.
	* @protected
	* @name ch.Navs#$trigger
	* @type Array
	*/
	that.triggers = el.children;

	/**
	* Collection of expandos and bellows.
	* @protected
	* @name ch.Menu#children
	* @type Array
	*/ 
	that.children = [];


	/**
	* Inits an Menu component on each list inside main HTML code snippet
	* @protected
	* @name ch.Menu#createBellows
	* @function
	*/
	that.cretateBellows = function (bellows) {
		var $bellows = $(bellows);

		$bellows
			.addClass("ch-bellows")
			.children(":first-child")
				.addClass("ch-bellows-trigger");

		that.children.push($bellows);
	};

	/**
	* Inits an Menu component on each list inside main HTML code snippet
	* @protected
	* @name ch.Menu#createLayout
	* @function
	*/
	that.createLayout = function () {
		var expando;

		$.each(that.triggers, function (i, e) {
			var c = e.children;

			if (c.length === 1) {
				that.cretateBellows(e);

				return;
			}

			that.children.push(
				$(e).expando({
					"icon": conf.icon
				})
			);
		});
	};

	/**
	* Create component's layout and add behaivor
	* @protected
	* @function
	* @name ch.Navs#configBehavior
	*/
	that.configBehavior = function () {

		$el.addClass("ch-"+that.type);

		// ARIA
		el.setAttribute("role", "navigation");

	};


/**
*  Public Members
*/
 
	/**
	* The component's instance unique identifier.
	* @public
	* @name ch.Menu#uid
	* @type number
	*/
	
	/**
	* The element reference.
	* @public
	* @name ch.Menu#element
	* @type HTMLElement
	*/
	
	/**
	* The component's type.
	* @public
	* @name ch.Menu#type
	* @type string
	*/

	/**
	* Select a specific children.
	* @public
	* @name ch.Menu#select
	* @function
	*/
	that["public"].select = function (child) {
		select(child);

		return that["public"];
	};

/**
*  Default behaivor
*/
	
	that.createLayout();
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
ch.factory("Menu");