/*--- 公用函数 ---*/
var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var pkg    = require('../../package.json')

// 静态文件头部注释banner
var banner = [
  '/*! <%= pkg.name %> v<%= pkg.version %>',
  '*  by <%= pkg.author %>',
  '*  (c) 2014-'+ $.util.date(Date.now(), 'UTC:yyyy') + ' tommyshao',
  '* updated on '+ $.util.date(Date.now(), 'UTC:yyyy-mm-dd'),
  '*  Licensed under <%= pkg.license %>',
  '*/',
  ' '
].join('\n');

module.exports = banner;