// 工厂 任务

global.factory.task = {
	add: (val) => {
		if (!val) return false;
		MemoryTaskListNullInspect();
		Memory.task.list.push(val);
		return true;
	},
	remove: (index) => {
		MemoryTaskListNullInspect();
		if (!index) {
			Memory.task.list.pop();
		} else {
			Memory.task.list.splice(index, 1);
		}
		return true;
	},
	get: (index) => {
		MemoryTaskListNullInspect();
		if (Memory.task.list.length < 1) throw new Error('任务列表为空');
		if (!index) return Memory.task.list[0];
		return Memory.task.list[index];
	},
	// 正在执行任务
	perform:{
		add: (val) => {
			if (!val) return false;
			MemoryPerformTasksListNullInspect();
			Memory.task.performList.push(val);
			return true;
		},
		remove: (index) => {
			MemoryPerformTasksListNullInspect();
			if (!index) {
				Memory.task.performList.pop();
			} else {
				Memory.task.performList.splice(index, 1);
			}
			return true;
		},
		get: (index) => {
			MemoryPerformTasksListNullInspect();
			if (Memory.task.performList.length < 1) throw new Error('任务列表为空');
			if (!index) return Memory.task.performList[0];
			return Memory.task.performList[index];
		},
		getALL: () => {
			MemoryPerformTasksListNullInspect();
			if (Memory.task.performList.length < 1) throw new Error('任务列表为空');
			return Memory.task.performList;
		},
	}
}

// Memory永久缓存任务列表无效空值检查
function MemoryTaskListNullInspect() {
	if (!Memory.task) Memory.task = {};
	if (!Memory.task.list) Memory.task.list = [];
}

// Memory永久缓存执行任务列表无效空值检查
function MemoryPerformTasksListNullInspect() {
	if (!Memory.task) Memory.task = {};
	if (!Memory.task.performList) Memory.task.performList = [];
}

 