// 代码中文解释
/// <reference types="@screepscn/types" />

// 拓展总入口
require("main_mount");

console.log("脚本重新加载 Time "+Game.time+" , bucket "+Game.cpu.bucket);

module.exports.loop = function() {
	controller.creep.run();
}