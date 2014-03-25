module.exports = function(grunt) {
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  clean: {
    temp: ["<%= pkg.build %>/temp"],
  },
  compass: {
    dist: {
      options: {
        sassDir: '<%= pkg.src %>',
        cssDir: '<%= pkg.build %>/css',
        outputStyle: 'compressed'
      }
    }
  },
  less: {
    dist: {
      src: ['<%= pkg.build %>/temp/*.css'],
      dest: '<%= pkg.build %>/css/app.css',
    },
    cssTemp: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= pkg.page %>/',
        src: ['**/*.less'],
        dest: '<%= pkg.build %>/temp/',
        ext: '.css'
      }]
    },
    dynamic: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= pkg.build %>/less/',
        src: ['**/*.less'],
        dest: '<%= pkg.build %>/css/',
        ext: '.css'
      }]
    }
  },
  concat: {
    dist: {
      src: ['<%= pkg.build %>/temp/*.css'],
      dest: '<%= pkg.build %>/css/app.css',
    }
  },
  cssmin: {
    options: {
      report: 'gzip'
    },
    css: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= pkg.build %>/css/',
        src: ['*.css'],
        dest: '<%= pkg.build %>/css/'
      }]
    }
  },
  uglify: {
    options: {
      report: 'gzip',
      mangle: true, // 改变变量名称
      beautify: {
        ascii_only: true
      }
    },
    js: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= pkg.page %>/',
        src: ['**/*.js'],
        dest: '<%= pkg.build %>/temp/',
        ext: '.js'
      }]
    },
    dist: {
      src: ['<%= pkg.build %>/temp/*.js'],
      dest: '<%= pkg.build %>/js/app.js',
    }
  },
  imagemin: {
    dynamic: {
      options: {
        optimizationLevel: 3
      },
      files: [{
        expand: true,
        flatten: true,
        cwd: 'src/',
        src: ['**/*.{png,jpg,gif}'],
        dest: '<%= pkg.build %>/img/'
      }]
    }
  },
  //jekyll
  jekyll: {
    build : {
      src : './',
      dest: './_site/',
      ext: ['.html', '.css', '.js', '.png', '.jpg', '.gif']
    },
    serve : {
      src : './',
      dest: './_site',
      server : true,
      server_port : 4000,
      auto : true
    }
  },
  shell: {
    jekyll: {
      command: 'jekyll build',
      options: {
        async: false
      }
    },
    base: {
      command: 'source ./base.sh',
    },
    site: {
      command: '<%= pkg.rsync %> style/ _site/style',
    }
  },
  browserSync: {
    files: {
      src : [
        '_site/**/css/*.css',
        '_site/**/img/*.png',
        '_site/**/img/*.jpg',
        '_site/**/img/*.gif',
        '_site/**/js/*.js',
        '_site/**/*.html'
      ],
    },
    options: {
      watchTask: true
    }
  },
  watch: {
    options: {
      livereload: 6789
    },
    html: {
      files: ['./*.html', './_includes/**/*.html', './<%= pkg.page %>/**/*.html'],
      tasks: ['jekyll:build']
    },
    css: {
      files: [
        '**/*.sass',
        '**/*.scss'
      ],
      tasks: ['compass']
    },
    less: {
      files: ['./<%= pkg.page %>/**/*.less'],
      tasks: ['less', 'concat', 'clean:temp', 'cssmin', 'shell:site']
    },
    js: {
      files: ['./<%= pkg.page %>/**/*.js'],
      tasks: ['uglify', 'shell:site']
    },
    img: {
      files: ['<%= pkg.src %>/**/*.png', '<%= pkg.src %>/**/*.jpg', '<%= pkg.src %>/**/*.gif', '<%= pkg.page %>/**/*.png', '<%= pkg.page %>/**/*.jpg', '<%= pkg.page %>/**/*.gif'],
      tasks: ['imagemin']
    }
  },
// grunt.initConfig end
});

grunt.event.on('watch', function(action, filepath) {
  grunt.log.writeln(filepath + ' has ' + action);
});

// 加载指定插件任务
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-compass');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-html-validation');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-shell-spawn');
grunt.loadNpmTasks('grunt-browser-sync');

// 默认执行的任务
grunt.registerTask('default', [ 
  'shell:base',
  'compass',
  'less',
  'concat',
  'imagemin',
  'cssmin',
  'uglify',
  'clean:temp',
  'jekyll:build',
  'shell:site',
  'browserSync',
  'watch'
]);

};