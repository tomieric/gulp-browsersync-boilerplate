/**
 * 工具类
 */

var fs   = require('fs')
var path = require('path')

var folder = __dirname
var exports = {}
var prop = '';

fs.readdirSync(folder).filter(function(file) {
  var isFile = fs.statSync(path.join(folder, file)).isFile();
  if(isFile && !/index\.js/.test(file)) {
    prop = file.split('.')[0];
    exports[prop] = require('./'+ file)
  }
})

module.exports = exports