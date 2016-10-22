/*! gulp-browersync-boilerplate v1.0.1
*  by tommyshao
*  (c) 2014-2016 tommyshao
* updated on 2016-10-22
*  Licensed under MIT
*/
 !function(){var config="undefined"==typeof window.webConfig?{}:window.webConfig;require.config({baseUrl:function(){return config.baseUrl||"./js"}(),urlArgs:function(){return config.ver?"ver="+config.ver:"debug="+(new Date).getTime()}(),paths:{vendor:"./vendor",jquery:"vendor/jquery/dist/jquery.min",scripts:function(){return config.scripts?config.scripts:"/scripts"}()},shim:{}})}();