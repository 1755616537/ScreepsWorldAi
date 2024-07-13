import Throw from "../../../../utils/Throw.js";

class Aask {
    constructor() {
        this.list = []
    }

    add = function (val) {
        if (!val) return false;
        this.list.push(val);
        return true;
    }

    remove = function (index) {
        if (!index) {
            this.list.pop();
        } else {
            this.list.splice(index, 1);
        }
        return true;
    }

    get = function (index) {
        if (this.list.length < 1) Throw.Error('任务列表为空');
        if (!index) return this.list[0];
        return this.list[index];
    }
}
export default Aask