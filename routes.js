/*  All extra routing goes below this comment, example:
	app.get("/test", function (req, res) {
		res.send("test");
	});
*/

// Routing
module.exports = function (app) {
	console.log("Routing loaded.");
	var requireDir = require("require-dir");
	var routes = requireDir("./routes", {recurse: true});

	// Recurse through routes and include them
	function useOrRecurse(routes, path) {
		if(typeof routes == "object" && !Array.isArray(routes) && Object.keys(routes).length > 0) {
			Object.keys(routes).forEach(function(key) {
				useOrRecurse(routes[key], path + "/" + key);
			});
		} else {
			// "index.js" will be treated as directory index
			// A directory containing "index.js" may not also contain a subdirectory called "index", and the other way around
			if(path.indexOf("/index") == 0) {
				var indexPath = path.split("index").join("");
				console.log("Index added: " + indexPath);
				app.use(indexPath, routes);
			} else {
				console.log("Route added: " + path);
				app.use(path, routes);
			}
			
		}
	}

	// If you replace the "" below with for example "/pages", ALL pages will be under /pages
	useOrRecurse(routes, "");
}