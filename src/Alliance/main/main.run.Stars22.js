//var systemInitialize = require('./system/system.initialize'); //初始化 - 系统模块
//var systemArtificialTask = require('./system/system.artificialTask'); //人工任务队列-系统模块

//import { systemInitialize } from './system/system.initialize' //初始化 - 系统模块

import { systemInitialize } from '../../1187598002/system/system.initialize.js' //初始化 - 系统模块
import { systemArtificialTask } from '../../1187598002/system/system.artificialTask.js' //人工任务队列-系统模块

//孵化器名
global.spawnName = {
    'W49S53': ['Spawn1'],
    //W34N48: ['Spawn'],
    //W33N49: ['Spawn1'],
    //W32N45: ['Spawn-W32N45-1']
};

export default function (_this, objectFun) {
    //初始化
    systemInitialize.run();

    //运行人工任务队列
    systemArtificialTask.run();
}