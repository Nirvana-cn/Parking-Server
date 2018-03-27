var express = require('express')
var router = express.Router()
var dataset = require('./connectDataset')

router.get('/login', function(req, res) {
    console.log(req.query.phone)
    dataset.user.find({phone: req.query.phone}, function (err, data) {
        if (data.length == 0) {
            console.log("find failure")
            dataset.user.create({
                phone: req.query.phone
            },function () {
                console.log("Insert success!")
            })
            let userInfo={
                phone:req.query.phone,
                name: " ",
                sex: "male",
                deposit: "non-delivery",
                account: 0,
                credit: 100,
                parking: 0
            }
            res.json(userInfo)
        } else {
            res.json(data[0])
        }
    })
})

module.exports = router