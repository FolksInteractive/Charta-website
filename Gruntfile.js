/*
 * Generated on 2015-11-13
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2015 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      livereload: {
        options: {
          livereload: 1025
        },
        files: [
          '<%= config.dist %>/{,*/}*.html',
          '<%= config.dist %>/assets/{,*/}*.css',
          '<%= config.dist %>/assets/{,*/}*.js',
          '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      less: {
        files : ['<%= config.src %>/assets/stylesheets/**/*.less'],
        tasks: ['less', 'newer:copy:theme']
      },
      js: {
        files : ['<%= config.src %>/assets/**/*.js'],
        tasks: ['newer:copy:js']
      }
    },

    php: {
      dist: {
        options: {
          hostname: 'localhost',
          port: 7000,
          base: '<%= config.dist %>',
          keepalive: false,
          open: true,
          directives: {
            'error_log': require('path').resolve('logs/error.log')
          }
        }
      }   
    },

    // connect: {
    //   options: {
    //     port: 9001,
    //     livereload: 35729,
    //     // change this to '0.0.0.0' to access the server from outside
    //     hostname: 'localhost'
    //   },
    //   livereload: {
    //     options: {
    //       open: true,
    //       base: [
    //         '<%= config.dist %>'
    //       ],
    //       middleware: function (connect) {
    //         console.log("--------", __dirname + '/dist')
    //         return [
    //           require('grunt-connect-livereload/lib/utils').livereloadSnippet,
    //           // gateway(__dirname + '/dist', {
    //           //   '.php': 'php-cgi'
    //           // })
    //         ];
    //       }
    //     }
    //   }
    // },

    assemble: {
      options: {
        plugins: [ 'assemble-related-pages']
      },
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          helpers: '<%= config.src %>/templates/helpers.js',
          plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      theme: {
        expand: true,
        cwd: 'src/assets',
        src: 'stylesheets/main.css',
        dest: '<%= config.dist %>/assets'
      },
      js: {
        expand: true,
        cwd: 'src/assets',
        src: 'js/*.js',
        dest: '<%= config.dist %>/assets'
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}'],

    less: {
      development: {
        options: {
          paths: ["<%= config.dist %>/bower_components/bootstrap/less", "src/assets/stylesheets"]
        },
        files: {
          "<%= config.src %>/assets/stylesheets/main.css": "<%= config.src %>/assets/stylesheets/main.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('assemble');

  grunt.registerTask('server', [
    'build',
    'php:dist',
    'watch',
  ]);

  grunt.registerTask('build', [
    'clean',
    'less',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
