var express = require('express')
var router = express.Router()
var Parkset = require('./__ConnectParkDataset')

router.get('/init', function(req, res) {
    Parkset.park.find({phone: req.query.phone}, function (err, data) {
        res.json(data)
    })
})

module.exports = router