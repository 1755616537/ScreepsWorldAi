import roles from "./../../Alliance/ThirdPartyCode/my-screeps-ai-master/src/role";

export default class CreepExtension extends Creep {
    // 工作
    public work(): void {

        // 还没出生就啥都不干
        if (this.spawning) {
            return
        }

        // 快死时的处理
        if (this.ticksToLive <= 3) {
            // 如果还在工作，就释放掉自己的工作位置
            // if (this.memory.standed)
        }

        // 获取对应配置项
        const creepConfig: ICreepConfig = roles[this.memory.role](this.memory.data)

        // 没准备的时候就执行准备阶段
        if (!this.memory.ready) {
            // 有准备阶段配置则执行
            if (creepConfig.prepare) this.memory.ready = creepConfig.prepare(this)
            // 没有就直接准备完成
            else this.memory.ready = true
        }

        //　如果执行了 prepare 还没有 ready，就返回等下个 tick 再执行
        if (!this.memory.ready) return

        // 获取是否工作，没有 source 的话直接执行 target
        const working = creepConfig.source ? this.memory.working : true

        let stateChange = false
        // 执行对应阶段
        // 阶段执行结果返回 true 就说明需要更换 working 状态
        if (working) {
            if (creepConfig.target && creepConfig.target(this)) stateChange = true
        }
        else {
            if (creepConfig.source && creepConfig.source(this)) stateChange = true
        }

        // 状态变化了就释放工作位置
        if (stateChange) {
            this.memory.working = !this.memory.working
            if (this.memory.standed) {
                delete this.memory.standed
            }
        }
    }
}