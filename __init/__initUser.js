let mongoose = require('mongoose')       //引用mongoose
let UserSchema = new mongoose.Schema({       //创建数据模板
    phone: Number,
    name: {type: String, default: " "},
    sex: {type: String, default: "male"},    //指定数据类型，default选项指数据缺失时的默认值
    deposit: {type: Boolean, default: false},
    account: {type: Number, default: 0},
    credit: {type: Number, default: 100},
    parking: {type: Number, default: 0},
    startTime: {type: Date, default: 0},
    finishTime: {type: Date, default: 0}
})
let db = mongoose.connection;   //当使用mongoose.connect()方法连接数据库时，数据库的实例依附在mongoose.connection上
let collectionName='user'
let User = mongoose.model('user', UserSchema,collectionName)    //将模板绑定到指定的collection上
mongoose.connect('mongodb://localhost:27017/user')

db.once('open', function () {       //监测数据库实例的状态
    console.log("Mongo is working")
})
db.once('close',function () {       //监测数据库实例的状态
    console.log("Mongo is closed!")
})

User.create({       //增加记录
    phone: '15990057450'
},function () {
    console.log("Insert success!")
});

User.find({phone: '11111111111'}, function (err, data) {   //查询操作
    if (err) {
        console.log("find failure")
    } else {
        console.log("find success!")
        data.forEach((item)=>console.log(item))
    }
});

User.findOneAndUpdate({phone: '11111111111'},{age:21},function () {     //查询并更新
    console.log("Update success!")
})
User.where({phone: '11111111111'}).update({$set:{age:22}},function () {     //更新操作
    console.log("Update success!")
    mongoose.disconnect(function () {       //断开数据库连接
        console.log("Mongo is closed!")
    })
})

User.remove({phone:'11111111111'},function () {        //删除操作
    console.log("Remove success!")
})