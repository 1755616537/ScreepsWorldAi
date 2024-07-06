// 链式Function
class ChainedFun {
    private _end_: boolean;
    protected readonly logList: object;
    protected readonly logListName: string;
    protected _index_: number;

    constructor(logList: object, logListName: string) {
        this.logList = logList;
        this.logListName = logListName;
        // 当前链Function的第几个
        this._index_ = 0;
        // 是否允许通过执行下一个函数
        this._end_ = false;
    }

    /**
     * 检测之前的函数是否成功通过
     *
     * if (this._return_ini()) return this;
     */
    _ini_() {
        this._index_++;
        if (this._end_ || this._index_ < (this.logList[this.logListName] || 0)) {
            return true;
        } else {
            this._end_ = true;
            return false;
        }
    }

    /**
     * 允许通过执行下一个函数
     *
     * if (this._return_pass()) return this;
     */
    _pass_() {
        this._end_ = false;
        this.logList[this.logListName] = this._index_;
        return true;
    }

    // 重置顺序
    _reset_(){
        if (this.logList[this.logListName]){
            if (this.logList[this.logListName] == this._index_) {
                this.logList[this.logListName] = undefined;
                return this;
            }
        }
    }

    // 中间件 返回this
    funThis(fun: Function): this {
        if (this._ini_()) return this;
        this._reset_();
        if (fun()) this._pass_();
        return this;
    }

    // 中间件
    fun(fun) {
        if (this._ini_()) return;
        fun();
    }
}

export default ChainedFun