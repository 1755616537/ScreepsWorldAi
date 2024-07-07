// 代码中文解释
/// <reference types="@screepscn/types" />

// 拓展总入口 只执行一次
import "./main_mount.js";

import Alliance_run from './Alliance/run.js'
import Alliance_main from './Alliance/main/main.js'

import {ErrorMapper} from "./Alliance/ThirdPartyCode/screeps-typescript-starter-master/src/utils/ErrorMapper";

export const loop = ErrorMapper.wrapLoop(() => {
    // 联盟 amin 入口
    Alliance_run(Alliance_main, undefined, {});
    // clog('本次tips使用 CPU 时间总量 ',Game.cpu.getUsed())
});
