class Task {

	// static TaskType_harvest = globalData.harvest;
	// static TaskType_upgrader = globalData.upgrader;
	// static TaskType_builder = globalData.builder;
	// static TaskType_carrier = globalData.carrier;
	// static TaskType_repairer = globalData.repairer;
	// static TaskType_nearDefender = globalData.nearDefender;
	// static TaskType_farDefender = globalData.farDefender;
	// static TaskType_theHealer = globalData.theHealer;
	// static TaskType_occupier = globalData.occupier;

	constructor(taskName, taskType, executeCreep) {
		// 任务名称
		this.taskName = taskName;
		// 任务类型
		this.taskType = taskType;
		// 执行的Creep
		this.executeCreep = executeCreep;
	}

	toObject() {
		return Object.assign({}, this);
	}

	// 优先权限 判定 （空闲，计算距离，小兵类型，小兵属性）
	static priorityPower(creep, event) {
		switch (event) {
			case TaskType_harvest:
				// 采集
				break;
			case TaskType_upgrader:
				// 升级
				break;
			case TaskType_builder:
				// 建造
				break;
			case TaskType_carrier:
				// 运输
				break;
			case TaskType_repairer:
				// 维修
				break;
			case TaskType_nearDefender:
				// 近战
				break;
			case TaskType_farDefender:
				// 远战
				break;
			case TaskType_theHealer:
				// 治疗
				break;
			case TaskType_occupier:
				// 治疗
				break;
			default:
				clog('无效任务类型', event);
		}
	}

	// 空闲没有任务的creep
	static idleCreep() {
		let creepList = _.filter(Game.creeps, (creep) => creep.memory.TaskState == '0');
		if (creepList.length < 1) {
			Throw.Error('没有空闲creep');
		}
		return creepList;
	}
}

global.Task = Task;