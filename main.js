module.exports.loop = function() {
	console.log(Game.cpu)
	var target = Game.spawns.Spawn1;
	for (var i in Game.creeps) {
		Game.creeps[i].moveTo(target);
	}
}