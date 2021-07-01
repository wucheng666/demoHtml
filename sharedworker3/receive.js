var worker = new SharedWorker("jsworker.js");

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		if(!e.data){
			//表明没有人启动过SharedWorker
			//启动SharedWorker，并广播通知
			broadcastMessage()
		} else {
			//表面已经有人启动了SharedWorker
			let divS = document.createElement("div");
			divS.innerText = 'Waiting response: ' + e.data;
			document.body.append(divS)
			console.log('Waiting response: ' + e.data);
		}
	}, false);

	worker.port.start();
}

function sendMessage () {
	var counter = 0;
	//1.先获取查看有没有启动了SharedWorker
	worker.port.postMessage("getData");
}

function broadcastMessage(){
	setInterval(function () {
		worker.port.postMessage("In the Meeting!");
	}, 1000);
}

initJsWorker();
sendMessage();
