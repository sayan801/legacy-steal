if(window.noConfig !== true)  {

	steal.config({
		paths: {
			"steal/dev/*" : "../dev/*.js",
			"@traceur": "../bower_components/traceur/traceur.js",
			"pathed/pathed": "basics/pathed.js"
		},
		map: {
			"mapd/mapd": "map/mapped"
		}
	});

} else {
	throw "fake loading error";
}
