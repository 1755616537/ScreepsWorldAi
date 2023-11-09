/**
 * 引入 creep 配置项
 * 其键为角色名（role），其值为对应角色的逻辑生成函数
 */
const roles = {
    upgrader: require('role.upgrader.js')
}

// 添加 work 方法
Creep.prototype.work = function() {

    // ------------------------ 第一步：获取 creep 执行逻辑 ------------------------

    // 获取对应配置项
    const creepConfig = creepApi.get(this.memory.configName)
    // 检查 creep 内存中的配置是否存在
    if (!creepConfig) {
        console.log(`creep ${this.name} 携带了一个无效的配置项 ${this.memory.configName}`)
        this.say('找不到配置！')
        return 
    }
    const creepLogic = roles[creepConfig.role](...creepConfig.args)

    // ------------------------ 第二步：执行 creep 准备阶段 ------------------------

    // 没准备的时候就执行准备阶段
    if (!this.memory.ready) {
        // 有准备阶段配置则执行
        if (creepLogic.prepare) {
            this.memory.ready = creepLogic.prepare(this)
        }
        // 没有就直接准备完成
        else this.memory.ready = true
        return
    }

    // ------------------------ 第三步：执行 creep 工作阶段 ------------------------

    let stateChange = true
    // 执行对应阶段
    // 阶段执行结果返回 true 就说明需要更换 working 状态
    if (this.memory.working) {
        if (creepLogic.target) stateChange = creepLogic.target(this)
    }
    else {
        if (creepLogic.source) stateChange = creepLogic.source(this)
    }

    // 状态变化了就切换工作阶段
    if (stateChange) this.memory.working = !this.memory.working
}
