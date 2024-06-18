// 联盟 房间
export default [
    {
        name: globalData.Alliance[0].username,
        run: function (_this, objectFun) {
            let roomName = globalData.rooms[0].name;

            if (globalData.rooms[0].name == 'W47S54') {
                let roomName2 = globalData.rooms[1].name;

                // CONTAINER+EXTENSION+STORAGE能量统计
                objectFun.containerExtensionStorageEnergyStat(roomName);
                // 能量源区Container记录管理
                objectFun.sourceContainer(roomName);
                // 控制器Container记录管理
                objectFun.controllerContainer(roomName);
                // 采集建造CONTAINER记录管理
                objectFun.harvestBuildCONTAINER(roomName);

                // 临时外部房间,升级
                objectFun.upgraderOuterRoom(roomName2);
                // 临时外部房间,建造
                // objectFun.builderOuterRoom(roomName2);
            } else {
                // CONTAINER+EXTENSION+STORAGE能量统计
                objectFun.containerExtensionStorageEnergyStat(roomName);

                // 能量源区Container记录管理
                objectFun.sourceContainer(roomName);
                // 控制器Container记录管理
                objectFun.controllerContainer(roomName);
                // 采集建造CONTAINER记录管理
                objectFun.harvestBuildCONTAINER(roomName);
            }

        }
    }
]