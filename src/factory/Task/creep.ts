import ChainedFun from "../../utils/chainedFun.js";

// 初始化的时候》把定义好的任务json数据化》任务中心根据json数据执行任务
class TaskCreep extends ChainedFun {
    creep: Creep;

    constructor(logList, creep: Creep) {
        // 调用父类的构造函数
        super(logList, creep.name);

        this.creep = creep;
    }

    on() {
        this.funThis(() => {
            return true
        })
        return this;
    }

    moveTo(firstArg, secondArg, opts) {
        this.logList[this.logListName].push({
            firstArg, secondArg, opts
        });
        return this;
    }

    collect() {
        return this;
    }
}

export default {TaskCreep}