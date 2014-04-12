	var getScriptOptions = function () {
	
		var options = {},
			parts, src, query, startFile, env,
			scripts = document.getElementsByTagName("script");
	
		script = scripts[scripts.length - 1];
	
		if (script) {
	
			// Split on question mark to get query
			parts = script.src.split("?");
			src = parts.shift();
			
			query = parts.join("?");
	
			// Split on comma to get startFile and env
			parts = query.split(",");
	
			if (src.indexOf("steal.production") > -1) {
				options.env = "production";
			}
	
			// Grab startFile
			startFile = parts[0];
	
			if (startFile) {
				options.startId = startFile;
			}
	
			// Grab env
			env = parts[1];
	
			if (env) {
				options.env = env;
			}
	
			// Split on / to get rootUrl
			parts = src.split("/");
			parts.pop();
			if ( last(parts) === "steal" ) {
				parts.pop();
				if ( last(parts) === "bower_components" ) {
					parts.pop();
					options.paths= {
						"steal/*" : "bower_components/steal/*.js",
						"@traceur": "bower_components/traceur/traceur.js"
					};
				}
			}
			var root = parts.join("/");
			options.root = root+"/";
			each(script.attributes, function(attr){
				var optionName = 
					camelize( attr.nodeName.indexOf("data-") === 0 ?
						 attr.nodeName.replace("data-","") :
						 attr.nodeName );
						 
				options[optionName] = attr.value;
			});
			
		}
	
		return options;
	};
	
	steal.startup = function(){
		
		// get options from 
		var urlOptions = getScriptOptions();
	
		// B: DO THINGS WITH OPTIONS
		// CALCULATE CURRENT LOCATION OF THINGS ...
		steal.config(urlOptions);
		
		var options = steal.config();
	
		// mark things that have already been loaded
		each(options.executed || [], function( i, stel ) {
			System.register(stel,[],function(){});
		});
		
		// immediate steals we do
		var steals = [];
	
		// add start files first
		if ( options.startIds ) {
			/// this can be a string or an array
			steals.push.apply(steals, isString(options.startIds) ? [options.startIds] : options.startIds);
			options.startIds = steals.slice(0);
		}
	
		// we only load things with force = true
		if ( options.env == "production" && options.loadProduction && options.productionId ) {
			steal({
				id: config.attr().productionId,
				force: true
			});
		} else if(options.env == "development"){
			
			configDeferred = steal.System.import("stealconfig");
			
			devDeferred = configDeferred.then(function(){
				return steal("steal/dev");
			},function(){
				console.log("steal - error loading stealconfig.");
				return steal("steal/dev");
			});
			
			appDeferred = devDeferred.then(function(){
				return steal.apply(null, [options.startId]);
			}).then(function(){
				steal.dev.log("app loaded successfully")
			}, function(error){
				console.log("error",error,  error.stack);
			});
			
		}
	};
