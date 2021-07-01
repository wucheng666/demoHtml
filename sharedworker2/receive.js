var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
//     recMsg.innerHTML = e.data;
    let divS = document.createElement("div");
		divS.innerText = 'Waiting response: ' + e.data;
		document.querySelector("#receiveContent").append(divS)
		console.log('Waiting response: ' + e.data);
	}, false);

	worker.port.start();
}

// function sendMessage () {
// // 	worker.port.postMessage("");
// // 	var counter = 0;
	
// 	setInterval(function () {
// 		worker.port.postMessage("");
// // 		counter++;
// // 		worker.port.postMessage("Hey sara!" + counter);
// 	}, 1000);
// }

initJsWorker();
// sendMessage();
