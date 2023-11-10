// -------------------------------初始化
global.factory={};
global.controller={}
// -------------------------------全局数据
require('pathData');
// -------------------------------工具
require("utils");
// -------------------------------factory
require('factory.spawn')
// 挂载 creep 管理模块
require('factory.creep')
// 挂载 creep 拓展
// require('factory.creep.mount')

require('factory.creep.Harvester')
require('factory.creep.Upgrader')
require('factory.creep.Builder')
// -------------------------------controller
require('controller.creep')
// -------------------------------




