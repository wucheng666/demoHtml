var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
    let divS = document.createElement("div");
		divS.innerText = 'Waiting response: ' + e.data;
		document.querySelector("#receiveContent").append(divS)
		console.log('Waiting response: ' + e.data);
	}, false);

	worker.port.start();
}


initJsWorker();