// -------------------------------初始化
global.factory={};
global.controller={}
// -------------------------------全局数据
require('pathData');
// -------------------------------工具
// require("utils");
// -------------------------------factory
require('factory.task')
require('factory.spawn')
// 挂载 creep 管理模块
require('factory.creep')
// 挂载 creep 拓展
// require('factory.creep.mount')

require('factory.creep.Harvester')
require('factory.creep.Upgrader')
require('factory.creep.Builder')
// -------------------------------controller
require('controller.task')
require('controller.creep')
// -------------------------------默认执行的初始化程序
module.exports=function(){
	// clog('挂载拓展')
	// clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);
	
	(function(){
		`<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>` 
		console.log(`<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>` );
	}())
}




