// 配置文件
;(function(){
  // 获取网站配置
  var config = typeof window['webConfig'] === 'undefined' ? {} : window['webConfig'];
  // require配置
  require.config({
    // 基本路径
    baseUrl: (function() {
      return config['baseUrl'] || './js';
    })(),
    // 版本号
    urlArgs: (function(){
      return config['ver'] ? 'ver='+ config['ver'] : "debug=" +  (new Date()).getTime()
    })(),
    // 别名
    paths: {
      'jquery': '/bower_components/jquery/dist/jquery.min',
      'scripts': (function() {
        return config['scripts'] ? config['scripts'] : '/scripts';
      })()
    },
    // 以来声明
    shim: {
    }
  });
})();