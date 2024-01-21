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


const dataStructure_task = {
	current: '',
	previous: '',
	next: ''
}
const dataStructure_target = {
	x: null,
	y: null,
	// 房间名称
	roomName: ''
}

global.factory.creep = {
	moveTo: (creep, target, type = '') => {
		let visualizePathStyle = {};
		switch (type) {
			case 'Resource':
				visualizePathStyle = {
					// 填充颜色
					fill: '',
					// 线条颜色
					stroke: globalData.Move.WorkResourceColor,
					// undefined (实线)，dashed (虚线) 或者 dotted (点线) 
					lineStyle: 'dashed',
					// 线条宽度
					strokeWidth: .1,
					// 透明度
					opacity: .5
				}
				break;
			default:
				visualizePathStyle = {
					// 填充颜色
					fill: '',
					// 线条颜色
					stroke: globalData.Move.WorkColor,
					// undefined (实线)，dashed (虚线) 或者 dotted (点线) 
					lineStyle: 'dashed',
					// 线条宽度
					strokeWidth: .1,
					// 透明度
					opacity: .5
				}
		}
		creep.moveTo(target, {
			visualizePathStyle: visualizePathStyle
		});
	},
	CleanMemory: () => {
		// 清理内存

		for (let name in Memory.creeps) { // 释放内存
			if (!Game.creeps[name]) {
				// 采集者
				if (Memory.creeps[name].role == globalData.harvest) {
					// 从矿区记录删除
					let harvestSourceID, memorySource, memorySourceList;
					let on = false;
					// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
					try {
						harvestSourceID = Memory.creeps[name].harvestSourceID;
						memorySource = Memory.source.list;
						memorySourceList = memorySource[harvestSourceID].list;
						on = true;
					} catch (e) {
						//TODO handle the exception
					}
					// 是否合法记录了
					if (on && harvestSourceID) {
						for (let i = 0; i < memorySourceList.length; i++) {
							if (memorySourceList[i] == name) {
								memorySource[harvestSourceID].list.splice(i, 1);
								Memory.source.list = memorySource;
								break
							}
						}
					}
				}

				// 运输者
				if (Memory.creeps[name].role == globalData.carrier) {
					// 从矿区记录删除
					let carrierSourceID, memorySource;
					let on = false;
					// 如果没有合法记录会不存在harvestSourceID,报错需要捕获
					try {
						carrierSourceID = Memory.creeps[name].carrierSourceID;
						memorySource = Memory.source.list;
						on = true;
					} catch (e) {
						//TODO handle the exception
					}
					// 是否合法记录了
					if (on && carrierSourceID) {
						let on = false;
						for (let val in memorySource) {
							let spaceXYList = memorySource[val].spaceXYList;
							for (let i = 0; i < spaceXYList.length; i++) {
								let containerID = spaceXYList[i].containerID
								if (carrierSourceID == containerID) {
									let i2 = 0;
									for (; i2 < spaceXYList[i].list.length; i2++) {
										if (spaceXYList[i].list[i2] == name) {
											on = true;
											break
										}
									}
									if (on) {
										spaceXYList[i].list.splice(i2, 1);
										Memory.source.list[val].spaceXYList = spaceXYList;
										break;
									}
								}
							}
							if (on) break;
						}
					}
				}

				delete Memory.creeps[name];
				clog('清楚不存在的creep内存:', name);
			}
		}
	},
	addHarvest: (harvests, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.harvest + Game.time;

		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.harvest.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.harvest.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if ( /*Object.keys(Game.creeps).length < 1 ||*/ harvests) {
			// 当总creep数量小于2时,使用缩减版进行快速发展（注意：当建筑只剩基地时最高能量300）
			if (harvests.length < 2) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.harvest
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.harvest.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (harvests.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.harvest
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.harvest.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.harvest,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 采集者: ' + newName);
		}
		return returnData
	},
	addCarrier: (carriers, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.carrier + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.carrier.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.carrier.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (carriers) {
			if (carriers.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.carrier
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.carrier.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (carriers.length > 2 && controller_level >= 4) {
				if (globalData.creepConfigs.carrier.sourceContainer1v1 && carriers.length >= factory.source
					.GetContainerLength() + 1) {
					if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.carrier
						.bodysPlus
						.totalEnergyRequired) {
						bodys = globalData.creepConfigs.carrier.bodysPlus.list;
					} else {
						return 'Plus 房间总能量数量未达到限制，无法生产';
					}
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.carrier,
					task: dataStructure_task,
					target: dataStructure_target,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 运输者: ' + newName);
		}
		return returnData
	},
	addUpgrader: (upgraders, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.upgrader + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.upgrader.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.upgrader.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (upgraders) {
			if (upgraders.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.upgrader
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.upgrader.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (upgraders.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.upgrader
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.upgrader.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.upgrader,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 升级者: ' + newName);
		}
		return returnData
	},
	addBuilder: (builders, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.builder + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.builder.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.builder.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (builders) {
			if (builders.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.builder
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.builder.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (builders.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.builder
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.builder.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.builder,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 建造者:' + newName);
		}
		return returnData
	},
	addRepairer: (repairers, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.repairer + Game.time;
		let targets = factory.spawn.get(spawn).room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				// 找出需要储存能量
				return (structure.structureType == STRUCTURE_TOWER) &&
					structure.store.getUsedCapacity(RESOURCE_ENERGY) > 100;
			}
		});
		if (targets.length > 0 && globalData.creepConfigs.repairer.onTower) {
			return '存在TOWER能量大于100以上,不需要维修者';
		}
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.repairer.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.repairer.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (repairers) {
			if (repairers.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.repairer
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.repairer.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (repairers.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.repairer
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.repairer.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.repairer,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 维修者:' + newName);
		}
		return returnData
	},
	addNearDefender: (nearDefenders, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.nearDefender + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.nearDefender.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.nearDefender.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (nearDefenders) {
			if (nearDefenders.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.nearDefender
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.nearDefender.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (nearDefenders.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.nearDefender
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.nearDefender.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.nearDefender,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 防御者-近战:' + newName);
		}
		return returnData
	},
	addFarDefender: (farDefenders, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.farDefender + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.farDefender.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.farDefender.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (farDefenders) {
			if (farDefenders.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.farDefender
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.farDefender.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (farDefenders.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.farDefender
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.farDefender.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.farDefender,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 防御者-远战:' + newName);
		}
		return returnData
	},
	addOccupier: (occupiers, controller_level = 4, spawn = 1) => {
		let bodys;
		let newName = globalData.occupier + Game.time;
		if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.occupier.bodys
			.totalEnergyRequired) {
			bodys = globalData.creepConfigs.occupier.bodys.list;
		} else {
			return '房间总能量数量未达到限制，无法生产';
		}
		if (occupiers) {
			if (occupiers.length < 1) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.occupier
					.bodysMinus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.occupier.bodysMinus.list;
				} else {
					return 'Minus 房间总能量数量未达到限制，无法生产';
				}
			}
			if (occupiers.length > 2 && controller_level >= 4) {
				if (factory.room.get(spawn).energyAvailable >= globalData.creepConfigs.occupier
					.bodysPlus
					.totalEnergyRequired) {
					bodys = globalData.creepConfigs.occupier.bodysPlus.list;
				} else {
					return 'Plus 房间总能量数量未达到限制，无法生产';
				}
			}
		}
		let returnData = factory.spawn.get(spawn).spawnCreep(bodys,
			newName, {
				memory: {
					role: globalData.occupier,
					spawn: spawn
				}
			});
		if (returnData == OK) {
			clog('生成新的 占领者:' + newName);
		}
		return returnData
	},
	ComponentEnergyCalculation: (creepComponent = []) => {
		// 部件能量计算
		let total = 0;
		for (let i = 0; i < creepComponent.length; i++) {
			switch (creepComponent[i]) {
				case MOVE:
					total += globalData.creepComponentConfigs.MOVE;
					break;
				case WORK:
					total += globalData.creepComponentConfigs.WORK;
					break;
				case CARRY:
					total += globalData.creepComponentConfigs.CARRY;
					break;
				case ATTACK:
					total += globalData.creepComponentConfigs.ATTACK;
					break;
				case RANGED_ATTACK:
					total += globalData.creepComponentConfigs.RANGED_ATTACK;
					break;
				case HEAL:
					total += globalData.creepComponentConfigs.HEAL;
					break;
				case CLAIM:
					total += globalData.creepComponentConfigs.CLAIM;
					break;
				case TOUGH:
					total += globalData.creepComponentConfigs.TOUGH;
					break;
				default:
					Throw.Error('ComponentEnergyCalculation', ' 无效 ', creepComponent[i]);
			}
		}
		return total;
	}
}

// creep 监控状态检查
Creep.prototype.isHealthy = function() {
	if (this.ticksToLive <= 10) return false
	else return true
}