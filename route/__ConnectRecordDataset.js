let mongoose = require('mongoose')
let RecordSchema = new mongoose.Schema({
    phone: String,
    parking: String,
    startTime: Date,
    finishTime: Date
})
let db = mongoose.connection
let collectionName='record'
let Record = mongoose.model('record', RecordSchema,collectionName)
mongoose.connect('mongodb://localhost:27017/record')

module.exports.db=db
module.exports.record=Record