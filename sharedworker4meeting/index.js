var worker = new SharedWorker("jsworker.js");
let timer = null;

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		broadcastMessage(e.data)
	}, false);
	worker.port.addEventListener("messageerror", (event) => {
		console.error(`Error receiving message from worker: ${event}`);
	});

	worker.port.start();
}

function sendMessage () {
	//1.先获取查看有没有启动了SharedWorker
	worker.port.postMessage("getData");
}

function broadcastMessage(msg){
	
	if(msg){
		console.log("已经存在 SharedWorker...")
		alert("当前已经存在会议界面！")
	} else {
		//表明没有人启动过SharedWorker
		console.log("启动 SharedWorker...")
		worker.port.postMessage(true);
	}
}

initJsWorker();
sendMessage();