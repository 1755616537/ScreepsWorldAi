import run_1755616537 from "./room.run.1755616537.js";
import run_Stars22 from "./room.run.Stars22.js";
// 联盟 房间
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            run_1755616537(_this, objectFun);
        }
    },
    {
        name: globalData.Alliance[1].username,
        run: function (_this, objectFun) {
            run_Stars22(_this, objectFun);
        }
    }
]