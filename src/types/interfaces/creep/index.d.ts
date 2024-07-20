/**
 * creep 内存拓展
 */
interface CreepMemory {
    // 内置移动缓存
    _move?: Object
    // 自己是否会向他人发起对穿
    disableCross?: boolean
    // creep 是否已经准备好可以工作了
    ready: boolean
    // creep 的角色
    role: CreepRoleConstant
    // 是否在工作
    working: boolean
    // creep 在工作时需要的自定义配置，在孵化时由 spawn 复制
    data?: CreepData
    // 该 Creep 是否在站着不动进行工作
    // 该字段用于减少 creep 向 Room.restrictedPos 里添加自己位置的次数
    standed?: boolean
    // 要采集的资源 Id
    sourceId?: string
    // 要存放到的目标建筑
    targetId?: string
    // 远程寻路缓存
    farMove?: {
        // 序列化之后的路径信息
        path?: string
        // 移动索引，标志 creep 现在走到的第几个位置
        index?: number
        // 上一个位置信息，形如"14/4"，用于在 creep.move 返回 OK 时检查有没有撞墙
        prePos?: string
        // 缓存路径的目标，该目标发生变化时刷新路径, 形如"14/4E14S1"
        targetPos?: string
    }
    // 上一个位置信息，形如"14/4"，用于在 creep.move 返回 OK 时检查有没有撞墙
    prePos?: string
    // deposit 采集者特有，deposit 的类型
    depositType?: DepositConstant
    // 要填充的墙 id
    fillWallId?: string
    // manager 特有 要填充能量的建筑 id
    fillStructureId?: string
    // 建筑工特有，当前缓存的建筑工地（目前只有外矿采集者在用）
    constructionSiteId?: string
    // 可以执行建筑的单位特有，当该值为 true 时将不会尝试建造
    dontBuild?: boolean
    // manager 特有，当前任务正在转移的资源类型
    taskResource?: ResourceConstant
    // 城墙填充特有，当前期望的城墙生命值
    expectHits?: number
    // 攻击者的小队编号 暂时未使用
    squad?: number
    // 是否已经在待命位置, 此状态为 true 时，防御者的standBy方法将不会在调用 pos.isEqualTo()
    isStanBy?: boolean
    // collector 允许自己再次尝试发布 power 强化 Soruce 任务的时间
    // 在 Game.time 小于该值时不会尝试发布强化任务
    regenSource?: number

    // 移动到某位置需要的时间
    // 例如：miner 会用它来保存移动到 mineral 的时间
    travelTime?: number
    // 目标旗帜的名称
    targetFlagName?: string

    // rangeSoldier 特有，是否启用 massAttack
    massMode?: boolean
}