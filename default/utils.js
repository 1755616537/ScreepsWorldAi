Array.prototype.flat = function() {
	return _.flatten(this)
};
// Array.prototype.reduce= function(func){return _.reduce(this,func)};
Array.prototype.zip = function(another) {
	return _.zip(this, another)
};
Array.prototype.contains = function(another) {
	return _.includes(this, another)
};
Array.prototype.take = function(n) {
	return _.take(this, n)
};
Array.prototype.head = function() {
	return _.head(this)
};
Array.prototype.last = function() {
	return _.last(this)
};
Array.prototype.without = function(...e) {
	return _.without(this, ...e)
};
Array.prototype.sum = function(...e) {
	return _.sum(this, ...e)
};
Array.prototype.toSet = function() {
	return new Set(this)
};
Array.prototype.toMap = function() {
	return this.reduce((map, entry) => {
		map[entry[0]] = entry[1];
		return map
	}, {})
};
Array.prototype.find = function(...e) {
	return _.find(this, ...e)
};
Array.prototype.maxBy = function(func) {
	return this.reduce((ori, another) => func(ori) >= func(another) ? ori : another, this[0])
};
Array.prototype.minBy = function(func) {
	return this.reduce((ori, another) => func(ori) < func(another) ? ori : another, this[0])
};
Array.prototype.log = function() {
	console.log(JSON.stringify(this));
	return this
};
Array.prototype.randomGet = function() {
	return this[Math.floor(this.length * Math.random())]
};

let base36 = Math.pow(36, 10)
randomId = () => _.padLeft(Math.ceil(Math.random() * base36).toString(36).toLocaleUpperCase(), 10, "0")

let posCodeNumberMap = {};
let posCodeCharMap = {};
// pos 转换 char 用的
(function() {
	let a = 'a'.charCodeAt(0)
	let A = 'A'.charCodeAt(0)
	for (let i = 0; i < 25; i++) {
		let b = String.fromCharCode(a + i)
		let j = 25 + i
		let B = String.fromCharCode(A + i)
		posCodeNumberMap[i] = b
		posCodeCharMap[b] = i
		posCodeNumberMap[j] = B
		posCodeCharMap[B] = j
	}
}())


let pro = {
	randomGet(array) {
		return array[Math.floor(array.length * Math.random())]
	},
	getBodyEnergyNeed(body) {
		let need = 0;
		body.forEach(e => {
			if (BODYPART_COST[e]) need += BODYPART_COST[e]
		});
		return need;
	},
	/*
	let str = Utils.encodePosArray(Memory.rooms.W5N8.structMap.constructedWall.map(e=>{return {x:e[0],y:e[1]}}))
	log(str)
	let arrs = Utils.decodePosArray(str)
	log(arrs)
	log(Memory.rooms.W5N8.structMap.constructedWall.map(e=>{return {x:e[0],y:e[1]}}))
	*/
	encodePosArray(posArray) {
		return posArray.map(e => posCodeNumberMap[e.x] + posCodeNumberMap[e.y]).reduce((a, b) => a + b, "")
	},
	decodePosArray(string) {
		let out = []
		for (let i = 0; i < string.length; i += 2) {
			out.push({
				x: posCodeCharMap[string[i]],
				y: posCodeCharMap[string[i + 1]]
			})
		}
		return out;
	},
	hashCode(str) {
		let hash = 5381;
		for (let i = 0; i < str.length; i++) {
			let char = str.charCodeAt(i);
			hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
		}
		return hash
	},
	//线性同余随机数
	rnd(seed) {
		return (seed * 9301 + 49297) % 233280; //为何使用这三个数?
	},
	randomInt(start, end) {
		if (end == undefined) {
			end = start
			start = 0
		}
		let range = end - start
		return start + Math.floor(Math.random() * range)
	},


	cn: function screepsCN() {
		clog("【客户端汉化显示加载】【开始】 Time " + Game.time);
		console.log(
			`<script src="https://screeps-cn.gitee.io/screeps-chinese-pack-release/main.js" async defer></script>`
		);
		clog("【客户端汉化显示加载】【完成】 Time " + Game.time);
	},
	notify(message, onTime = true, groupInterval = 0) {
		if (!Memory.notifyList) Memory.notifyList = [];
		let time = Game.time;
		let notifyList = Memory.notifyList;
		let notifyList2 = [];
		let on = false;
		for (var i = 0; i < notifyList.length; i++) {
			if (notifyList[i].message == message) {
				on = true;
			}
			if (Game.time - notifyList[i].time <= 60) notifyList2.push(notifyList[i]);
		}
		if (on) return;
		notifyList2.push({
			message: message,
			time: time
		})
		Memory.notifyList = notifyList2;
		if (onTime) {
			Game.notify(`Time ${time} ${message}`, groupInterval);
		} else {
			Game.notify(message, groupInterval);
		}
	}
};


global.Utils = pro;