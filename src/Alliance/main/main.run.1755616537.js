import controller_task from "../../controller/task.js";
import controller_room from "../../controller/room.js";
import controller_creep from "../../controller/creep.js";

export default function (_this, objectFun) {
    if (Game.cpu.bucket === 10000) {//如果CPU到了一万点，则换成pixel
        if(Game.cpu.generatePixel) {
            Game.cpu.generatePixel();
            clog('cpu.bucket.兑换成功');
        }
    }

    // 任务调度启动
    //controller_task();
    // 房间管理
    controller_room();
    // creep管理
    controller_creep();
}