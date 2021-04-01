module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    copy: {
      jquery: {
        files: [
          {
            expand: true,
            cwd: "node_modules/jquery/dist/",
            src: ["**/*"],
            dest: "src/lib/jquery/",
          },
        ],
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: "node_modules/bootstrap/dist/js/",
            src: ["**/*"],
            dest: "src/lib/bootstrap/js/",
          },
        ],
      },
      swiper: {
        files: [
          {
            expand: true,
            cwd: "node_modules/swiper/",
            src: [
              "swiper-bundle.js",
              "swiper-bundle.js.map",
              "swiper-bundle.min.js",
              "swiper-bundle.min.js.map",
            ],
            dest: "src/lib/swiper/",
          },
        ],
      },
      moment: {
        files: [
          {
            expand: true,
            cwd: "node_modules/moment/",
            src: ["moment.js"],
            dest: "src/lib/moment/",
          },
        ],
      },
    },
    sass: {
      scss: {
        files: {
          "src/css/main.css": "src/scss/main.scss",
        },
      },
    },
    watch: {
      scss: {
        files: "src/scss/**/*.scss",
        tasks: ["sass"],
      },
    },
    cssmin: {
      options: {
        sourceMap: true,
        rebase: true,
        mergeIntoShorthands: false,
        roundingPrecision: -1,
        level: { 1: { specialComments: 0 } },
      },
      target: {
        files: {
          "src/css/main.min.css": ["src/css/main.css"],
        },
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["src/css/*.css", "src/**/*.html"],
        },
        options: {
          watchTask: true,
          server: "./src",
        },
      },
    },
    uglify: {
      options: {
        mangle: true,
        compress: false,
      },
      jsCore: {
        files: {
          "src/js/scripts.min.js": [
            "src/lib/jquery/jquery.js",
            "src/lib/bootstrap/js/bootstrap.bundle.js",
            "src/js/site.js",
          ],
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");

  grunt.registerTask("min", ["sass", "cssmin", "uglify"]);
  grunt.registerTask("default", ["browserSync", "sass", "watch"]);
};
