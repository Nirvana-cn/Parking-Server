let mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    phone: String,
    name: {type: String, default: " "},
    sex: {type: String, default: "male"},
    deposit: {type: String, default: "non-delivery"},
    account: {type: Number, default: 0},
    credit: {type: Number, default: 100},
    parking: {type: Number, default: 0}
})
let db = mongoose.connection;
let collectionName='user'
let User = mongoose.model('user', UserSchema,collectionName)
mongoose.connect('mongodb://localhost:27017/user')

module.exports.db=db
module.exports.user=User
module.exports.schema=UserSchema