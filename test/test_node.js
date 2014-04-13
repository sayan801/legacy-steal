var steal = require('../steal');

console.log( __filename, __dirname);
var printOut = function(config){
	steal.System.ID ="evil"
	var otherSteal = steal.clone( steal.addFormat( steal.System.clone() ) );
	// config.baseURL
	otherSteal.config(config);
	var System = otherSteal.System;
	System.ID ="good"
	var systemInstantiate = System.instantiate;
	System.instantiate = function(load){
		var res = systemInstantiate.apply(this, arguments);
		if(res){
			console.log("  >",load.name, res.deps)
		} else {
			console.log("  -",load.name)
		}
		return res;
	};
	global.steal = otherSteal;
	otherSteal.startup();

};



printOut({
	configPath: __dirname+"/stealconfig.js",
	startId: "basics"
});