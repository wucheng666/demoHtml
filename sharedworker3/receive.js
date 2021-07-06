var worker = new SharedWorker("jsworker.js");
let timer = null;

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		broadcastMessage(e.data)
	}, false);

	worker.port.start();
}

function sendMessage () {
	//1.先获取查看有没有启动了SharedWorker
	worker.port.postMessage("getData");
}

function broadcastMessage(msg){
	
	let divS = document.createElement("div");
	divS.innerText = 'Waiting response: ' + msg;
	document.body.append(divS)
	if(msg){
		console.log("已经存在 SharedWorker...")
		if(timer) return;
		//表明已经有人启动了SharedWorker
		timer = setInterval(function () {
			worker.port.postMessage("");
		}, 1000);
	} else {
		//表明没有人启动过SharedWorker
		console.log("启动 SharedWorker...")
		if(timer) return;
		timer = setInterval(function () {
			worker.port.postMessage("In the Meeting!" + Date.now());
		}, 1000);
	}
}

initJsWorker();
sendMessage();
