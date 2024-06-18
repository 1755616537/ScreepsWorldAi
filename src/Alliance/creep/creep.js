import run_1755616537 from "./creep.run.1755616537.js";
import run_Stars22 from "./creep.run.Stars22.js";
// 联盟 creep
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