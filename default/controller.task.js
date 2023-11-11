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


		// 检查任务队列
		let task = {};
		try {
			task = factory.task.get();
		} catch (e) {
			//TODO handle the exception
			return
		}

		switch (task.type) {
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

	},
	priorityPower: (...e) => {
		return priorityPower(...e);
	}
}

// 优先权限 判定 （空闲，计算距离，小兵类型，小兵属性）
function priorityPower(creep, event) {
	switch (event) {
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

// 空闲没有任务的creep
function idleCreep() {
	let creepList = _.filter(Game.creeps, (creep) => creep.memory.TaskState == '0');
	if (creepList.length < 1) {
		global.Throw.Error('没有空闲creep');
	}
	return creepList;
}

// 指派任务
function assignTask(creep) {

}

// 采集
function havester() {

}