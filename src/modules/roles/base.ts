
/**
 * 初级房间运维角色组
 * 本角色组包括了在没有 Storage 和 Link 的房间内运维所需的角色
 */
const roles: {
    [role in BaseRoleConstant]: (data: CreepData) => ICreepConfig
} = {
    /**
     * 采集者
     * 从指定 source 中获取能量 > 将能量存放到身下的 container 中
     */
    harvester: (data: HarvesterData): ICreepConfig => ({
        prepare: creep => {

            return false
        },
        source: creep => {
            creep.say('🚧')
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'harvester'
    }),

    /**
     * 收集者
     * 从指定 source 中获取资源 > 将资源转移到指定建筑中
     */
    collector: (data: HarvesterData): ICreepConfig => ({
        prepare: creep => {
            return false
        },
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'worker'
    }),

    /**
     * 矿工
     * 从房间的 mineral 中获取资源 > 将资源转移到指定建筑中(默认为 terminal)
     */
    miner: (data: HarvesterData): ICreepConfig => ({
        isNeed: room => {
            return false
        },
        prepare: creep => {
            return false
        },
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'worker'
    }),

    /**
     * 填充单位
     * 从 container 中获取能量 > 执行房间物流任务
     * 在空闲时间会尝试把能量运输至 storage
     */
    filler: (data: WorkerData): ICreepConfig => ({
        isNeed: room => {
            return false
        },
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'manager'
    }),

    /**
     * 升级者
     * 不会采集能量，只会从指定目标获取能量
     * 从指定建筑中获取能量 > 升级 controller
     */
    upgrader: (data: WorkerData): ICreepConfig => ({
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'upgrader'
    }),

    /**
     * 建筑者
     * 只有在有工地时才会生成
     * 从指定结构中获取能量 > 查找建筑工地并建造
     *
     * @param spawnRoom 出生房间名称
     * @param sourceId 要挖的矿 id
     */
    builder: (data: WorkerData): ICreepConfig => ({
        isNeed: room => {
            return false
        },
        prepare: creep => {
            return false
        },
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'worker'
    }),

    /**
     * 维修者
     * 从指定结构中获取能量 > 维修房间内的建筑
     * 注：目前维修者只会在敌人攻城时使用
     *
     * @param spawnRoom 出生房间名称
     * @param sourceId 要挖的矿 id
     */
    repairer: (data: WorkerData): ICreepConfig => ({
        isNeed: room => {
            return false
        },
        source: creep => {
            return false
        },
        target: creep => {
            return false
        },
        bodys: 'worker'
    })
}

export default roles