StealJS is an ES6, AMD, CommonJS, and steal client-side loader. Combined with 
[steal-tools](https://github.com/bitovi/steal-tools/tree/systemjs), its designed
to simplify dependency management while being extremely powerful and flexible.


Steal builds from [SystemJS](https://github.com/systemjs/systemjs) and 
[ES6ModuleLoader](https://github.com/ModuleLoader/es6-module-loader) and adds:

 - global configuration
 - css and less support
 - plugin extension mapping _(upcoming)_
 - production builds with [steal-tools](https://github.com/bitovi/steal-tools/tree/systemjs)

But it's __killer__ feature - progressively loaded apps that balance caching and the 
number of script requests.

## Use

> bower install stealjs -S

