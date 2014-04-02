module.exports = function(grunt) {
grunt.initConfig({
  path:{
    dist:'./dist',
    temp:'./_temp',
    fonts:'./fonts',
    scss:'./sass',
    sass:'./sass',
    less:'./less',
    css:'./css',
    js:'./js',
    img:'./img'
  },
  pkg: grunt.file.readJSON('package.json'),
  clean: {
    temp: ["<%= path.temp %>/"],
    dist: ["<%= path.dist %>/"]
  },
  less: {
    css: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= path.less %>/',
        src: ['*.less', '!config.less'],
        dest: '<%= path.temp %>/css/',
        ext: '.css'
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
        cwd: '<%= path.js %>/',
        src: ['*.js'],
        dest: '<%= path.temp %>/js/',
        ext: '.js'
      }]
    }
  },
  cssmin: {
    options: {
      report: 'gzip',
      compatibility: 'ie8',
      keepSpecialComments: '*',
      noAdvanced: true
    },
    css: {
      files: [{
        expand: true,
        flatten: true,
        cwd: '<%= path.temp %>/css/',
        src: ['*.css'],
        dest: '<%= path.temp %>/css/'
      }]
    }
  },
  concat: {
    css: {
      src: ['<%= path.temp %>/css/*.css'],
      dest: '<%= path.dist %>/css/app.css',
    },
    js: {
      src: ['<%= path.temp %>/js/*.js'],
      dest: '<%= path.dist %>/js/app.js',
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
        cwd: '<%= path.img %>/',
        src: ['**/*.{png,jpg,gif}'],
        dest: '<%= path.dist %>/img/'
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
    siteStyle: {
      command: '<%= pkg.rsync %> style/ _site/style',
    },
    svn: {
      command: [
        '<%= pkg.rsync %> ./_site/style/* ~/SVN/hb4/style',
        '<%= pkg.rsync %> ./_includes/page/* ~/SVN/hb4/app/view/source'
      ].join('&')
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
    sass: {
      files: ['<%= path.sass %>/*.sass','<%= path.sass %>/*.scss'],
      tasks: ['sass']
    },
    less: {
      files: ['<%= path.less %>/*.less'],
      tasks: ['less', 'concat:css', 'cssmin', 'shell:siteStyle']
    },
    js: {
      files: ['<%= path.js %>/*.js'],
      tasks: ['uglify', 'concat:js', 'shell:siteStyle']
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
grunt.loadNpmTasks('grunt-shell-spawn');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-html-validation');
grunt.loadNpmTasks('grunt-contrib-csslint');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-browser-sync');

// 默认执行的任务
grunt.registerTask('default', [ 
  'clean',
  'shell:base',
  'less',
  'uglify',
  'cssmin',
  'concat',
  'imagemin',
  'jekyll:build',
  'shell:siteStyle',
  'browserSync',
  'watch'
]);

};