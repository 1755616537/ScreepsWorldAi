/**
 * 房间拓展
 * 来自于 mount.structure.ts
 */
interface Room {
    /**
     * 发送日志
     *
     * @param content 日志内容
     * @param instanceName 发送日志的实例名
     * @param color 日志前缀颜色
     * @param notify 是否发送邮件
     */
    log(content:string, instanceName?: string, color?: Colors, notify?: boolean): void

    // 已拥有的房间特有，tower 负责维护
    _enemys: (Creep|PowerCreep)[]
    // 需要维修的建筑，tower 负责维护，为 1 说明建筑均良好
    _damagedStructure: AnyStructure | 1
    // 该 tick 是否已经有 tower 刷过墙了
    _hasFillWall: boolean
    // 外矿房间特有，外矿单位维护
    // 一旦该字段为 true 就告诉出生点暂时禁止自己重生直到 1500 tick 之后
    _hasEnemy: boolean
    // 焦点墙，维修单位总是倾向于优先修复该墙体
    _importantWall: StructureWall | StructureRampart
    // 该房间是否已经执行过 lab 集群作业了
    // 在 Lab.work 中调用，一个房间只会执行一次
    _hasRunLab: boolean
    // 该房间是否已经运行过工地作业了
    _hasRunConstructionSite: boolean

    // 房间基础服务
    factory?: StructureFactory
    powerSpawn: StructurePowerSpawn
    nuker: StructureNuker
    observer: StructureObserver
    centerLink: StructureLink
    extractor: StructureExtractor
    mineral: Mineral
    sources: Source[]
    sourceContainers: StructureContainer[]
    _factory: StructureFactory
    _mineral: Mineral
    _powerspawn: StructurePowerSpawn
    _nuker: StructureNuker
    _sources: Source[]
    _centerLink: StructureLink
    _observer: StructureObserver
    _extractor: StructureExtractor
    _sourceContainers: StructureContainer[]

    // pos 处理 api
    serializePos(pos: RoomPosition): string
    unserializePos(posStr: string): RoomPosition | undefined

    // power 任务 api
    addPowerTask(task: PowerConstant, priority?: number): OK | ERR_NAME_EXISTS | ERR_INVALID_TARGET
    deleteCurrentPowerTask(): void
    getPowerTask(): PowerConstant | undefined
    hangPowerTask(): void

    // creep 发布 api
    releaseCreep(role: BaseRoleConstant | AdvancedRoleConstant): ScreepsReturnCode
    addRemoteCreepGroup(remoteRoomName: string)
    addRemoteReserver(remoteRoomName): void
    addRemoteHelper(remoteRoomName): void
    removePbHarvesteGroup(attackerName: string, healerName: string): void
    spawnPbCarrierGroup(flagName: string, number: number): void

    /**
     * 下述方法在 @see /src/mount.room.ts 中定义
     */
    // 孵化队列 api
    addSpawnTask(taskName: string): number | ERR_NAME_EXISTS
    hasSpawnTask(taskName: string): boolean
    clearSpawnTask(): void
    hangSpawnTask(): void

    // 中央物流 api
    addCenterTask(task: ITransferTask, priority?: number): number
    hasCenterTask(submit: CenterStructures | number): boolean
    hangCenterTask(): number
    handleCenterTask(transferAmount: number): void
    getCenterTask(): ITransferTask | null
    deleteCurrentCenterTask(): void

    // 房间物流 api
    addRoomTransferTask(task: RoomTransferTasks, priority?: number): number
    hasRoomTransferTask(taskType: string): boolean
    getRoomTransferTask(): RoomTransferTasks | null
    handleLabInTask(resourceType: ResourceConstant, amount: number): boolean
    deleteCurrentRoomTransferTask(): void

    // 工厂 api
    setFactoryTarget(resourceType: ResourceConstant): string
    getFactoryTarget(): ResourceConstant | null
    clearFactoryTarget(): string

    // 资源共享 api
    giver(roomName: string, resourceType: ResourceConstant, amount?: number): string
    shareRequest(resourceType: ResourceConstant, amount: number): boolean
    shareAddSource(resourceType: ResourceConstant): boolean
    shareRemoveSource(resourceType: ResourceConstant): void
    shareAdd(targetRoom: string, resourceType: ResourceConstant, amount: number): boolean

    // boost api
    boost(boostType: string, boostConfig: IBoostConfig): OK | ERR_NAME_EXISTS | ERR_NOT_FOUND | ERR_INVALID_ARGS | ERR_NOT_ENOUGH_RESOURCES
    boostCreep(creep: Creep): OK | ERR_NOT_FOUND | ERR_BUSY | ERR_NOT_IN_RANGE

    // 禁止通行点位 api
    addRestrictedPos(creepName: string, pos: RoomPosition): void
    getRestrictedPos(): { [creepName: string]: string }
    removeRestrictedPos(creepName: string): void

    // 战争相关
    startWar(boostType: BoostType): OK | ERR_NAME_EXISTS | ERR_NOT_FOUND | ERR_INVALID_TARGET
    stopWar(): OK | ERR_NOT_FOUND

    // 获取房间中的有效能量来源
    getAvailableSource(): StructureTerminal | StructureStorage | StructureContainer | Source

    // 自动规划相关
    findBaseCenterPos(): RoomPosition[]
    confirmBaseCenter(targetPos?: RoomPosition[]): RoomPosition | ERR_NOT_FOUND
    setBaseCenter(pos: RoomPosition): OK | ERR_INVALID_ARGS
    planLayout(): string
    addRemote(remoteRoomName: string, targetId: string): OK | ERR_INVALID_TARGET | ERR_NOT_FOUND
    removeRemote(remoteRoomName: string, removeFlag?: boolean): OK | ERR_NOT_FOUND
    claimRoom(targetRoomName: string, signText?: string): OK
    registerContainer(container: StructureContainer): OK
    clearStructure(): OK | ERR_NOT_FOUND
}

interface RoomPosition {
    directionToPos(direction: DirectionConstant): RoomPosition | undefined
    getFreeSpace(): RoomPosition[]
}

type ObserverResource = 'powerBank' | 'deposit'

/**
 * 工厂的任务队列中的具体任务配置
 */
interface IFactoryTask {
    // 任务目标
    target: CommodityConstant,
    // 该任务要生成的数量
    amount: number
}

/**
 * 房间内存
 */
interface RoomMemory {
    // 由驻守在房间中的 pc 发布，包含了 pc 拥有对应的能力
    // 形如: "1 3 13 14"，数字即为对应的 PWR_* 常量
    powers?: string

    // 该房间的生产队列，元素为 creepConfig 的键名
    spawnList?: string[]
    // 该房间禁止通行点的存储
    // 键为注册禁止通行点位的 creep 名称，值为禁止通行点位 RoomPosition 对象的序列字符串
    restrictedPos?: {
        [creepName: string]: string
    }

    // 基地中心点坐标, [0] 为 x 坐标, [1] 为 y 坐标
    center: [ number, number ]
    // 基地中心的待选位置, [0] 为 x 坐标, [1] 为 y 坐标
    centerCandidates?: [ number, number ][]
    // 是否关闭自动布局，该值为 true 时将不会对本房间运行自动布局
    noLayout: boolean

    // observer 内存
    observer: {
        // 上个 tick 已经 ob 过的房间名
        checkRoomName?: string
        // 遍历 watchRooms 所使用的索引
        watchIndex: number
        // 监听的房间列表
        watchRooms: string[]
        // 当前已经找到的 powerBank 和 deposit 的数量，observer 找到后会增加该数值，采集 creep 采集完之后会减少该数值
        pbNumber: number
        depositNumber: number
        // 和上面两个对应，分别是 powerBank 和 deposit 的查找上限，由玩家通过 api 指定。两者默认值均为 1
        pbMax: number
        depositMax: number
        // 是否暂停，为 true 时暂停
        pause?: boolean
    }
    // 中央集群的资源转移任务队列
    centerTransferTasks: ITransferTask[]
    // 房间物流任务队列
    transferTasks: RoomTransferTasks[]
    // power 任务请求队列
    // 由建筑物发布，powerCreep 查找任务时会优先读取该队列
    powerTasks: PowerConstant[]

    // 建筑工的当前工地目标，用于保证多个建筑工的工作统一以及建筑工死后不会寻找新的工地
    constructionSiteId: string
    // 建筑工特有，当前正在修建的建筑类型，用于在修建完成后触发对应的事件
    constructionSiteType?: StructureConstant
    // 建筑工地的坐标，用于在建造完成后进行 lookFor 来确认其是否成功修建了建筑
    constructionSitePos: number[]

    // 工厂内存
    factory: {
        // 当前房间的等级，由用户指定
        level?: 1 | 2 | 3 | 4 | 5
        // 下个顶级产物索引
        targetIndex: number
        // 本工厂参与的生产线类型
        depositTypes?: DepositConstant[]
        // 当该字段为真并且工厂在冷却时，就会执行一次底物是否充足的检查，执行完就会直接将该值移除
        produceCheck?: boolean
        // 当前工厂所处的阶段
        state: string
        // 工厂生产队列
        taskList: IFactoryTask[]
        // 工厂是否即将移除
        // 在该字段存在时，工厂会搬出所有材料，并在净空后移除 room.factory 内存
        // 在净空前手动删除该字段可以终止移除进程
        remove?: true
        // 工厂是否暂停，该属性优先级高于 sleep，也就是说 sleep 结束的时候如果有 pause，则工厂依旧不会工作
        pause?: true
        // 工厂休眠时间，如果该时间存在的话则工厂将会待机
        sleep?: number
        // 休眠的原因
        sleepReason?: string
        // 玩家手动指定的目标，工厂将一直合成该目标
        specialTraget?: CommodityConstant
    }

    // 终端监听矿物列表
    // 数组中每一个字符串都代表了一个监听任务，形如 "0 0 power"，第一位对应 TerminalModes，第二位对应 TerminalChannels，第三位对应资源类型
    terminalTasks: string[]
    // 房间内终端缓存的订单id
    targetOrderId: string
    // 当前终端要监听的资源索引
    terminalIndex: number

    // 房间内的资源和建筑 id
    mineralId: string
    factoryId: string
    extractorId: string
    powerSpawnId: string
    nukerId: string
    observerId: string
    sourceIds: string[]
    sourceContainersIds: string[]

    // 中央 link 的 id
    centerLinkId?: string
    // 升级 link 的 id
    upgradeLinkId?: string

    // 一个游戏时间，标注了 mineral 什么时候会回满
    // 由 miner 发布，Extractor 会监听这个字段，并在适当的时间重新发布 mineral
    mineralCooldown: number

    // 外矿专用内存字段
    remote: {
        // 外矿房间名
        [roomName: string]: {
            // 该外矿什么时候可以恢复采集，在被入侵时触发
            disableTill?: number
            // 该外矿要把能量运到哪个建筑里，保存下来是为了后面方便自动恢复外矿采集
            targetId: string
        }
    }

    // 当前被 repairer 或 tower 关注的墙
    focusWall: {
        id: string
        endTime: number
    }

    // 当前房间所处的防御模式
    // defense 为基础防御，active 为主动防御，该值未定义时为日常模式
    defenseMode?: 'defense' | 'active'

    // 该房间要执行的资源共享任务
    shareTask: IRoomShareTask

    /**
     * lab 集群所需的信息
     * @see doc/lab设计案
     */
    lab?: {
        // 当前集群的工作状态
        state: string
        // 当前生产的目标产物索引
        targetIndex: number
        // 当前要生产的数量
        targetAmount?: number
        // 底物存放 lab 的 id
        inLab: string[]
        // 产物存放 lab 的 id
        outLab: {
            [labId: string]: number
        }
        // 反应进行后下次反应进行的时间，值为 Game.time + cooldown
        reactionRunTime?: number
        // lab 是否暂停运行
        pause: boolean
    }

    /**
     * 战争状态
     */
    war?: { }

    /**
     * boost 强化任务
     * @see doc/boost设计案
     */
    boost?: BoostTask

    // powerSpawn 是否暂停
    pausePS?: boolean
}

// 所有房间物流任务
type RoomTransferTasks = IFillTower | IFillExtension | IFillNuker | ILabIn | ILabOut | IBoostGetResource | IBoostGetEnergy | IBoostClear | IFillPowerSpawn

// 房间物流任务 - 填充拓展
interface IFillExtension {
    type: string
}

// 房间物流任务 - 填充塔
interface IFillTower {
    type: string
    id: string
}

// 房间物流任务 - 填充核弹
interface IFillNuker {
    type: string
    id: string
    resourceType: ResourceConstant
}

// 房间物流任务 - 填充 PowerSpawn
interface IFillPowerSpawn {
    type: string
    id: string
    resourceType: ResourceConstant
}

// 房间物流任务 - lab 底物填充
interface ILabIn {
    type: string
    resource: {
        id: string
        type: ResourceConstant
        amount: number
    }[]
}

// 房间物流任务 - lab 产物移出
interface ILabOut {
    type: string
    resourceType: ResourceConstant
}

// 房间物流任务 - boost 资源填充
interface IBoostGetResource {
    type: string
}

// 房间物流任务 - boost 能量填充
interface IBoostGetEnergy {
    type: string
}

// 房间物流任务 - boost 资源清理
interface IBoostClear {
    type: string
}

interface transferTaskOperation {
    // creep 工作时执行的方法
    target: (creep: Creep, task: RoomTransferTasks) => boolean
    // creep 非工作(收集资源时)执行的方法
    source: (creep: Creep, task: RoomTransferTasks, sourceId: string) => boolean
}

// 房间要执行的资源共享任务
// 和上面的资源共享任务的不同之处在于，该任务是发布在指定房间上的，所以不需要 source
interface IRoomShareTask {
    // 资源的接受房间
    target: string
    // 共享的资源类型
    resourceType: ResourceConstant,
    // 期望数量
    amount: number
}

interface Memory {
    // 是否显示 cpu 消耗
    showCost?: boolean

    // 核弹投放指示器
    // 核弹是否已经确认
    nukerLock?: boolean
    // 核弹发射指令集，键为发射房间，值为目标旗帜名称
    nukerDirective?: {
        [fireRoomName: string]: string
    }

    // 全局的喊话索引
    sayIndex?: number
    // 白名单，通过全局的 whitelist 对象控制
    // 键是玩家名，值是该玩家进入自己房间的 tick 时长
    whiteList: {
        [userName: string]: number
    }
    // 掠夺资源列表，如果存在的话 reiver 将只会掠夺该名单中存在的资源
    reiveList: ResourceConstant[]
    // 要绕过的房间名列表，由全局模块 bypass 负责。
    bypassRooms: string[]
    // 资源来源表
    resourceSourceMap: {
        // 资源类型为键，房间名列表为值
        [resourceType: string]: string[]
    },
    // 商品生产线配置
    commodities: {
        // 键为工厂等级，值为被设置成对应等级的工厂所在房间名
        1: string[]
        2: string[]
        3: string[]
        4: string[]
        5: string[]
    }
    // 所有 creep 的配置项，每次 creep 死亡或者新增时都会通过这个表来完成初始化
    creepConfigs: {
        [creepName: string]: {
            // creep 的角色名
            role: CreepRoleConstant,
            // creep 的具体配置项，每个角色的配置都不相同
            data: CreepData,
            // 执行 creep 孵化的房间名
            spawnRoom: string,
            // creep 孵化时使用的身体部件
            // 为 string 时则自动规划身体部件，为 BodyPartConstant[] 时则强制生成该身体配置
            bodys: BodyAutoConfigConstant | BodyPartConstant[]
        }
    }
    // 全局统计信息
    stats: {
        // GCl/GPL 升级百分比
        gcl?: number
        gclLevel?: number
        gpl?: number
        gplLevel?: number
        // CPU 当前数值及百分比
        cpu?: number
        // bucket 当前数值
        bucket?: number
        // 当前还有多少钱
        credit?: number

        // 已经完成的房间物流任务比例
        roomTaskNumber?: {
            [roomTransferTaskType: string]: number
        }

        /**
         * 房间内的数据统计
         */
        rooms: {
            [roomName: string]: {
                // storage 中的能量剩余量
                energy?: number
                // 终端中的 power 数量
                power?: number
                // nuker 的资源存储量
                nukerEnergy?: number
                nukerG?: number
                nukerCooldown?: number
                // 控制器升级进度，只包含没有到 8 级的
                controllerRatio?: number
                controllerLevel?: number

                // 其他种类的资源数量，由 factory 统计
                [commRes: string]: number
            }
        }
    }

    // 启动 powerSpawn 的房间名列表
    psRooms: string[]

    // 在模拟器中调试布局时才会使用到该字段，在正式服务器中不会用到该字段
    layoutInfo?: BaseLayout
    // 用于标记布局获取到了那一等级
    layoutLevel?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
}

interface FlagMemory {
    // deposit 旗帜特有，最长冷却时间
    depositCooldown?: number
    // 公路房旗帜特有，抵达目标需要的时间
    travelTime?: number
    // 公路房旗帜特有，travelTime 是否已经计算完成
    travelComplete?: boolean
    // 该旗帜下标注的资源 id
    sourceId?: string

    // 当前 powerbank 采集的状态
    state?: string

    // 因为外矿房间有可能没视野
    // 所以把房间名缓存进内存
    roomName?: string
}

type CenterStructures = STRUCTURE_STORAGE | STRUCTURE_TERMINAL | STRUCTURE_FACTORY | 'centerLink'

/**
 * 房间中央物流 - 资源转移任务
 */
interface ITransferTask {
    // 任务提交者类型
    // number 类型是为了运行玩家自己推送中央任务
    submit: CenterStructures | number
    // 资源的提供建筑类型
    source: CenterStructures
    // 资源的接受建筑类型
    target: CenterStructures
    // 资源类型
    resourceType:  ResourceConstant
    // 资源数量
    amount: number
}

/**
 * creep 的配置项列表
 */
interface ICreepConfigs {
    [creepName: string]: ICreepConfig
}

/**
 * bodySet
 * 简写版本的 bodyPart[]
 * 形式如下
 * @example { [TOUGH]: 3, [WORK]: 4, [MOVE]: 7 }
 */
interface BodySet {
    [MOVE]?: number
    [CARRY]?: number
    [ATTACK]?: number
    [RANGED_ATTACK]?: number
    [WORK]?: number
    [CLAIM]?: number
    [TOUGH]?: number
    [HEAL]?: number
}

// Link 拓展
interface StructureLink {
    work(): void
    to(targetId: string): void
    asCenter(): string
    asSource(): string
    asUpgrade(): string
}

/**
 * 从路径名到颜色的映射表
 */
interface IPathMap {
    [propName: string]: string
}

/**
 * 单个角色类型的身体部件配置
 * 其键代表房间的 energyAvailable 属性
 * 300 就代表房间能量为 0 ~ 300 时应该使用的身体部件，该区间前开后闭
 * 例如：房间的 energyAvailable 为 600，则就会去使用 800 的身体部件，
 */
type BodyConfig = {
    [energyLevel in 300 | 550 | 800 | 1300 | 1800 | 2300 | 5600 | 10000 ]: BodyPartConstant[]
}

/**
 * 基地布局信息
 */
type BaseLayout = {
    // 不同等级下应建造的建筑
    [controllerLevel in 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 ]: {
        // 该类型建筑应该被放置在什么地方
        [structureType in StructureConstant]?: [ number, number ][] | null
    }
}

/**
 * 身体配置项类别
 * 包含了所有角色类型的身体配置
 */
type BodyConfigs = {
    [type in BodyAutoConfigConstant]: BodyConfig
}

interface StructureTerminal {
    addTask(resourceType: ResourceConstant, amount: number, mod?: TerminalModes, channel?: TerminalChannels, priceLimit?: number): void
    add(resourceType: ResourceConstant, amount: number, mod?: TerminalModes, channel?: TerminalChannels, priceLimit?: number): string
    removeByType(type: ResourceConstant, mod: TerminalModes, channel: TerminalChannels): void
    remove(index: number): string
    show(): string
}

/**
 * 终端监听规则类型
 * 具体值详见 ./setting.ts > terminalModes
 */
type ModeGet = 0
type ModePut = 1
type TerminalModes = ModeGet | ModePut

/**
 * 终端监听规则的资源渠道
 * 具体值详见 ./setting.ts > terminalChannels
 */
type ChannelTake = 0
type ChannelRelease = 1
type ChannelShare = 2
type TerminalChannels = ChannelTake | ChannelRelease | ChannelShare

// 终端监听任务，详见 doc/终端设计案
interface TerminalListenerTask {
    // 要监听的资源类型
    type: ResourceConstant
    // 期望数量
    amount: number
    // 监听类型
    mod: TerminalModes
    // 渠道: market, share
    channel: TerminalChannels
    // 价格限制
    priceLimit?: number
}

// 反应底物表接口
interface IReactionSource {
    [targetResourceName: string]: string[]
}

/**
 * 强化配置项
 * 详情 doc/boost 强化案
 */
interface IBoostConfig {
    [resourceType: string]: number
}

/**
 * PowerCreep 内存拓展
 */
interface PowerCreepMemory {
    // 为 true 时执行 target，否则执行 source
    working: boolean
    // 接下来要检查哪个 power
    powerIndex: number
    // 当前要处理的工作
    // 字段值均为 PWR_* 常量
    // 在该字段不存在时将默认执行 PWR_GENERATE_OPS（如果 power 资源足够并且 ops 不足时）
    task: PowerConstant
    // 工作的房间名，在第一次出生时由玩家指定，后面会根据该值自动出生到指定房间
    workRoom: string

    // 要添加 REGEN_SOURCE 的 souce 在 room.sources 中的索引值
    sourceIndex?: number
}

/**
 * 每种 power 所对应的的任务配置项
 *
 * @property {} needExecute 该 power 的检查方法
 * @property {} run power 的具体工作内容
 */
interface IPowerTaskConfig {
    /**
     * power 的资源获取逻辑
     *
     * @returns OK 任务完成，将会执行下面的 target 方法
     * @returns ERR_NOT_ENOUGH_RESOURCES 资源不足，将会强制切入 ops 生成任务
     * @returns ERR_BUSY 任务未完成，保留工作状态，后续继续执行
     */
    source?: (creep: PowerCreep) => OK | ERR_NOT_ENOUGH_RESOURCES | ERR_BUSY
    /**
     * power 的具体工作逻辑
     *
     * @returns OK 任务完成，将会继续检查后续 power
     * @returns ERR_NOT_ENOUGH_RESOURCES 资源不足，将会执行上面的 source 方法，如果没有 source 的话就强制切入 ops 生成任务
     * @returns ERR_BUSY 任务未完成，保留工作状态，后续继续执行
     */
    target: (creep: PowerCreep) => OK | ERR_NOT_ENOUGH_RESOURCES | ERR_BUSY
}

/**
 * 所有 power 的任务配置列表
 */
interface IPowerTaskConfigs {
    [powerType: string]: IPowerTaskConfig
}

/**
 * 工厂 1-5 级能生产的顶级商品
 */
interface ITopTargetConfig {
    1: CommodityConstant[]
    2: CommodityConstant[]
    3: CommodityConstant[]
    4: CommodityConstant[]
    5: CommodityConstant[]
}

/**
 * boost 任务阶段
 * 仅在房间的 LAB_STATE 为 boost 时有效
 *
 * @type boostGet 获取资源, boost 进程的默认阶段
 * @type labGetEnergy 获取能量, 有 lab 能量不足时触发
 * @type waitBoost 等待强化，lab 在该阶段会一直等待直到 creep 调用强化
 * @type boostClear 清除资源，在强化完成后打扫 lab
 */
type BoostStats = 'boostGet' | 'labGetEnergy' | 'waitBoost' | 'boostClear'

/**
 * boost 资源配置类型
 *
 * @type WAR 对外战争
 * @type DEFENSE 主动防御
 */
type BoostType = 'WAR' | 'DEFENSE'

/**
 * boost 资源配置表
 * 规定了不同模式下需要往 lab 装填的资源类型
 */
type BoostResourceConfig = {
    [type in BoostType]: ResourceConstant[]
}

/**
 * 强化任务
 * 存放了房间进行 boost 所需的数据
 */
interface BoostTask {
    // 当前任务的所处状态
    state: BoostStats
    // 进行 boost 强化的位置
    pos: number[]
    // 要进行强化的材料以及执行强化的 lab
    lab: {
        [resourceType: string]: string
    }
    // 本次强化任务所用的类型
    type: BoostType
}