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
				case pathData.havester:
					// 采集
					break;
				case pathData.upgrader:
					// 升级
					break;
				case pathData.builder:
					// 建造
					break;
				case pathData.carrier:
					// 运输
					break;
				case pathData.repairer:
					// 维修
					break;
				case pathData.defender:
					// 防御
					break;
				case pathData.attack:
					// 攻击
					break;
				case pathData.treat:
					// 治疗
					break;
				default:
					log('无效任务', task);
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
			case pathData.havester:
				// 采集
				break;
			case pathData.upgrader:
				// 升级
				break;
			case pathData.builder:
				// 建造
				break;
			case pathData.carrier:
				// 运输
				break;
			case pathData.repairer:
				// 维修
				break;
			case pathData.defender:
				// 防御
				break;
			case pathData.attack:
				// 攻击
				break;
			case pathData.treat:
				// 治疗
				break;
			default:
				log('无效任务', task);
		}

	},
	priorityPower: (...e) => {
		return priorityPower(...e);
	}
}

// 优先权限 判定 （空闲，计算距离，小兵类型，小兵属性）
function priorityPower(creep, event) {
	switch (event) {
		case pathData.havester:
			// 采集
			break;
		case pathData.upgrader:
			// 升级
			break;
		case pathData.builder:
			// 建造
			break;
		case pathData.carrier:
			// 运输
			break;
		case pathData.repairer:
			// 维修
			break;
		case pathData.defender:
			// 防御
			break;
		case pathData.attack:
			// 攻击
			break;
		case pathData.treat:
			// 治疗
			break;
		default:
			log('无效任务', task);
	}
}

// 空闲没有任务的creep
function idleCreep() {
	let creepList = _.filter(Game.creeps, (creep) => creep.memory.TaskState == '0');
	if (creepList.length < 1) {
		throw new Error('没有空闲creep');
	}
	return creepList;
}

// 指派任务
function assignTask(creep) {

}

// 采集
function havester() {

}