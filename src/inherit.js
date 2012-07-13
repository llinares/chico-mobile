/**
* Borrow a constructor
*/

/**
* Object Class
*/
ch.objectA = function () {
	var that = this;
	that.a = "a";
	that["public"] = {};
};

ch.objectB = function () {
	var that = this;
	that.b = "b";
	that.on = function () {
		console.log(that["public"]);
	};
};

ch.objectC = function () {
	var that = this;
	that.c = "c";
};

ch.objectD = function () {
	var that = this;
	that.d = "d";
};


/**
* Widget Class
*/
ch.Widget = function (conf) {
	var that = this;

	// Use
	ch.objectA.call(that);
	ch.objectB.call(that);

	that["private"] = "privado";

	return that;
};

/**
* Float Class
*/
ch.Float = function (conf) {
	var that = this;

	// Inherits
	// Borrow a constructor
	ch.Widget.call(that, conf);
	var parent = u.clone(that);

	that["public"] = "publico del float";

	return that;
};


/**
* Modal Class
*/
ch.Modal = function (conf) {
	
	var that = this;
	// Inherits
	// Borrow a constructor
	ch.Float.call(that, conf);
	var parent = u.clone(that);

	// Use
	ch.objectC.call(that);

	// Piso metodos
	that["public"] = function () {

		// llamo al padre
		console.log("Esto es: " + parent["public"]);
	}

	//console.log("Esto es: " + that["private"]);

	return that;
};

/**
* Transition Class
*/
ch.Transition = function (conf) {
	var that = this,
		parent;

	that.conf = conf || {};

	// Inherits
	// Borrow a constructor and return a parent
	parent = ch.inherit(ch.Modal, that);

	// Use
	ch.objectD.call(that);

	that["public"] = function () {
		console.log("Lamo al del modal!");
		// llamo al padre
		parent["public"]();
	};

	return that;
};
ch.factory("Transition");