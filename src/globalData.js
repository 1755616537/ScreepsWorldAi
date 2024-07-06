// 全局数据
global.globalData = {
    // 总输出
    clog: true,
    // 【不用填写，会自动获取】当前使用代码的用户名
    username: '',
    // 白名单用户名(不攻击等)
    WhitelistUsername: [],
    // 联盟信息
    Alliance: {
        // 游戏用户名称
        '1755616537': {
            rooms: {
                // 【可以不填写，会自动获取】房间名称
                'W47S54': {
                    spawns: {
                        // 【可以不填写，会自动获取】基地名称
                        'Spawn1': {}
                    },
                    // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
                    AutomaticSecurity: true,
                    // 【可以不填写，会自动获取】采集者自动分配矿区
                    AutomaticAssignHarvest: true,
                    // 【可以不填写，会自动获取】自动分配建设采集区的CONTAINER
                    AutomaticAssignHarvestCONTAINER: true,
                    // 【可以不填写，会自动获取】自动分配建设控制器区的CONTAINER
                    AutomaticAssignControllerCONTAINER: true
                },
                'E19S9': {
                    // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
                    AutomaticSecurity: false,
                },
                'E19S92': {
                    // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
                    AutomaticSecurity: false,
                },
                'W2N2': {
                    // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
                    AutomaticSecurity: false,
                }
            }
        },
        'Stars22': {}
    },
    // 房间 【不用填写，会自动获取】
    rooms: {},
    // 全部房间配置
    roomsAllAllocation: {
        // 是否开启强制统一房间配置
        on: false,
        // 配置内容（当遇到房间配置没有单独配置时，自动使用以下为默认配置）
        content: {
            // 自动安全(受到攻击自动开启)
            AutomaticSecurity: true,
            // 采集者自动分配矿区
            AutomaticAssignHarvest: true,
            // 自动分配建设采集区的CONTAINER
            AutomaticAssignHarvestCONTAINER: true,
            // 自动分配建设控制器区的CONTAINER
            AutomaticAssignControllerCONTAINER: true
        }
    },
    // 角色配置
    creepConfigs: {
        // 采集者
        harvest: {
            // 普通版（6*WORK已经是1对1能量源300秒采集3000的极限，多了会浪费,5*WORK勉强剩余450多能量）
            bodys: {
                list: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
                // 总能量数量（达到该植才允许生产,可以设比生产所需高点达到预留能量的效果,避免能量直接用完）
                totalEnergyRequired: 200
            },
            // 缩减版
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            // 加强版（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器）
            bodysPlus: {
                list: [WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE, MOVE],
                totalEnergyRequired: 300
            },
            // 总上限数量
            number: 2,
            // 自动分配数量（开启 AutomaticAssignHarvest可以根据最大支持数量动态更新采集者数量）
            AutomaticAssignNum: false,
            // 自动分配根据可用能量容量上限调整bodys
            AutomaticAssignBodysEnergyCapacityAvailable: true,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 升级者
        upgrader: {
            bodys: {
                list: [WORK, WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK, WORK,
                    CARRY, MOVE, MOVE, MOVE
                ],
                totalEnergyRequired: 300
            },
            number: 1,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 建造者
        builder: {
            bodys: {
                list: [WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 300
            },
            number: 1,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 运输者
        carrier: {
            bodys: {
                list: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY,
                    CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE
                ],
                totalEnergyRequired: 300
            },
            number: 3,
            // 矿区CONTAINER是否1v1运送
            sourceContainer1v1: true,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 维修者
        repairer: {
            bodys: {
                list: [WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [WORK, CARRY, MOVE],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [WORK, WORK, WORK, CARRY, MOVE],
                totalEnergyRequired: 300
            },
            number: 1,
            // tower创建拥有能量的时候不生成维修者
            onTower: false,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 防御者-近战
        nearDefender: {
            bodys: {
                list: [MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, ATTACK, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
                ],
                totalEnergyRequired: 300
            },
            number: 0,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 防御者-远战
        farDefender: {
            bodys: {
                list: [MOVE, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH
                ],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, RANGED_ATTACK, RANGED_ATTACK, RANGED_ATTACK, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH,
                    TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH
                ],
                totalEnergyRequired: 300
            },
            number: 0,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 治疗者
        theHealer: {
            bodys: {
                list: [MOVE, HEAL, HEAL],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, HEAL],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, HEAL, HEAL, HEAL],
                totalEnergyRequired: 300
            },
            number: 0,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        },
        // 占领者
        occupier: {
            bodys: {
                list: [MOVE, CLAIM, CLAIM],
                totalEnergyRequired: 200
            },
            bodysMinus: {
                list: [MOVE, CLAIM],
                totalEnergyRequired: 100
            },
            bodysPlus: {
                list: [MOVE, CLAIM, CLAIM, CLAIM],
                totalEnergyRequired: 300
            },
            number: 0,
            // 自动缩减配置,当房间内总容量不足时
            AutomaticConfigurationDownsizing: true
        }
    },
    // 移动
    Move: {
        // 工作颜色
        WorkColor: '#ffaa00',
        // 获取资源颜色
        WorkResourceColor: '#ffff00',
    },


    // 以下内容不可更改--------------------------------------------------------------

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
    // 防御者近战ID
    nearDefender: 'nearDefender',
    // 防御者远战ID
    farDefender: 'farDefender',
    // 占领者ID
    occupier: 'occupier',
    // 治疗者ID
    theHealer: 'theHealer',
    // 角色部件配置
    creepComponentConfigs: {
        // 每 tick 减少 2 点疲惫值
        MOVE: 50,
        // 每 tick 从能量源采集 2 单位能量。
        // 每 tick 从矿区采集 1 单位矿物。
        // 每 tick 增加工地建设进度 5 点，花费 5 单位能量。
        // 每 tick 增加建筑 100 耐久度，花费 1 单位能量。
        // 每 tick 拆减建筑 50 点耐久，并返还 0.25 单位能量。
        // 每 tick 提高控制器升级进度 1 点，花费 1 单位能量。
        WORK: 100,
        // 携带最多 50 单位资源。
        CARRY: 50,
        // 对相邻的 creep 或建筑造成 30 点伤害。
        ATTACK: 80,
        // 单个目标时，每 tick 对 creep 或建筑造成 10 点伤害，范围为 3 格。
        // 多个目标时，每 tick 对范围内所有 creep 与建筑造成 1-4-10 点伤害，具体伤害取决于距离，范围为 3 格。
        RANGED_ATTACK: 150,
        // 治疗对象可为自己或其它 creep。自愈或治疗相邻 creep 时每 tick 恢复 12 点耐久，一定距离内远程治疗每 tick 恢复 4 点耐久。
        HEAL: 250,
        // 占领一个中立房间的控制器。
        // 每部件每 tick 使己方对中立房间控制器的预定时间增加 1 tick，或使其他玩家的预定时间减少 1 tick。
        // 每部件每 tick 使其他玩家控制器降级计数器加速 300 tick。
        // 注：拥有该部件的 creep 寿命只有 600 tick，且无法被 renew。
        CLAIM: 600,
        // 无附加效果，唯一作用是增加 creep 的最大耐久值。可被强化以承受更多伤害。
        TOUGH: 10,
    },
    structuresShape: {
        "spawn": "◎",
        "extension": "ⓔ",
        "link": "◈",
        "road": "•",
        "constructedWall": "▓",
        "rampart": "⊙",
        "storage": "▤",
        "tower": "🔫",
        "observer": "👀",
        "powerSpawn": "❂",
        "extractor": "☸",
        "terminal": "✡",
        "lab": "☢",
        "container": "□",
        "nuker": "▲",
        "factory": "☭"
    }
}
