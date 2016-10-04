#!/usr/bin/env node 

/**
 * 基于gulp构建前端环境模板
 * 
 * by tommyshao <tomieric@gmail.com>
 * http://github.com/tomieric
 */

var config = require('./config.json')
var pkg    = require('./package.json')
var gulp   = require('gulp')
var path   = require('path')
var fs     = require('fs')
var $      = require('gulp-load-plugins')()
// var Lib    = require('./gulp/lib')

// 服务启动根目录
var serverRoot = __dirname


/*-------------
*  默认任务
-------------*/
require('./gulp/task/defaultTask')(serverRoot);

/*---------------
*  合并 sprite 任务
------------- */
require('./gulp/task/spriteTask')()


/*-------------
*  build任务
-------------*/
require('./gulp/task/buildTask')();