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



// creep 是你的单位, creep 可以移动、采集能量、建造建筑、攻击其他 creep 以及执行其他动作。每个 creep 都由最多 50 个身体部件构成，身体部件的类型如下：
// 身体部件 	孵化成本 	每个部件效果
// MOVE 	50 	每 tick 减少 2 点疲惫值
// WORK 	100 	
// 每 tick 从能量源采集 2 单位能量。
// 每 tick 从矿区采集 1 单位矿物。
// 每 tick 增加工地建设进度 5 点，花费 5 单位能量。
// 每 tick 增加建筑 100 耐久度，花费 1 单位能量。
// 每 tick 拆减建筑 50 点耐久，并返还 0.25 单位能量。
// 每 tick 提高控制器升级进度 1 点，花费 1 单位能量。
// CARRY 	50 	携带最多 50 单位资源。
// ATTACK 	80 	对相邻的 creep 或建筑造成 30 点伤害。
// RANGED_ATTACK 	150 	
// 单个目标时，每 tick 对 creep 或建筑造成 10 点伤害，范围为 3 格。
// 多个目标时，每 tick 对范围内所有 creep 与建筑造成 1-4-10 点伤害，具体伤害取决于距离，范围为 3 格。
// HEAL 	250 	治疗对象可为自己或其它 creep。自愈或治疗相邻 creep 时每 tick 恢复 12 点耐久，一定距离内远程治疗每 tick 恢复 4 点耐久。
// CLAIM 	600 	
// 占领一个中立房间的控制器。
// 每部件每 tick 使己方对中立房间控制器的预定时间增加 1 tick，或使其他玩家的预定时间减少 1 tick。
// 每部件每 tick 使其他玩家控制器降级计数器加速 300 tick。
// 注：拥有该部件的 creep 寿命只有 600 tick，且无法被 renew。
// TOUGH 	10 	无附加效果，唯一作用是增加 creep 的最大耐久值。可被强化以承受更多伤害。




global.factory.creep = {
	CleanMemory: () => {
		// 清理内存

		for (let name in Memory.creeps) { // 释放内存
			if (!Game.creeps[name]) {
				// 采集者
				if (Memory.creeps[name].role == globalData.harvest) {
					// 从矿区记录删除
					let harvestSourceID;
					let on = false;
					// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
					try {
						harvestSourceID = Memory.creeps[name].harvestSourceID;
						on = true;
					} catch (e) {
						//TODO handle the exception
					}
					// 是否合法记录了
					if (on && harvestSourceID) {
						let memorySource = Memory.source.list;
						let memorySourceList = memorySource[harvestSourceID].list;
						for (let i = 0; i < memorySourceList.length; i++) {
							if (memorySourceList[i] == name) {
								memorySource[harvestSourceID].list.splice(i, 1);
								Memory.source.list = memorySource;
								break
							}
						}
					}

				}

				delete Memory.creeps[name];
				console.log('清楚不存在的creep内存:', name);
			}
		}
	},
	addHarvest: (harvests) => {
		let newName = globalData.harvest + Game.time;
		let bodys = globalData.creepConfigs.harvest.bodys;
		// 当总creep数量小于1时,使用缩减版进行快速发展
		if ( /*Object.keys(Game.creeps).length < 1 ||*/ harvests.length < 1) bodys = globalData.creepConfigs
			.harvest
			.bodysMinus;
		let returnData = factory.spawns.get(1).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.harvest
				}
			});
		if (returnData == OK) {
			console.log('生成新的 采集者: ' + newName);
		}
		return returnData
	},
	addCarrier: (carriers) => {
		let newName = globalData.carrier + Game.time;
		let returnData = factory.spawns.get(1).spawnCreep(globalData.creepConfigs.carrier.bodys,
			newName, {
				memory: {
					role: globalData.carrier
				}
			});
		if (returnData == OK) {
			console.log('生成新的 运输者:' + newName);
		}
		return returnData
	},
	addUpgrader: (upgraders) => {
		let newName = globalData.upgrader + Game.time;
		let returnData = factory.spawns.get(1).spawnCreep(globalData.creepConfigs.upgrader.bodys,
			newName, {
				memory: {
					role: globalData.upgrader
				}
			});
		if (returnData == OK) {
			console.log('生成新的 升级者: ' + newName);
		}
		return returnData
	},
	addBuilder: (builders) => {
		let newName = globalData.builder + Game.time;
		let returnData = factory.spawns.get(1).spawnCreep(globalData.creepConfigs.builder.bodys,
			newName, {
				memory: {
					role: globalData.builder
				}
			});
		if (returnData == OK) {
			console.log('生成新的 建造者:' + newName);
		}
		return returnData
	},
	addRepairer: (repairers) => {
		let newName = globalData.repairer + Game.time;
		let returnData = factory.spawns.get(1).spawnCreep(globalData.creepConfigs.repairer.bodys,
			newName, {
				memory: {
					role: globalData.repairer
				}
			});
		if (returnData == OK) {
			console.log('生成新的 维修者:' + newName);
		}
		return returnData
	}
}

// creep 监控状态检查
Creep.prototype.isHealthy = function() {
	if (this.ticksToLive <= 10) return false
	else return true
}