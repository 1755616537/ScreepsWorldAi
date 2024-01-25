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
		
	});
}
// 派发任务
function dispatchTasks() {

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