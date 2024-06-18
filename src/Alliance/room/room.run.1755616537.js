export default function (_this, objectFun) {
    let roomName = globalData.rooms[0].name;

    switch (roomName) {
        case 'W47S54':
            // CONTAINER+EXTENSION+STORAGE能量统计
            objectFun.SetContainerExtensionStorageEnergyStat(roomName);
            // 能量源区Container记录管理
            objectFun.sourceContainer(roomName);
            // 控制器Container记录管理
            objectFun.controllerContainer(roomName);
            // 采集建造CONTAINER记录管理
            objectFun.harvestBuildCONTAINER(roomName);

            let roomName2 = globalData.rooms[1].name;
            // 临时外部房间,升级
            objectFun.upgraderOuterRoom(roomName2);
            // 临时外部房间,建造
            // objectFun.builderOuterRoom(roomName2);

            let roomName3 = '';
            // 临时外部房间,升级
            objectFun.upgraderOuterRoom(roomName3);
            // 临时外部房间,建造
            objectFun.builderOuterRoom(roomName3);
            break;
        default:
            // CONTAINER+EXTENSION+STORAGE能量统计
            objectFun.SetContainerExtensionStorageEnergyStat(roomName);

            // 能量源区Container记录管理
            objectFun.sourceContainer(roomName);
            // 控制器Container记录管理
            objectFun.controllerContainer(roomName);
            // 采集建造CONTAINER记录管理
            objectFun.harvestBuildCONTAINER(roomName);
    }
}