/**
* Object represent the abstract class of all Widgets.
* @abstract
* @name Widget
* @class Widget
* @augments ch.Object
* @memberOf ch
* @see ch.Expando
*/
ch.Widget = function () {
	/**
	* Reference to a internal component instance, saves all the information and configuration properties.
	* @private
	* @name ch.Expando#that
	* @type object
	*/
	var that = this;

	// Mixin
	ch.use(that, ch.Events());

	/**
	* Status of component
	* @protected
	* @name ch.Navs#active
	* @returns boolean
	*/
	that.active = false;

	/**
	* Component's public scope. In this scope you will find all public members.
	*/
	that["public"] = {};

	/**
	* The 'uid' is the Chico's unique instance identifier. Every instance has a different 'uid' property. You can see its value by reading the 'uid' property on any public instance.
	* @public
	* @name ch.Object#uid
	* @type number
	* @ignore
	*/
	that["public"].uid = that.uid;

	/**
	* Reference to a DOM Element. This binding between the component and the HTMLElement, defines context where the component will be executed. Also is usual that this element triggers the component default behavior.
	* @public
	* @name ch.Object#element
	* @type HTMLElement
	* @ignore
	*/
	that["public"].el = that.el;

	/**
	* This public property defines the component type. All instances are saved into a 'map', grouped by its type. You can reach for any or all of the components from a specific type with 'ch.instances'.
	* @public
	* @name ch.Object#type
	* @type string
	* @ignore
	*/
	that["public"].type = that.type;
	
	/**
	* Triggers a specific event within the component public context.
	* @name ch.Object#trigger
	* @function
	* @protected
	* @param {string} event The event name you want to trigger.
	*/
	that["public"].emit = that.emit;

	/**
	* Add a callback function from specific event.
	* @public
	* @function
	* @name ch.Object#on
	* @param {string} event Event name.
	* @param {function} handler Handler function.
	* @returns itself
	* @example
	* // Will add a event handler to the "ready" event
	* me.on("ready", startDoingStuff);
	*/
	that["public"].on = that.on;

	/**
	* Add a callback function from specific event that it will execute once.
	* @public
	* @function
	* @name ch.Object#once
	* @param {string} event Event name.
	* @param {function} handler Handler function.
	* @returns itself
	* @example
	* // Will add a event handler to the "contentLoad" event once
	* me.once("contentLoad", startDoingStuff);
	*/
	that["public"].once = that.once;

	/**
	* Removes a callback function from specific event.
	* @public
	* @function
	* @name ch.Object#off
	* @param {string} event Event name.
	* @param {function} handler Handler function.
	* @returns itself
	* @example
	* // Will remove event handler to the "ready" event
	* var startDoingStuff = function () {
	*     // Some code here!
	* };
	*
	* me.off("ready", startDoingStuff);
	*/
	that["public"].off = that.off;

	return that;
};