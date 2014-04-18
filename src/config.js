
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

var configSpecial = {
	env: {
		set: function(val){
			addProductionBundles();
			return val;
		}
	},
	root: {
		get: function(){
			return steal.System.baseURL;
		},
		set: function(val){
			steal.System.baseURL = val;
		}
	},
	configPath: {
		set: function(val){
			var name = filename(val);
			System.paths["stealconfig"] = name;
			configSpecial.root.set(dir(val)+"/");
		}
	},
	paths: {
		set: function(val){
			extend(System.paths,val);
		}
	},
	map: {
		set: function(val){
			extend(steal.System.map,val);
		}
	},
	startId: {
		set: function(val){
			System.main = normalize(val);
			addProductionBundles();
		},
		get: function(){
			return System.main;
		}
	},
	meta: {
		set: function(val) {
			extend(steal.System.meta, val);
		},
		get: function(){
			return steal.System.meta;
		}
	}
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


configSpecial.configUrl = configSpecial.configPath;

