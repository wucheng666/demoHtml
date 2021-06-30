self.addEventListener("connect", function (e) {

	var port = e.ports[0];

	port.addEventListener("message", function (e) {
		port.postMessage("Service says: " + e.data);
	}, false);

	port.start();

}, false);