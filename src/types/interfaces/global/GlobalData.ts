// 全局数据
interface GlobalData {
    // 总输出
    clog: boolean;
    // 【不用填写，会自动获取】当前使用代码的用户名
    username: string;
    // 白名单用户名(房间防护)(Alliance联盟中的用户名称会自动添加到白名单中)
    RoomProtectionWhitelistUsername: string[];
    // 白名单用户名(不攻击等)(Alliance联盟中的用户名称会自动添加到白名单中)
    WhitelistUsername: string[];
    // 联盟信息
    Alliance: {
        // 游戏用户名称
        [username: string]: AllianceRoom;
    };
    // 房间 【不用填写，会自动获取】
    rooms: object; // 或者定义具体的房间结构，这里使用Record简化处理
    // 全部房间配置
    roomsAllAllocation: {
        // 是否开启强制统一房间配置
        on: boolean;
        // 配置内容（当遇到房间配置没有单独配置时，自动使用以下为默认配置）
        content: {
            // 自动安全(受到攻击自动开启)
            AutomaticSecurity?: boolean;
            // 采集者自动分配矿区
            AutomaticAssignHarvest?: boolean;
            // 自动分配建设采集区的CONTAINER
            AutomaticAssignHarvestCONTAINER?: boolean;
            // 自动分配建设控制器区的CONTAINER
            AutomaticAssignControllerCONTAINER?: boolean;
        };
    };
    // 角色配置
    creepConfigs: {
        // 采集
        harvest: HarvesterConfig;
        // 升级者
        upgrader: BaseCreepConfig;
        // 建造者
        builder: BaseCreepConfig;
        // 运输者
        carrier: CarrierConfig;
        // 维修者
        repairer: RepairerConfig;
        // 防御者-近战
        nearDefender: BaseCreepConfig;
        // 防御者-远战
        farDefender: BaseCreepConfig;
        // 治疗者
        theHealer: BaseCreepConfig;
        // 占领者
        occupier: BaseCreepConfig;
    };
    // 移动
    Move: {
        // 工作颜色
        WorkColor: string;
        // 获取资源颜色
        WorkResourceColor: string;
    };
    creeps: object;
    readonly harvest: string;
    readonly upgrader: string;
    readonly builder: string;
    readonly carrier: string;
    readonly repairer: string;
    readonly nearDefender: string;
    readonly farDefender: string;
    readonly occupier: string;
    readonly theHealer: string;
    // 角色部件配置
    readonly creepComponentConfigs: {
        [part: string]: number;
    };
    // Emoji符号
    readonly structuresShape: {
        [structureType: string]: string;
    };
}

// 定义身体部件类型
// type BodyPartConstant = WORK | CARRY | MOVE | ATTACK | RANGED_ATTACK | HEAL | TOUGH | CLAIM;

// 定义身体配置的基本结构
interface BaseBodyConfig {
    // 身体部件列表
    list: BodyPartConstant[];
    // 总能量数量（达到该植才允许生产,可以设比生产所需高点达到预留能量的效果,避免能量直接用完）
    totalEnergyRequired: number;
}

// 定义角色配置的基本结构
interface BaseCreepConfig {
    /*
     普通版

     采集（6*WORK已经是1对1能量源300秒采集3000的极限，多了会浪费,5*WORK勉强剩余450多能量）
    */
    bodys: BaseBodyConfig;
    // 缩减版
    bodysMinus?: BaseBodyConfig;
    /*
     加强版

     采集（没带carry部件或者满了，再采集能量会自动掉脚下，如果脚下有容器就会自动进容器）
    */
    bodysPlus?: BaseBodyConfig;
    // 总上限数量
    number: number;
    // 自动缩减配置,当房间内总容量不足时
    AutomaticConfigurationDownsizing: boolean;
}

// 定义扩展特定于角色的配置 采集
interface HarvesterConfig extends BaseCreepConfig {
    // 自动分配数量（开启 AutomaticAssignHarvest可以根据最大支持数量动态更新采集者数量）
    AutomaticAssignNum?: boolean;
    // 自动分配根据可用能量容量上限调整bodys
    AutomaticAssignBodysEnergyCapacityAvailable?: boolean;
}

// 定义扩展特定于角色的配置 运输
interface CarrierConfig extends BaseCreepConfig {
    // 矿区CONTAINER是否1v1运送
    sourceContainer1v1?: boolean;
}

// 定义扩展特定于角色的配置 维修
interface RepairerConfig extends BaseCreepConfig {
    // tower创建拥有能量的时候不生成维修者
    onTower?: boolean;
}

// 联盟信息
interface AllianceRoom {
    rooms: {
        // 【可以不填写，会自动获取】房间名称
        [roomId: string]: {
            spawns?: {
                // 【可以不填写，会自动获取】基地名称
                [spawnId: string]: {};
            };
            // 【可以不填写，会自动获取】自动安全(受到攻击自动开启)
            AutomaticSecurity?: boolean;
            // 【可以不填写，会自动获取】采集者自动分配矿区
            AutomaticAssignHarvest?: boolean;
            // 【可以不填写，会自动获取】自动分配建设采集区的CONTAINER
            AutomaticAssignHarvestCONTAINER?: boolean;
            // 【可以不填写，会自动获取】自动分配建设控制器区的CONTAINER
            AutomaticAssignControllerCONTAINER?: boolean;
        };
    };
}