// 代码中文解释
/// <reference types="@screepscn/types" />

// 拓展总入口 只执行一次
require("main_mount")();

// 主程序入口 每次tips都执行一次
module.exports.loop = function() {
	// 任务调度启动
	// controller.task.run();
	
	controller.creep.run();
	
	// clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
}

// 缓存的种类
// 持久化存储：游戏的Memory对象，只有这个地方能实现真正可靠的长时间存储。
// 半持久存储：js 的 Global对象，对象原型都属于半持久存储，这种存储会在游戏全局重置时被清除，一般存放允许丢失的数据。
// 非持久存储：直接定义在游戏对象（非原型）上的属性都属于非持久存储，例如Game.rooms.W1N1.myCustomProp = 123，这种存储只有本 tick 能访问到，用来存放 tick 内协同作业需要的数据。


// 待完成程序:
// .统一任务调度机制
// .缓存find方法查找的内容（避免反复查询浪费CPU），在执行withdraw，transfer等改变地图上的对象的方法时才更新缓存
// .寻路优化加缓存，避免撞车效果

