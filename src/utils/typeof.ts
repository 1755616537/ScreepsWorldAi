// 类型判断
export default {
    isArray(value) {
        return Array.isArray(value);
    },
    isObject(value) {
        return typeof value === 'object' && value !== null;
    },
    isFunction(value) {
        return typeof value === 'function';
    },
    isString(value) {
        return typeof value === 'string';
    },
    isNumber(value) {
        return typeof value === 'number';
    },
    isBoolean(value) {
        return typeof value === 'boolean';
    },
}