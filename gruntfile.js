/*jslint node: true */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: false,
                    includePaths: ['node_modules/foundation-sites/scss'],
                },
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        }, // sass

        watch: {
            options: {
                livereload: true,
                dateFormat: function(time) {
                        grunt.log.writeln('The watch finished in ' + time + 'ms at ' + (new Date()).toString());
                        grunt.log.writeln('Waiting for more changes...');
                    } //date format function
            }, //options
            scripts: {
                files: ['*.js', 'js/*.js']
            }, // scripts
            //Live Reload of SASS
            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }, //sass
            css: {
                files: ['scss/*.scss'],
                tasks: []
            },
            html: {
                files: ['*.html']
            }, //html
            all: {
                files: '{,**/}*.js',
                tasks: ['jshint']
            } //all
        }, //watch

        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    })
                ]
            }
        }, //post css

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            target: ['*.js', 'js/*.js'],
            all: ['*.js', 'js/*.js']
        } //jshint
    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['sass', 'openport:watch.options.livereload:35729', 'watch', 'force:jshint']);
};
