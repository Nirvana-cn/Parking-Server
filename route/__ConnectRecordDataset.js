let mongoose = require('mongoose')
let RecordSchema = new mongoose.Schema({
    phone: Number,
    parking: Number,
    startTime: Date,
    finishTime: Date
})
let db = mongoose.connection
let collectionName='record'
let Record = mongoose.model('record', RecordSchema,collectionName)
mongoose.connect('mongodb://localhost:27017/iParking')

module.exports.db=db
module.exports.record=Record