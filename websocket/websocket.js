var WebSocketServer = require('ws').Server
var server = new WebSocketServer({port: 3001})
server.on('connection', function (ws) {
    console.log('client connected')
    ws.on('message', function (message) {
        console.log('receive' + message)
        setTimeout(function () {
            console.log('lock success')
            ws.send('success')
        }, 3000)
    })
    setTimeout(function () {
        console.log('use finish')
        ws.send('finish')
    }, 10000)
    ws.on('disconnect',function () {
        console.log('client disconnect')
    })
})
console.log('websocket server is running at port : 3001')