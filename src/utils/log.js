global.clog = function (...e) {
    if (globalData.clog) console.log(...e)
};
global.log = function (...e) {
    if (globalData.clog) console.log(JSON.stringify(e))
};