
	// helpers
	var camelize = function(str){
		return str.replace(/-+(.)?/g, function(match, chr){ 
			return chr ? chr.toUpperCase() : '' 
		});
	},
		each = function( o, cb){
			var i, len;

			// weak array detection, but we only use this internally so don't
			// pass it weird stuff
			if ( typeof o.length == 'number' && (o.length - 1) in o) {
				for ( i = 0, len = o.length; i < len; i++ ) {
					cb.call(o[i], o[i], i, o);
				}
			} else {
				for ( i in o ) {
					if(o.hasOwnProperty(i)){
						cb.call(o[i], o[i], i, o);
					}
				}
			}
			return o;
		},
		map = function(o, cb) {
			var arr = [];
			each(o, function(item, i){
				arr[i] = cb(item, i);
			});
			return arr;
		},
		isString = function(o) {
			return typeof o == "string";
		},
		normalize = function(name){
			var last = filename(name);
			// if it doesn't start with anything strange
			if(	!/^(\w+(?:s)?:\/\/|\.|file|\/)/.test(name) &&
				// and doesn't end with a dot
				last.indexOf(".") == -1
				) {
				return name+"/"+last;
			} else {
				return name;
			}
		},
		extend = function(d,s){
			each(s, function(v, p){
				d[p] = v;
			});
			return d;
		},
		dir = function(uri){
			var lastSlash = uri.lastIndexOf("/");
			if(lastSlash !== -1) {
				return uri.substr(0, lastSlash);
			} else {
				return uri;
			}
		},
		filename = function(uri){
			var lastSlash = uri.lastIndexOf("/"),
				matches = ( lastSlash == -1 ? uri : uri.substr(lastSlash+1) ).match(/^[\w-\s\.]+/);
			return matches ? matches[0] : "";
		},
		last = function(arr){
			return arr[arr.length - 1];
		};
		
	var configDeferred,
		devDeferred,
		appDeferred;
		
	global.steal = function(){
		var args = arguments;
		var afterConfig = function(){
			var imports = [];
			var factory;
			each(args, function(arg){
				if(isString(arg)) {
					imports.push( System['import']( normalize(arg) ) );
				} else if(typeof arg === "function") {
					factory = arg;
				}
			});
			
			var modules = Promise.all(imports);
			if(factory) {
				return modules.then(function(modules) {
			        return factory && factory.apply(null, modules);
			   });
			} else {
				return modules;
			}
		};
		// wait until the config has loaded
		return configDeferred.then(afterConfig,afterConfig);
	};
	
	
	
	



	





