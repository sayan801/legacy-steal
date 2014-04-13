
	var configData = {
		env: "development"
	};
	
	steal.config = function(data, value){
		if(isString(data)) {
			if(arguments.length >= 2) {
				
			} else {
				
			}
		} else if(typeof data === "object") {
			each(configSpecial, function(special, name){
				if(special.set && data[name]){
					var res = special.set(data[name]);
					if(res !== undefined) {
						data[name] = res;
					} else {
						delete data[name];
					}
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
	root: {
		get: function(){
			return System.baseUrl;
		},
		set: function(val){
			System.baseURL = val;
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
			extend(System.map,val);
		}
	}
};

configSpecial.configUrl = configSpecial.configPath;

