// 本项目中出现的颜色常量
type Colors = 'green' | 'blue' | 'yellow' | 'red'

/**
 * 交易的合理范围
 * 将以昨日该资源的交易范围为基准，上(MAX)下(MIN)浮动出一个区间，超过该区间的订单将被不会交易
 * 如果没有特别指定的话将以 default 指定的区间为基准
 */
type DealRatios = {
    [resType in ResourceConstant | 'default']?: {
        // 卖单的最高价格
        MAX: number,
        // 买单的最低价格
        MIN: number
    }
}

/**
 * creep 发布计划职责链上的一个节点
 *
 * @param detail 该 creep 发布所需的房间信息
 * @returns 代表该发布计划是否适合房间状态
 */
type PlanNodeFunction = (detail: UpgraderPlanStats | HarvesterPlanStats | TransporterPlanStats) => boolean

// 房间中用于发布 upgrader 所需要的信息
interface UpgraderPlanStats {
    // 房间对象
    room: Room
    // 房间内的控制器等级
    controllerLevel: number
    // 控制器还有多久降级
    ticksToDowngrade: number
    // source 建造好的 container 的 id
    sourceContainerIds: string[]
    // 房间内 storage 的 id，房间没 storage 时该值为空，下同
    storageId?: string
    // 房间内 terminal 的 id，房间没 terminal 时该值为空，下同
    terminalId?: string
    // 房间内 upgradeLink 的 id
    upgradeLinkId?: string
    // storage 中有多少能量
    storageEnergy?: number
    // terminal 中有多少能量
    terminalEnergy?: number
}

// 房间中用于发布 harvester 所需要的信息
interface HarvesterPlanStats {
    // 房间对象
    room: Room
    // 房间内 source 的 id 和其配套的 link id
    sources: {
        id: string
        linkId: string
    }[]
    // 房间内 storage 的 id，房间没 storage 时该值为空，下同
    storageId?: string
    // 房间内中央 link 的 id
    centerLinkId?: string
}

// 房间中用于发布 filler manager processor 所需要的信息
interface TransporterPlanStats {
    // 房间对象
    room: Room
    // 房间内 storage 的 id，房间没 storage 时该值为空，下同
    storageId?: string
    // 房间内中央 link 的 id
    centerLinkId?: string
    // source 建造好的 container 的 id
    sourceContainerIds?: string[]
    // 基地中心点（processor的位置）坐标
    centerPos?: [ number, number ]
}

// 发布角色配置项需要的素材集合
interface ReleasePlanConstructor<T> {
    // 搜集发布该角色需要的房间信息
    getStats: (room: Room) => T
    // 发布计划的集合，会根据收集到的房间信息选择具体的计划
    plans: PlanNodeFunction[]
}

// 所有使用发布计划的角色
interface CreepReleasePlans {
    harvester: ReleasePlanConstructor<HarvesterPlanStats>
    upgrader: ReleasePlanConstructor<UpgraderPlanStats>
    transporter: ReleasePlanConstructor<TransporterPlanStats>
}