/*
  SystemJS AMD Format
  Provides the AMD module format definition at System.format.amd
  as well as a RequireJS-style require on System.require
*/
(function() {
  System.formats.unshift('steal');

  // AMD Module Format Detection RegEx
  // define([.., .., ..], ...)
  // define(varName); || define(function(require, exports) {}); || define({})
  var stealRegEx = /(?:^\s*|[}{\(\);,\n\?\&]\s*)steal\s*\(\s*((?:"[^"]+"\s*,|'[^']+'\s*,\s*)*)/;

  function makeRequire(parentName, deps, depsNormalized) {
    return function(names, callback, errback) {
      if (typeof names == 'string' && indexOf.call(deps, names) != -1)
        return System.getModule(depsNormalized[indexOf.call(deps, names)]);
      return require(names, callback, errback, { name: parentName });
    };
  };

  function prepareDeps(deps, meta) {
    // remove duplicates
    for (var i = 0; i < deps.length; i++)
      if ([].lastIndexOf.call(deps, deps[i]) != i)
        deps.splice(i--, 1);

    return deps;
  };

  function prepareExecute(depNames, load) {
    var meta = load.metadata;
    var deps = [];
    for (var i = 0; i < depNames.length; i++) {
      var module = System.get(depNames[i]);
      if (module.__useDefault) {
        module = module['default'];
      }
      else if (!module.__esModule) {
        // compatibility -> ES6 modules must have a __esModule flag
        // we clone the module object to handle this
        var moduleClone = { __esModule: true };
        for (var p in module)
          moduleClone[p] = module[p];
        module = moduleClone;
      }
      deps[i] = module;
    }

    var module, exports;

    return {
      deps: deps,
      module: module || exports && { exports: exports }
    };
  }

  System.format.steal = {
    detect: function(load) {
      return !!load.source.match(stealRegEx);
    },
    deps: function(load, global) {

      var deps = [];
      var meta = load.metadata;
      var oldSteal = global.steal;
	
      global.steal = function(){
          for( var i = 0; i < arguments.length; i++ ) {
          if (typeof arguments[i] == 'string') {
            deps.push( arguments[i] );
          } else {
            meta.factory = arguments[i];
          }
        }
      };

      System.__exec(load);
      global.steal = oldSteal;
      // deps not defined for an AMD module that defines a different name
      deps = deps || [];

      deps = prepareDeps(deps, meta);

      global.define = undefined;

      meta.deps = deps;

      return deps;

    },
    execute: function(depNames, load, global, exec) {
      if (!load.metadata.factory)
        return;
      var execs = prepareExecute(depNames, load);
      return load.metadata.factory.apply(global, execs.deps) || execs.module && execs.module.exports;
    },
    normalize: function(name, refererName, refererAddress, baseNormalize){
      var last = name.split("/").pop() || "";
      // if it doesn't start with anything strange
      if(!/^(\w+(?:s)?:\/\/|\.|file|\/)/.test(name) &&
      	// and doesn't end with a dot
      	last.indexOf(".") == -1
      	) {
      	return baseNormalize(name+"/"+last, refererName, refererAddress)
      } else {
      	if( name.substr(-3) === ".js"  ) {
      		name = name.substr(0, name.length - 3);
      	}
      	
      	return baseNormalize(name, refererName, refererAddress)
      }
    }
  };
})();