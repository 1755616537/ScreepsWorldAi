// ATTACK：最基础的攻击型身体部件，伤害和造价都很均衡，所以受到不少玩家的钟爱。它还有一个特性就是一旦被攻击就会自动反击。
// RANGED_ATTACK：范围型攻击部件，有rangedAttack（攻击三格内任一单位）和rangedMassAttack（攻击三格内所有单位）两种攻击模式。但是这个 part 的伤害要低于 ATTACK 并且造价更高。
// WORK：没错，WORK 部件也可以被用于进攻，主要的手段就是 dismantle 方法。它可以对建筑物造成大量伤害。但是 WORK 只能用于拆建筑物，对 creep 的攻击毫无还手之力。所以一般搭配其他种类的 creep 使用。
// CLAIM：可以使用attackController方法攻击指定控制器，借此来阻止对方房间进入安全模式。但是由于造价高且 TTL 短，所以一般只用于需要速战速决的进攻中。
// HEAL：治疗专用，可以使用 heal（近距离高效）和 rangedHeal（远距离低效）方法治疗指定 Creep。
// TOUGH：造价极低（只要10点能量），主要用来承担伤害，除了拥有正常的 100 生命值外没有什么用处。但是在经过 Boost 后 TOUGH 会成为战斗中最重要的身体部件之一，下文中我们会进行介绍。

// havester 	采矿者 	开采能量 	carry 是否到达上限 	存入指定的结构
// upgrader 	升级者 	取出能量 	carry 是否到达上限 	升级房间控制器
// builder 	建造者 	取出能量 	carry 是否到达上限 	建造结构
// carrier 	运输者 	取出能量 	carry 是否到达上限 	存入指定的结构
// repairer 	维修者 	取出能量 	carry 是否到达上限 	修复受损的结构
// defender 	防御者 	驻守指定区域 	房间内是否有入侵者 	攻击入侵者

// 角色配置
const creepConfigs = {
	'harvest': {
		role: globalData.havester,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	},
	'upgrader': {
		role: globalData.upgrader,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	},
	'builder': {
		role: globalData.builder,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	},
	'carrier': {
		role: globalData.carrier,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	},
	'repairer': {
		role: globalData.repairer,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	},
	'defender': {
		role: globalData.defender,
		bodys: [WORK, CARRY, MOVE],
		number: 1
	}
}


global.factory.creep = {
	/**
	 * 新增 creep 配置项
	 * @param configName 配置项名称
	 * @param role 该 creep 的角色
	 * @param args creep 的工作参数
	 */
	add(configName, role, ...args) {
		if (!Memory.creepConfigs) Memory.creepConfigs = {}
		Memory.creepConfigs[configName] = {
			role,
			args
		}

		return `${configName} 配置项已更新：[角色] ${role} [工作参数] ${args}`
	},
	/**
	 * 移除指定 creep 配置项
	 * @param configName 要移除的配置项名称
	 */
	remove(configName) {
		delete Memory.creepConfigs[configName]
		return `${configName} 配置项已移除`
	},
	/**
	 * 获取 creep 配置项
	 * @param configName 要获取的配置项名称
	 * @returns 对应的配置项，若不存在则返回 undefined
	 */
	get(configName) {
		if (!Memory.creepConfigs) return undefined
		return Memory.creepConfigs[configName]
	}
}

// creep 自检查
// Creep.prototype.work = function() {
//     // ...

//     // 如果 creep 还没有发送重生信息的话，执行健康检查，保证只发送一次生成任务
//     // 健康检查不通过则向 spawnList 发送自己的生成任务
//     if (!this.memory.hasSendRebirth) {
//         const health = this.isHealthy()
//         if (!health) {
//             // 向指定 spawn 推送生成任务
//             // ...
//             this.memory.hasSendRebirth = true
//         }
//     }
// }

// // creep 监控状态检查
// Creep.prototype.isHealthy = function() {
//     if (this.ticksToLive <= 10) return false
//     else return true
// }