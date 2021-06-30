// self.addEventListener("connect", function (e) {
// 		console.log("jsworker connect :", e)

// 	var port = e.ports[0];

// 	port.addEventListener("message", function (e) {
// 		console.log("jsworker message:", e)
// 		port.postMessage("Service says: " + e.data);
// 	}, false);

// 	port.start();

// }, false);
