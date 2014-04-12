/*
 *  es6-module-loader v0.5.4
 *  https://github.com/ModuleLoader/es6-module-loader
 *  Implemented to the 2013-12-02 ES6 module specification draft
 *  Copyright (c) 2014 Guy Bedford, Luke Hoban, Addy Osmani; Licensed MIT
 */
/*
 *  ES6 Promises shim from when.js, Copyright (c) 2010-2014 Brian Cavalier, John Hann, MIT License
 */
!function(){return"undefined"!=typeof Promise&&Promise.all&&Promise.resolve&&Promise.reject}()&&!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):"undefined"!=typeof window?window.Promise=a():"undefined"!=typeof global?global.Promise=a():"undefined"!=typeof self&&(self.Promise=a())}(function(){var a;return function b(a,c,d){function e(g,h){if(!c[g]){if(!a[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'")}var j=c[g]={exports:{}};a[g][0].call(j.exports,function(b){var c=a[g][1][b];return e(c?c:b)},j,j.exports,b,a,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){var c=b.exports=a("../lib/Promise"),d="undefined"!=typeof global&&global||"undefined"!=typeof window&&window||"undefined"!=typeof self&&self;"undefined"!=typeof d&&"undefined"==typeof d.Promise&&(d.Promise=c)},{"../lib/Promise":2}],2:[function(b,c){!function(a){"use strict";a(function(a){var b=a("./makePromise"),c=a("./scheduler"),d=a("./async");return b({scheduler:new c(d),monitor:"undefined"!=typeof console?console:void 0})})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{"./async":4,"./makePromise":5,"./scheduler":6}],3:[function(b,c){!function(a){"use strict";a(function(){function a(a){this.head=this.tail=this.length=0,this.buffer=new Array(1<<a)}return a.prototype.push=function(a){return this.length===this.buffer.length&&this._ensureCapacity(2*this.length),this.buffer[this.tail]=a,this.tail=this.tail+1&this.buffer.length-1,++this.length,this.length},a.prototype.shift=function(){var a=this.buffer[this.head];return this.buffer[this.head]=void 0,this.head=this.head+1&this.buffer.length-1,--this.length,a},a.prototype._ensureCapacity=function(a){var b,c=this.head,d=this.buffer,e=new Array(a),f=0;if(0===c)for(b=this.length;b>f;++f)e[f]=d[f];else{for(a=d.length,b=this.tail;a>c;++f,++c)e[f]=d[c];for(c=0;b>c;++f,++c)e[f]=d[c]}this.buffer=e,this.head=0,this.tail=this.length},a})}("function"==typeof a&&a.amd?a:function(a){c.exports=a()})},{}],4:[function(b,c){!function(a){"use strict";a(function(a){var b,c;return b="undefined"!=typeof process&&null!==process&&"function"==typeof process.nextTick?function(a){process.nextTick(a)}:(c="function"==typeof MutationObserver&&MutationObserver||"function"==typeof WebKitMutationObserver&&WebKitMutationObserver)?function(a,b){function c(){var a=d;d=void 0,a()}var d,e=a.createElement("div"),f=new b(c);return f.observe(e,{attributes:!0}),function(a){d=a,e.setAttribute("class","x")}}(document,c):function(a){try{return a("vertx").runOnLoop||a("vertx").runOnContext}catch(b){}var c=setTimeout;return function(a){c(a,0)}}(a)})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{}],5:[function(b,c){!function(a){"use strict";a(function(){return function(a){function b(a){function b(a){f._handler.resolve(a)}function d(a){f._handler.reject(a)}function e(a){f._handler.notify(a)}var f=this;this._handler=new q,c(a,b,d,e)}function c(a,b,c,d){try{a(b,c,d)}catch(e){c(e)}}function d(a){return a instanceof b?a:new j(new r(k(a)))}function e(a){return new j(new r(new v(a)))}function f(){return G}function g(){return new j(new q)}function h(a){function b(a,b,c,d){c.when(F,F,void 0,a,function(a){b[d]=a,0===--g&&this.resolve(b)},a.reject,a.notify)}var c,d,e=new q,f=a.length>>>0,g=f,h=[];for(c=0;f>c;++c)c in a?(d=a[c],C(d)?b(e,h,l(d),c):(h[c]=d,--g)):--g;return 0===g&&e.resolve(h),new j(e)}function i(a){if(Object(a)===a&&0===a.length)return f();for(var b=new q,c=0;c<a.length;++c)k(a[c]).when(F,F,void 0,b,b.resolve,b.reject);return new j(b)}function j(a){this._handler=a}function k(a,c){return a instanceof b?m(a,c):C(a)?n(a):new u(a)}function l(a){return a instanceof b?a._handler.join():n(a)}function m(a,b){var c=a._handler.join();return b===c?w():c}function n(a){try{var b=a.then;return"function"==typeof b?new t(b,a):new u(a)}catch(c){return new v(c)}}function o(){}function p(a){if(this.handler=a,this._isMonitored()){var b=this._env.promiseMonitor.captureStack();this.trace=a._addTrace(b)}}function q(a){this.consumers=[],this.receiver=a,this.handler=void 0,this.resolved=!1,this._isMonitored()&&(this.trace=this._env.promiseMonitor.captureStack())}function r(a){p.call(this,a)}function s(a,b){p.call(this,a),this.receiver=b}function t(a,b){q.call(this),this.assimilated=!1,this.untrustedThen=a,this.thenable=b}function u(a){this.value=a}function v(a){this.value=a,this.observed=!1,this._isMonitored()&&(this.key=this._env.promiseMonitor.startTrace(a))}function w(){return new v(new TypeError("Promise cycle"))}function x(a){return{state:"fulfilled",value:a}}function y(a){return{state:"rejected",reason:a}}function z(){return{state:"pending"}}function A(a,b,c,d,e,f,g,h){this.a=a,this.b=b,this.c=c,this.d=d,this.e=e,this.f=f,this.g=g,this.handler=h}function B(a,b){this.q=a,this.value=b}function C(a){return("object"==typeof a||"function"==typeof a)&&null!==a}function D(a,b,c){try{return a.call(c,b)}catch(d){return e(d)}}function E(a,b,c){try{return a.call(c,b)}catch(d){return d}}function F(){}var G,H=a.scheduler,I=Object.create||function(a){function b(){}return b.prototype=a,new b};return b.resolve=d,b.reject=e,b.never=f,b._defer=g,b.prototype.then=function(a,b,c){var d=this._handler,e=new q(d.receiver);return d.when(e.resolve,e.notify,e,d.receiver,a,b,c),new j(e)},b.prototype["catch"]=b.prototype.otherwise=function(a){return this.then(void 0,a)},b.prototype._bindContext=function(a){return new j(new s(this._handler,a))},b.all=h,b.race=i,j.prototype=I(b.prototype),o.prototype.inspect=z,o.prototype.when=F,o.prototype.resolve=F,o.prototype.reject=F,o.prototype.notify=F,o.prototype.join=function(){return this},o.prototype._env=a.monitor||b,o.prototype._addTrace=F,o.prototype._isMonitored=function(){return"undefined"!=typeof this._env.promiseMonitor},p.prototype=I(o.prototype),p.prototype.join=function(){return this.handler.join()},p.prototype.inspect=function(){return this.handler.inspect()},p.prototype._addTrace=function(a){return this.handler._addTrace(a)},q.prototype=I(o.prototype),q.prototype.inspect=function(){return this.resolved?this.handler.join().inspect():z()},q.prototype.resolve=function(a){this._join(k(a,this))},q.prototype.reject=function(a){this._join(new v(a))},q.prototype.join=function(){return this.resolved?this.handler.join():this},q.prototype.run=function(){var a=this.consumers,b=this.handler=this.handler.join();this.consumers=void 0;for(var c=0;c<a.length;c+=7)b.when(a[c],a[c+1],a[c+2],a[c+3],a[c+4],a[c+5],a[c+6])},q.prototype._join=function(a){this.resolved||(this.resolved=!0,this.handler=a,H.enqueue(this),this._isMonitored()&&(this.trace=a._addTrace(this.trace)))},q.prototype.when=function(a,b,c,d,e,f,g){this.resolved?H.enqueue(new A(a,b,c,d,e,f,g,this.handler.join())):this.consumers.push(a,b,c,d,e,f,g)},q.prototype.notify=function(a){this.resolved||H.enqueue(new B(this.consumers,a))},q.prototype._addTrace=function(a){return this.resolved?this.handler._addTrace(a):a},r.prototype=I(p.prototype),r.prototype.when=function(a,b,c,d,e,f,g){H.enqueue(new A(a,b,c,d,e,f,g,this.join()))},s.prototype=I(p.prototype),s.prototype.when=function(a,b,c,d,e,f,g){void 0!==this.receiver&&(d=this.receiver),this.join().when(a,b,c,d,e,f,g)},t.prototype=I(q.prototype),t.prototype.when=function(a,b,c,d,e,f,g){this.assimilated||(this.assimilated=!0,this._assimilate()),q.prototype.when.call(this,a,b,c,d,e,f,g)},t.prototype._assimilate=function(){function a(a){d.resolve(a)}function b(a){d.reject(a)}function c(a){d.notify(a)}var d=this;this._try(this.untrustedThen,this.thenable,a,b,c)},t.prototype._try=function(a,b,c,d,e){try{a.call(b,c,d,e)}catch(f){d(f)}},u.prototype=I(o.prototype),u.prototype.inspect=function(){return x(this.value)},u.prototype.when=function(a,b,c,d,e){var f="function"==typeof e?D(e,this.value,d):this.value;a.call(c,f)},v.prototype=I(o.prototype),v.prototype.inspect=function(){return y(this.value)},v.prototype.when=function(a,b,c,d,f,g){this._isMonitored()&&!this.observed&&this._env.promiseMonitor.removeTrace(this.key),this.observed=!0;var h="function"==typeof g?D(g,this.value,d):e(this.value);a.call(c,h)},v.prototype._addTrace=function(a){this.observed||this._env.promiseMonitor.updateTrace(this.key,a)},G=new j(new o),A.prototype.run=function(){this.handler.when(this.a,this.b,this.c,this.d,this.e,this.f,this.g)},B.prototype.run=function(){for(var a=this.q,b=1;b<a.length;b+=7)this._notify(a[b],a[b+1],a[b+2],a[b+5])},B.prototype._notify=function(a,b,c,d){var e="function"==typeof d?E(d,this.value,c):this.value;a.call(b,e)},b}})}("function"==typeof a&&a.amd?a:function(a){c.exports=a()})},{}],6:[function(b,c){!function(a){"use strict";a(function(a){function b(a){this._enqueue=a,this._handlerQueue=new c(15);var b=this;this.drainQueue=function(){b._drainQueue()}}var c=a("./Queue");return b.prototype.enqueue=function(a){1===this._handlerQueue.push(a)&&this._enqueue(this.drainQueue)},b.prototype._drainQueue=function(){for(var a=this._handlerQueue;a.length>0;)a.shift().run()},b})}("function"==typeof a&&a.amd?a:function(a){c.exports=a(b)})},{"./Queue":3}]},{},[1])(1)}),function(global){function __eval(__source,global,__sourceURL,__moduleName){try{eval('var __moduleName = "'+(__moduleName||"").replace('"','"')+'"; with(global) { (function() { '+__source+" \n }).call(global); }"+(__sourceURL&&!__source.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n]+)/)?"\n//# sourceURL="+__sourceURL:""))}catch(e){throw"SyntaxError"==e.name&&(e.message="Evaluating "+__sourceURL+"\n	"+e.message),e}}!function(){function a(a){return{status:"loading",name:a,metadata:{},linkSets:[]}}function b(b,d,e,f){return new v(function(a){a(b.normalize(d,e,f))}).then(function(d){var e;if(b._modules[d])return e=a(d),e.status="linked",e;for(var f=0,g=b._loads.length;g>f;f++)if(e=b._loads[f],e.name==d)return e;return e=a(d),b._loads.push(e),c(b,e),e})}function c(a,b){d(a,b,v.resolve().then(function(){return a.locate({name:b.name,metadata:b.metadata})}))}function d(a,b,c){e(a,b,c.then(function(c){return"failed"==b.status?void 0:(b.address=c,a.fetch({name:b.name,metadata:b.metadata,address:c}))}))}function e(a,c,d){d.then(function(b){return"failed"==c.status?void 0:a.translate({name:c.name,metadata:c.metadata,address:c.address,source:b})}).then(function(b){return"failed"==c.status?void 0:(c.source=b,a.instantiate({name:c.name,metadata:c.metadata,address:c.address,source:b}))}).then(function(d){if("failed"==c.status)return void 0;var e;if(void 0===d){if(!global.traceur)throw new TypeError("Include Traceur for module syntax support");t||(t=global.traceur,$traceurRuntime.ModuleStore.get=$traceurRuntime.getModuleImpl=function(a){return System.get(a)}),c.address=c.address||"anon"+ ++z;var f=new t.syntax.Parser(new t.syntax.SourceFile(c.address,c.source));c.body=f.parseModule(),e=r(c.body),c.kind="declarative"}else{if("object"!=typeof d)throw TypeError("Invalid instantiate return value");e=d.deps||[],c.execute=d.execute,c.kind="dynamic"}c.dependencies={},c.depsList=e;for(var h=[],i=0,j=e.length;j>i;i++)(function(d){var e=b(a,d,c.name,c.address);e.then(function(a){if(c.dependencies[d]=a.name,"linked"!=a.status)for(var b=c.linkSets.concat([]),e=0,f=b.length;f>e;e++)g(b[e],a)}),h.push(e)})(e[i]);return v.all(h)}).then(function(){c.status="loaded";for(var a=c.linkSets.concat([]),b=0,d=a.length;d>b;b++)h(a[b],c)},function(a){c.status="failed",c.exception=a;for(var b=0,d=c.linkSets.length;d>b;b++)i(c.linkSets[b],a)})}function f(a,b){var c,d,e=new v(function(a,b){c=a,d=b}),f={loader:a,loads:[],done:e,resolve:c,reject:d,loadingCount:0};return g(f,b),f}function g(a,b){for(var c=0,d=a.loads.length;d>c;c++)if(a.loads[c]==b)return;a.loads.push(b),b.linkSets.push(a),"loaded"!=b.status&&a.loadingCount++;var e=a.loader;for(var f in b.dependencies){var h=b.dependencies[f];if(!e._modules[h])for(var c=0,d=e._loads.length;d>c;c++)if(e._loads[c].name==h){g(a,e._loads[c]);break}}}function h(a,b){if(a.loadingCount--,!(a.loadingCount>0)){var c=a.loads[0];try{o(a.loads,a.loader)}catch(d){return i(a,d)}a.resolve(c)}}function i(a,b){for(var c=a.loads.concat([]),d=0,e=c.length;e>d;d++){var f=c[d],g=x.call(f.linkSets,a);if(f.linkSets.splice(g,1),0==f.linkSets.length){var h=x.call(a.loader._loads,f);-1!=h&&a.loader._loads.splice(h,1)}}a.reject(b)}function j(a,b){b.name&&(a._modules[b.name]=b.module);var c=x.call(a._loads,b);-1!=c&&a._loads.splice(c,1);for(var d=0,e=b.linkSets.length;e>d;d++)c=x.call(b.linkSets[d].loads,b),b.linkSets[d].loads.splice(c,1);b.linkSets=[]}function k(a,b,c){return new v(l(a,b,c&&c.address?"fetch":"locate",void 0,c&&c.address,void 0)).then(function(a){return a})}function l(b,g,h,i,j,k){return function(l,m){if(b._modules[g])throw new TypeError('Module "'+g+'" already exists in the module table');for(var n=0,o=b._loads.length;o>n;n++)if(b._loads[n].name==g)throw new TypeError('Module "'+g+'" is already loading');var p=a(g);i&&(p.metadata=i);var q=f(b,p);b._loads.push(p),q.done.then(l,m),"locate"==h?c(b,p):"fetch"==h?d(b,p,v.resolve(j)):(p.address=j,e(b,p,v.resolve(k)))}}function m(a,b){return n(b.module,a),b.module.module}function n(a,b){if(a.module)return a.module;for(var c in a.dependencies){var d=a.dependencies[c];b._modules[d].module||n(b._modules[d],b)}t.options.sourceMaps=!0,t.options.modules="instantiate";var e=new t.util.ErrorReporter;e.reportMessageInternal=function(a,b){throw b+"\n"+a};var f=global.System;global.System=global.traceurSystem;var g=new t.codegeneration.module.AttachModuleNameTransformer(a.name).transformAny(a.body);g=new t.codegeneration.FromOptionsTransformer(e).transform(g),global.System=f,delete a.body;var h=new t.outputgeneration.SourceMapGenerator({file:a.address}),i={sourceMapGenerator:h},j=t.outputgeneration.TreeWriter.write(g,i);global.btoa&&(j+="\n//# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(i.sourceMap)))+"\n");var k=System.register;System.register=function(b,c,d){for(var e=0;e<c.length;e++)c[e]=a.dependencies[c[e]];a.module=new s(d.apply(global,c))},__eval(j,global,a.address,a.name),System.register=k}function o(a,b){for(var c=!1;a.length;){c=!0;a:for(var d=0;d<a.length;d++){var e=a[d],f=[];for(var g in e.dependencies){var h=e.dependencies[g];if(!b._modules[h])continue a;var i=x.call(e.depsList,g);f[i]=h}if(c=!1,"declarative"==e.kind)e.module={name:e.name,dependencies:e.dependencies,body:e.body};else{var k=e.execute.apply(null,f);if(!(k instanceof s))throw new TypeError("Execution must define a Module instance");e.module={module:k}}e.status="linked",j(b,e)}if(c)throw new TypeError("Circular dependencies not supported by the polyfill")}}function p(a){if("object"!=typeof a)throw new TypeError("Options must be an object");a.normalize&&(this.normalize=a.normalize),a.locate&&(this.locate=a.locate),a.fetch&&(this.fetch=a.fetch),a.translate&&(this.translate=a.translate),a.instantiate&&(this.instantiate=a.instantiate),u(this,"global",{get:function(){throw new TypeError("global accessor not provided by polyfill")}}),u(this,"realm",{get:function(){throw new TypeError("Realms not implemented in polyfill")}}),this._modules={},this._loads=[]}function q(a,b,c,d){var e,f;if(b(a,c,d)!==!1)for(e in a)a.hasOwnProperty(e)&&"location"!=e&&"type"!=e&&(f=a[e],"object"==typeof f&&null!==f&&q(f,b,a,e))}function r(a){function b(a){-1==x.call(c,a)&&c.push(a)}var c=[];return q(a,function(a){"EXPORT_DECLARATION"==a.type?a.declaration.moduleSpecifier&&b(a.declaration.moduleSpecifier.token.processedValue):"IMPORT_DECLARATION"==a.type?b(a.moduleSpecifier.token.processedValue):"MODULE_DECLARATION"==a.type&&b(a.expression.token.processedValue)}),c}function s(a){if("object"!=typeof a)throw new TypeError("Expected object");if(!(this instanceof s))return new s(a);var b=this;for(var c in a)!function(a,c){u(b,a,{configurable:!1,enumerable:!0,get:function(){return c}})}(c,a[c]);Object.preventExtensions&&Object.preventExtensions(this)}var t,u,v=global.Promise||require("./promise");try{Object.defineProperty({},"a",{})&&(u=Object.defineProperty)}catch(w){u=function(a,b,c){try{a[b]=c.value||c.get.call(a)}catch(d){}}}console.assert=console.assert||function(){};var x=Array.prototype.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},y={};p.prototype={define:function(a,b,c){if(y[a])throw new TypeError("Module is already loading.");return y[a]=new v(l(this,a,c&&c.address?"fetch":"translate",c&&c.meta||{},c&&c.address,b)),y[a].then(function(){delete y[a]})},load:function(a,b){return this._modules[a]?(n(this._modules[a],this),v.resolve(this._modules[a].module)):y[a]?y[a]:(y[a]=k(this,a,b),y[a].then(function(){delete y[a]}))},module:function(b,c){var d=a();d.address=c&&c.address;var g=f(this,d),h=v.resolve(b),i=this,j=g.done.then(function(){return m(i,d)});return e(this,d,h),j},"import":function(a,b){if(this._modules[a])return n(this._modules[a],this),v.resolve(this._modules[a].module);var c=this;return(y[a]||(y[a]=k(this,a,b))).then(function(b){return delete y[a],m(c,b)})},eval:function(){throw new TypeError("Eval not implemented in polyfill")},get:function(a){return n(this._modules[a],this),this._modules[a].module},has:function(a){return!!this._modules[a]},set:function(a,b){if(!(b instanceof s))throw new TypeError("Set must be a module");this._modules[a]={module:b}},"delete":function(a){return this._modules[a]?delete this._modules[a]:!1},entries:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},keys:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},values:function(){throw new TypeError("Iteration not yet implemented in the polyfill")},normalize:function(a){return a},locate:function(a){return a.name},fetch:function(){throw new TypeError("Fetch not implemented")},translate:function(a){return a.source},instantiate:function(){}};var z=0;"object"==typeof exports&&(module.exports=p),global.Loader||(global.Loader=p),global.LoaderPolyfill=p,global.Module=s}()}("undefined"!=typeof global?global:this),function(a){function b(a){var b=String(a).replace(/^\s+|\s+$/g,"").match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);return b?{href:b[0]||"",protocol:b[1]||"",authority:b[2]||"",host:b[3]||"",hostname:b[4]||"",port:b[5]||"",pathname:b[6]||"",search:b[7]||"",hash:b[8]||""}:null}function c(a,c){function d(a){var b=[];return a.replace(/^(\.\.?(\/|$))+/,"").replace(/\/(\.(\/|$))+/g,"/").replace(/\/\.\.$/,"/../").replace(/\/?[^\/]*/g,function(a){"/.."===a?b.pop():b.push(a)}),b.join("").replace(/^\//,"/"===a.charAt(0)?"/":"")}return c=b(c||""),a=b(a||""),c&&a?(c.protocol||a.protocol)+(c.protocol||c.authority?c.authority:a.authority)+d(c.protocol||c.authority||"/"===c.pathname.charAt(0)?c.pathname:c.pathname?(a.authority&&!a.pathname?"/":"")+a.pathname.slice(0,a.pathname.lastIndexOf("/")+1)+c.pathname:a.pathname)+(c.protocol||c.authority||c.pathname?c.search:c.search||a.search)+c.hash:null}function d(){document.removeEventListener("DOMContentLoaded",d,!1),window.removeEventListener("load",d,!1),e()}function e(){for(var a=document.getElementsByTagName("script"),b=0;b<a.length;b++){var c=a[b];if("module"==c.type){var d=c.getAttribute("name"),e=c.getAttribute("src"),f=c.innerHTML;(d?k.define(d,f,{address:e}):k.module(f,{address:e})).then(function(){},function(a){nextTick(function(){throw a})})}}}var f,g="undefined"!=typeof window,h=a.Loader||require("./loader"),i=a.Promise||require("./promise");if(g)f=function(a,b,c){function d(){b(f.responseText)}function e(){c(f.statusText+": "+a||"XHR error")}var f=new XMLHttpRequest,g=!0;if(!("withCredentials"in f)){var h=/^(\w+:)?\/\/([^\/]+)/.exec(a);h&&(g=h[2]===window.location.host,h[1]&&(g&=h[1]===window.location.protocol))}g||(f=new XDomainRequest,f.onload=d,f.onerror=e,f.ontimeout=e),f.onreadystatechange=function(){4===f.readyState&&(200===f.status||0==f.status&&f.responseText?d():e())},f.open("GET",a,!0),f.send(null)};else{var j=require("fs");f=function(a,b,c){return j.readFile(a,function(a,d){return a?c(a):(b(d+""),void 0)})}}var k=new h({global:g?window:a,strict:!0,normalize:function(a,b){if("string"!=typeof a)throw new TypeError("Module name must be a string");var c=a.split("/");if(0==c.length)throw new TypeError("No module name provided");var d=0,e=!1,f=0;if("."==c[0]){if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');e=!0}else{for(;".."==c[d];)if(d++,d==c.length)throw new TypeError('Illegal module name "'+a+'"');d&&(e=!0),f=d}for(var g=d;g<c.length;g++){var h=c[g];if(""==h||"."==h||".."==h)throw new TypeError('Illegal module name"'+a+'"')}if(!e)return a;{var i=[],j=(b||"").split("/");j.length-1-f}return i=i.concat(j.splice(0,j.length-1-f)),i=i.concat(c.splice(d,c.length-d)),i.join("/")},locate:function(a){var b,d=a.name,e="";for(var f in this.paths){var g=f.split("*");if(g.length>2)throw new TypeError("Only one wildcard in a path is permitted");1==g.length?d==f&&f.length>e.length&&(e=f):d.substr(0,g[0].length)==g[0]&&d.substr(d.length-g[1].length)==g[1]&&(e=f,b=d.substr(g[0].length,d.length-g[1].length-g[0].length))}var h=this.paths[e];return b&&(h=h.replace("*",b)),c(this.baseURL,h)},fetch:function(a){var b,d,e=new i(function(a,c){b=a,d=c});return f(c(this.baseURL,a.address),function(a){b(a)},d),e}});if(g){var l=window.location.href.split("#")[0].split("?")[0];k.baseURL=l.substring(0,l.lastIndexOf("/")+1)}else k.baseURL="./";if(k.paths={"*":"*.js"},a.System&&a.traceur&&(a.traceurSystem=a.System),a.System=k,g){var m=document.getElementsByTagName("script");m=m[m.length-1],"complete"===document.readyState?setTimeout(e):document.addEventListener&&(document.addEventListener("DOMContentLoaded",d,!1),window.addEventListener("load",d,!1)),m.getAttribute("data-init")&&window[m.getAttribute("data-init")]()}"object"==typeof exports&&(module.exports=k)}("undefined"!=typeof global?global:this);
/*
 * SystemJS
 * 
 * Copyright (c) 2013 Guy Bedford
 * MIT License
 */

(function(global) {

global.upgradeSystemLoader = function() {
  global.upgradeSystemLoader = undefined;

  // Define an IE-friendly shim good-enough for purposes
  var indexOf = Array.prototype.indexOf || function(item) { 
    for (var i = 0, thisLen = this.length; i < thisLen; i++) {
      if (this[i] === item)
        return i;
    }
    return -1;
  };

  var lastIndexOf = Array.prototype.lastIndexOf || function(c) {
    for (var i = this.length - 1; i >= 0; i--) {
      if (this[i] === c) {
        return i;
      }
    }
    return -i;
  };
/*
  SystemJS Core
  Adds normalization to the import function, as well as __useDefault support
*/
(function(global) {
  // check we have System
  if (typeof System == 'undefined')
    throw 'System not defined. Include the `es6-module-loader.js` polyfill before SystemJS.';

  var curSystem = System;

  /*
    __useDefault
    
    When a module object looks like:
    new Module({
      __useDefault: true,
      default: 'some-module'
    })

    Then the import of that module is taken to be the 'default' export and not the module object itself.

    Useful for module.exports = function() {} handling
  */
  var checkUseDefault = function(module) {
    if (!(module instanceof Module)) {
      var out = [];
      for (var i = 0; i < module.length; i++)
        out[i] = checkUseDefault(module[i]);
      return out;
    }
    return module.__useDefault ? module['default'] : module;
  }
  
  // a variation on System.get that does the __useDefault check
  System.getModule = function(key) {
    return checkUseDefault(System.get(key));  
  }

  // support the empty module, as a concept
  System.set('@empty', Module({}));
  
  
  var systemImport = System['import'];
  System['import'] = function(name, options) {
    // patch System.import to do normalization
    return new Promise(function(resolve) {
      resolve(System.normalize.call(this, name, options && options.name, options && options.address))
    })
    // add useDefault support
    .then(function(name) {
      return Promise.resolve(systemImport.call(System, name, options)).then(function(module) {
        return checkUseDefault(module);
      });
    });
  };

  // Absolute URL parsing, from https://gist.github.com/Yaffle/1088850
  function parseURI(url) {
    var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@]*(?::[^:@]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
    // authority = '//' + user + ':' + pass '@' + hostname + ':' port
    return (m ? {
      href     : m[0] || '',
      protocol : m[1] || '',
      authority: m[2] || '',
      host     : m[3] || '',
      hostname : m[4] || '',
      port     : m[5] || '',
      pathname : m[6] || '',
      search   : m[7] || '',
      hash     : m[8] || ''
    } : null);
  }
  function toAbsoluteURL(base, href) {
    function removeDotSegments(input) {
      var output = [];
      input.replace(/^(\.\.?(\/|$))+/, '')
        .replace(/\/(\.(\/|$))+/g, '/')
        .replace(/\/\.\.$/, '/../')
        .replace(/\/?[^\/]*/g, function (p) {
          if (p === '/..')
            output.pop();
          else
            output.push(p);
      });
      return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
    }

    href = parseURI(href || '');
    base = parseURI(base || '');

    return !href || !base ? null : (href.protocol || base.protocol) +
      (href.protocol || href.authority ? href.authority : base.authority) +
      removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
      (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
      href.hash;
  }
  var baseURI;
  if (typeof window == 'undefined') {
    baseURI = __dirname;
  }
  else {
    baseURI = document.baseURI;
    if (!baseURI) {
      var bases = document.getElementsByTagName('base');
      baseURI = bases[0] && bases[0].href || window.location.href;
    }
  }

  // override locate to allow baseURL to be document-relative
  var systemLocate = System.locate;
  var normalizedBaseURL;
  System.meta = {};
  System.locate = function(load) {
    if (this.baseURL != normalizedBaseURL)
      this.baseURL = normalizedBaseURL = toAbsoluteURL(baseURI, this.baseURL);
    
    var systemMetadata = System.meta[load.name]
    for(var prop in systemMetadata) {
      load.metadata[prop] = systemMetadata[prop];
    }
    return Promise.resolve(systemLocate.call(this, load));
  };

  // define exec for custom instan
  System.__exec = function(load) {
    try {
      Function('global', 'with(global) { ' + load.source + ' \n }'
      + (load.address && !load.source.match(/\/\/[@#] ?(sourceURL|sourceMappingURL)=([^\n'"]+)/)
      ? '\n//# sourceURL=' + load.address : '')).call(global, global);
    }
    catch(e) {
      if (e.name == 'SyntaxError')
        e.message = 'Evaluating ' + load.address + '\n\t' + e.message;
      throw e;
    }
    // traceur overwrites System - write it back
    if (load.name == '@traceur') {
      global.traceurSystem = global.System;
      global.System = curSystem;
    }
  }
})(typeof window == 'undefined' ? global : window);
/*
  SystemJS Formats

  Provides modular support for format detections.

  Also dynamically loads Traceur if ES6 syntax is found.

  Add a format with:
    System.formats.push('myformatname');
    System.format.myformat = {
      detect: function(source, load) {
        return false / depArray;
      },
      execute: function(load, depMap, global, execute) {
        return moduleObj; // (doesnt have to be a Module instance)
      }
    }

  The System.formats array sets the format detection order.
  
  See the AMD, global and CommonJS format extensions for examples.
*/
(function(global) {

  // a table of instantiating load records
  var instantiating = {};

  System.format = {};
  System.formats = [];

  if (typeof window != 'undefined') {
    var curScript = document.getElementsByTagName('script');
    curScript = curScript[curScript.length - 1];
    // set the path to traceur
    System.paths['@traceur'] = curScript.getAttribute('data-traceur-src') || curScript.src.substr(0, curScript.src.lastIndexOf('/') + 1) + 'traceur.js';
  }

  // also in ESML, build.js
  var es6RegEx = /(?:^\s*|[}{\(\);,\n]\s*)(import\s+['"]|(import|module)\s+[^"'\(\)\n;]+\s+from\s+['"]|export\s+(\*|\{|default|function|var|const|let|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*))/;
  
  // es6 module forwarding - allow detecting without Traceur
  var aliasRegEx = /^\s*export\s*\*\s*from\s*(?:'([^']+)'|"([^"]+)")/;

  // module format hint regex
  var formatHintRegEx = /^(\s*(\/\*.*\*\/)|(\/\/[^\n]*))*(["']use strict["'];?)?["']([^'"]+)["'][;\n]/;

  var systemInstantiate = System.instantiate;
  System.instantiate = function(load) {
    var name = load.name || '';

    load.source = load.source || '';

    // set load.metadata.format from metadata or format hints in the source
    var format = load.metadata.format;
    if (!format) {
      var formatMatch = load.source.match(formatHintRegEx);
      if (formatMatch)
        format = load.metadata.format = formatMatch[5];
    }

    if (name == '@traceur')
      format = 'global';

    // es6 handled by core

    // support alias modules without needing Traceur
    var match;
    if (!global.traceur && (format == 'es6' || !format) && (match = load.source.match(aliasRegEx))) {
      return {
        deps: [match[1] || match[2]],
        execute: function(depName) {
          return System.get(depName);
        }
      };
    }

    if (format == 'es6' || !format && load.source.match(es6RegEx)) {
      // dynamically load Traceur if necessary
      if (!global.traceur)
        return System['import']('@traceur').then(function() {
          return systemInstantiate.call(System, load);
        });
      else
        return systemInstantiate.call(System, load);
    }

    // if it is shimmed, assume it is a global script
    var meta;
    if (meta = System.meta[load.name]) {
      if(meta.format) {
        format = meta.format;
      }
    }

    // if we don't know the format, run detection first
    if (!format || !this.format[format])
      for (var i = 0; i < this.formats.length; i++) {
        var f = this.formats[i];
        var curFormat = this.format[f];
        if (curFormat.detect(load)) {
          format = f;
          break;
        }
      }

    var curFormat = this.format[format];

    // if we don't have a format or format rule, throw
    if (!format || !curFormat)
      throw new TypeError('No format found for ' + (format ? format : load.address));

    load.metadata.format = format;
	instantiating[load.name] = load;

    // now invoke format instantiation
    var deps = curFormat.deps(load, global);

    // remove duplicates from deps first
    for (var i = 0; i < deps.length; i++)
      if (lastIndexOf.call(deps, deps[i]) != i)
        deps.splice(i--, 1);

    return {
      deps: deps,
      execute: function() {
        var output = curFormat.execute.call(this, Array.prototype.splice.call(arguments, 0, arguments.length), load, global);
		delete instantiating[load.name];
        if (output instanceof global.Module)
          return output;
        else
          return new global.Module(output && output.__esModule ? output : { __useDefault: true, 'default': output });
      }
    };
  };
  var systemFormatNormalize = System.normalize;
  System.normalize = function(name, refererName, refererAdress) {
  	var load = instantiating[refererName],
  		format = load && this.format[load.metadata.format],
  		normalize = format && format.normalize;
  	if(normalize) {
  		return normalize.call(this, name, refererName, refererAdress, systemFormatNormalize);
  		if(res != null) {
  			return res;
  		}
  	} 
	return systemFormatNormalize.apply(this, arguments);
  	
  };


})(typeof window != 'undefined' ? window : global);
/*
  SystemJS AMD Format
  Provides the AMD module format definition at System.format.amd
  as well as a RequireJS-style require on System.require
*/
(function() {
  System.formats.push('amd');

  // AMD Module Format Detection RegEx
  // define([.., .., ..], ...)
  // define(varName); || define(function(require, exports) {}); || define({})
  var amdRegEx = /(?:^\s*|[}{\(\);,\n\?\&]\s*)define\s*\(\s*("[^"]+"\s*,|'[^']+'\s*,\s*)?(\[(\s*("[^"]+"|'[^']+')\s*,)*(\s*("[^"]+"|'[^']+')\s*)?\]|function\s*|{|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*\))/;

  /*
    AMD-compatible require
    To copy RequireJS, set window.require = window.requirejs = System.require
  */
  var require = System.require = function(names, callback, errback, referer) {
    // in amd, first arg can be a config object... we just ignore
    if (typeof names == 'object' && !(names instanceof Array))
      return require.apply(null, Array.prototype.splice.call(arguments, 1, arguments.length - 1));

    // amd require
    if (names instanceof Array)
      Promise.all(names.map(function(name) {
        return System['import'](name, referer);
      })).then(function(modules) {
        callback.apply(null, modules);
      }, errback);

    // commonjs require
    else if (typeof names == 'string')
      return System.getModule(names);

    else
      throw 'Invalid require';
  };
  function makeRequire(parentName, deps, depsNormalized) {
    return function(names, callback, errback) {
      if (typeof names == 'string' && indexOf.call(deps, names) != -1)
        return System.getModule(depsNormalized[indexOf.call(deps, names)]);
      return require(names, callback, errback, { name: parentName });
    }
  }

  function prepareDeps(deps, meta) {
    for (var i = 0; i < deps.length; i++)
      if (lastIndexOf.call(deps, deps[i]) != i)
        deps.splice(i--, 1);

    // remove system dependencies
    var index;
    if ((index = indexOf.call(deps, 'require')) != -1) {
      meta.requireIndex = index;
      deps.splice(index, 1);
    }
    if ((index = indexOf.call(deps, 'exports')) != -1) {
      meta.exportsIndex = index;
      deps.splice(index, 1);
    }
    if ((index = indexOf.call(deps, 'module')) != -1) {
      meta.moduleIndex = index;
      deps.splice(index, 1);
    }

    return deps;
  }

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

    // add back in system dependencies
    if (meta.moduleIndex !== undefined)
      deps.splice(meta.moduleIndex, 0, exports = {}, module = { id: load.name, uri: load.address, config: function() { return {}; }, exports: exports });
    if (meta.exportsIndex !== undefined)
      deps.splice(meta.exportsIndex, 0, exports = exports || {});
    if (meta.requireIndex !== undefined)
      deps.splice(meta.requireIndex, 0, makeRequire(load.name, meta.deps, depNames));

    return {
      deps: deps,
      module: module || exports && { exports: exports }
    };
  }

  System.format.amd = {
    detect: function(load) {
      return !!load.source.match(amdRegEx);
    },
    deps: function(load, global) {

      var deps;
      var meta = load.metadata;
      var defined = false;
      global.define = function(name, _deps, factory) {
      	
        if (typeof name != 'string') {
          factory = _deps;
          _deps = name;
          name = null;
        }

        // anonymous modules must only call define once
        if (!name && defined) {
          throw "Multiple anonymous defines for module " + load.name;
        }
        if (!name) {
          defined = true;
        }

        if (!(_deps instanceof Array)) {
          factory = _deps;
          // CommonJS AMD form
          var src = load.source;
          load.source = factory.toString();
          _deps = ['require', 'exports', 'module'].concat(System.format.cjs.deps(load, global));
          load.source = src;
        }
        
        if (typeof factory != 'function')
          factory = (function(factory) {
            return function() { return factory; }
          })(factory);
        
        if (name && name != load.name) {
          // named define for a bundle describing another module
          var _load = {
            name: name,
            address: name,
            metadata: {}
          };
          _deps = prepareDeps(_deps, _load.metadata);
          System.defined[name] = {
            deps: _deps,
            execute: function() {
              var execs = prepareExecute(Array.prototype.splice.call(arguments, 0, arguments.length), _load);
              var output = factory.apply(global, execs.deps) || execs.module && execs.module.exports;

              if (output instanceof global.Module)
                return output;
              else
                return new global.Module(output && output.__esModule ? output : { __useDefault: true, 'default': output });
            }
          };
        }
        else {
          // we are defining this module
          deps = _deps;
          meta.factory = factory;
        }
      };
      global.define.amd = {};

      // ensure no NodeJS environment detection
      global.module = undefined;
      global.exports = undefined;

      System.__exec(load);

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
    }
  };
})();
/*
  SystemJS CommonJS Format
  Provides the CommonJS module format definition at System.format.cjs
*/
(function() {
  System.formats.push('cjs');

  // CJS Module Format
  // require('...') || exports[''] = ... || exports.asd = ... || module.exports = ...
  var cjsExportsRegEx = /(?:^\s*|[}{\(\);,\n=:\?\&]\s*|module\.)(exports\s*\[\s*('[^']+'|"[^"]+")\s*\]|\exports\s*\.\s*[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*|exports\s*\=)/;
  var cjsRequireRegEx = /(?:^\s*|[}{\(\);,\n=:\?\&]\s*)require\s*\(\s*("([^"]+)"|'([^']+)')\s*\)/g;
  var commentRegEx = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg;

  var noop = function() {}
  var nodeProcess = {
    nextTick: function(f) {
      setTimeout(f, 7);
    },
    browser: true,
    env: {},
    argv: [],
    on: noop,
    once: noop,
    off: noop,
    emit: noop,
    cwd: function() { return '/' }
  };
  System.set('@@nodeProcess', Module(nodeProcess));

  System.format.cjs = {
    detect: function(load) {
      cjsExportsRegEx.lastIndex = 0;
      cjsRequireRegEx.lastIndex = 0;
      return !!(cjsRequireRegEx.exec(load.source) || cjsExportsRegEx.exec(load.source));
    },
    deps: function(load, global) {
      cjsExportsRegEx.lastIndex = 0;
      cjsRequireRegEx.lastIndex = 0;

      var deps = [];

      // remove comments from the source first
      var source = load.source.replace(commentRegEx, '');

      var match;

      while (match = cjsRequireRegEx.exec(source))
        deps.push(match[2] || match[3]);

      load.metadata.deps = deps;

      return deps;
    },
    execute: function(depNames, load, global) {
      var dirname = load.address.split('/');
      dirname.pop();
      dirname = dirname.join('/');

      var deps = load.metadata.deps;

      var globals = global._g = {
        global: global,
        exports: {},
        process: nodeProcess,
        require: function(d) {
          var index = indexOf.call(deps, d);
          if (index != -1)
            return System.getModule(depNames[index]);
        },
        __filename: load.address,
        __dirname: dirname,
      };
      globals.module = { exports: globals.exports };

      var glString = '';
      for (var _g in globals)
        glString += 'var ' + _g + ' = _g.' + _g + ';';

      load.source = glString + load.source;

      System.__exec(load);

      global._g = undefined;

      return globals.module.exports;
    }
  };
})();/*
  SystemJS Global Format
  Provides the global support at System.format.global
  Supports inline shim syntax with:
    "global";
    "import jquery";
    "export my.Global";

  Also detects writes to the global object avoiding global collisions.
  See the SystemJS readme global support section for further information.
*/
(function() {
  System.formats.push('global');

  // Global
  var globalShimRegEx = /(["']global["'];\s*)((['"]import [^'"]+['"];\s*)*)(['"]export ([^'"]+)["'])?/;
  var globalImportRegEx = /(["']import [^'"]+)+/g;

  // given a module's global dependencies, prepare the global object
  // to contain the union of the defined properties of its dependent modules
  var moduleGlobals = {};

  // also support a System.shim system
  System.shim = {};

  System.format.global = {
    detect: function() {
      return true;
    },
    deps: function(load, global) {
      var match, deps;
      if (match = load.source.match(globalShimRegEx)) {
        deps = match[2].match(globalImportRegEx);
        if (deps)
          for (var i = 0; i < deps.length; i++)
            deps[i] = deps[i].substr(8);
        load.metadata.exports = match[5];
      }
      deps = deps || [];
      var meta;
      if (meta = System.meta[load.name]) {
        deps.push.apply(deps, meta.deps || meta.imports || []);
      }
      return deps;
    },
    execute: function(depNames, load, global) {
      var hasOwnProperty = global.hasOwnProperty;
      var globalExport = load.metadata.exports;

      // first, we add all the dependency module properties to the global
      for (var i = 0; i < depNames.length; i++) {
        var moduleGlobal = moduleGlobals[depNames[i]];
        if (moduleGlobal)
          for (var m in moduleGlobal)
            global[m] = moduleGlobal[m];
      }

      // now store a complete copy of the global object
      // in order to detect changes
      var globalObj = {};
      for (var g in global)
        if (!hasOwnProperty || global.hasOwnProperty(g))
          globalObj[g] = global[g];

      if (globalExport)
        load.source += '\nthis["' + globalExport + '"] = ' + globalExport;

      System.__exec(load);

      // check for global changes, creating the globalObject for the module
      // if many globals, then a module object for those is created
      // if one global, then that is the module directly
      var singleGlobal, moduleGlobal;
      if (globalExport) {
        var firstPart = globalExport.split('.')[0];
        singleGlobal = eval.call(global, globalExport);
        moduleGlobal = {};
        moduleGlobal[firstPart] = global[firstPart];
      }
      else {
        moduleGlobal = {};
        for (var g in global) {
          if (!hasOwnProperty && (g == 'sessionStorage' || g == 'localStorage' || g == 'clipboardData' || g == 'frames'))
            continue;
          if ((!hasOwnProperty || global.hasOwnProperty(g)) && g != global && globalObj[g] != global[g]) {
            moduleGlobal[g] = global[g];
            if (singleGlobal) {
              if (singleGlobal !== global[g])
                singleGlobal = false;
            }
            else if (singleGlobal !== false)
              singleGlobal = global[g];
          }
        }
      }
      moduleGlobals[load.name] = moduleGlobal;
      
      if (singleGlobal)
        return singleGlobal;
      else
        return new Module(moduleGlobal);
    }
  };
})();/*
  SystemJS map support
  
  Provides map configuration through
    System.map['jquery'] = 'some/module/map'

  As well as contextual map config through
    System.map['bootstrap'] = {
      jquery: 'some/module/map2'
    }

  Note that this applies for subpaths, just like RequireJS

  jquery      -> 'some/module/map'
  jquery/path -> 'some/module/map/path'
  bootstrap   -> 'bootstrap'

  Inside any module name of the form 'bootstrap' or 'bootstrap/*'
    jquery    -> 'some/module/map2'
    jquery/p  -> 'some/module/map2/p'

  Maps are carefully applied from most specific contextual map, to least specific global map
*/
(function() {

  System.map = System.map || {};


  // return the number of prefix parts (separated by '/') matching the name
  // eg prefixMatchLength('jquery/some/thing', 'jquery') -> 1
  function prefixMatchLength(name, prefix) {
    var prefixParts = prefix.split('/');
    var nameParts = name.split('/');
    if (prefixParts.length > nameParts.length)
      return 0;
    for (var i = 0; i < prefixParts.length; i++)
      if (nameParts[i] != prefixParts[i])
        return 0;
    return prefixParts.length;
  }


  // given a relative-resolved module name and normalized parent name,
  // apply the map configuration
  function applyMap(name, parentName) {

    var curMatch, curMatchLength = 0;
    var curParent, curParentMatchLength = 0;
    var subPath;
    var nameParts;
    
    // first find most specific contextual match
    if (parentName) {
      for (var p in System.map) {
        var curMap = System.map[p];
        if (typeof curMap != 'object')
          continue;

        // most specific parent match wins first
        if (prefixMatchLength(parentName, p) <= curParentMatchLength)
          continue;

        for (var q in curMap) {
          // most specific name match wins
          if (prefixMatchLength(name, q) <= curMatchLength)
            continue;

          curMatch = q;
          curMatchLength = q.split('/').length;
          curParent = p;
          curParentMatchLength = p.split('/').length;
        }
      }
    }

    // if we found a contextual match, apply it now
    if (curMatch) {
      nameParts = name.split('/');
      subPath = nameParts.splice(curMatchLength, nameParts.length - curMatchLength).join('/');
      name = System.map[curParent][curMatch] + (subPath ? '/' + subPath : '');
      curMatchLength = 0;
    }

    // now do the global map
    for (var p in System.map) {
      var curMap = System.map[p];
      if (typeof curMap != 'string')
        continue;

      if (prefixMatchLength(name, p) <= curMatchLength)
        continue;

      curMatch = p;
      curMatchLength = p.split('/').length;
    }
    
    // return a match if any
    if (!curMatchLength)
      return name;
    
    nameParts = name.split('/');
    subPath = nameParts.splice(curMatchLength, nameParts.length - curMatchLength).join('/');
    return System.map[curMatch] + (subPath ? '/' + subPath : '');
  }

  var systemNormalize = System.normalize;
  var mapped = {};
  System.normalize = function(name, parentName, parentAddress) {
    return Promise.resolve(systemNormalize.call(System, name, parentName, parentAddress))
    .then(function(name) {
      return applyMap(name, parentName);
    });
  };
})();
/*
  SystemJS Plugin Support

  Supports plugin syntax with "!"

  The plugin name is loaded as a module itself, and can override standard loader hooks
  for the plugin resource. See the plugin section of the systemjs readme.
*/
(function() {
  var systemNormalize = System.normalize;
  System.normalize = function(name, parentName, parentAddress) {
    // if parent is a plugin, normalize against the parent plugin argument only
    var parentPluginIndex;
    if (parentName && (parentPluginIndex = parentName.indexOf('!')) != -1)
      parentName = parentName.substr(0, parentPluginIndex);

    return Promise.resolve(systemNormalize(name, parentName, parentAddress))
    .then(function(name) {
      // if this is a plugin, normalize the plugin name and the argument
      var pluginIndex = name.lastIndexOf('!');
      if (pluginIndex != -1) {
        var argumentName = name.substr(0, pluginIndex);

        // plugin name is part after "!" or the extension itself
        var pluginName = name.substr(pluginIndex + 1) || argumentName.substr(argumentName.lastIndexOf('.') + 1);

        // normalize the plugin name relative to the same parent
        return new Promise(function(resolve) {
          resolve(System.normalize(pluginName, parentName, parentAddress)); 
        })
        // normalize the plugin argument
        .then(function(_pluginName) {
          pluginName = _pluginName;
          return System.normalize(argumentName, parentName, parentAddress);
        })
        .then(function(argumentName) {
          return argumentName + '!' + pluginName;
        });
      }

      // standard normalization
      return name;
    });
  }

  var systemLocate = System.locate;
  System.locate = function(load) {
    var name = load.name;

    // plugin
    var pluginIndex = name.lastIndexOf('!');
    if (pluginIndex != -1) {
      var pluginName = name.substr(pluginIndex + 1);

      // the name to locate is the plugin argument only
      load.name = name.substr(0, pluginIndex);

      // load the plugin module
      return System.load(pluginName)
      .then(function() {
        var plugin = System.get(pluginName);
        plugin = plugin['default'] || plugin;

        // store the plugin module itself on the metadata
        load.metadata.plugin = plugin;
        load.metadata.pluginName = pluginName;
        load.metadata.pluginArgument = load.name;

        // run plugin locate if given
        if (plugin.locate)
          return plugin.locate.call(System, load);

        // otherwise use standard locate without '.js' extension adding
        else
          return new Promise(function(resolve) {
            resolve(System.locate(load));
          })
          .then(function(address) {
            return address.substr(0, address.length - 3);
          });
      });
    }

    return systemLocate.call(this, load);
  }

  var systemFetch = System.fetch;
  System.fetch = function(load) {
    // support legacy plugins
    var self = this;
    if (typeof load.metadata.plugin == 'function') {
      return new Promise(function(fulfill, reject) {
        load.metadata.plugin(load.metadata.pluginArgument, load.address, function(url, callback, errback) {
          systemFetch.call(self, { name: load.name, address: url, metadata: {} }).then(callback, errback);
        }, fulfill, reject);
      });
    }
    return (load.metadata.plugin && load.metadata.plugin.fetch || systemFetch).call(this, load);
  }

  var systemTranslate = System.translate;
  System.translate = function(load) {
    var plugin = load.metadata.plugin;
    if (plugin && plugin.translate)
      return plugin.translate.call(this, load);

    return systemTranslate.call(this, load);
  }

})();/*
  System bundles

  Allows a bundle module to be specified which will be dynamically 
  loaded before trying to load a given module.

  For example:
  System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']

  Will result in a load to "mybundle" whenever a load to "jquery"
  or "bootstrap/js/bootstrap" is made.

  In this way, the bundle becomes the request that provides the module
*/

(function() {

  // bundles support (just like RequireJS)
  // bundle name is module name of bundle itself
  // bundle is array of modules defined by the bundle
  // when a module in the bundle is requested, the bundle is loaded instead
  // of the form System.bundles['mybundle'] = ['jquery', 'bootstrap/js/bootstrap']
  System.bundles = System.bundles || {};

  var systemFetch = System.fetch;
  System.fetch = function(load) {
    // if this module is in a bundle, load the bundle first then
    for (var b in System.bundles) {
      if (indexOf.call(System.bundles[b], load.name) == -1)
        continue;
      // we do manual normalization in case the bundle is mapped
      // this is so we can still know the normalized name is a bundle
      return Promise.resolve(System.normalize(b))
      .then(function(normalized) {
        System.bundles[normalized] = System.bundles[normalized] || System.bundles[b];
        return System.load(normalized);
      })
      .then(function() {
        return '';
      });
    }
    return systemFetch.apply(this, arguments);
  }

  var systemLocate = System.locate;
  System.locate = function(load) {
    if (System.bundles[load.name])
      load.metadata.bundle = true;
    return systemLocate.call(this, load);
  }

  var systemInstantiate = System.instantiate;
  System.instantiate = function(load) {
    // if it is a bundle itself, it doesn't define anything
    if (load.metadata.bundle)
      return {
        deps: [],
        execute: function() {
          System.__exec(load);
          return new Module({});
        }
      };

    return systemInstantiate.apply(this, arguments);
  }

})();
/*
  Implementation of the System.register bundling method

  This allows the output of Traceur to populate the
  module registry of the System loader
*/

(function() {

  // instantiation cache for System.register
  System.defined = {};

  // register a new module for instantiation
  System.register = function(name, deps, execute) {
    System.defined[name] = {  
      deps: deps,
      execute: function() {
        return Module(execute.apply(this, arguments));
      }
    };
  }
  
  var systemFetch = System.fetch;
  System.fetch = function(load) {
    // if the module is already defined, skip fetch
    if (System.defined[load.name])
      return '';
    return systemFetch.apply(this, arguments);
  }

  var systemInstantiate = System.instantiate;
  System.instantiate = function(load) {
    // if the module has been defined by a bundle, use that
    if (System.defined[load.name]) {
      var instantiateResult = System.defined[load.name];
      delete System.defined[load.name];
      return instantiateResult;
    }

    return systemInstantiate.apply(this, arguments);
  }

})();
/*
  SystemJS Semver Version Addon
  
  1. Uses Semver convention for major and minor forms

  Supports requesting a module from a package that contains a version suffix
  with the following semver ranges:
    module       - any version
    module@1     - major version 1, any minor (not prerelease)
    module@1.2   - minor version 1.2, any patch (not prerelease)
    module@1.2.3 - exact version

  It is assumed that these modules are provided by the server / file system.

  First checks the already-requested packages to see if there are any packages 
  that would match the same package and version range.

  This provides a greedy algorithm as a simple fix for sharing version-managed
  dependencies as much as possible, which can later be optimized through version
  hint configuration created out of deeper version tree analysis.
  
  2. Semver-compatibility syntax (caret operator - ^)

  Compatible version request support is then also provided for:

    module@^1.2.3        - module@1, >=1.2.3
    module@^1.2          - module@1, >=1.2.0
    module@^1            - module@1
    module@^0.5.3        - module@0.5, >= 0.5.3
    module@^0.0.1        - module@0.0.1

  The ^ symbol is always normalized out to a normal version request.

  This provides comprehensive semver compatibility.
  
  3. System.versions version hints and version report

  Note this addon should be provided after all other normalize overrides.

  The full list of versions can be found at System.versions providing an insight
  into any possible version forks.

  It is also possible to create version solution hints on the System global:

  System.versions = {
    jquery: ['1.9.2', '2.0.3'],
    bootstrap: '3.0.1'
  };

  Versions can be an array or string for a single version.

  When a matching semver request is made (jquery@1.9, jquery@1, bootstrap@3)
  they will be converted to the latest version match contained here, if present.

  Prereleases in this versions list are also allowed to satisfy ranges when present.
*/

(function() {
  // match x, x.y, x.y.z, x.y.z-prerelease.1
  var semverRegEx = /^(\d+)(?:\.(\d+)(?:\.(\d+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?)?)?$/;

  var semverCompare = function(v1, v2) {
    var v1Parts = v1.split('.');
    var v2Parts = v2.split('.');
    var prereleaseIndex;
    if (v1Parts[2] && (prereleaseIndex = indexOf.call(v1Parts[2], '-')) != -1)
      v1Parts.splice(2, 1, v1Parts[2].substr(0, prereleaseIndex), v1Parts[2].substr(prereleaseIndex + 1));
    if (v2Parts[2] && (prereleaseIndex = indexOf.call(v2Parts[2], '-')) != -1)
      v2Parts.splice(2, 1, v2Parts[2].substr(0, prereleaseIndex), v2Parts[2].substr(prereleaseIndex + 1));
    for (var i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
      if (!v1Parts[i])
        return 1;
      else if (!v2Parts[i])
        return -1;
      if (v1Parts[i] != v2Parts[i])
        return parseInt(v1Parts[i]) > parseInt(v2Parts[i]) ? 1 : -1;
    }
    return 0;
  }
  
  var systemNormalize = System.normalize;

  System.versions = System.versions || {};

  // hook normalize and store a record of all versioned packages
  System.normalize = function(name, parentName, parentAddress) {
    var packageVersions = System.versions;
    // run all other normalizers first
    return Promise.resolve(systemNormalize.call(this, name, parentName, parentAddress)).then(function(normalized) {
      
      var version, semverMatch, nextChar, versions;
      var index = normalized.indexOf('@');

      // see if this module corresponds to a package already in our versioned packages list
      
      // no version specified - check against the list (given we don't know the package name)
      if (index == -1) {
        for (var p in packageVersions) {
          versions = packageVersions[p];
          if (normalized.substr(0, p.length) != p)
            continue;

          nextChar = normalized.substr(p.length, 1);

          if (nextChar && nextChar != '/')
            continue;

          // match -> take latest version
          return p + '@' + (typeof versions == 'string' ? versions : versions[versions.length - 1]) + normalized.substr(p.length);
        }
        return normalized;
      }

      // get the version info
      version = normalized.substr(index + 1).split('/')[0];
      var versionLength = version.length;

      var minVersion;
      if (version.substr(0, 1) == '^') {
        version = version.substr(1);
        minVersion = true;
      }

      semverMatch = version.match(semverRegEx);

      // if not a semver, we cant help
      if (!semverMatch)
        return normalized;

      // translate '^' in range to simpler range form
      if (minVersion) {
        // ^0 -> 0
        // ^1 -> 1
        if (!semverMatch[2])
          minVersion = false;
        
        if (!semverMatch[3]) {
          
          // ^1.1 -> ^1.1.0
          if (semverMatch[2] > 0)
            semverMatch[3] = '0';

          // ^0.1 -> 0.1
          // ^0.0 -> 0.0
          else
            minVersion = false;
        }
      }

      if (minVersion) {
        // >= 1.0.0
        if (semverMatch[1] > 0) {
          if (!semverMatch[2])
            version = semverMatch[1] + '.0.0';
          if (!semverMatch[3])
            version = semverMatch[1] + '.0';
          minVersion = version;
          semverMatch = [semverMatch[1]];
        }
        // >= 0.1.0
        else if (semverMatch[2] > 0) {
          minVersion = version;
          semverMatch = [0, semverMatch[2]];
        }
        // >= 0.0.0
        else {
          // NB compatible with prerelease is just prelease itself?
          minVersion = false;
          semverMatch = [0, 0, semverMatch[3]];
        }
        version = semverMatch.join('.');
      }

      var packageName = normalized.substr(0, index);

      versions = packageVersions[packageName] || [];

      if (typeof versions == 'string')
        versions = [versions];

      // look for a version match
      // if an exact semver, theres nothing to match, just record it
      if (!semverMatch[3] || minVersion)
        for (var i = versions.length - 1; i >= 0; i--) {
          var curVersion = versions[i];
          // if I have requested x.y, find an x.y.z-b
          // if I have requested x, find any x.y / x.y.z-b
          if (curVersion.substr(0, version.length) == version && curVersion.substr(version.length, 1).match(/^[\.\-]?$/)) {
            // if a minimum version, then check too
            if (!minVersion || minVersion && semverCompare(curVersion, minVersion) != -1)
              return packageName + '@' + curVersion + normalized.substr(packageName.length + versionLength + 1);
          }
        }

      // no match
      // record the package and semver for reuse since we're now asking the server
      // x.y and x versions will now be latest by default, so they are useful in the version list
      if (indexOf.call(versions, version) == -1) {
        versions.push(version);
        versions.sort(semverCompare);

        normalized = packageName + '@' + version + normalized.substr(packageName.length + versionLength + 1);

        // if this is an x.y.z, remove any x.y, x
        // if this is an x.y, remove any x
        if (semverMatch[3] && (index = indexOf.call(versions, semverMatch[1] + '.' + semverMatch[2])) != -1)
          versions.splice(index, 1);
        if (semverMatch[2] && (index = indexOf.call(versions, semverMatch[1])) != -1)
          versions.splice(index, 1);

        packageVersions[packageName] = versions.length == 1 ? versions[0] : versions;
      }

      return normalized;
    });
  }

})();
};

(function() {
  if (!global.System || global.System.registerModule) {
    if (typeof window != 'undefined') {
      // determine the current script path as the base path
      var scripts = document.getElementsByTagName('script');
      var curPath = scripts[scripts.length - 1].src;
      var basePath = curPath.substr(0, curPath.lastIndexOf('/') + 1);
      document.write(
        '<' + 'script type="text/javascript" src="' + basePath + 'es6-module-loader.js" data-init="upgradeSystemLoader">' + '<' + '/script>'
      );
    }
    else {
      var es6ModuleLoader = require('es6-module-loader');
      global.System = es6ModuleLoader.System;
      global.Loader = es6ModuleLoader.Loader;
      global.Module = es6ModuleLoader.Module;
      module.exports = global.System;
      global.upgradeSystemLoader();
    }
  }
  else {
    global.upgradeSystemLoader();
  }
})();


})(typeof window != 'undefined' ? window : global);

(function(){

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
		
	steal = function(){
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
		// handle System special configs
		
		
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
	
	var startup = function(){
		
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
			
			configDeferred = System.import("stealconfig");
			
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


	if (typeof window != 'undefined') {
		window.steal = steal;
		startup();
    }
    else {
		steal.System = System;
		steal.dev = require("./dev/dev.js");
		module.exports = steal;
    }

})();
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