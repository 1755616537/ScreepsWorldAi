export const reportWrongExit = {
    /**  
    * 异常退出 - 报告模块
    * @param {string} text - 报告文本
    */
    run: function(text) {

        //控制台输出
        console.log(text + '异常退出');
        //邮箱输出
        Game.notify(text + '异常退出');

	}
};

//module.exports = reportWrongExit;