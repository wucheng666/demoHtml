var worker = new SharedWorker("jsworker.js");
let sendMessages = "";

function initJsWorker() {
	worker.port.addEventListener("message", function (e) {
		broadcastMessage(e.data)
		if(!e.data){
			//表明没有人启动过SharedWorker
			console.log("启动 SharedWorker...")
			sendMessages = "mainWorkder send: true"
			worker.port.postMessage(sendMessages);
		} else if(sendMessages !== e.data){
			alert("当前已经存在会议界面！")
		}
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

initJsWorker();
sendMessage();
