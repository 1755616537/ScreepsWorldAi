import controller_task from "../controller/task.js";
import controller_room from "../controller/room.js";
import controller_creep from "../controller/creep.js";

// 联盟 amin
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            // 任务调度启动
            controller_task();
            // 房间管理
            controller_room();
            // creep管理
            controller_creep();
        }
    },
    {
        name: globalData.Alliance[1].username,
        run: function (_this, objectFun) {

        }
    }
]