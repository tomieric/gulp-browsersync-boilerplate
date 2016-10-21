/**
 * by tommyshao
 */

'use strict'

var gulp   = require('gulp')
var config = require('../../config.json')
//var pkg    = require('../../package.json')
//var path   = require('path')
//var fs     = require('fs')
var $      = require('gulp-load-plugins')()

// http server
var browserSync = require('browser-sync').create()
var reload      = browserSync.reload

// http proxy
// 开启代理
// var httpProxy = require('http-proxy-middleware')

var Lib = require('../lib')
var del = require('rimraf')

module.exports = function defaultTask() {
    // 清除旧编译的模板文件
    gulp.task('template:clean', function(cb) {
        return del(config.destPath, cb)
    })

    // 模板编译
    gulp.task('template', function() {
        return gulp.src([config.template+'/**/**.html', '!'+config.template+'/**/_**.html', '!'+config.template+'/_**/**.html'])
                    .pipe($.ejs({ config: config}))
                    .pipe($.prettify({ 'indent_size': 2}))
                    .pipe($.plumber({ errorHandler: $.notify.onError('错误: <%= error.message%>')}))
                    .pipe(gulp.dest(config.destPath))
                    .pipe(reload({ stream: true }))
    })

    // less 编译
    gulp.task('less', function() {
        return gulp.src([config.staticPath+'/less/**/**.less', '!'+ config.staticPath+'/less/**/_**.less', '!'+ config.staticPath+'/less/_**/**.less'])
                .pipe($.sourcemaps.init())
                .pipe($.plumber({ errorHandler: $.notify.onError('错误: <%= error.message %>')}))
                .pipe($.less())
                .pipe($.autoprefixer('last 2 version', 'not ie <= 8'))
                .pipe($.sourcemaps.write('./maps'))
                .pipe(gulp.dest(config.staticPath+'/css'))
                .pipe(reload({ stream: true }))
    })

    // 启动服务
    gulp.task('server', function() {
        // 声明代理
        /*var jsonProxy = httpProxy('/api/', {
            target: 'http://xxx.xxx.xxx.xxx:2016',
            changeOrigin: true,
            pathRewrite: {
                '/api': ''
            },
            logLevel: 'debug'
        })*/

        browserSync.init({
            // 界面管理工具
          ui: {
              port: 8080,
              weinre: { // weinre工具移动设备代理端口
                  port: 9090
              }
          },
          server: {
              // 目录都作为根目录访问
              baseDir: ['./'+ config.destPath, './static'],
              directory: true,
              routes: {
                  '/bower_components': './bower_components'
              }
          },
          host: Lib.getIPAddress(),
          port: config.port,
          // 使用浏览器打开
          // 可以自定义配置
          //   browser: ['chrome', 'firefox', 'Internet Explore']
          // 只启动 chrome 开发
          browser: ['google chrome','chrome'],
          // 管理代理
         // middleware: [jsonProxy]
        })
    })

    // 监听及时刷新
    gulp.task('watch', function() {
        gulp.watch(config.template + '/**/**.html', ['template'])
        gulp.watch(config.staticPath + '/less/**/**', ['less'])
        gulp.watch(config.staticPath + '/js/**/**').on('change', reload)
        gulp.watch(config.staticPath + '/images/**/**').on('change', reload)
    })

    /**
   * 默认任务
   * template, less, watch
   */
  gulp.task('default', function(cb){
      $.sequence('template:clean', ['template', 'less'], 'server', 'watch')(cb)
  })
}