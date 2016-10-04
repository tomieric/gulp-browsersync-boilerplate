/**
 * 构建发布任务
 * 
 * by tommyshao
 */

var fs     = require('fs')
var path   = require('path')
var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var config = require('../../config.json')
var pkg    = require('../../package.json')
var Lib    = require('../lib')
var del    = require('rimraf')

var browserSync = require('browser-sync').create()
var reload      = browserSync.reload
var httpProxy   = require('http-proxy-middleware')

module.exports = function buildTask() {
    // 临时文件夹
    var tempFolder = './tmp'

    gulp.task('build:template', function() {
        return gulp.src(['./'+ config.destPath + '/**/**.html'])
                    .pipe($.prettify({ indent_size: 2 }))
                    .pipe($.replace(/\/static/g, './static'))
                    .pipe($.replace(/"(js|css|images|fonts)(\/)/g, '"./static/$1/'))
                    .pipe($.replace(/'(js|css|images|fonts)(\/)/g, '\'./static/$1/'))
                    .pipe($.replace(/(\/)(bower_components)\//g, './static/js/$2/'))
                    .pipe(gulp.dest(tempFolder))
    })

    gulp.task('build:copy', function() {
        return gulp.src([config.staticPath + '/iconfont/**/**'], {base: 'client'})
                    .pipe(gulp.dest(tempFolder + config.static))
    })

    gulp.task('build:css', function() {
        return gulp.src([config.staticPath+'/css/**/**.css'], {base: 'client'})
          .pipe($.plumber( { errorHandler: $.notify.onError('错误: <%= error.message %>') } ))
          .pipe($.cleanCss({compatibility: 'ie8'}))
          .pipe($.header(Lib.banner, { pkg: pkg}))
          .pipe(gulp.dest(tempFolder + config.static))
          .pipe($.size({showFiles: true, title: 'minified'}))
          .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}))
    })

    gulp.task('build:js:copy', function() {
        return gulp.src([config.staticPath+'/js/**/**', !config.staticPath+'/js/**/**.js'], {base: 'client'})
            .pipe(gulp.dest(tempFolder + config.static))
    })

    gulp.task('build:js', function(){
      return gulp.src([config.staticPath+'/js/**/**.js'], {base: 'client'})
            .pipe($.plumber( { errorHandler: $.notify.onError('错误: <%= error.message %>') } ))
            .pipe($.replace(/(\/)(bower_components)(\/)/g, '$2$3'))
            .pipe($.uglify({mangle: false}))
            .pipe($.header(Lib.banner, { pkg: pkg}))
            .pipe(gulp.dest(tempFolder + config.static))
            .pipe($.size({showFiles: true, title: 'minified'}))
            .pipe($.size({showFiles: true, gzip: true, title: 'gzipped'}))
  })

  gulp.task('build:bower', function() {
      return gulp.src(config.bower_components.slice(1)+'/**/**')
                .pipe(gulp.dest(tempFolder + config.static + '/js' + config.bower_components))
  })

  gulp.task('build:images', function(){
      return gulp.src([config.staticPath+'/images/**/**', '!'+ config.staticPath+'/images/sprite/**/**'])
          .pipe($.plumber( { errorHandler: $.notify.onError('错误: <%= error.message %>') } ))
        //   .pipe($.imagemin({
        //              optimizationLevel: 5,
        //              progressive: true,
        //              svgoPlugins: [{removeViewBox: false}]
        //          })
        //   )
          .pipe(gulp.dest(tempFolder + config.static+'/images'))
  })

  gulp.task('build:images:sprite', function(){
      return gulp.src([config.staticPath+'/images/sprite/*.png'])
          .pipe($.plumber( { errorHandler: $.notify.onError('错误: <%= error.message %>') } ))
        //   .pipe($.imagemin({
        //              optimizationLevel: 5,
        //              progressive: true,
        //              svgoPlugins: [{removeViewBox: false}]
        //          })
        //   )
          .pipe(gulp.dest(tempFolder + config.static+'/images/sprite'))
  })


  gulp.task('bundle', function() {
    return gulp.src(tempFolder+'/**/**')
              .pipe(gulp.dest(config.bundlePath))
  })

  gulp.task('build:server', function(cb){
      // 启用代理，将 js 中的 ajax 路径代理到 mock 服务器
      // 代理所有以`/api/`开头的请求
      var jsonProxy = httpProxy('/api/', {
          target: 'http://xxx.xxx.xxx.xxx:81',  // mock 服务器
          changeOrigin: true,
          pathRewrite: {
              '/api': ''
          },
          logLevel: 'debug'
      })

     browserSync.init({
          // 界面管理工具
          ui: {
              port: 8082,
              weinre: { // weinre工具移动设备代理端口
                  port: 9092
              }
          },
          server: {
              // 目录都作为根目录访问
              baseDir: config.bundlePath,
              directory: true
          },
          host: Lib.getIPAddress(),
          port: config.bundlePort,
          // 使用浏览器打开
          // 可以自定义配置
        //   browser: ['chrome', 'firefox', 'Internet Explore']
          // 只启动 chrome 开发
          browser: ['google chrome', 'chrome'],
          // 管理代理
          //middleware: [jsonProxy]
      })

      cb()
  })

  // 清除生成目录
  gulp.task('clean:dist', function(cb) {
      del(config.bundlePath, cb)
  })

  // 清除临时文件
  gulp.task('clean:tmp', function(cb) {
      // 删除临时文件夹
      del(tempFolder, cb)
  })

  gulp.task('build', function(cb){
      $.sequence(
          'template:clean',
          'template',
          'build:js:copy',
          [ 'build:copy', 'build:css', 'build:js', 'build:images','build:images:sprite', 'build:bower', 'build:template'], // 先构建，生成到临时文件夹 temp
          'clean:dist',  // 清除之前发布内容
          'bundle',      // 拷贝temp 内容到发布目录
          'build:server',   // 启动服务人工检查对比页面
          'clean:tmp'    // 清除临时文件夹
      )(cb)
  })


  // 使用 zip 生成压缩包文件
  gulp.task('build:zip', ['build'], function() {
    return gulp.src(config.bundlePath+'/**/**')
            .pipe($.zip(pkg.name+'.zip'))
            .pipe(gulp.dest('./'))
  })

}
