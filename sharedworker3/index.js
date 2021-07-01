var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		broadcastMessage(e.data)
	}, false);

	worker.port.start();
}

function sendMessage () {
	var counter = 0;
	//1.先获取查看有没有启动了SharedWorker
	worker.port.postMessage("getData");
}

function broadcastMessage(msg){
	if(msg){
		//表面已经有人启动了SharedWorker
		setInterval(function () {
			worker.port.postMessage("");
		}, 1000);
	} else {
		//表明没有人启动过SharedWorker
		//启动SharedWorker，并广播通知
		let divS = document.createElement("div");
		divS.innerText = 'Waiting response: ' + msg;
		document.body.append(divS)
		console.log('Waiting response: ' + msg);
		
		setInterval(function () {
			worker.port.postMessage("In the Meeting!");
		}, 1000);
	}
}

initJsWorker();
sendMessage();
