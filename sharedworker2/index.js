var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		console.log('Waiting response: ' + e.data);
	}, false);

	worker.port.start();
}

function sendMessage () {
	var counter = 0;
	
	setInterval(function () {
		counter++;
		worker.port.postMessage("Hey sara!" + counter);
	}, 5000);
}

initJsWorker();
sendMessage();
