// -------------------------------初始化
global.factory = {};
global.controller = {}
// -------------------------------全局数据
import 'globalData';
// -------------------------------构建接口
// import "interface"
// -------------------------------构建函数
import "class.Task";
// -------------------------------封装
// 报错
import "Throw";
// 日志
import "log";
// -------------------------------工具
import "utils";
import '../utils/超级移动优化hotfix 0.9.4';
// import '../utils/极致建筑缓存 v1.4.3' ;
// -------------------------------工厂模块
// 任务
import 'factory.task'
// 安全
import 'factory.Secure'
// 房间
import 'factory.room'
// 基地
import 'factory.spawn'
// 建筑
import 'factory.Build'
// 能量区
import 'factory.source'
// 塔
import 'factory.Tower'
// 能量远程传输
import 'factory.Link'
// 爬爬
import 'factory.creep'
// 采集
import 'factory.creep.Harvest'
// 升级
import 'factory.creep.Upgrader'
// 建造
import 'factory.creep.Builder'
// 运输
import 'factory.creep.Carrier'
// 维修
import 'factory.creep.Repairer'
// 攻击-防御
import 'factory.creep.Defender'
// 占领
import 'factory.creep.Occupier'
// 治疗
import 'factory.creep.TheHealer'
// -------------------------------控制器
// 任务
import 'controller.task'
// 房间
import 'controller.room'
// 爬爬
import 'controller.creep'
// -------------------------------默认只执行一次的初始化程序
import initialization from 'initialization'

module.exports = function () {
    // 初始化
    initialization.run;
}