// -------------------------------初始化
global.factory={};
global.controller={}
// -------------------------------全局数据
require('pathData');
// -------------------------------工具
require("utils");
// -------------------------------工厂模块
require('factory.task')
require('factory.spawn')
require('factory.creep')
require('factory.creep.Harvester')
require('factory.creep.Upgrader')
require('factory.creep.Builder')
// -------------------------------控制器
require('controller.task')
require('controller.creep')
// -------------------------------默认执行的初始化程序
module.exports=function(){
	clog('挂载拓展')
	clog("脚本加载 Time " + Game.time + " , bucket " + Game.cpu.bucket);
	
	// 客户端汉化显示
	(function(){
		colg('客户端汉化显示加载')
		console.log(`<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>` );
	}())
}




