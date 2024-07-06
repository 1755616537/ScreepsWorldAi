// 拓展总入口 只执行一次
import "main_mount";
// 入口
export default function () {
    // 任务调度启动
    controller.task.run();
    // 房间管理
    controller.room.run();
    // creep管理
    controller.creep.run();

    // clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
}