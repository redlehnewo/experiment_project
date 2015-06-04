module.exports = function(grunt) {
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        clean: {
            options: { force:true },
            src : ['./ROOT']
        },

        concat: {
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/angular/angular.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.js',
                    'bower_components/d3/d3.js',
                    'bower_components/sugar/release/sugar-full.development.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular-bootstrap/ui-bootstrap-tpls.js ',
                    'bower_components/vis/dist/vis.js',
                    'bower_components/cytoscape/dist/cytoscape.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    'bower_components/angular-resource/angular-resource.js'
                ],
                dest: 'js/build/vendor.js'
            },
            client: {
                src: [
                    'js/config.js',
                    'js/app.js',
                    'js/directives.js',
                    'js/filters.js',
                    'js/services/*.js',
                    'components/**/*.js',
                    '!**/*.spec.js'
                ],
                dest: 'js/build/client.js'
            }
        },

        connect: {
            server: {
                options: {
                    livereload: false
                }
            }
        },

        copy: {
            index: {
                options: {
                    process: function (content, srcpath) {
                        var content = content.replace("js/build/vendor.js", "js/build/vendor.min.js");
                        content = content.replace("js/build/client.js", "js/build/client.min.js");
                        return content;
                    }
                },
                files: [
                    {
                        expand: true,
                        cwd: "./",
                        src: ["index.html"],
                        dest: "./ROOT/"
                    }
                ]
            },
            build: {
                files: [
                    {
                        expand: true,
                        cwd: "components/",
                        src: ["**/*.html"],
                        dest: "./ROOT/components/"
                    },
                    {
                        expand: true,
                        cwd: "css/",
                        src: ["*.css", "*.map", "*.png"],
                        dest: "./ROOT/css/"
                    },
                    {
                        expand: true,
                        cwd: "images/",
                        src: ["*.*"],
                        dest: "./ROOT/images/"
                    },
                    {
                        expand: true,
                        cwd: "fonts/",
                        src: ["*.*"],
                        dest: "./ROOT/fonts/"
                    },
                    {
                        expand: true,
                        cwd: "js/build/",
                        src: ["*.min.js"],
                        dest: "./ROOT/js/build/"
                    }
                ]
            }
        },

        // Compiles LESS to CSS
        less: {
            dev: {
                files: {
                    'css/app.css' : 'less/main.less'
                }
            }
        },

        ngconstant: {
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'myapp.config'
            },
            // Environment targets
            local: {
                options: {
                    dest: 'js/config.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndpoint: '//localhost:8080/api/v1/',
                        aaaBaseURl : '//aaa-dev.truste-svc.net/',
                        aaaProviderPath : "aaa-js/js/provider.js",
                        aaaSignoutPath : "logout",
                        bypassAuth : 'true'
                    }
                }
            },
            dev: {
                options: {
                    dest: 'js/config.js'
                },
                constants: {
                    ENV: {
                        name: 'gdadevelopment',
                        apiEndpoint: '//gda-dev.truste-svc.net/gda/v1/',
                        aaaBaseURl : '//aaa-dev.truste-svc.net/',
                        aaaProviderPath : "aaa-js/js/provider.js",
                        aaaSignoutPath : "logout",
                        bypassAuth : 'true'
                    }
                }
            },
            qa: {
                options: {
                    dest: 'js/config.js'
                },
                constants: {
                    ENV: {
                        name: 'qa',
                        apiEndpoint: '//gda-qa.truste-svc.net/gda/v1/',
                        aaaBaseURl : '//aaa-qa.truste-svc.net/',
                        aaaProviderPath : "aaa-js/js/provider.js",
                        aaaSignoutPath : "logout",
                        bypassAuth : 'true'
                    }
                }
            },
            prod: {
                options: {
                    dest: 'js/config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndpoint: '//assess.truste.com/gda/v1/',
                        aaaBaseURl : '//login.truste.com/',
                        aaaProviderPath : "aaa-js/js/provider.js",
                        aaaSignoutPath : "logout",
                        bypassAuth : 'true'
                    }
                }
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            clientJS: {
                src: 'js/build/client.js',
                dest: 'js/build/client.min.js'
            },
            vendorJS: {
                src: 'js/build/vendor.js',
                dest: 'js/build/vendor.min.js'
            }
        },

        watch: {
            vendorJSChange: {
                files: [ 'bower_components/**/*.js'],
                tasks: ['concat:vendor'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            clientJSChange: {
                files: [
                    'js/config.js',
                    'js/app.js',
                    'js/directives.js',
                    'js/filters.js',
                    'js/services/*.js',
                    'components/**/*.js',
                    '!**/*.spec.js'
                ],
                tasks: ['concat:client'],
                options: {
                    spawn: false,
                    interrupt: true
                }
            },
            lessChange: {
                files: ['less/{,*/}*.less'],
                tasks: ['less']
            }
        }
    });

    // loading all 'grunt-*' tasks and dev dependencies
    require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

    grunt.registerTask('compile', [
        'auto_install',
        'ngconstant:local',
        'concat',
        'bower_concat'
    ]);

    grunt.registerTask("build", function(env) {
        if (env == null) {
            grunt.warn('environment must be specified like build:qa or build:prod');
        }
        else {
            grunt.task.run(
                'auto_install',
                'less',
                    'ngconstant:' + env,
                'concat',
                'bower_concat',
                'ngAnnotate',
                'uglify',
                'clean',
                'copy',
                'hashres'
            );
        }
    });

    grunt.registerTask('test', ['karma']);

    grunt.registerTask("default", ["less", "ngconstant:local", "concat", "connect:server", "watch"]);
}