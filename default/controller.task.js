// 控制器 任务

// 被动指派任务-》小兵完成当前任务来领取新的任务-》优先级计算是否允许领取
// 主动指派任务给空的小兵-》优先级
// 优先级，计算距离，小兵类型，小兵属性

// 挂载 请求任务
Creep.prototype.requestTask = function() {
	return assignTask(this);
}

global.controller.task = {
	run: () => {

		// 建立任务
		addTask();

		// 派发任务
		// dispatchTasks();

		// 执行任务
		// performTasks();

	}
}

// 请求指派任务
function assignTask(creep) {

}

// 建立添加任务
function addTask() {
	_.forEach(Game.rooms, room => {
		let roomName = room.name;
		let roomSequence = factory.room.nameGetSequence(roomName);
		let spawnName = factory.spawn.sequenceGetName(roomSequence);

		// 我方血少的CREEPS
		const myCreepHitsF = room.find(FIND_MY_CREEPS, {
			filter: function(object) {
				return object.hits < object.hitsMax;
			}
		});
		myCreepHitsF.sort((a, b) => a.hits - b.hits);

		// 敌方CREEPS
		const hostileCreep = room.find(FIND_HOSTILE_CREEPS);

		// 所有掉落的资源
		const droppedResources = room.find(FIND_DROPPED_RESOURCES);

		// 墓碑
		const tombstones = room.find(FIND_TOMBSTONES, {
			filter: (structure) => {
				return (structure.store.getUsedCapacity() > 0);
			}
		});
		tombstones.sort((a, b) => a.ticksToDecay - b.ticksToDecay);

		// 控制器升级
		let controller = room.controller;

		// 控制器CONTAINER能量供给运输

		// 能量源采集
		const sources = room.find(FIND_SOURCES);

		// 能量源CONTAINER能量搬运

		// 矿采集
		const minerals = room.find(FIND_MINERALS);

		// 矿CONTAINER资源搬运


	});
}
// 派发任务
function dispatchTasks() {
	// 寻找空闲Creep
	_.forEach(Game.creeps, creep => {
		let roomName = creep.room.name;
		let roomSequence = factory.room.nameGetSequence(roomName);
		let spawnName = factory.spawn.sequenceGetName(roomSequence);

	});
}
// 执行任务
function performTasks() {
	// 正在执行任务队列
	let performList = [];
	try {
		performList = factory.task.perform.getALL();
	} catch (e) {
		//TODO handle the exception
	}

	for (let val in performList) {
		switch (val.type) {
			case globalData.havester:
				// 采集
				break;
			case globalData.upgrader:
				// 升级
				break;
			case globalData.builder:
				// 建造
				break;
			case globalData.carrier:
				// 运输
				break;
			case globalData.repairer:
				// 维修
				break;
			case globalData.defender:
				// 防御
				break;
			case globalData.attack:
				// 攻击
				break;
			case globalData.treat:
				// 治疗
				break;
			default:
				clog('无效任务', task);
		}
	}
}