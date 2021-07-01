let data = ""
self.addEventListener("connect", function (e) {
		console.log("jsworker connect :", e)

	var port = e.ports[0];

	port.addEventListener("message", function (e) {
		console.log("jsworker message666:", e)
		// port.postMessage("jsworker broadcast:" + e.data);
		if (e.data === 'get') {       // 如果是get 则返回数据给客户端
			port.postMessage(data)
		  } else {                      // 否则把数据保存
			data = e.data
		  }
	}, false);

	port.start();

}, false);
