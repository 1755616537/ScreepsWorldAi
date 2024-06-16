// 代码中文解释
/// <reference types="@screepscn/types" />

// 拓展总入口 只执行一次
import "./main_mount.js";

import controller_task from "./controller/task.js";
import controller_room from "./controller/room.js";
import controller_creep from "./controller/creep.js";

export const loop = errorMapper(() => {
    if (globalData.username=='1755616537'){

    }else if (globalData.username=='Stars22'){

    }

    // 任务调度启动
    controller_task();
    // 房间管理
    controller_room();
    // creep管理
    controller_creep();

    // clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
})

// 中文API
// https://screeps-cn.github.io/api/#
// 英文API
// https://docs.screeps.com/api/#
// lodash
// https://www.lodashjs.com/

// 房间 W25N6  W42S57 W48S54 W47S54
// https://screeps.com/a/#!/room/shard3/W47S54

// 缓存的种类
// 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
// 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
// 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。

// 设计方案参考
// https://github.com/lc150303/The-design-of-OverDom/tree/master/doc

/*
待完成程序:

完成程序:
 */
