module("steal via system import")


asyncTest('steal basics', function(){
	System['import']('tests/module').then(function(m){
	  equal(m.name,"module.js", "module returned" );
	  equal(m.bar.name, "bar", "module.js was not able to get bar");
      start();
	}, function(){
		ok(false, "steal not loaded");
		start()
	});
});


asyncTest("steal's normalize", function(){
	System['import']('tests/mod/mod').then(function(m){
	  equal(m.name,"mod", "mod returned" );
	  equal(m.module.bar.name, "bar", "module.js was able to get bar");
	  equal(m.widget(), "widget", "got a function");
      start();
	}, function(){
		ok(false, "steal not loaded");
		start()
	});
});