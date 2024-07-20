// 所有的 creep 角色
type CreepRoleConstant = BaseRoleConstant
    // | AdvancedRoleConstant | RemoteRoleConstant | WarRoleConstant

// 房间基础运营
type BaseRoleConstant =
    'harvester' |
    'collector' |
    'miner' |
    'upgrader' |
    'filler' |
    'builder' |
    'repairer'

// 房间高级运营
type AdvancedRoleConstant =
    'manager' |
    'processor'

// 远程单位
type RemoteRoleConstant =
    'claimer' |
    'reserver' |
    'signer' |
    'remoteBuilder' |
    'remoteUpgrader' |
    'remoteHarvester' |
    'depositHarvester' |
    'pbAttacker' |
    'pbHealer' |
    'pbCarrier' |
    'moveTester' |
    'reiver'

// 战斗单位
type WarRoleConstant =
    'soldier' |
    'doctor' |
    'boostDoctor' |
    'dismantler' |
    'boostDismantler' |
    'apocalypse' |
    'defender'

// creep 名字生成器集合
type CreepNameGenerator = {
    [role in CreepRoleConstant]?: (room: string, index?: number, ...args: any[]) => string
}

/**
 * creep 工作逻辑集合
 * 包含了每个角色应该做的工作
 */
type CreepWork = {
    [role in CreepRoleConstant]: (data: CreepData) => ICreepConfig
}

interface ICreepConfig {
    // 每次死后都会进行判断，只有返回 true 时才会重新发布孵化任务
    isNeed?: (room: Room, creepName: string, preMemory: CreepMemory) => boolean
    // 准备阶段执行的方法, 返回 true 时代表准备完成
    prepare?: (creep: Creep) => boolean
    // creep 获取工作所需资源时执行的方法
    // 返回 true 则执行 target 阶段，返回其他将继续执行该方法
    source?: (creep: Creep) => boolean
    // creep 工作时执行的方法,
    // 返回 true 则执行 source 阶段，返回其他将继续执行该方法
    target: (creep: Creep) => boolean
    // 每个角色默认的身体组成部分
    bodys: BodyAutoConfigConstant | BodyPartConstant[]
}

/**
 * 所有 creep 角色的 data
 */
type CreepData =
    EmptyData |
    ReiverData |
    HarvesterData |
    WorkerData |
    ProcessorData |
    RemoteHelperData |
    RemoteDeclarerData |
    RemoteHarvesterData |
    pbAttackerData |
    WarUnitData |
    ApocalypseData |
    HealUnitData

/**
 * 有些角色不需要 data
 */
interface EmptyData { }

/**
 * 采集单位的 data
 * 执行从 sourceId 处采集东西，并转移至 targetId 处（不一定使用，每个角色都有自己固定的目标例如 storage 或者 terminal）
 */
interface HarvesterData {
    // 要采集的 source id
    sourceId: string
    // 把采集到的资源存到哪里存在哪里
    targetId: string
}

/**
 * 工作单位的 data
 * 由于由确定的工作目标所以不需要 targetId
 */
interface WorkerData {
    // 要使用的资源存放建筑 id
    sourceId: string
}

/**
 * 中央运输者的 data
 * x y 为其在房间中的固定位置
 */
interface ProcessorData {
    x: number
    y: number
}

/**
 * 远程协助单位的 data
 */
interface RemoteHelperData {
    // 要支援的房间名
    targetRoomName: string
    // 该房间中的能量来源
    sourceId: string
}

/**
 * 掠夺者单位的 ddata
 */
interface ReiverData {
    // 目标建筑上的旗帜名称
    flagName: string
    // 要搬运到的建筑 id
    targetId: string
}

/**
 * 远程声明单位的 data
 * 这些单位都会和目标房间的 controller 打交道
 */
interface RemoteDeclarerData {
    // 要声明控制的房间名
    targetRoomName: string
    // 自己出生的房间，claim 需要这个字段来向老家发布支援 creep
    spawnRoom?: string
    // 给控制器的签名
    signText?: string
}

/**
 * 远程采集单位的 data
 * 包括外矿采集和公路房资源采集单位
 */
interface RemoteHarvesterData {
    // 要采集的资源旗帜名称
    sourceFlagName: string
    // 资源要存放到哪个建筑里，外矿采集者必须指定该参数
    targetId?: string
    // 出生房名称，资源会被运输到该房间中
    spawnRoom?: string
}

interface pbAttackerData {
    // 要采集的资源旗帜名称
    sourceFlagName: string
    // 资源要存放到哪个建筑里，外矿采集者必须指定该参数
    healerCreepName: string
    // 出生房名称，资源会被运输到该房间中
    spawnRoom: string
}

/**
 * 战斗单位的 data
 */
interface WarUnitData {
    // 要攻击的旗帜名
    targetFlagName: string
    // 其治疗者名称，战斗单位会尽量保持该单位和自己相邻
    healerName?: string
    // 待命位置旗帜名
    // standByFlagName: string
    // 是否持续孵化
    keepSpawn: boolean
}

/**
 * 一体机战斗单位的 data
 */
interface ApocalypseData {
    // 要攻击的旗帜名
    targetFlagName: string
    // 抗几个塔的伤害，由这个参数决定其身体部件组成
    bearTowerNum: 0 | 1 | 2 | 3 | 4 | 5 | 6
    // 是否持续孵化
    keepSpawn: boolean
}

/**
 * 治疗单位的 data
 */
interface HealUnitData {
    // 要治疗的旗帜名
    creepName: string
    // 待命位置旗帜名
    // standByFlagName: string
    // 是否持续孵化
    keepSpawn?: boolean
}

/**
 * creep 的自动规划身体类型，以下类型的详细规划定义在 setting.ts 中
 */
type BodyAutoConfigConstant =
    'harvester' |
    'worker' |
    'upgrader' |
    'manager' |
    'processor' |
    'reserver' |
    'attacker' |
    'healer' |
    'dismantler' |
    'remoteHarvester'




















// 战斗小队的基础信息
interface SquadBase<IN_MEMORY extends boolean> {
    // 是否准备就绪
    ready: boolean
    // 小队路径
    path: string
    // 小队前进方向
    direction: DirectionConstant
    // 目标建筑
    targetStructures: IN_MEMORY extends true ? string[] : Structure[]
    // 目标 creep
    targetCreep: IN_MEMORY extends true ? string[] : (Creep | PowerCreep)[]
}

// 小队内存
type SquadMemory = SquadBase<true>

/**
 * 小队中允许执行的战术动作
 * @type back 掉头，后队变前队
 * @type left 左转（逆时针）
 * @type right 右转（顺时针）
 * @type cross 对穿（左上到右下，右上到左下）
 */
type SquadTacticalActions = 'back' | 'left' | 'right' | 'cross'

// 小队类型，要新增其他种类小队就在后面追加类型
type SquadTypes = Apocalypse4 /** | ... */

// 四个一体机
type Apocalypse4 = 'apocalypse4'

// 小队的具体配置
interface SquadStrategy {
    // 小队的组成，键为角色，值为需要的数量
    member: {
        [role in CreepRoleConstant]?: number
    }

    // 小队指令 - 治疗
    heal: (squad: SquadMember, memory: SquadMemory) => any
    // 小队指令 - 攻击敌方单位
    attackCreep: (squad: SquadMember, memory: SquadMemory) => any
    // 小队指令 - 攻击敌方建筑
    attackStructure: (squad: SquadMember, memory: SquadMemory) => any
    // 寻路回调，在小队 getPath 中 PathFinder 的 roomCallback 中调用，用于添加小队自定义 cost
    findPathCallback?: (roomName: string, costs: CostMatrix) => CostMatrix
    // 决定移动策略，参数是三个小队指令的返回值，返回是否继续前进（为 false 则后撤）
    getMoveStrategy?: (healResult: any, attackCreepResult: any, attackStructureResult: any) => boolean
}

// 小队成员对象，键为小队成员在小队内存中的键，值为其本人，常用作参数
interface SquadMember {
    [memberName: string]: Creep
}