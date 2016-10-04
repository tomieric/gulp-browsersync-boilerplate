/**
 * sprite 精灵图合并任务
 * 自动合并生成精灵图
 * 按sprite-*命名文件夹各自合并成一张图片和 less 文件
 * 注意：图片命名为 css 样式类名，不要重复
 * 
 * by tommyshao
 */

var fs     = require('fs')
var path   = require('path')
var gulp   = require('gulp')
var $      = require('gulp-load-plugins')()
var config = require('../../config.json')
var pkg    = require('../../package.json')
var Lib    = require('../Lib')

var pngquant    = require('imagemin-pngquant')
var spritesmith = require('gulp.spritesmith')
var merge       = require('merge-stream')

module.exports = function spriteTask() {
    gulp.task('sprite:merge', function() {
        var thisPath = config.staticPath + '/images/sprite';
        var folders = Lib.folders(thisPath)
        var tasks = folders.map(function(folder) {
            var spriteData = gulp.src(path.join(thisPath, folder, '/*.*'))
                                .pipe(spritesmith({
                                    imgPath: '../images/sprite/'+ folder +'.png?v='+ config.version,
                                    imgName: folder+'.png',
                                    cssName: '_'+ folder+'.css',
                                    padding: config.sprite_padding
                                }))

            var imgPipe = spriteData.img.pipe(gulp.dest(config.staticPath+'/images/sprite'))
            var cssPipe = spriteData.css.pipe($.rename({ extname: '.less'}))
                                        .pipe(gulp.dest(config.staticPath + '/less/sprite-less'))
            return merge(imgPipe, cssPipe)
        })

        return merge(tasks)
    })

    gulp.task('sprite', ['sprite:merge'], function(callback) {
        var lessFiles = []
        fs.readdirSync(config.staticPath +'/less/sprite-less')
            .map(function(file) {
                /\.less$/.test(file) && lessFiles.push('@import "sprite-less/'+ file +'";')
            })
        
        return gulp.src(config.staticPath +'/less/_sprite_all.less')
                    .pipe($.replace(/.*/g, lessFiles.join('\n')))
                    .pipe(gulp.dest(config.staticPath + '/less'))
    })
}