let pro = {
	Error: (...e) => {
		clog(...e);
		throw new Error(...e);
	}
}

global.Throw = pro;