module.exports = function (grunt) {

    grunt.initConfig({
        // Import package manifest
        pkg: grunt.file.readJSON("package.json"),
        // Banner definitions
        meta: {
            banner: "/*\n" +
                    " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                    " *  <%= pkg.description %>\n" +
                    " *  <%= pkg.homepage %>\n" +
                    " *\n" +
                    " *  Made by <%= pkg.author.name %>\n" +
                    " *  Under <%= pkg.license %> License\n" +
                    " */\n"
        },
        // Concat definitions
        concat: {
            options: {
                banner: "<%= meta.banner %>"
            },
            dist: {
                src: ["src/jquery.griddle.js"],
                dest: "dist/jquery.griddle.js"
            }
        },
        // Minify definitions
        uglify: {
            dist: {
                src: ["dist/jquery.griddle.js"],
                dest: "dist/jquery.griddle.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },
        // CoffeeScript compilation
        coffee: {
            compile: {
                files: {
                    "dist/jquery.griddle.js": "src/jquery.griddle.coffee"
                }
            }
        },
        // watch for changes to source
        // Better than calling grunt a million times
        // (call 'grunt watch')
        watch: {
            files: ["src/*"],
            tasks: ["default"]
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-coffee");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("build", ["concat", "uglify"]);
    grunt.registerTask("default", ["build"]);
};
