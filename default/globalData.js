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
			bodys: {
				list: [WORK, WORK, CARRY, MOVE],
				// 总能量数量（达到该植才允许生产,可以设比生产所需高点达到预留能量的效果,避免能量直接用完）
				totalEnergyRequired: 100
			},
			// 缩减版
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			// 加强版
			bodysPlus: {
				list: [WORK, WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			// 总上限数量
			number: 2,
			// 自动分配数量（开启 AutomaticAssignHarvest可以根据最大支持数量动态更新采集者数量）
			AutomaticAssignNum: true
		},
		// 升级者
		'upgrader': {
			bodys: {
				list: [WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysPlus: {
				list: [WORK, WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			number: 2
		},
		// 建造者
		'builder': {
			bodys: {
				list: [WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysPlus: {
				list: [WORK, WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			number: 2
		},
		// 运输者
		'carrier': {
			bodys: {
				list: [WORK, CARRY, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysPlus: {
				list: [WORK, CARRY, CARRY, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			number: 2
		},
		// 维修者
		'repairer': {
			bodys: {
				list: [WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysPlus: {
				list: [WORK, WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			number: 1
		},
		// 防御者
		'defender': {
			bodys: {
				list: [WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysMinus: {
				list: [WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			bodysPlus: {
				list: [WORK, WORK, WORK, CARRY, MOVE],
				totalEnergyRequired: 100
			},
			number: 1
		}
	}
}