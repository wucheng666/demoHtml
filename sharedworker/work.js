var connectList = [];
var textlist = [],
  connectList = [];
self.addEventListener('connect', function (e) {
  var port = e.ports[0]
  port.start();
  port.addEventListener('message', function (e) {
    // obj.target = e.currentTarget;
    var worker = e.currentTarget,
      res = e.data;
    if (connectList.indexOf(worker) === -1) {
      connectList.push(worker)
    }
    switch (res.status) {
      case 0:
        inform(function (item) {
          if (item != worker) {
            item.postMessage('有新用户加入');
          } else {
            item.postMessage('我是新用户');
          }
        });
        break;
 
      default:
        textlist.push(res.data.value);
        inform(textlist);
        break;
    }
  })
});
// 分发消息
function inform(obj) {
  var cb = (typeof obj === 'function') ? obj : function (item) {
    item.postMessage(obj);
  }
  connectList.forEach(cb);
}
