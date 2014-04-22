
	var configData = {
		env: "development"
	};
	
	steal.config = function(data, value){
		if(isString(data)) {
			var name = data;
			if(arguments.length >= 2) {
				
			} else {
				
				var special = configSpecial[name];
				if(special && special.get) {
					return special.get();
				} else {
					return configData[name];
				}
			}
		} else if(typeof data === "object") {
			data = extend({},data);
			each(configSpecial, function(special, name){
				if(special.set && data[name]){
					var res = special.set(data[name]);
					if(res !== undefined) {
						configData[name] = res;
					} 
					delete data[name];
					
				}
			});
			
			extend(configData, data);
			
		} else {
			var config = {};
			
			each(configSpecial, function(special, name){
				if(special.get){
					config[name] = special.get();
				}
			});
			return extend(config, configData);	
		}
	};

var getSetToSystem = function(prop){
	return {
		get: function(){
			return steal.System[prop];
		},
		set: function(val){
			if(typeof val === "object" && typeof steal.System[prop] === "object") {
				steal.System[prop] = extend(steal.System[prop] || {},val || {});
			} else {
				steal.System[prop] = val;
			}
		}
	};
};

var configSpecial = {
	env: {
		set: function(val){
			addProductionBundles();
			return val;
		}
	},
	root: getSetToSystem("baseURL"),
	config: {
		set: function(val){
			var name = filename(val);
			System.paths["stealconfig"] = name;
			configSpecial.root.set(dir(val)+"/");
		}
	},
	paths: getSetToSystem("paths"),
	map: getSetToSystem("map"),
	startId: {
		set: function(val){
			System.main = normalize(val);
			addProductionBundles();
		},
		get: function(){
			return System.main;
		}
	},
	main: getSetToSystem("main"),
	meta: getSetToSystem("meta")
};


var addProductionBundles = function(){
	if(configData.env === "production" && System.main) {		
		var main = System.main,
			bundlesDir = System.bundlesPath || "bundles/",
			bundleName = bundlesDir+filename(main);
		
		System.meta[bundleName] = {format:"amd"};
		System.bundles[bundleName] = [main];
	}
};
