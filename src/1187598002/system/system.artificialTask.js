//var queueTaskTemporary = require('../queueTask/queueTask.temporary'); //临时任务-任务队列模块
//var queueTask_W34N48 = require('../queueTask/queueTask.W34N48'); //'W34N48'任务-任务队列模块
//var queueTask_W33N49 = require('../queueTask/queueTask.W33N49'); //'W33N49'任务-任务队列模块
//var queueTask_W32N45 = require('../queueTask/queueTask.W32N45'); //'W32N45'任务-任务队列模块
import { queueTask_W39N53 } from '../queueTask/queueTask.W39N53.js' //人工任务队列-系统模块
import { queueTask_W49S53 } from '../queueTask/queueTask.W49S53.js' //人工任务队列-系统模块
//var systemArtificialTask = {
export const systemArtificialTask = {
    /**  
    * 人工任务队列-系统模块
    */
    run: function() {

        //W49S53任务
        queueTask_W49S53.run();

        //W39N53任务
        //queueTask_W39N53.run();

        //W34N48任务
        //queueTask_W34N48.run();

        //W33N49任务
        //queueTask_W33N49.run();

        //W32N45任务
        //queueTask_W32N45.run();
        
        //临时任务
        //queueTaskTemporary.run();
        
        //throw new Error('我是 sayHello 里的报错')

	}
};

//module.exports = systemArtificialTask;

//export const systemInitialize = systemInitialize;