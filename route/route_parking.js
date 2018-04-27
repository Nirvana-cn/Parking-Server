var express = require('express')
var router = express.Router()
var Parkset = require('./__ConnectParkDataset')

router.get('/init', function(req, res) {
    Parkset.park.find({isUsed:false}, function (err, data) {
        console.log('park information is send')
        res.json(data)
    })
})

module.exports = router