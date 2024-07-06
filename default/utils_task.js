

let pro={
    cloneTask(task,taskName=undefined){
        let newTask = {};
        for (let i in task) {
            newTask[i] = task[i];
        }
        if(taskName)newTask.taskName=taskName;
        return newTask;
    },
    task (obj,taskName,registerFuncName,ops = {}) {
        let newTask ={
            taskName:taskName,
            id:obj.id,
            roomName:obj.room.name,
            x:obj.pos.x,
            y:obj.pos.y,
            regFun:registerFuncName
        };
        for (let i in ops) {
            newTask[i] = ops[i];
        }
        return newTask;
    },
    taskOutView (id,roomName,x,y,taskName,registerFuncName,ops = {}) {
        let newTask ={
            taskName:taskName,
            id:id,
            roomName:roomName,
            x:x,
            y:y,
            regFun:registerFuncName
        };
        for (let i in ops) {
            newTask[i] = ops[i];
        }
        return newTask;
    },
    taskFlag (flag,taskName,registerFuncName,ops = {}) {
        let newTask ={
            taskName:taskName,
            id:flag.name,
            regFun:registerFuncName
        };
        for (let i in ops) {
            newTask[i] = ops[i];
        }
        return newTask;
    },
    taskData (taskName,registerFuncName,ops = {}) {
        let newTask ={
            taskName:taskName,
            regFun:registerFuncName
        };
        for (let i in ops) {
            newTask[i] = ops[i];
        }
        return newTask;
    },
};

global.UtilsTask=pro;
