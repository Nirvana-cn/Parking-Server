var express = require('express')
var app = express()
app.use(express.static('static'))
app.get('/', function (req, res) {
    res.send('Hello World!')
})

var server = app.listen(3000, function () {
    console.log('Server is running on http://127.0.0.1:3000');
})