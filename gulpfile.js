#!/usr/bin/env node 

/**
 * 基于gulp构建前端环境模板
 * 
 * by tommyshao <tomieric@gmail.com>
 * http://github.com/tomieric
 */

/*-------------
*  默认任务
-------------*/
require('./gulp/task/defaultTask')()

/*---------------
*  合并 sprite 任务
------------- */
require('./gulp/task/spriteTask')()


/*-------------
*  build任务
-------------*/
require('./gulp/task/buildTask')()