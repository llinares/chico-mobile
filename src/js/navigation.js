ch.navigation = (function () {
	var pages = {},
		data,
		loc = win.location,
		history = win.history,
		url,
		x,
		setSource = function () {
			url = loc.hash.split("#")[1];
			if (url === undefined) {	
				pages[""].forEach(function (e, i) {
					e();
				});
			}
			if (pages[url]) {
				pages[url]();
			}
		};

	pages[""] = [];

	win.addEventListener("hashchange", setSource);
	win.addEventListener("popstate", setSource);

	return {
		"add": function (routes) {
			for (x in routes) {
				if (x === "") {
					pages[""].push(routes[""]);
					continue;
				}
				pages[x] = routes[x];
			}
		},

		"rm": function (hash, fn) {
			delete pages[hash][fn];
		},

		"go": function (hash) {
			hash = hash || "";
			loc.hash = hash;
			if (hash === "") {
				history.replaceState(null, "", "/");
			}
		}
	};
}());