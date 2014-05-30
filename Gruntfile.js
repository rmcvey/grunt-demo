module.exports = function(grunt) {
  grunt.initConfig({
		// gets the package name from our package.json file into a variable that can be interpolated for file names/versions/etc., this will be used to name our distribution files
    pkg: grunt.file.readJSON('package.json'),
		/**
		* The concat package takes a bunch of files (of any type) and merges them into a single file
		* Pretty much any key other than 'options' is treated as a separate merge file, src is an array of files to concat (in that specific order) and
		* will accept wildcards (e.g. [public/js/*.js]), dest is where the output file will be placed
		* more info here: https://github.com/gruntjs/grunt-contrib-concat
		*/
    concat: {
			// the name here is arbitrary, we can call one 'libs' to just concatenate third-party scripts
      jslibs: {
        src: ['public/js/jquery-2.1.1.min.js', 'public/js/bootstrap.min.js'],
        dest: 'public/dist/<%= pkg.name %>.libs.js'
      },
			jsdist: {
				src: ['public/js/main.js', 'public/js/cookies.js'],
				dest: 'public/dist/<%= pkg.name %>.js'
			},
			// third-party css libraries will go in their own file because "why not?"
			cssdist: {
				src: ['public/css/bootstrap.css', 'public/css/main.css'],
				dest: 'public/dist/css/<%= pkg.name %>.css'
			}
    },
		/**
		*	The uglify package is a javascript minifier. For our purposes, it is going to take the js files generated by concat and minify them
		* Great features are source maps, which aid in debugging when using concat/minfied files, gzip, and auto-wrapping in closure
		* Read more: https://github.com/gruntjs/grunt-contrib-uglify
		*/
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'public/dist/js/<%= pkg.name %>.libs.min.js': ['<%= concat.jslibs.dest %>'],
					'public/dist/js/<%= pkg.name %>.min.js': ['<%= concat.jsdist.dest %>']
        }
      }
    },
		/**
		*	jshint package helps you maintain best practices in your javascript files
		* Read more: https://github.com/gruntjs/grunt-contrib-jshint
		*/
    jshint: {
      files: ['Gruntfile.js', 'public/js/main.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
		/**
		*	compass task handles the compilation of our sass files into css
		* Read more: https://github.com/gruntjs/grunt-contrib-compass
		*/
		compass: {
			dist: {
				options: {
					debugInfo: false,
					noLineComments: true,
					outputStyle: 'nested',
					sassDir: 'public/scss',
					cssDir: 'public/css'
				}
			}
		},
		/**
		*	Watch allows you to watch files for changes and then run a series of grunt tasks on those files
		* Read more: https://github.com/gruntjs/grunt-contrib-watch
		*/
    watch: {
			// this will run anytime our js files change (on save) and reload the page
      js_process: {
				options: {
					livereload: true,
					interrupt: true // if this process is running already when triggered, kill the first and finish this one
				},
				files: ['public/js/*.js'],
      	tasks: ['jshint', 'concat', 'uglify']
			},
			// this will compile our sass down to css when we update the files
			scss_compile: {
				options: {
					livereload: true,
					interrupt: true // if this process is running already when triggered, kill the first and finish this one
				},
				files: ['public/scss/*.scss'],
				tasks: ['compass', 'concat']
			}
    }
  });

	// load all modules our tasks depend on
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

	// register tasks, these can be run by executing 'grunt TASK_NAME' in the root folder
  grunt.registerTask('test', ['jshint']);
	// this will be a continous process
	grunt.registerTask('monitor', ['watch']);
	// if we just want to generate our output files, we can run 'grunt' and the default task will run
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
};