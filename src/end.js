
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