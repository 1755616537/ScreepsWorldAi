// declare let globalThis: typeof globalThis;
import _ from "lodash";

declare global {
    const _: typeof _;
    var globalData: GlobalData;
    var factory_: any;
    var controller_: any;
    var Task_: any;
    var ChainedFun_: any;

    namespace NodeJS {
        interface Global {
            log: any;

            // 全局缓存的订单价格表
            resourcePrice: {
                // 键为资源和订单类型，如："energy/buy"、"power/sell"，值是缓存下来的订单价格
                [resourceKey: string]: number
            }
        }
    }

    var globalThis: {

    }

}

declare module NodeJS {
    // 全局对象
    interface Global {

    }
}
// export {};