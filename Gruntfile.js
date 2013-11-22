module.exports = function(grunt) {
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  clean: {
    v3: ["./style/v3/css/*","./style/v3/img/*","./style/v3/js/*","./_site"],
    base: [
      "./style/base/font-awesome/less",
      "./style/base/font-awesome/scss",
      "./style/base/font-awesome/src",
      "./style/base/modernizr/test",
      "./style/base/modernizr/media",
      "./style/base/modernizr/feature-detects",
      "./style/base/animate.css/source",
      "./style/base/jQuery-menu-aim/example",
      "./style/base/jQuery-menu-aim/*.png",
      "./style/base/jQuery-menu-aim/README.md",
      "./style/base/jQuery-menu-aim/*.bower.json"
    ],
  },
  // less
  less: {
    v3: {
      files: [
        {
          src: '<%= pkg.pathBuild %>/less/un.less',
          dest: '<%= pkg.pathBuild %>/css/un.css'
        },
        {
          src: '<%= pkg.pathBuild %>/less/ui.less',
          dest: '<%= pkg.pathBuild %>/css/ui.css'
        },
        {
          src: '<%= pkg.pathBuild %>/less/mod.less',
          dest: '<%= pkg.pathBuild %>/css/mod.css'
        }
      ]
    }
  },
  // cssmin
  cssmin: {
    options: {
      //report: 'gzip'
    },
    v3: {
      files: [
        {
          src: '<%= pkg.pathBuild %>/css/un.css',
          dest: '<%= pkg.pathBuild %>/css/un.css'
        },
        {
          src: '<%= pkg.pathBuild %>/css/ui.css',
          dest: '<%= pkg.pathBuild %>/css/ui.css'
        }
      ]
    },
    mod: {
      files: [
        {
          src: '<%= pkg.pathBuild %>/css/mod.css',
          dest: '<%= pkg.pathBuild %>/css/mod.css'
        }
      ]
    }
  },
  // uglify
  uglify: {
    //文件头部输出信息
    options: {
      //report: 'gzip',
      mangle: true, // 改变变量名称
      beautify: {
        //中文ascii化
        ascii_only: true
      }
    },
    //具体任务配置
    v3: {
      files: [
        {
          src: './mod/easydropdown/js/easydropdown.js',
          dest: '<%= pkg.pathBuild %>/js/app.js'
        }
      ]
    }
  },
  // 合并文件
  concat: {
    mod: {
      files: {
        '<%= pkg.pathBuild %>/css/mod.css':[
          './mod/easydropdown/css/easydropdown.css',
        ]
      }
    }
  },
  // imagemin
  imagemin: {
    v2Base: {
      options: {
        optimizationLevel: 3
      },
      files: [
        {
          src: '<%= pkg.pathPage %>/header/img/logo.png',
          dest: './style/v3/img/logo.png'
        },
        {
          src: '<%= pkg.pathPage %>/header/img/logo-us.png',
          dest: './style/v3/img/logo-us.png'
        }
      ]
    }
  },
  //jekyll
  jekyll: {
    dev : {
      src : './',
      dest: './_site/',
      ext: ['.html', '.css', '.js', '.png', '.jpg', '.gif']
    },
    server : {
      src : './',
      dest: './_site',
      server : true,
      server_port : 6800,
      auto : true
    }
  },
  // shell
  shell: {
    jekyllBuild: {
      command: 'jekyll build',
      options: {
        async: false
      }
    },
    base: {
      command: '<%= pkg.rsync %> ./mod/Amble-Light/fonts/* ./style/v3/fonts',
    },
    jekyllSiteStyle: {
      command: 'rsync --progress -a --delete -e "ssh -q" style/ _site/style',
    },
    bootstrapDir: {
      command: 'mkdir -p ./style/base/bootstrap',
    },
    bootstrap: {
      command: '<%= pkg.rsync %> ../bootstrap/dist/* ./style/base/bootstrap',
    },
    v3Svn: {
      command: '<%= pkg.rsync %> ./_site/style/* ~/Sites/hb4/style',
    },
    v3Source: {
      command: '<%= pkg.rsync %> ./_includes/page/* ~/Sites/hb4/app/view/source',
    },
    bower: {
      command: 'bower install',
    }
  },
  // watch
  watch: {
    options: {
      livereload: 6801
    },
    jekyllHtml: {
      files: ['./**/*.html'],
      tasks: ['jekyll:dev', 'shell:v3Source']
    },
    v2StyleJs: {
      files: ['./page/**/*.js', './page/**/*.less', './style/**/*.less'],
      tasks: ['less', 'uglify', 'cssmin', 'shell:jekyllSiteStyle', 'shell:v3Svn']
    },
    v2StyleImg: {
      files: ['./page/**/*.png'],
      tasks: ['imagemin:v2base', 'shell:v2SvnStylev2', 'shell:v3Svn', 'shell:v3Source']
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
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-imagemin');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-html-validation');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-shell-spawn');

// 默认执行的任务
grunt.registerTask('v3', [
  'clean:v3',
  'less',
  'uglify',
  'cssmin',
  'imagemin',
  'shell:jekyllBuild',
  'shell:v3Svn',
  'shell:v3Source',
  'watch'
]);
grunt.registerTask('base', [ 'shell:bower', 'shell:bootstrapDir', 'shell:bootstrap', 'shell:base', 'clean:base', 'shell:jekyllBuild', 'shell:v3Svn', 'shell:v3Source' ]);
grunt.registerTask('test', [ 'imagemin' ]);

};