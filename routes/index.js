'use strict';

var express = require("express"),
		router = express.Router();

router.get("/", function (req, res) {
	var path = require("path");
	var fs = require("fs");

	fs.readFile(path.resolve("public/index.html"), function (err, data) {
		var minify = require('html-minifier').minify;

		var minifiedHtml = minify(data.toString(), {
			minifyJS: true,
			useShortDoctype: true,
			removeRedundantAttributes: true,
			collapseWhitespace: true,
			collapseBooleanAttributes: true,
			removeComments: true
		});

		res.type("html").send(minifiedHtml);
	});
});

module.exports = router;
