import {isFunction, isObject} from "lodash";

type ModuleFunType = 'coverAll' | 'start' | 'middle' | 'end'

interface ModuleFunConfig {
    type: ModuleFunType,
    data: Function
}

// 模块式Function
export default function ModuleFun(start: Function, middle?: Function, end?: Function, fun?: ModuleFunConfig | Function) {
    if (fun && isObject(fun)) {
        const { type, data } = fun as ModuleFunConfig;
        if (type === 'coverAll') {
            return data();
        }
        if (type === 'start') start = data;
        if (type === 'middle') middle = data;
        if (type === 'end') end = data;
    }

    let return_start = start();
    if (return_start) {
        if (middle) {
            let return_middle;
            if (fun && isFunction(fun)) {
                return_middle = fun(return_start);
            } else {
                return_middle = middle(return_start);
            }

            if (return_middle) {
                if (end) {
                    let return_end = end(return_middle);
                    return return_end;
                }
            }
            return return_middle;
        }
    }
    return return_start;
}

// 覆盖全部
export function ModuleFun_coverAll(fun: Function) {
    return {
        type: 'coverAll',
        data: fun
    }
}

// 开始
export function ModuleFun_start(fun: Function) {
    return {
        type: 'start',
        data: fun
    }
}

// 中间
export function ModuleFun_middle(fun: Function) {
    return {
        type: 'middle',
        data: fun
    }
}

// 结束
export function ModuleFun_end(fun: Function) {
    return {
        type: 'end',
        data: fun
    }
}
