var express = require('express')
var router = express.Router()
var Userset = require('./__ConnectUserDataset')
var Parkset = require('./__ConnectParkDataset')
var Recordset = require('./__ConnectRecordDataset')
var WebSocket=require('ws')


router.get('/login', function (req, res) {
    console.log(req.query.phone)
    Userset.user.find({phone: req.query.phone}, function (err, data) {
        if (data.length == 0) {
            console.log("find failure")
            Userset.user.create({
                phone: req.query.phone
            }, function () {
                console.log("Insert success!")
            })
            let userInfo = {
                phone: req.query.phone,
                name: "",
                sex: "male",
                deposit: false,
                account: 0,
                credit: 100,
                parking: 0,
                startTime: 0,
                finishTime: 0
            }
            res.json(userInfo)
        } else {
            res.json(data[0])
        }
    })
})

router.get('/center', function (req, res) {
    Userset.user.find({phone: req.query.phone}, function (err, data) {
        res.json(data[0])
    })
})

router.get('/recharge', function (req, res) {
    Userset.user.findOneAndUpdate({phone: req.query.phone}, {account: req.query.money}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            console.log('use account update success')
            res.end()
        }
    })
})

router.get('/name', function (req, res) {
    Userset.user.findOneAndUpdate({phone: req.query.phone}, {name: req.query.name}, function (err, data) {
        console.log('user name update success')
        res.end()
    })
})

router.get('/clear', function (req, res) {
    Userset.user.find({phone: req.query.phone}, function (err, data) {
        if(!err){
            let time=data[0].finishTime-data[0].startTime
            res.json({time:time})
            Recordset.record.create({
                phone: data[0].phone,
                park: data[0].parking,
                location: data[0].location,
                startTime: data[0].startTime,
                finishTime: data[0].finishTime
            } ,function () {
                console.log("Record insert success!")
            })
        }
    })
})

router.get('/history', function (req, res) {
    Recordset.record.find({phone: req.query.phone}, function (err, data) {
        if(!err){
            res.json(data)
        }
    })
})

module.exports = router