import mountCreep from './creep'
import mountPowerCreep from './powerCreep'
import mountRoom from './room'
import mountRoomPostion from './roomPosition'
import mountGlobal from './global'
import mountStructure from './structures'
import { planLayout } from 'modules/autoPlanning/planBaseLayout'

/**
 * 挂载所有的属性和方法
 */
export default function (): void {
    if (!global.hasExtension) {
        console.log('[mount] 重新挂载拓展')

        // 存储的兜底工作
        initStorage()

        // 挂载全部拓展
        mountGlobal()
        mountRoom()
        mountRoomPostion()
        mountCreep()
        mountPowerCreep()
        mountStructure()

        global.hasExtension = true

        workAfterMount()
    }
}

/**
 * 初始化存储
 */
function initStorage() {
    if (!Memory.rooms) Memory.rooms = {}
    else delete Memory.rooms.undefined

    if (!Memory.stats) Memory.stats = { rooms: {} }
    if (!Memory.creepConfigs) Memory.creepConfigs = {}
    if (!global.routeCache) global.routeCache = {}
    if (!global.resourcePrice) global.resourcePrice = {}
}

// 挂载完成后要执行的一些作业
function workAfterMount() {
    // 对所有的房间执行建筑规划，防止有房间缺失建筑
    Object.values(Game.rooms).forEach(room => {
        if (!room.controller || !room.controller.my) return
        planLayout(room)
    })

    // 把已经孵化的 pc 能力注册到其所在的房间上，方便房间内其他 RoomObject 查询并决定是否发布 power 任务
    Object.values(Game.powerCreeps).forEach(pc => {
        if (!pc.room) return
        pc.updatePowerToRoom()
    })
}