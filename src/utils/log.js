clog = function (...e) {
    if (globalData.clog) console.log(...e)
};
log = function (...e) {
    if (globalData.clog) console.log(JSON.stringify(e))
};