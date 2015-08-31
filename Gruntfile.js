//Gruntfile
module.exports = function (grunt) {

    //Initializing the configuration object
    grunt.initConfig({
        less: {
            development: {
                options: {
                    sourceMap: true,
                    sourceMapRootpath: '../',
                    sourceMapURL: 'w.css.map',
                    compress: false,
                },
                files: {
                    './w/w.css': './less/style.less'
                }
            },
            production: {
                options: {
                    sourceMap: false,
                    compress: true,

                },
                files: {
                    './w/w.min.css': './less/style.less'
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './w/w.min.css': ['./w/w.min.css']
                }
            }
        },
        concat: {
            options: {
                separator: ';\n',
            },
            dist: {
                src: [
                    './bower_components/jquery/dist/jquery.min.js',
                    './bower_components/fancyBox/source/jquery.fancybox.pack.js',
                    './bower_components/bootstrap/dist/js/bootstrap.min.js',
                    './bower_components/masonry/dist/masonry.pkgd.min.js',
                    './bower_components/angular/angular.min.js',
                    './bower_components/ui-router/release/angular-ui-router.min.js',
                    './bower_components/angular-bootstrap/ui-bootstrap.min.js',
                    './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
                     './bower_components/ngDialog/js/ngDialog.min.js',
                    './bower_components/angular-sanitize/angular-sanitize.min.js',
                    './bower_components/angular-base64/angular-base64.min.js',
                    './js/app.js',
                    './js/controllers.js',
                    './js/templateservice.js',
                    './js/navigation.js',
                    './js/jstorage.js'
                ],
                dest: './w/w.js',

            }
        },
        uglify: {
            options: {
                mangle: false, // Use if you want the names of your functions and variables unchanged
                compress: {
                    drop_console: true
                }
            },
            frontend: {
                files: {
                    './w/w.min.js': ['./w/w.js', './w/template/*.js']
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: true,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './w/w.min.css': ['./w/w.css']
                }
            }
        },
        compress: {
            zip: {
                options: {
                    archive: 'production.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'production/',
                        src: ['**'],
                        dest: './'
                    }
                    ]
            },
            css: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: './w',
                src: ['w.min.css'],
                dest: './production/p',
                ext: '.gz.css'
            },
            js: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: './w',
                src: ['w.min.js', ],
                dest: './production/p',
                ext: '.gz.js'
            },
            indexhtml: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: './w',
                src: ['index.html', ],
                dest: './production/',
                ext: '.gz.html'
            }
        },
        imagemin: { // Task

            dynamic: { // Another target

                options: { // Target options
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: './img/', // Src matches are relative to this path
                    src: ['**/*.{png,jpg}'], // Actual patterns to match
                    dest: './img2/' // Destination path prefix
                }]
            },

        },
        ngtemplates: {
            templateviews: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives! 
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return "firstapp.run(['$templateCache', function($templateCache) {" + script + "}]);";
                    }
                },
                src: 'views/**.html',
                dest: './w/template/views.js',
            },
            templatecontent: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives! 
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return "firstapp.run(['$templateCache', function($templateCache) {" + script + "}]);";
                    }
                },
                src: 'views/content/**.html',
                dest: './w/template/content.js',
            },
            templatedirective: {
                options: {
                    htmlmin: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true, // Only if you don't use comment directives! 
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true
                    },
                    bootstrap: function (module, script) {
                        return "firstapp.run(['$templateCache', function($templateCache) {" + script + "}]);";
                    }
                },
                src: 'views/directive/**.html',
                dest: './w/template/directive.js',
            }
        },
        copy: {
            main: {
                files: [

      // includes files within path and its sub-directories
                    {
                        expand: true,
                        src: ['img/**'],
                        dest: 'production/'
                    },
                    {
                        expand: true,
                        src: ['fonts/**'],
                        dest: 'production/'
                    },

    ],
            },
        },
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files
                    './w/index.html': './indexproduction.html',
                }
            },
        },
        watch: {
            styles: {
                files: ['less/*.less'], // which files to watch
                tasks: ['less:development'],
                options: {
                    nospawn: true
                }
            },
            js: {
                files: ['js/*.js'], // which files to watch
                tasks: ['concat'],
                options: {
                    nospawn: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.registerTask('default', ['less:development','concat','watch']);
    grunt.registerTask('production', ['copy', 'htmlmin', 'less:production', 'cssmin', 'ngtemplates', 'concat', 'uglify', 'compress:css', 'compress:js','compress:indexhtml', 'compress:zip']);
};