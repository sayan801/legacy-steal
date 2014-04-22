		var filename = function(uri){
			var lastSlash = uri.lastIndexOf("/"),
				matches = ( lastSlash == -1 ? uri : uri.substr(lastSlash+1) ).match(/^[\w-\s\.]+/);
			return matches ? matches[0] : "";
	};
	
	var ext = function(uri){
		var fn = filename(uri);
		var dot = fn.lastIndexOf(".");
		if(dot !== -1) {
			return fn.substr(dot+1)
		} else {
			return "";
		}
	};
	
	var normalize = function(name, loader){

		var last = filename(name),
			extension = ext(name);
		// if the name ends with /
		if(	name[name.length -1] === "/" ) {
			return name+filename( name.substr(0, name.length-1) );
		} else if(	!/^(\w+(?:s)?:\/\/|\.|file|\/)/.test(name) &&
			// and doesn't end with a dot
			 last.indexOf(".") === -1 
			) {
			return name+"/"+last;
		} else {
			if(extension === "js") {
				return name.substr(0, last.indexOf("."));
			} else {
				return name;
			}
		}
	};

