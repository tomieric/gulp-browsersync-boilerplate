# gulp-browsersync-bolierplate 项目模板

基于 `gulp`,`browser-sync`的前端构建环境项目模板

**`配置5小时开发2分钟`** 系列

- [x] gulp
- [x] [browser-sync](https://www.browsersync.io/)
- [x] less
- [x] bower

```
.
├── README.MD
├── bower.json
├── bower_components
│   ├── es5-shim
│   ├── html5shiv
│   ├── jquery
│   ├── requirejs
│   └── respond
├── config.json      配置文件
├── dist             构建生成目录
├── gulp             gulp 任务配置
│   ├── lib          工具函数
│   └── task         gulp task 配置
│        ├── defaultTask         默认任务，包括 ejs，less，编译及 server
│        ├── spriteTask          sprite 合并任务，单独运行
│        └── buildTask         构建
├── gulpfile.js
├── node_modules
├── package.json
├── static
│   ├── css
│   ├── fonts
│   ├── images
│   ├── js
│   └── less
├── template           ejs模板
│   ├── _common
│   ├── upgrade.html
│   └── 首页.html
└── www                http-server 根目录，ejs 编译目录

```


## 安装browser-sync

```
npm install -g browser-sync
```

## 安装gulp

```
npm install -g gulp
```


## 安装browsersync-prue-boilerplate

```
git clone https://github.com/tomieric/gulp-browsersync-boilerplate.git [projectName]
```

下载完成后

```
cd projectName && npm install 
```

## 启动项目

```
npm start
```

## 发布项目

```
npm run build
```

## 配置文件 config.json

```
{
    "name": "gulp-browersync-boilerplate",   项目名称
    "title": "gulp-browersync-boilerplate",  页面 title
    "port": 3000,                            server 启动端口
    "static": "/static",                     静态文件绝对路径
    "staticPath": "./static",                静态文件相对路径
    "template": "./template",                模板目录
    "destPath" : "www",                      server 根目录，模板编译目录
    "bundlePath": "./dist",                  构建生成目录
    "bundlePort": 3001,                      构建完成 server 端口
    "bower_components": "/bower_components", bower 安装目录
    "version": "1.0.0",                      项目版本
    "sprite_padding": 20,                    sprite 间隙距离
    "bodyCls": ""                            模板预先设置 body 标签类名
}
```

## js 文件使用 ES6版本编译


### 创建项目

```
git clone https://github.com/tomieric/gulp-browsersync-boilerplate.git [projectName] -b es6-feature
```