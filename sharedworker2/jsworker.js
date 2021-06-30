let data = "链接成功"
self.addEventListener("connect", function (e) {
		console.log("jsworker connect :", e)

	var port = e.ports[0];

	port.addEventListener("message", function (e) {
		console.log("jsworker message666:", e)
// 		port.postMessage("Service says2: " + e.data);
		// 如果消息内容为空，
		// 说明该客户端想获取共享的数据 data
		if (e.data === "") {
		    // 就给当前客户端发送 data 数据
		    port.postMessage(data);
		} else {
		    // 否则如果消息内容不为空，
		    // 说明该客户端想要提供
		    // 新的消息保存在共享的 data 中，
		    // 供别人获取
		    data = e.data;
		};
	}, false);

	port.start();

}, false);
