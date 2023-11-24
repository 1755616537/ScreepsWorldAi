// -------------------------------初始化
global.factory = {};
global.controller = {}
// -------------------------------全局数据
require('globalData');
// -------------------------------工具
require("utils");
require('超级移动优化hotfix 0.9.4');
// 报错封装
require("Throw");
// -------------------------------工厂模块
require('factory.task')
require('factory.source')
require('factory.spawn')
require('factory.Tower')
require('factory.creep')
require('factory.creep.Harvest')
require('factory.creep.Upgrader')
require('factory.creep.Builder')
require('factory.creep.Carrier')
require('factory.creep.Repairer')
// -------------------------------控制器
require('controller.task')
require('controller.Tower')
require('controller.creep')
// -------------------------------默认执行的初始化程序
module.exports = function() {
	clog('挂载拓展')
	clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);

	// 客户端汉化显示
	Utils.cn();
}