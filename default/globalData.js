global.globalData = {
	// 总输出
	clog: true,
	// 基地1名称
	SpawnName1: 'Spawn1',
	// 基地2名称
	SpawnName2: 'Spawn2',
	// 基地3名称
	SpawnName3: 'Spawn3',
	// 采集者ID
	harvest: 'harvest',
	// 升级者ID
	upgrader: 'upgrader',
	// 建造者ID
	builder: 'builder',
	// 运输者ID
	carrier: 'carrier',
	// 维修者ID
	repairer: 'repairer',
	// 防御者ID
	defender: 'defender',
	// 自动分配矿区
	AutomaticAssignHarvest: true,
	// 自动分配建设采集区的CONTAINER
	AutomaticAssignHarvestCONTAINER: true,
	// 主房间名称
	roomName1: 'W12N4',
	// 角色配置
	creepConfigs: {
		// 采集者
		'harvest': {
			// 普通版
			bodys: [WORK, WORK, CARRY, MOVE],
			// 缩减版
			bodysMinus: [WORK, CARRY, MOVE],
			// 加强版
			bodysPlus: [WORK, WORK, WORK, CARRY, MOVE],
			// 总上限数量
			number: 2,
			// 自动分配数量（开启 AutomaticAssignHarvest可以根据最大支持数量动态更新采集者数量）
			AutomaticAssignNum: true
		},
		// 升级者
		'upgrader': {
			bodys: [WORK, WORK, CARRY, MOVE],
			bodysMinus: [WORK, CARRY, MOVE],
			bodysPlus: [WORK, WORK, WORK, CARRY, MOVE],
			number: 2
		},
		// 建造者
		'builder': {
			bodys: [WORK, WORK, CARRY, MOVE],
			bodysMinus: [WORK, CARRY, MOVE],
			bodysPlus: [WORK, WORK, WORK, CARRY, MOVE],
			number: 2
		},
		// 运输者
		'carrier': {
			bodys: [WORK, CARRY, CARRY, MOVE],
			bodysMinus: [WORK, CARRY, MOVE],
			bodysPlus: [WORK, CARRY, CARRY, CARRY, MOVE],
			number: 2
		},
		// 维修者
		'repairer': {
			bodys: [WORK, WORK, CARRY, MOVE],
			bodysMinus: [WORK, CARRY, MOVE],
			bodysPlus: [WORK, WORK, WORK, CARRY, MOVE],
			number: 1
		},
		// 防御者
		'defender': {
			bodys: [WORK, WORK, CARRY, MOVE],
			bodysMinus: [WORK, CARRY, MOVE],
			bodysPlus: [WORK, WORK, WORK, CARRY, MOVE],
			number: 1
		}
	}
}