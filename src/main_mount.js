// -------------------------------初始化
global.Factory_ = {};
global.Controller_ = {};
global.Task_ = {
    creeps: {}
};
global.ChainedFun_ = {
    logList: {}
};
// -------------------------------全局数据
import "./globalData.js"
// -------------------------------构建接口
// -------------------------------构建函数
// -------------------------------封装
// 报错
import "./utils/Throw.js"
// 日志
import "./utils/log.js"
// -------------------------------工具
// 工具集
import "./utils/utils.js";
import "./utils/超级移动优化hotfix 0.9.4.js";
import "./utils/极致建筑缓存 v1.4.3.js";
// 资源显示
import "./utils/helper_roomResource.js";
// -------------------------------工厂模块
// -------------------------------控制器
// -------------------------------默认只执行一次的初始化程序
import initialization from "./initialization.js"

initialization();