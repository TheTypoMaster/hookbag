module.exports = function(grunt) {
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  clean: {
    v3: ["./style/*","./_site"],
  },
  // less
  less: {
    v3: {
      files: [
        {
          src: '<%= pkg.pathPage %>/common/less/common.less',
          dest: '<%= pkg.pathPage %>/common/css/common.css'
        },
        {
          src: '<%= pkg.pathPage %>/header/less/header.less',
          dest: '<%= pkg.pathPage %>/header/css/header.css'
        },
        {
          src: '<%= pkg.pathPage %>/footer/less/footer.less',
          dest: '<%= pkg.pathPage %>/footer/css/footer.css'
        },
        {
          src: '<%= pkg.pathPage %>/index/less/index.less',
          dest: '<%= pkg.pathPage %>/index/css/index.css'
        },
        {
          src: '<%= pkg.pathPage %>/item/less/item.less',
          dest: '<%= pkg.pathPage %>/item/css/item.css'
        },
        {
          src: '<%= pkg.pathPage %>/node/less/node.less',
          dest: '<%= pkg.pathPage %>/node/css/node.css'
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
        }
      ]
    },
    block: {
      files: [
        {
          src: '<%= pkg.pathBuild %>/css/block.css',
          dest: '<%= pkg.pathBuild %>/css/block.css'
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
          src: './block/easydropdown/js/easydropdown.js',
          dest: '<%= pkg.pathBuild %>/js/app.js'
        }
      ]
    }
  },
  // 合并文件
  concat: {
    v3: {
      files: {
        '<%= pkg.pathBuild %>/css/un.css':[
          '<%= pkg.pathPage %>/common/css/common.css',
          '<%= pkg.pathPage %>/header/css/header.css',
          '<%= pkg.pathPage %>/footer/css/footer.css',
          '<%= pkg.pathPage %>/index/css/index.css',
          '<%= pkg.pathPage %>/item/css/item.css',
          '<%= pkg.pathPage %>/node/css/node.css',
        ]
      }
    },
    block: {
      files: {
        '<%= pkg.pathBuild %>/css/block.css':[
          './block/easydropdown/css/easydropdown.css',
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
        // page header
        {
          src: '<%= pkg.pathPage %>/header/img/logo.png',
          dest: '<%= pkg.pathBuild %>/img/logo.png'
        }
      ]
    }
  },
  //jekyll
  jekyll: {
    dev : {
      src : './',
      dest: './_site/',
      ext: ['.html', '.css', '.png', '.jpg', '.gif']
    },
    server : {
      src : './',
      dest: './_site',
      server : true,
      server_port : 6800,
      auto : true
    }
  },
  //connect
  connect: {
    v2: {
      options: {
        port: 7500,
        base: './_site'
      }
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
      command: '<%= pkg.rsync %> ./block/Amble-Light/fonts/* ./style/v3/fonts',
    },
    jekyllSiteStyle: {
      command: 'rsync --progress -a --delete -e "ssh -q" style/ _site/style',
    },
    bootstrap: {
      command: '<%= pkg.rsync %> ../bootstrap/dist/* ./style/base',
    },
    v2SvnStylev2: {
      command: '<%= pkg.rsync %> style/v2 ~/Sites/svn/hb3/front/public/style',
    }
  },
  // watch
  watch: {
    options: {
      livereload: 6801
    },
    jekyllHtml: {
      files: ['./**/*.html'],
      tasks: ['jekyll:dev']
    },
    v2StyleJs: {
      files: ['./page/**/*.js', './page/**/*.less'],
      tasks: ['less:v2', 'uglify:v2', 'concat:v2', 'cssmin:v2', 'shell:v2SvnStylev2']
    },
    v2StyleImg: {
      files: ['./page/**/*.png'],
      tasks: ['imagemin:v2base', 'shell:v2SvnStylev2']
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
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-jekyll');
grunt.loadNpmTasks('grunt-html-validation');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-shell-spawn');

// 默认执行的任务
grunt.registerTask('v3', [
  'clean',
  //'shell:baseOo',
  'shell:bootstrap',
  'less',
  'uglify',
  'concat',
  'cssmin',
  //'imagemin:v2Base',
  'shell:jekyllBuild',
  'shell:base',
  //'shell:v2SvnStylev2',
  //'shell:v2SvnStyleBase',
  'connect',
  'watch'
]);
grunt.registerTask('flow', [ 'clean:flow', 'less:flow', 'cssmin:flow' ]);
grunt.registerTask('test', [ 'concat:v2' ]);

};