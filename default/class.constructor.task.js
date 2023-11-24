class Task {

	static TaskType_harvest = 1;
	static TaskType_upgrader = 2;
	static TaskType_builder = 3;
	static TaskType_carrier = 4;
	static TaskType_repairer = 5;
	static TaskType_defender = 6;

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
	// new Task('',Task.TaskType_builder,'').toObject()
}