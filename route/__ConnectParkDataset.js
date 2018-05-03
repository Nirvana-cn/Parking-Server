let mongoose = require('mongoose')
let ParkSchema = new mongoose.Schema({
    park: Number,
    category:Number,
    isUsed: {type: Boolean, default: false},
    location: String,
    latitude: Number,
    longitude: Number,
    owner: {type: Number, default: ''},
})
let db = mongoose.connection
let collectionName='park'
let Park = mongoose.model('park', ParkSchema,collectionName)
mongoose.connect('mongodb://localhost:27017/iParking')

module.exports.db=db
module.exports.park=Park