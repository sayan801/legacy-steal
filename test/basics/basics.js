console.log("processing")
steal('basics/module', function(module){
	console.log("holler", module);
	window.BASICS = {
		module: module,
		name: "basics"
	};
});
