// -------------------------------初始化
global.factory = {};
global.controller = {}
// -------------------------------全局数据
import './globalData.js';
// -------------------------------构建接口
// import "interface"
// -------------------------------构建函数
import "./class.Task.js";
// -------------------------------封装
// 报错
import "./Throw.js";
// 日志
import "./log.js";
// -------------------------------工具
import "./utils.js";
import '../../utils/超级移动优化hotfix 0.9.4.js';
// import '../utils/极致建筑缓存 v1.4.3' ;
// -------------------------------工厂模块
// 任务
import './factory.task.js'
// 安全
import './factory.Secure.js'
// 房间
import './factory.room.js'
// 基地
import './factory.spawn.js'
// 建筑
import './factory.Build.js'
// 能量区
import './factory.source.js'
// 塔
import './factory.Tower.js'
// 能量远程传输
import './factory.Link.js'
// 爬爬
import './factory.creep.js'
// 采集
import './factory.creep.Harvest.js'
// 升级
import './factory.creep.Upgrader.js'
// 建造
import './factory.creep.Builder.js'
// 运输
import './factory.creep.Carrier.js'
// 维修
import './factory.creep.Repairer.js'
// 攻击-防御
import './factory.creep.Defender.js'
// 占领
import './factory.creep.Occupier.js'
// 治疗
import './factory.creep.TheHealer.js'
// -------------------------------控制器
// 任务
import './controller.task.js'
// 房间
import './controller.room.js'
// 爬爬
import './controller.creep.js'
// -------------------------------默认只执行一次的初始化程序
import initialization from './initialization.js'

module.exports = function () {
    // 初始化
    initialization.run;
}