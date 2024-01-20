// -------------------------------初始化
global.factory = {};
global.controller = {}
// -------------------------------全局数据
require('globalData');
// -------------------------------构建接口
// require("interface")
// -------------------------------构建函数
require("class.Task");
// -------------------------------封装
// 报错
require("Throw");
// 日志
require("log");
// -------------------------------工具
require("utils");
require('超级移动优化hotfix 0.9.4');
// -------------------------------工厂模块
require('factory.task')
require('factory.source')
require('factory.spawn')
require('factory.Tower')
require('factory.creep')
// 采集
require('factory.creep.Harvest')
// 升级
require('factory.creep.Upgrader')
// 建造
require('factory.creep.Builder')
// 运输
require('factory.creep.Carrier')
// 维修
require('factory.creep.Repairer')
// 防御
require('factory.creep.Defender')
// 占领
require('factory.creep.Occupy')
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