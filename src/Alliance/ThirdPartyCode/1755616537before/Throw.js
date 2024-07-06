let pro = {
	Error: (...e) => {
		clog(...e);
		throw new Error(...e);
	},
	
	errList:[],
	print:0,
	catchError (func,message){
	    try{
	        return func()
	    }catch (e) {
	        // if(Game.time!=pro_err.lastTick)pro_err.errList = []
	        // if(Game.creeps[message])Game.creeps[message].suicide()
	        let data = e.stack
	        if(message)data = "\n"+message+"\n"+e.stack
	        pro.errList.push(data+"\n\n**************\n")
	    }
	},
	throwAllError () {
	    if(pro.errList.length){
	        let tmp = pro.errList;
	        pro.errList = [];
	        if(!tmp.length){
	            pro.print=0;
	        }
	        if(pro.print){
	            pro.print+=1;
	            if(pro.print>10)pro.print=0;
	            console.log(tmp);
	        }
	        else{
	            pro.print+=1;
	            throw new Error(tmp);
	        }
	    }
	},
}

global.Throw = pro;

