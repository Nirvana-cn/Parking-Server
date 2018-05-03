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

db.once('open', function () {       //监测数据库实例的状态
    console.log("Mongo is working")
})
db.once('close',function () {       //监测数据库实例的状态
    console.log("Mongo is closed!")
})

Park.create({       //增加记录
    park: 10003,
    category: 3,
    location: '杭州电子科技大学图书馆',
    latitude: 30.314981,
    longitude: 120.343218
},function () {
    console.log("Insert success!")
});

// Park.findOneAndUpdate({latitude:30.315827},{park:10002},function () {     //查询并更新
//     console.log("Update success!")
// });