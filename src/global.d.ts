// declare let globalThis: typeof globalThis;
declare global {
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
        room: string;
        working: boolean;
    }

    namespace NodeJS {
        interface Global {
            log: any;
        }
    }
}
// export {};