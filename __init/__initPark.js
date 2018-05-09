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

// Park.create({       //增加记录
//     park: 10002,
//     category: 2,
//     location: '浙江理工大学图书馆',
//     latitude: 30.314981,
//     longitude: 120.343218
// },function () {
//     console.log("Insert success!")
// });

Park.findOneAndUpdate({park:10002},{isUsed:false},function () {     //查询并更新
    console.log("Update success!")
});

// Park.remove({park:10003},function () {        //删除操作
//     console.log("Remove success!")
// })