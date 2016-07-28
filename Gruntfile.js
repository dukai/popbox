'use strict';

module.exports = function(grunt) {
  var version = JSON.parse(grunt.file.read('./package.json')).version;

  // Project configuration.
  grunt.initConfig({
    version: version,
    less: {
      dev: {
        options: {
          paths: ["less"]
        },
        files: [
          {
            expand: true,     //Enable dynamic expansion.
            cwd: 'less/',      //Src matches are relative to this path.
            src: ['*.less'], //Actual pattern(s) to match.
            dest: 'css/',   //Destination path prefix.
            ext: '.css',   //Dest filepaths will have this extension.
            extDot: 'first'   //Extensions in filenames begin after the first dot
          },
        ],
      },
    },

    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
      less: {
        files: 'less/*.less',
        tasks: ['less']
      }
    },

    requirejs: {
      compile: {
        options: {
          baseUrl: './',
          name: 'popbox',
          out: "./popbox-<%= version %>.min.js",
          paths: {
            dtools: 'empty:',
            template: 'empty:',
            jquery: 'empty:',
            text: './test/lib/text/text',
          },
          exclude: ['text']
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit']);
  grunt.registerTask('release', ['requirejs']);

};
