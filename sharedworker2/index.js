var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		let divS = document.createElement("div");
		divS.innerText = 'Waiting response: ' + e.data;
		document.body.append(divS)
		console.log('Waiting response: ' + e.data);
	}, false);

	worker.port.start();
}

function sendMessage () {
	var counter = 0;
	
	setInterval(function () {
		counter++;
		worker.port.postMessage("Hey sara!" + counter);
	}, 1000);
}

initJsWorker();
sendMessage();
