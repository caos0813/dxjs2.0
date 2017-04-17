var ports = [];
function broadcast(msg) {
    ports.forEach(function (port) {
        port.postMessage(msg);
    })
}
//connect 依然 可以 使用 addEventListener 来 绑 定 
self.onconnect = function( e) { 
    //任何 客户 端 发起 连接 的 时候 都会 新建 一个 MessagePort 实例 
    var newPort = e. ports[ 0] 
    //将 该 实例 单独 管理 起来， 当然 也可以 直接 访问 e. ports 属性 
    ports.push(newPort)
    newPort.postMessage('连接成功');
    newPort.onmessage = function (e) {
        if (e.data.cmd === 'hi') {
            broadcast(e.data.id + '说：' + e.data.msg);
        }
    }

}

