// declare let globalThis: typeof globalThis;
import _ from "lodash";

declare global {
    const _: typeof _;
    var globalData: GlobalData;
    var factory_: any;
    var controller_: any;
    var Task_: any;
    var ChainedFun_: any;

    interface Memory {
        uuid: number;
        log: any;
    }

    interface CreepMemory {
        role: string;
    }

    namespace NodeJS {
        interface Global {
            log: any;
        }
    }

}
// export {};