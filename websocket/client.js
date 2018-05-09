var WebSocket=require('ws')
var client = new WebSocket('websocket://localhost:3001')

// client.on('open', function () {
//     let data=JSON.stringify({park:10001})
//     client.send(data)
//     client.on('message',function (data) {
//         if(data=='success'){
//             console.log('lock success')
//             client.close()
//         }
//     })
// })

// client.on('message',function (data) {
//     console.log('receive from server:'+data)
// })
