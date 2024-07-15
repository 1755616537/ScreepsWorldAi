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