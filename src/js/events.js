// Based on: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/
//Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
//MIT License
ch.Events = function () {

	var that = this,
		listeners = {},
		custom = {},
		index = 0;

	return {
		/**
		* Add a callback function from specific event.
		* @protected
		* @function
		* @name ch.Object#on
		* @param {string} event Event name.
		* @param {function} handler Handler function.
		* @example
		* // Will add a event handler to the "ready" event
		* var startDoingStuff = function () {
		*     // Some code here!
		* };
		*
		* me.on("ready", startDoingStuff);
		*/
		"on": function(type, listener) {
			if (typeof listeners[type] == "undefined"){
				listeners[type] = [];
			}

			listeners[type].push(listener);
		},

		/**
		* Emits a specific event within the component public context.
		* @name ch.Object#Emit
		* @function
		* @protected
		* @param {string} event The event name you want to emit.
		* @example
		* // Will add a event handler to the "ready" event
		* me.emit("ready", data);
		*/
		"emit": function(event, data) {
			if (typeof event == "string"){
				event = { "type": event };
			}

			if (!event.target) {
				event.target = that;
			}

			if (!event.type) {  //falsy
				throw new Error("Event object missing 'type' property.");
			}

			if (listeners[event.type] instanceof Array) {
				var li = listeners[event.type],
					i = 0,
					len = li.length;

				for (; i < len; i+=1) {
					li[i].call(that, event, data);
				}
			}
		},

		/**
		* Add a callback function from specific event that it will execute once.
		* @protected
		* @function
		* @name ch.Object#once
		* @param {string} event Event name.
		* @param {function} handler Handler function.
		* @returns itself
		* @example
		* // Will add a event handler to the "contentLoad" event once
		* me.once("contentLoad", startDoingStuff);
		*/
		"once": function(type, listener) {
			var c = custom[index+=1];

			c = function (event, data) {
				listener.call(that, event, data);
				that.off(event.type, c);
			};

			that.on(type, c);
		},

		/**
		* Removes a callback function from specific event.
		* @protected
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
		"off": function(type, listener) {
			if (that.listeners[type] instanceof Array) {

				if (listener) {
					var li = listeners[type],
						i = 0,
						len = li.length;

					for (; i < len; i+=1) {
						if (li[i] === listener) {
							li.splice(i, 1);
							break;
						}
					}
				} else {
					// remove All listener and event
					delete listeners[type];
				}
			}
		}
	}
};



/*
Yo quiero que todo esto sea privado y siendo un objecot no puedo:
	"listeners": {},
	"custom": {},
	"index": 0,

ch.Events2 = {
	"listeners": {},
	"custom": {},
	"index": 0,
	"on": function(type, listener) {
		if (typeof this.listeners[type] == "undefined"){
			this.listeners[type] = [];
		}

		this.listeners[type].push(listener);
	},

	"emit": function(event, data) {
		if (typeof event == "string"){
			event = { "type": event };
		}

		if (!event.target) {
			event.target = this;
		}

		if (!event.type) {  //falsy
			throw new Error("Event object missing 'type' property.");
		}

		if (this.listeners[event.type] instanceof Array) {
			var li = this.listeners[event.type],
				i = 0,
				len = li.length;

			for (; i < len; i+=1) {
				li[i].call(this, event, data);
			}
		}
	},

	"once": function(type, listener) {
		var c = this.custom[this.index+=1];

		c = function (event, data) {
			listener.call(this, event, data);
			this.off(event.type, c);
		};

		this.on(type, c);
	},

	"off": function(type, listener) {
		if (this.listeners[type] instanceof Array) {

			if (listener) {
				var li = this.listeners[type],
					i = 0,
					len = li.length;

				for (; i < len; i+=1) {
					if (li[i] === listener) {
						li.splice(i, 1);
						break;
					}
				}
			} else {
				// remove All listener and event
				delete this.listeners[type];
			}
		}
	}
};

ch.Events3 = function (conf) {
	var that = this,
		listeners = {},
		custom = {},
		index = 0;
	that.on = function(type, listener) {
		if (typeof listeners[type] == "undefined"){
			listeners[type] = [];
		}

		listeners[type].push(listener);
	};

	that.emit = function(event, data) {
		if (typeof event == "string"){
			event = { "type": event };
		}

		if (!event.target) {
			event.target = that;
		}

		if (!event.type) {  //falsy
			throw new Error("Event object missing 'type' property.");
		}

		if (listeners[event.type] instanceof Array) {
			var li = listeners[event.type],
				i = 0,
				len = li.length;

			for (; i < len; i+=1) {
				li[i].call(that, event, data);
			}
		}
	};

	that.once = function(type, listener) {
		var c = custom[index+=1];

		c = function (event, data) {
			listener.call(that, event, data);
			that.off(event.type, c);
		};

		that.on(type, c);
	};

	that.off = function(type, listener) {
		if (listeners[type] instanceof Array) {

			if (listener) {
				var li = listeners[type],
					i = 0,
					len = li.length;

				for (; i < len; i+=1) {
					if (li[i] === listener) {
						li.splice(i, 1);
						break;
					}
				}
			} else {
				// remove All listener and event
				delete listeners[type];
			}
		}
	};

	return that;
};*/