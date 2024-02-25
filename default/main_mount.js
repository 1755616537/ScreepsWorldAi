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
// require('极致建筑缓存 v1.4.3');
// -------------------------------工厂模块
// 任务
require('factory.task')
// 安全
require('factory.Secure')
// 房间
require('factory.room')
// 基地
require('factory.spawn')
// 建筑
require('factory.Build')
// 能量区
require('factory.source')
// 塔
require('factory.Tower')
// 能量远程传输
require('factory.Link')
// 爬爬
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
// 攻击-防御
require('factory.creep.Defender')
// 占领
require('factory.creep.Occupier')
// 治疗
require('factory.creep.TheHealer')
// -------------------------------控制器
// 任务
require('controller.task')
// 房间
require('controller.room')
// 爬爬
require('controller.creep')
// -------------------------------默认只执行一次的初始化程序
require('initialization')
module.exports = function() {
	// 初始化
	initialization.run();
}