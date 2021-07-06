let hasMeetingWindowTab = null
self.addEventListener("connect", function (e) {
	var port = e.ports[0];
	port.addEventListener("message", function (e) {
		console.log("jsworker message666:", e)
		// port.postMessage("jsworker broadcast:" + e.data);
		//获取初始值，判断当前是否存在会议界面
		if (e.data === 'getData') {
			port.postMessage(hasMeetingWindowTab)
		  } else if(e.data){                     
			//设置数值 
			hasMeetingWindowTab = e.data
			port.postMessage(hasMeetingWindowTab)
		  }
	}, false);
	port.start();
}, false);