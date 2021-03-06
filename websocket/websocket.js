var Userset = require('../route/__ConnectUserDataset')
var Parkset = require('../route/__ConnectParkDataset')
var WebSocketServer = require('ws').Server
var server = new WebSocketServer({port: 3001})
server.on('connection', function (ws) {
    console.log('client connected')
    let dataReceive
    let address
    ws.on('message', function (message) {
        dataReceive=JSON.parse(message)
        console.log('receive' + message)
        setTimeout(function () {
            Parkset.park.findOneAndUpdate({park: dataReceive.park}, {
                isUsed: true
            }, function (err, data) {
                if(!err){
                    address=data.location
                    console.log(address)
                    console.log('park status changed -> closed')
                    Userset.user.findOneAndUpdate({phone: dataReceive.user}, {
                        parking: dataReceive.park,
                        location: address,
                        startTime: new Date()
                    }, function (err, data) {
                        if(!err){
                            console.log('lock success')
                            ws.send('success')
                        }
                    })
                }
            })
        }, 3000)
    })
    setTimeout(function () {
        Parkset.park.findOneAndUpdate({park: dataReceive.park}, {
            isUsed: false
        }, function (err, data) {
            if(!err){
                console.log('park status changed -> open')
            }
        })
        Userset.user.findOneAndUpdate({phone: dataReceive.user}, {
            finishTime: new Date()
        }, function (err, data) {
            if(!err){
                console.log('use finish')
                ws.send('finish')
            }
        })
    }, 10000)
    ws.on('disconnect',function () {
        console.log('client disconnect')
    })
})
console.log('websocket server is running at port : 3001')