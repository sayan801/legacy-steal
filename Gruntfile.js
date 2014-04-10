'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*\n *  <%= pkg.name %> v<%= pkg.version %>\n' +
        '<%= pkg.homepage ? " *  " + pkg.homepage + "\\n" : "" %>' +
        ' *  \n' +
        ' *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */'
    },
    concat: {
      dist: {
        src: [
          'bower_components/es6-module-loader/dist/es6-module-loader.js',
          'bower_components/systemjs/dist/system.js',
          'src/start.js',
          'src/core.js',
          'src/config.js',
          'src/startup.js',
          'src/end.js',
          'src/system-format-steal.js'
          
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>\n',
        compress: {
          drop_console: true
        }
      },
      dist: {
        options: {
          banner: '<%= meta.banner %>\n'
          + '/*\n *  ES6 Promises shim from when.js, Copyright (c) 2010-2014 Brian Cavalier, John Hann, MIT License\n */\n'
        },
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.production.js'
      }
    },
	watch: {
		files: [ "src/*.js"],
		tasks: "default"
	}
  });

  grunt.loadNpmTasks( "grunt-contrib-watch" );
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('default', [/*'jshint', */'concat', 'uglify']);
};
