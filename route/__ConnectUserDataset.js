let mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    phone: Number,
    name: {type: String, default: ""},
    sex: {type: String, default: "male"},
    deposit: {type: Boolean, default: false},
    account: {type: Number, default: 0},
    credit: {type: Number, default: 100},
    parking: {type: Number, default: 0},
    startTime: {type: Date, default: 0},
    finishTime: {type: Date, default: 0}
})
let db = mongoose.connection;
let collectionName='user'
let User = mongoose.model('user', UserSchema,collectionName)
mongoose.connect('mongodb://localhost:27017/iParking')

module.exports.db=db
module.exports.user=User