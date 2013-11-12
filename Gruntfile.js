module.exports = function(grunt) {
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  clean: {
    v2: ["./style/*","./_site"],
    flow: ["<%= pkg.pathBuildFlow %>/*"]
  },
  // less
  less: {
    v2: {
      files: [
        // page header
        {
          src: '<%= pkg.pathPage %>/common/less/common.less',
          dest: '<%= pkg.pathPage %>/common/css/common.css'
        },
        // page header
        {
          src: '<%= pkg.pathPage %>/header/less/header.less',
          dest: '<%= pkg.pathPage %>/header/css/header.css'
        },
        // page footer
        {
          src: '<%= pkg.pathPage %>/footer/less/footer.less',
          dest: '<%= pkg.pathPage %>/footer/css/footer.css'
        },
        // page index
        {
          src: '<%= pkg.pathPage %>/index/less/index.less',
          dest: '<%= pkg.pathPage %>/index/css/index.css'
        },
        // page item
        {
          src: '<%= pkg.pathPage %>/item/less/item.less',
          dest: '<%= pkg.pathPage %>/item/css/item.css'
        },
        // page login
        {
          src: '<%= pkg.pathPage %>/login/less/login.less',
          dest: '<%= pkg.pathPage %>/login/css/login.css'
        },
        // page node
        {
          src: '<%= pkg.pathPage %>/node/less/node.less',
          dest: '<%= pkg.pathPage %>/node/css/node.css'
        },
        // page page
        {
          src: '<%= pkg.pathPage %>/page/less/page.less',
          dest: '<%= pkg.pathPage %>/page/css/page.css'
        },
        {
          src: './src/ui/ui.less',
          dest: '<%= pkg.pathBuildV2 %>/css/ui.css'
        }
      ]
    },
    // flow css
    flow: {
      files: [
        // breadcrumb
        {
          src: '<%= pkg.pathPage %>/flow/less/flow.less',
          dest: '<%= pkg.pathBuildFlow %>/css/flow.css'
        }
      ]
    }
  },
  // cssmin
  cssmin: {
    options: {
      //report: 'gzip'
    },
    v2: {
      files: [
        // ug
        {
          src: '<%= pkg.pathBuildV2 %>/css/ug.css',
          dest: '<%= pkg.pathBuildV2 %>/css/ug.css'
        },
        {
          src: '<%= pkg.pathBuildV2 %>/css/ui.css',
          dest: '<%= pkg.pathBuildV2 %>/css/ui.css'
        }
      ]
    },
    flow: {
      files: [
        // page header
        {
          src: '<%= pkg.pathBuildFlow %>/css/flow.css',
          dest: '<%= pkg.pathBuildFlow %>/css/flow.css'
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
    v2: {
      files: [
        // page nav
        {
          src: '<%= pkg.pathPage %>/header/js/ug.js',
          dest: '<%= pkg.pathBuildV2 %>/js/ug.js'
        },
        // page nav
        {
          src: '<%= pkg.pathPage %>/header/js/jquery.menu-aim.js',
          dest: '<%= pkg.pathBuildV2 %>/js/plugin.js'
        },
        // page qty
        {
          src: '<%= pkg.pathPage %>/item/js/qty.js',
          dest: '<%= pkg.pathBuildV2 %>/js/qty.js'
        }
      ]
    }
  },
  // 合并文件
  concat: {
    v2: {
      files: {
        '<%= pkg.pathBuildV2 %>/css/ug.css':[
          '<%= pkg.pathPage %>/common/css/common.css',
          '<%= pkg.pathPage %>/header/css/header.css',
          '<%= pkg.pathPage %>/footer/css/footer.css',
          '<%= pkg.pathPage %>/index/css/index.css',
          '<%= pkg.pathPage %>/item/css/item.css',
          '<%= pkg.pathPage %>/logincss/login.css',
          '<%= pkg.pathPage %>/node/css/node.css',
          '<%= pkg.pathPage %>/page/css/page.css'
        ],
        '<%= pkg.pathBuildV2 %>/js/app.js': [
          '<%= pkg.pathBuildV2 %>/js/ug.js',
          '<%= pkg.pathBuildV2 %>/js/qty.js'
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
          dest: '<%= pkg.pathBuildV2 %>/img/logo.png'
        },
        {
          src: '<%= pkg.pathPage %>/header/img/logo-us.png',
          dest: '<%= pkg.pathBuildV2 %>/img/logo-us.png'
        },
        {
          src: '<%= pkg.pathPage %>/header/img/search-icon.png',
          dest: '<%= pkg.pathBuildV2 %>/img/search-icon.png'
        },
        // page item
        {
          src: '<%= pkg.pathPage %>/item/img/addToCart144x34.png',
          dest: '<%= pkg.pathBuildV2 %>/img/addToCart144x34.png'
        },
        {
          src: '<%= pkg.pathPage %>/item/img/btnBlue163x27.png',
          dest: '<%= pkg.pathBuildV2 %>/img/btnBlue163x27.png'
        },
        // page node
        {
          src: '<%= pkg.pathPage %>/node/img/targ.png',
          dest: '<%= pkg.pathBuildV2 %>/img/targ.png'
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
    baseOo: {
      command: '<%= pkg.rsync %> <%= pkg.pathOo %>/style/base/* style/base/',
    },
    jekyllSiteStyle: {
      command: 'rsync --progress -a --delete -e "ssh -q" style/ _site/style',
    },
    v2SvnStyleBase: {
      command: '<%= pkg.rsync %> style/base ~/Sites/svn/hb3/front/public/style',
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
grunt.registerTask('v2', [
  //'clean:v2',
  //'shell:baseOo',
  'less:v2',
  'uglify:v2',
  'concat:v2',
  'cssmin:v2',
  'imagemin:v2Base',
  'shell:jekyllBuild',
  //'shell:v2SvnStylev2',
  //'shell:v2SvnStyleBase',
  'connect:v2',
  'watch'
]);
grunt.registerTask('flow', [ 'clean:flow', 'less:flow', 'cssmin:flow' ]);
grunt.registerTask('test', [ 'concat:v2' ]);

};