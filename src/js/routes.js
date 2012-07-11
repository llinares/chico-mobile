ch.routes = (function () {
	var pages = {},
		data,
		loc = win.location,
		history = win.history,
		url,
		x,
		//event = ("onpopstate" in window) ? "popstate" : "hashchange",
		setSource = function (event) {
			url = loc.hash.split("#!/")[1];
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

	$win.bind("popstate", setSource);

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
			event.preventDefault();

			hash = hash || "";

			// Update hash
			loc.hash = "#!/" + hash;
			
			// If home page, delete empty hash
			if (hash === "") {
				history.pushState(null, "", "/");
			}
		}
	};
}());